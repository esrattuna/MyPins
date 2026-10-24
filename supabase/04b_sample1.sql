-- =================================================================
-- MyPins · sample1 only: 15 pins in Latin America + a "Belki bir gün" list
-- For an account added by hand (Supabase → Authentication → Add user,
-- e-mail sample1@…, so the username is sample1). Run in SQL Editor.
-- Safe to run again: only missing pins / list items are added.
-- =================================================================
do $$
declare
  uid uuid := (select id from public.profiles where username = 'sample1');
  esra uuid := (select id from public.profiles where username = 'esra');
begin
  if uid is null then raise exception 'sample1 kullanıcı adlı bir profil bulunamadı.'; end if;

  update public.profiles set visibility = 'public', bio = 'Test hesabı · test account',
         display_name = case when display_name in ('', username::text) then 'Sample 1' else display_name end
   where id = uid;

  insert into public.pins (user_id, kind, title, city, country, iso, lat, lon, note)
  select uid, v.kind, v.title, v.city, v.country, v.iso, v.lat, v.lon, v.note
  from (values
    ('yer',  'Havana Vieja',            'Havana',        'Küba',     'CU',  23.1367, -82.3500, 'Akşamüstü Malecón boyunca yürüyüş.'),
    ('yemek','La Bodeguita del Medio',  'Havana',        'Küba',     'CU',  23.1408, -82.3510, ''),
    ('yer',  'Trinidad',                'Trinidad',      'Küba',     'CU',  21.8019, -79.9847, 'Arnavut kaldırımlı sokaklar, canlı müzik.'),
    ('yer',  'Viñales',                 'Viñales',       'Küba',     'CU',  22.6167, -83.7064, 'Tütün tarlaları, at turu.'),
    ('yer',  'San Telmo',               'Buenos Aires',  'Arjantin', 'AR', -34.6212, -58.3731, 'Pazar günü antika pazarı.'),
    ('yemek','Don Julio',               'Buenos Aires',  'Arjantin', 'AR', -34.5866, -58.4243, 'Parrilla.'),
    ('yer',  'El Chaltén',              'El Chaltén',    'Arjantin', 'AR', -49.3315, -72.8863, 'Laguna de los Tres yürüyüşü.'),
    ('yer',  'Mendoza bağları',         'Mendoza',       'Arjantin', 'AR', -33.0094, -68.8667, ''),
    ('yer',  'Oaxaca',                  'Oaxaca',        'Meksika',  'MX',  17.0732, -96.7266, ''),
    ('yemek','Mercado 20 de Noviembre', 'Oaxaca',        'Meksika',  'MX',  17.0587, -96.7253, 'Tlayuda ve mole.'),
    ('yer',  'Cusco',                   'Cusco',         'Peru',     'PE', -13.5320, -71.9675, ''),
    ('yer',  'Machu Picchu',            'Aguas Calientes','Peru',    'PE', -13.1631, -72.5450, 'İlk otobüsle, gün doğumunda.'),
    ('yer',  'Cartagena eski şehir',    'Cartagena',     'Kolombiya','CO',  10.4236, -75.5478, ''),
    ('yer',  'Santa Teresa',            'Rio de Janeiro','Brezilya', 'BR', -22.9166, -43.1866, 'Tramvayla yokuş yukarı.'),
    ('yer',  'Valparaíso',              'Valparaíso',    'Şili',     'CL', -33.0472, -71.6127, 'Renkli tepeler, funiküler.')
  ) as v(kind, title, city, country, iso, lat, lon, note)
  where not exists (select 1 from public.pins x where x.user_id = uid and x.title = v.title);

  insert into public.wishlist (user_id, title, country, iso, lat, lon)
  select uid, v.title, v.country, v.iso, v.lat, v.lon
  from (values
    ('Salar de Uyuni',   'Bolivya',  'BO', -20.1338, -67.4891),
    ('Torres del Paine', 'Şili',     'CL', -50.9423, -73.4068),
    ('Galápagos',        'Ekvador',  'EC',  -0.9538, -90.9656),
    ('Tulum',            'Meksika',  'MX',  20.2114, -87.4654)
  ) as v(title, country, iso, lat, lon)
  where not exists (select 1 from public.wishlist x where x.user_id = uid and x.title = v.title);

  -- Esra follows sample1 (shows up in your "following" list)
  if esra is not null then
    insert into public.follows (follower_id, following_id) values (esra, uid) on conflict do nothing;
  end if;
end $$;

select username, visibility,
  (select count(*) from public.pins w where w.user_id = p.id) as pins,
  (select count(*) from public.wishlist w where w.user_id = p.id) as belki_bir_gun
from public.profiles p where username = 'sample1';
