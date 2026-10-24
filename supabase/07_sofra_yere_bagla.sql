-- =================================================================
-- MyPins · step 1 of 2: food spots ("Sofra") belong to a place
-- Adds pins.parent_id (the place a food spot belongs to) and SHOWS which
-- place each existing food spot would be attached to. It does NOT move
-- anything yet: send the list to Claude, then run 08_sofra_tasi.sql.
-- Safe to run again. The live app (app/) keeps working as before.
-- =================================================================
alter table public.pins add column if not exists parent_id uuid references public.pins(id) on delete cascade;
create index if not exists pins_parent_idx on public.pins(parent_id);

-- a food spot can only belong to one of the same person's top-level places
create or replace function public.pins_check_parent()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.parent_id is not null then
    if new.parent_id = new.id or not exists (
         select 1 from pins p where p.id = new.parent_id and p.user_id = new.user_id and p.kind = 'yer' and p.parent_id is null) then
      raise exception 'Sofra yalnızca aynı kişinin bir yer pinine bağlanabilir';
    end if;
  end if;
  return new;
end $$;
drop trigger if exists pins_parent_check on public.pins;
create trigger pins_parent_check before insert or update of parent_id, user_id on public.pins
  for each row execute function public.pins_check_parent();

-- distance in km between two points
create or replace function public.km_between(lat1 double precision, lon1 double precision, lat2 double precision, lon2 double precision)
returns double precision language sql immutable as $$
  select 6371 * 2 * asin(sqrt(power(sin(radians(lat2 - lat1) / 2), 2)
       + cos(radians(lat1)) * cos(radians(lat2)) * power(sin(radians(lon2 - lon1) / 2), 2)))
$$;

-- Matching rule for existing food spots (used by the preview below and by 08):
--   1) a place of the same person in the same city (nearest if several)
--   2) otherwise the nearest place within 15 km
--   3) otherwise a NEW place for that city is created in 08 (shown here as "YENİ: <city>")
create or replace function public.sofra_eslesme()
returns table (food_id uuid, user_id uuid, place_id uuid, new_city text, km double precision)
language sql stable security definer set search_path = public as $$
  select f.id, f.user_id, m.id,
         case when m.id is null then coalesce(nullif(f.city, ''), nullif(f.country, ''), f.title) end,
         m.km
  from pins f
  left join lateral (
    select p.id, km_between(f.lat, f.lon, p.lat, p.lon) as km
    from pins p
    where p.user_id = f.user_id and p.kind = 'yer' and p.parent_id is null
      and ((f.city <> '' and lower(p.city) = lower(f.city)) or km_between(f.lat, f.lon, p.lat, p.lon) <= 15)
    order by (f.city <> '' and lower(p.city) = lower(f.city)) desc, km_between(f.lat, f.lon, p.lat, p.lon)
    limit 1
  ) m on true
  where f.kind = 'yemek' and f.parent_id is null
$$;
revoke all on function public.sofra_eslesme() from public, anon, authenticated;

-- PREVIEW (changes nothing)
select pr.username as kisi, f.title as sofra, f.city as sofra_sehir,
       coalesce(p.title, 'YENİ: ' || e.new_city) as yer, round(e.km::numeric, 1) as km
from public.sofra_eslesme() e
join public.pins f on f.id = e.food_id
join public.profiles pr on pr.id = e.user_id
left join public.pins p on p.id = e.place_id
order by pr.username, f.country, f.title;
