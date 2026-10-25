// MyPins · plan (Supabase Edge Function): the "Claude ile planla" assistant.
// The Anthropic API key lives only in Supabase → Edge Functions → Secrets as ANTHROPIC_API_KEY.
// "Verify JWT" stays on: only signed-in MyPins users can call it. Each question uses one of the person's
// daily questions (public.assistant_take, supabase/11_asistan.sql).
// Everything is read with the caller's own sign-in, so the assistant sees only what they can see in the app.
//
// Request:  POST { "messages": [{ "role": "user"|"assistant", "text": "..." }, ...],
//                  "lang": "tr"|"en", "focus": { "kind": "pin"|"wish", "id": "..." } | { "kind": "map", "id": "<username>" } | null }
// Response: { "text": "...", "sources": [{ "url", "title" }], "pins": [{ title, city, country, kind, date, note, search }],
//             "left": <questions left today> }
//           With "mode": "save_plan" the conversation (which may end with the assistant) is turned into a plan instead:
//           { "plan": { "title", "body", "places": [{ title, city, country }] }, "left": n }. Uses one question.
//           focus may also be { "kind": "plan", "id": "<plans.id>" }: continuing a saved plan.
//           errors: { "error": "limit" | "no_key" | "no_limit_table" | "bad_request" | "upstream" | ... }
import { createClient } from "jsr:@supabase/supabase-js@2";
import { buildSystem, cleanHistory, converse, tools, writePlan, type Ctx, type Focus, type Friend } from "./lib.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "content-type": "application/json" } });
const PIN_COLS = "id,user_id,kind,home,title,title_en,city,country,iso,lat,lon,visited_on,note,parent_id";
const FRIEND_COLS = "id,kind,home,title,city,country,lat,lon,visited_on,note,note_en,dish,dish_en,rating,price,parent_id";

export async function handle(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let body: { messages?: unknown; lang?: string; mode?: string; focus?: { kind?: string; id?: string } | null };
  try { body = await req.json(); } catch (_) { return json({ error: "bad_json" }, 400); }
  const saving = body.mode === "save_plan";
  const history = cleanHistory(body.messages, !saving);
  if (!history) return json({ error: "bad_request" }, 400);
  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) return json({ error: "no_key" }, 500);

  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    auth: { persistSession: false },
  });
  const { data: u } = await sb.auth.getUser();
  const uid = u?.user?.id;
  if (!uid) return json({ error: "auth" }, 401);

  const { data: left, error: le } = await sb.rpc("assistant_take");
  if (le) return json({ error: /assistant_take|function/i.test(le.message || "") ? "no_limit_table" : "db" }, 500);
  if (left < 0) return json({ error: "limit" }, 429);

  const [prof, pins, wish] = await Promise.all([
    sb.from("profiles").select("username,display_name,tagline,bio,bio_en").eq("id", uid).maybeSingle(),
    sb.from("pins").select(PIN_COLS).eq("user_id", uid).limit(600),
    sb.from("wishlist").select("id,title,city,country,lat,lon").eq("user_id", uid).limit(200),
  ]);

  let focus: Focus | null = null, friend: Friend | null = null;
  // someone else's map: their profile and pins, read with the viewer's own sign-in (a private or hidden map comes back empty)
  const loadFriend = async (ownerId: string) => {
    const { data: pr } = await sb.from("profiles").select("id,username,display_name,tagline,bio,bio_en").eq("id", ownerId).maybeSingle();
    if (!pr) return;
    const { data: fp } = await sb.from("pins").select(FRIEND_COLS).eq("user_id", ownerId).limit(400);
    friend = { username: pr.username, display_name: pr.display_name, tagline: pr.tagline, bio: pr.bio, bio_en: pr.bio_en, pins: fp || [] };
  };
  const f = body.focus;
  if (f && typeof f.id === "string" && f.kind === "pin") {
    const { data: p } = await sb.from("pins").select(PIN_COLS).eq("id", f.id).maybeSingle();
    if (p) {
      let owner = "";
      if (p.user_id !== uid) owner = (await sb.from("profiles").select("username").eq("id", p.user_id).maybeSingle()).data?.username || "";
      focus = { kind: "pin", title: p.title, city: p.city, country: p.country, lat: p.lat, lon: p.lon, note: p.note, owner, mine: p.user_id === uid };
      if (p.user_id !== uid) await loadFriend(p.user_id);
    }
  } else if (f && typeof f.id === "string" && f.kind === "wish") {
    const w = (wish.data || []).find(x => x.id === f.id);
    if (w) focus = { kind: "wish", title: w.title, city: w.city, country: w.country, lat: w.lat, lon: w.lon, mine: true };
  } else if (f && typeof f.id === "string" && f.kind === "plan") {
    const { data: pl } = await sb.from("plans").select("title,body,places").eq("id", f.id).maybeSingle();
    if (pl) {
      const first = (Array.isArray(pl.places) ? pl.places : []).find((x: { lat?: number }) => typeof x.lat === "number");
      focus = { kind: "plan", title: pl.title, plan: pl.body, lat: first ? first.lat : NaN, lon: first ? first.lon : NaN, mine: true };
    }
  } else if (f && typeof f.id === "string" && f.kind === "map") {
    const { data: pr } = await sb.from("profiles").select("id").ilike("username", f.id.replace(/[%_\\]/g, "\\$&")).maybeSingle();
    if (pr && pr.id !== uid) await loadFriend(pr.id);
  }

  const myPins = pins.data || [];
  const ctx: Ctx = {
    lang: body.lang === "en" ? "en" : "tr",
    today: new Date().toISOString().slice(0, 10),
    me: prof.data || {},
    pins: myPins,
    wish: wish.data || [],
    focus,
    friend,
  };
  const home = myPins.find(p => p.home);

  const call = async (payload: Record<string, unknown>) => {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) throw Object.assign(new Error("upstream"), { status: r.status, detail: (await r.text()).slice(0, 300) });
    return await r.json();
  };
  try {
    if (saving) {
      const plan = await writePlan(call, buildSystem(ctx), history);
      return plan ? json({ plan, left }) : json({ error: "empty" }, 502);
    }
    const reply = await converse(call, buildSystem(ctx), history, tools(home?.iso || undefined));
    if (!reply.text && !reply.pins.length) return json({ error: "empty" }, 502);
    return json({ ...reply, left });
  } catch (e) {
    const err = e as { status?: number; detail?: string };
    console.error("plan upstream", err.status, err.detail);
    // Anthropic's own error text (never the key) helps tell what went wrong; the app shows the status and type
    let type = "";
    try { const d = JSON.parse(err.detail || "{}"); type = String(d?.error?.type || "") + (d?.error?.message ? ": " + String(d.error.message).slice(0, 160) : ""); } catch (_) { /* not JSON */ }
    return json({ error: "upstream", status: err.status ?? 0, detail: type }, 502);
  }
}

Deno.serve(handle);
