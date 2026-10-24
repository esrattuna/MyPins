// MyPins · plan (Supabase Edge Function): the "Claude ile planla" assistant.
// The Anthropic API key lives only in Supabase → Edge Functions → Secrets as ANTHROPIC_API_KEY.
// "Verify JWT" stays on: only signed-in MyPins users can call it. Each question uses one of the person's
// daily questions (public.assistant_take, supabase/11_asistan.sql).
// Everything is read with the caller's own sign-in, so the assistant sees only what they can see in the app.
//
// Request:  POST { "messages": [{ "role": "user"|"assistant", "text": "..." }, ...],
//                  "lang": "tr"|"en", "focus": { "kind": "pin"|"wish", "id": "..." } | null }
// Response: { "text": "...", "sources": [{ "url", "title" }], "pins": [{ title, city, country, kind, date, note, search }],
//             "left": <questions left today> }
//           errors: { "error": "limit" | "no_key" | "no_limit_table" | "bad_request" | "upstream" | ... }
import { createClient } from "jsr:@supabase/supabase-js@2";
import { buildSystem, cleanHistory, converse, tools, type Ctx, type Focus } from "./lib.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "content-type": "application/json" } });
const PIN_COLS = "id,user_id,kind,home,title,title_en,city,country,iso,lat,lon,visited_on,note,parent_id";

export async function handle(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let body: { messages?: unknown; lang?: string; focus?: { kind?: string; id?: string } | null };
  try { body = await req.json(); } catch (_) { return json({ error: "bad_json" }, 400); }
  const history = cleanHistory(body.messages);
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

  let focus: Focus | null = null;
  const f = body.focus;
  if (f && typeof f.id === "string" && f.kind === "pin") {
    const { data: p } = await sb.from("pins").select(PIN_COLS).eq("id", f.id).maybeSingle();
    if (p) {
      let owner = "";
      if (p.user_id !== uid) owner = (await sb.from("profiles").select("username").eq("id", p.user_id).maybeSingle()).data?.username || "";
      focus = { kind: "pin", title: p.title, city: p.city, country: p.country, lat: p.lat, lon: p.lon, note: p.note, owner, mine: p.user_id === uid };
    }
  } else if (f && typeof f.id === "string" && f.kind === "wish") {
    const w = (wish.data || []).find(x => x.id === f.id);
    if (w) focus = { kind: "wish", title: w.title, city: w.city, country: w.country, lat: w.lat, lon: w.lon, mine: true };
  }

  const myPins = pins.data || [];
  const ctx: Ctx = {
    lang: body.lang === "en" ? "en" : "tr",
    today: new Date().toISOString().slice(0, 10),
    me: prof.data || {},
    pins: myPins,
    wish: wish.data || [],
    focus,
  };
  const home = myPins.find(p => p.home);

  try {
    const reply = await converse(async (payload) => {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw Object.assign(new Error("upstream"), { status: r.status, detail: (await r.text()).slice(0, 300) });
      return await r.json();
    }, buildSystem(ctx), history, tools(home?.iso || undefined));
    if (!reply.text && !reply.pins.length) return json({ error: "empty" }, 502);
    return json({ ...reply, left });
  } catch (e) {
    const err = e as { status?: number; detail?: string };
    console.error("plan upstream", err.status, err.detail);
    return json({ error: "upstream", status: err.status ?? 0 }, 502);
  }
}

Deno.serve(handle);
