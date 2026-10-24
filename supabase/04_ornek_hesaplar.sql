-- =================================================================
-- MyPins · 5 test account: sample1 … sample5
-- Run once in Supabase → SQL Editor. Running it again does nothing new.
-- Remove everything with 05_ornek_hesaplari_sil.sql.
--
-- These accounts are for LOOKING at (profiles, pins, "Belki bir gün" lists,
-- follow states). They have no Google login and no password, so nobody can
-- sign in as them. E-mails use the reserved .test domain (never delivered).
--
--   sample1  public   · 4 pins (Portugal, Spain)      · Esra follows them
--   sample2  public   · 4 pins (Italy, Greece)        · Esra follows them
--   sample3  public   · 3 pins (France, Morocco)      · follows Esra
--   sample4  private  · 3 pins (Croatia, Montenegro)  · sample1's request pending
--   sample5  ghost    · 3 pins (Turkey)               · visible only to itself
-- Each has 2–3 places on its "Belki bir gün" list.
-- =================================================================
do $$
declare
  u record;
  uid uuid;
  esra uuid := (select id from public.profiles where username = 'esra');
begin
  for u in select * from (values
    (1, 'public'), (2, 'public'), (3, 'public'), (4, 'private'), (5, 'ghost')) as t(n, vis)
  loop
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

    if u.n = 1 then
      insert into public.pins (user_id, kind, title, city, country, iso, lat, lon, note) values
        (uid, 'yer',   'Sintra',            'Sintra',   'Portekiz', 'PT', 38.7979, -9.3878, 'Pena Sarayı sabah erken.'),
        (uid, 'yemek', 'Time Out Market',   'Lizbon',   'Portekiz', 'PT', 38.7071, -9.1458, ''),
        (uid, 'yer',   'Ronda',             'Ronda',    'İspanya',  'ES', 36.7423, -5.1666, 'Köprüden gün batımı.'),
        (uid, 'yemek', 'Bodega La Ardosa',  'Madrid',   'İspanya',  'ES', 40.4268, -3.7013, '');
      insert into public.wishlist (user_id, title, country, iso, lat, lon) values
        (uid, 'Azorlar', 'Portekiz', 'PT', 37.7412, -25.6756), (uid, 'Granada', 'İspanya', 'ES', 37.1773, -3.5986);
    elsif u.n = 2 then
      insert into public.pins (user_id, kind, title, city, country, iso, lat, lon, note) values
        (uid, 'yer',   'Matera',            'Matera',   'İtalya',     'IT', 40.6664, 16.6043, 'Sassi mahallesi.'),
        (uid, 'yemek', 'Pizzeria Starita',  'Napoli',   'İtalya',     'IT', 40.8576, 14.2490, ''),
        (uid, 'yer',   'Naxos',             'Naxos',    'Yunanistan', 'GR', 37.1036, 25.3766, ''),
        (uid, 'yer',   'Meteora',           'Kalabaka', 'Yunanistan', 'GR', 39.7217, 21.6306, '');
      insert into public.wishlist (user_id, title, country, iso, lat, lon) values
        (uid, 'Sicilya', 'İtalya', 'IT', 37.6000, 14.0154), (uid, 'Girit', 'Yunanistan', 'GR', 35.2401, 24.8093), (uid, 'Dolomitler', 'İtalya', 'IT', 46.4102, 11.8440);
    elsif u.n = 3 then
      insert into public.pins (user_id, kind, title, city, country, iso, lat, lon, note) values
        (uid, 'yer',   'Gordes',            'Gordes',   'Fransa', 'FR', 43.9116, 5.2004, 'Lavanta mevsimi.'),
        (uid, 'yemek', 'Café Clock',        'Fes',      'Fas',    'MA', 34.0617, -4.9739, ''),
        (uid, 'yer',   'Chefchaouen',       'Chefchaouen', 'Fas', 'MA', 35.1688, -5.2636, '');
      insert into public.wishlist (user_id, title, country, iso, lat, lon) values
        (uid, 'Korsika', 'Fransa', 'FR', 42.0396, 9.0129), (uid, 'Essaouira', 'Fas', 'MA', 31.5085, -9.7595);
    elsif u.n = 4 then
      insert into public.pins (user_id, kind, title, city, country, iso, lat, lon, note) values
        (uid, 'yer',   'Hvar',              'Hvar',     'Hırvatistan', 'HR', 43.1729, 16.4411, ''),
        (uid, 'yer',   'Kotor',             'Kotor',    'Karadağ',     'ME', 42.4247, 18.7712, 'Kaleye çıkış.'),
        (uid, 'yemek', 'Konoba Dalmatino',  'Split',    'Hırvatistan', 'HR', 43.5081, 16.4402, '');
      insert into public.wishlist (user_id, title, country, iso, lat, lon) values
        (uid, 'Mostar', 'Bosna-Hersek', 'BA', 43.3438, 17.8078), (uid, 'Ohrid', 'Kuzey Makedonya', 'MK', 41.1231, 20.8016);
    else
      insert into public.pins (user_id, kind, title, city, country, iso, lat, lon, note) values
        (uid, 'yer',   'Kaş',               'Kaş',      'Türkiye', 'TR', 36.2018, 29.6377, ''),
        (uid, 'yemek', 'Çiya Sofrası',      'İstanbul', 'Türkiye', 'TR', 40.9905, 29.0263, ''),
        (uid, 'yer',   'Mardin',            'Mardin',   'Türkiye', 'TR', 37.3122, 40.7351, '');
      insert into public.wishlist (user_id, title, country, iso, lat, lon) values
        (uid, 'Kapadokya', 'Türkiye', 'TR', 38.6431, 34.8289), (uid, 'Ayder', 'Türkiye', 'TR', 40.9522, 41.1036);
    end if;
  end loop;

  -- follow links (status is set by the existing trigger: public = accepted, private = pending)
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
