-- =================================================================
-- MyPins · 5 test accounts (sample1 … sample5) with pins around the world
-- Run in Supabase → SQL Editor. Safe to run again: existing accounts, pins
-- and list items are kept, only missing ones are added (so running this after
-- the earlier, smaller version just adds the new pins).
-- Remove everything with 05_ornek_hesaplari_sil.sql.
--
-- For LOOKING at only: no Google login and no password, nobody can sign in as
-- them. E-mails use the reserved .test domain (never delivered).
--
--   sample1  public   · Latin America + Iberia     · Esra follows them
--   sample2  public   · Asia + Italy/Greece        · Esra follows them
--   sample3  public   · Africa, Middle East, France · follows Esra
--   sample4  private  · Nordics + Balkans          · sample1's request pending
--   sample5  ghost    · Turkey + Caucasus          · visible only to itself
-- =================================================================
do $$
declare
  u record;
  uid uuid;
  esra uuid := (select id from public.profiles where username = 'esra');
begin
  -- 1) accounts
  for u in select * from (values (1, 'public'), (2, 'public'), (3, 'public'), (4, 'private'), (5, 'ghost')) as t(n, vis) loop
    if exists (select 1 from auth.users where email = 'sample' || u.n || '@mypins.test') then continue; end if;
    uid := gen_random_uuid();
    insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
                            raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
                            confirmation_token, recovery_token, email_change_token_new, email_change)
    values ('00000000-0000-0000-0000-000000000000', uid, 'authenticated', 'authenticated',
            'sample' || u.n || '@mypins.test', '', now(),
            '{"provider":"email","providers":["email"]}', jsonb_build_object('full_name', 'Sample ' || u.n),
            now(), now(), '', '', '', '');
    -- the profile is created by the existing trigger (username = sample<n>)
    update public.profiles set visibility = u.vis, bio = 'Test hesabı · test account' where id = uid;
  end loop;

  -- 2) pins (added only if that account doesn't already have a pin with the same title)
  insert into public.pins (user_id, kind, title, city, country, iso, lat, lon, note)
  select p.id, v.kind, v.title, v.city, v.country, v.iso, v.lat, v.lon, v.note
  from (values
    -- sample1 · Latin America + Iberia
    ('sample1','yer',  'Sintra',                  'Sintra',          'Portekiz',  'PT', 38.7979,  -9.3878, 'Pena Sarayı sabah erken.'),
    ('sample1','yemek','Time Out Market',         'Lizbon',          'Portekiz',  'PT', 38.7071,  -9.1458, ''),
    ('sample1','yer',  'Ronda',                   'Ronda',           'İspanya',   'ES', 36.7423,  -5.1666, 'Köprüden gün batımı.'),
    ('sample1','yemek','Bodega La Ardosa',        'Madrid',          'İspanya',   'ES', 40.4268,  -3.7013, ''),
    ('sample1','yer',  'Havana Vieja',            'Havana',          'Küba',      'CU', 23.1367, -82.3500, 'Akşamüstü Malecón boyunca yürüyüş.'),
    ('sample1','yer',  'Trinidad',                'Trinidad',        'Küba',      'CU', 21.8019, -79.9847, 'Arnavut kaldırımlı sokaklar, canlı müzik.'),
    ('sample1','yemek','La Bodeguita del Medio',  'Havana',          'Küba',      'CU', 23.1408, -82.3510, ''),
    ('sample1','yer',  'Viñales',                 'Viñales',         'Küba',      'CU', 22.6167, -83.7064, 'Tütün tarlaları, at turu.'),
    ('sample1','yer',  'San Telmo',               'Buenos Aires',    'Arjantin',  'AR',-34.6212, -58.3731, 'Pazar günü antika pazarı.'),
    ('sample1','yemek','Don Julio',               'Buenos Aires',    'Arjantin',  'AR',-34.5866, -58.4243, 'Parrilla.'),
    ('sample1','yer',  'El Chaltén',              'El Chaltén',      'Arjantin',  'AR',-49.3315, -72.8863, 'Laguna de los Tres yürüyüşü.'),
    ('sample1','yer',  'Mendoza bağları',         'Mendoza',         'Arjantin',  'AR',-33.0094, -68.8667, ''),
    ('sample1','yer',  'Oaxaca',                  'Oaxaca',          'Meksika',   'MX', 17.0732, -96.7266, ''),
    ('sample1','yemek','Mercado 20 de Noviembre', 'Oaxaca',          'Meksika',   'MX', 17.0587, -96.7253, 'Tlayuda ve mole.'),
    ('sample1','yer',  'Cusco',                   'Cusco',           'Peru',      'PE',-13.5320, -71.9675, ''),
    -- sample2 · Asia + Italy/Greece
    ('sample2','yer',  'Matera',                  'Matera',          'İtalya',    'IT', 40.6664,  16.6043, 'Sassi mahallesi.'),
    ('sample2','yemek','Pizzeria Starita',        'Napoli',          'İtalya',    'IT', 40.8576,  14.2490, ''),
    ('sample2','yer',  'Naxos',                   'Naxos',           'Yunanistan','GR', 37.1036,  25.3766, ''),
    ('sample2','yer',  'Meteora',                 'Kalabaka',        'Yunanistan','GR', 39.7217,  21.6306, ''),
    ('sample2','yer',  'Fushimi Inari',           'Kyoto',           'Japonya',   'JP', 34.9671, 135.7727, 'Sabah 7''de neredeyse boş.'),
    ('sample2','yemek','Nishiki Pazarı',          'Kyoto',           'Japonya',   'JP', 35.0050, 135.7649, ''),
    ('sample2','yer',  'Nara Parkı',              'Nara',            'Japonya',   'JP', 34.6851, 135.8430, ''),
    ('sample2','yemek','Ichiran Shibuya',         'Tokyo',           'Japonya',   'JP', 35.6614, 139.7010, 'Gece yarısı ramen.'),
    ('sample2','yer',  'Shimokitazawa',           'Tokyo',           'Japonya',   'JP', 35.6618, 139.6680, 'İkinci el dükkânlar.'),
    ('sample2','yer',  'El Nido',                 'El Nido',         'Filipinler','PH', 11.1956, 119.4075, 'Ada turu C.'),
    ('sample2','yer',  'Siargao',                 'General Luna',    'Filipinler','PH',  9.7893, 126.1600, 'Sörf, Cloud 9.'),
    ('sample2','yer',  'Bohol',                   'Carmen',          'Filipinler','PH',  9.8297, 124.1397, 'Çikolata tepeleri.'),
    ('sample2','yer',  'Hoi An',                  'Hoi An',          'Vietnam',   'VN', 15.8801, 108.3380, ''),
    ('sample2','yemek','Khao Soi Mae Sai',        'Chiang Mai',      'Tayland',   'TH', 18.8061,  98.9775, ''),
    ('sample2','yer',  'Ubud',                    'Ubud',            'Endonezya', 'ID', -8.5069, 115.2625, ''),
    -- sample3 · Africa, Middle East, France
    ('sample3','yer',  'Gordes',                  'Gordes',          'Fransa',    'FR', 43.9116,   5.2004, 'Lavanta mevsimi.'),
    ('sample3','yemek','Café Clock',              'Fes',             'Fas',       'MA', 34.0617,  -4.9739, ''),
    ('sample3','yer',  'Chefchaouen',             'Chefchaouen',     'Fas',       'MA', 35.1688,  -5.2636, ''),
    ('sample3','yer',  'Petra',                   'Wadi Musa',       'Ürdün',     'JO', 30.3285,  35.4444, 'Manastıra kadar tırman.'),
    ('sample3','yer',  'Wadi Rum',                'Wadi Rum',        'Ürdün',     'JO', 29.5321,  35.4206, 'Çölde bir gece.'),
    ('sample3','yer',  'Siwa',                    'Siwa',            'Mısır',     'EG', 29.2032,  25.5195, ''),
    ('sample3','yer',  'Stone Town',              'Zanzibar',        'Tanzanya',  'TZ', -6.1622,  39.1921, ''),
    ('sample3','yemek','Forodhani Gece Pazarı',   'Zanzibar',        'Tanzanya',  'TZ', -6.1590,  39.1878, ''),
    ('sample3','yer',  'Bo-Kaap',                 'Cape Town',       'Güney Afrika','ZA',-33.9206, 18.4148, ''),
    ('sample3','yer',  'Chapman''s Peak',         'Cape Town',       'Güney Afrika','ZA',-34.0889, 18.3606, 'Arabayla gün batımı.'),
    ('sample3','yer',  'Lalibela',                'Lalibela',        'Etiyopya',  'ET', 12.0317,  39.0473, ''),
    -- sample4 · Nordics + Balkans
    ('sample4','yer',  'Hvar',                    'Hvar',            'Hırvatistan','HR', 43.1729, 16.4411, ''),
    ('sample4','yer',  'Kotor',                   'Kotor',           'Karadağ',   'ME', 42.4247,  18.7712, 'Kaleye çıkış.'),
    ('sample4','yemek','Konoba Dalmatino',        'Split',           'Hırvatistan','HR', 43.5081, 16.4402, ''),
    ('sample4','yer',  'Lofoten',                 'Reine',           'Norveç',    'NO', 67.9324,  13.0886, ''),
    ('sample4','yer',  'Vík',                     'Vík',             'İzlanda',   'IS', 63.4186, -19.0060, 'Siyah kumsal.'),
    ('sample4','yemek','Bæjarins Beztu Pylsur',   'Reykjavik',       'İzlanda',   'IS', 64.1484, -21.9389, ''),
    ('sample4','yer',  'Tallinn eski şehir',      'Tallinn',         'Estonya',   'EE', 59.4372,  24.7453, ''),
    ('sample4','yer',  'Berat',                   'Berat',           'Arnavutluk','AL', 40.7058,  19.9522, ''),
    -- sample5 · Turkey + Caucasus
    ('sample5','yer',  'Kaş',                     'Kaş',             'Türkiye',   'TR', 36.2018,  29.6377, ''),
    ('sample5','yemek','Çiya Sofrası',            'İstanbul',        'Türkiye',   'TR', 40.9905,  29.0263, ''),
    ('sample5','yer',  'Mardin',                  'Mardin',          'Türkiye',   'TR', 37.3122,  40.7351, ''),
    ('sample5','yer',  'Kazbegi',                 'Stepantsminda',   'Gürcistan', 'GE', 42.6619,  44.6433, 'Gergeti Kilisesi.'),
    ('sample5','yemek','Barbarestan',             'Tiflis',          'Gürcistan', 'GE', 41.7099,  44.8013, ''),
    ('sample5','yer',  'Sevan Gölü',              'Sevan',           'Ermenistan','AM', 40.5631,  45.0141, '')
  ) as v(username, kind, title, city, country, iso, lat, lon, note)
  join public.profiles p on p.username = v.username
  where not exists (select 1 from public.pins x where x.user_id = p.id and x.title = v.title);

  -- 3) "Belki bir gün" lists
  insert into public.wishlist (user_id, title, country, iso, lat, lon)
  select p.id, v.title, v.country, v.iso, v.lat, v.lon
  from (values
    ('sample1','Azorlar',       'Portekiz',       'PT', 37.7412, -25.6756),
    ('sample1','Granada',       'İspanya',        'ES', 37.1773,  -3.5986),
    ('sample1','Salar de Uyuni','Bolivya',        'BO',-20.1338, -67.4891),
    ('sample1','Patagonya',     'Şili',           'CL',-50.9423, -73.4068),
    ('sample2','Sicilya',       'İtalya',         'IT', 37.6000,  14.0154),
    ('sample2','Girit',         'Yunanistan',     'GR', 35.2401,  24.8093),
    ('sample2','Dolomitler',    'İtalya',         'IT', 46.4102,  11.8440),
    ('sample2','Hokkaido',      'Japonya',        'JP', 43.0642, 141.3469),
    ('sample2','Palawan',       'Filipinler',     'PH',  9.8349, 118.7384),
    ('sample3','Korsika',       'Fransa',         'FR', 42.0396,   9.0129),
    ('sample3','Essaouira',     'Fas',            'MA', 31.5085,  -9.7595),
    ('sample3','Namib Çölü',    'Namibya',        'NA',-24.7333,  15.3333),
    ('sample4','Mostar',        'Bosna-Hersek',   'BA', 43.3438,  17.8078),
    ('sample4','Ohrid',         'Kuzey Makedonya','MK', 41.1231,  20.8016),
    ('sample4','Faroe Adaları', 'Danimarka',      'FO', 62.0079,  -6.7900),
    ('sample5','Kapadokya',     'Türkiye',        'TR', 38.6431,  34.8289),
    ('sample5','Ayder',         'Türkiye',        'TR', 40.9522,  41.1036),
    ('sample5','Svaneti',       'Gürcistan',      'GE', 43.0006,  42.7350)
  ) as v(username, title, country, iso, lat, lon)
  join public.profiles p on p.username = v.username
  where not exists (select 1 from public.wishlist x where x.user_id = p.id and x.title = v.title);

  -- 4) follow links (status set by the existing trigger: public = accepted, private = pending)
  if esra is not null then
    insert into public.follows (follower_id, following_id)
      select esra, p.id from public.profiles p where p.username in ('sample1', 'sample2')
      on conflict do nothing;
    insert into public.follows (follower_id, following_id)
      select p.id, esra from public.profiles p, public.profiles e
      where p.username = 'sample3' and e.id = esra and e.visibility <> 'ghost'
      on conflict do nothing;
  end if;
  insert into public.follows (follower_id, following_id)
    select a.id, b.id from public.profiles a, public.profiles b where a.username = 'sample1' and b.username = 'sample4'
    on conflict do nothing;
end $$;

select username, visibility,
  (select count(*) from public.pins w where w.user_id = p.id) as pins,
  (select count(*) from public.wishlist w where w.user_id = p.id) as belki_bir_gun
from public.profiles p where username like 'sample%' order by username;
