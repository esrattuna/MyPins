-- =================================================================
-- MyPins · "Claude ile planla" asistanı: kişi başı günlük soru sınırı
-- Run once in Supabase → SQL Editor. Safe to run again.
--
-- The Edge Function "plan" calls public.assistant_take() before each
-- question. It counts the signed-in person's questions per day (UTC)
-- and refuses after the daily limit, so the Anthropic bill stays bounded.
-- Nobody can read or change the counter table directly; the function
-- only ever adds one to the caller's own count (so calling it yourself
-- can only use up your own questions, never reset them).
-- To change the limit: edit the number 20 below and run the file again.
-- =================================================================
create table if not exists public.assistant_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  day     date not null,
  n       int  not null default 0,
  primary key (user_id, day)
);
alter table public.assistant_usage enable row level security;
-- no policies: the table is reachable only through the function below
revoke all on table public.assistant_usage from anon, authenticated;

-- returns how many questions are left today after this one (0 or more),
-- or -1 when the daily limit was already reached (nothing is counted then)
create or replace function public.assistant_take()
returns int language plpgsql security definer set search_path = public as $$
declare
  me uuid := auth.uid();
  lim constant int := 20;
  today date := (now() at time zone 'utc')::date;
  used int;
begin
  if me is null then raise exception 'Giriş yapılmamış'; end if;
  insert into assistant_usage (user_id, day, n) values (me, today, 1)
    on conflict (user_id, day) do update set n = assistant_usage.n + 1
    where assistant_usage.n < lim
    returning n into used;
  if used is null then return -1; end if;          -- limit reached: the row was not updated
  if used = 1 then delete from assistant_usage where user_id = me and day < today - 7; end if;   -- tidy old days
  return lim - used;
end $$;

revoke all on function public.assistant_take() from public, anon;
grant execute on function public.assistant_take() to authenticated;
