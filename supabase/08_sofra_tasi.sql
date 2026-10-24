-- =================================================================
-- MyPins · step 2 of 2: attach existing food spots to their place
-- Same rule as the preview in 07 (same city → nearest within 15 km → new
-- place for the city). Only touches food spots that are not attached yet.
-- Run 07_sofra_yere_bagla.sql first. Running it again changes nothing.
-- =================================================================
do $$
declare r record; newid uuid;
begin
  create temp table _m on commit drop as select * from public.sofra_eslesme();
  -- 3) new places for cities that have food spots but no place yet (one per person + city)
  for r in
    select e.user_id, e.new_city, min(f.country) as country, min(f.iso) as iso, avg(f.lat) as lat, avg(f.lon) as lon
    from _m e join public.pins f on f.id = e.food_id
    where e.place_id is null group by e.user_id, e.new_city
  loop
    insert into public.pins (user_id, kind, title, city, country, iso, lat, lon)
    values (r.user_id, 'yer', r.new_city, r.new_city, r.country, r.iso, r.lat, r.lon) returning id into newid;
    update _m set place_id = newid where user_id = r.user_id and new_city = r.new_city and place_id is null;
  end loop;
  update public.pins f set parent_id = e.place_id from _m e where f.id = e.food_id;
end $$;

select pr.username as kisi, f.title as sofra, coalesce(p.title, '— bağlanmadı') as yer
from public.pins f join public.profiles pr on pr.id = f.user_id left join public.pins p on p.id = f.parent_id
where f.kind = 'yemek' order by pr.username, p.title nulls last, f.title;
