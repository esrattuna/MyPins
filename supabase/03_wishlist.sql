-- =================================================================
-- MyPins · "Belki bir gün" (Someday List)
-- Places a person wants to go to. Run once in Supabase → SQL Editor.
-- Safe to run again (idempotent). Does not change existing tables.
-- Visibility = same rule as pins: whoever can see your map sees your list
-- (public: everyone, private: accepted followers, ghost: only you).
-- =================================================================

create table if not exists public.wishlist (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  kind        text not null default 'yer' check (kind in ('yer','yemek')),
  title       text not null check (char_length(title) between 1 and 120),
  title_en    text not null default '',
  city        text not null default '',
  country     text not null default '',
  iso         text not null default '',
  lat         double precision not null check (lat between -90 and 90),
  lon         double precision not null check (lon between -180 and 180),
  source_pin  uuid references public.pins(id) on delete set null,     -- added from someone's pin
  source_user uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now()
);
create index if not exists wishlist_user_idx on public.wishlist(user_id);
-- the same pin can be on your list only once
create unique index if not exists wishlist_user_source_pin_uq on public.wishlist(user_id, source_pin) where source_pin is not null;

alter table public.wishlist enable row level security;

drop policy if exists "liste görüntüle" on public.wishlist;
create policy "liste görüntüle" on public.wishlist
  for select using (public.can_view_map(user_id));

drop policy if exists "kendi listene ekle" on public.wishlist;
create policy "kendi listene ekle" on public.wishlist
  for insert with check (user_id = auth.uid());

drop policy if exists "kendi listeni düzenle" on public.wishlist;
create policy "kendi listeni düzenle" on public.wishlist
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "kendi listenden sil" on public.wishlist;
create policy "kendi listenden sil" on public.wishlist
  for delete using (user_id = auth.uid());

grant select, insert, update, delete on public.wishlist to authenticated;
grant select on public.wishlist to anon;
