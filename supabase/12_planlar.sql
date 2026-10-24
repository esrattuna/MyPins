-- =================================================================
-- MyPins · "Planlarım": plans saved from the Planla assistant
-- Run once in Supabase → SQL Editor. Safe to run again.
--
-- A plan is private: only the person who saved it can see, change or
-- delete it (unlike the "Belki bir gün" list, which friends can see).
-- title / body: the plan the assistant wrote (body is short markdown)
-- places: the places it covers, [{ "title", "city", "country", "lat", "lon" }]
-- chat:   the conversation it came from, so it can be continued later
-- focus:  what the chat was about ({ "kind": "pin"|"wish"|"map", "id", "label" })
-- Deleting the account deletes the plans (ON DELETE CASCADE).
-- =================================================================
create table if not exists public.plans (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title       text not null default '',
  body        text not null default '',
  places      jsonb not null default '[]'::jsonb,
  sources     jsonb not null default '[]'::jsonb,
  chat        jsonb not null default '[]'::jsonb,
  focus       jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint plans_size check (char_length(title) <= 200 and char_length(body) <= 20000 and pg_column_size(chat) <= 400000)
);
create index if not exists plans_user_idx on public.plans (user_id, updated_at desc);

alter table public.plans enable row level security;
drop policy if exists "plans: own rows only" on public.plans;
create policy "plans: own rows only" on public.plans
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
revoke all on table public.plans from anon;
grant select, insert, update, delete on table public.plans to authenticated;

create or replace function public.plans_touch() returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists plans_touch on public.plans;
create trigger plans_touch before update on public.plans for each row execute function public.plans_touch();
