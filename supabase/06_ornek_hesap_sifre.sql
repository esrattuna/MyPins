-- =================================================================
-- MyPins · lets you sign in as sample1 … sample5 in the test build (app-beta)
-- with e-mail + password ("Test hesabı" link next to the Google button).
--
-- BEFORE RUNNING: replace  SIFREYI_BURAYA_YAZ  below with a password you choose
-- (at least 6 characters). The same password is used for all five accounts.
-- Do not save the edited file into the repository (the repository is public).
--
-- Also needed once: Supabase → Authentication → Sign In / Providers → Email = enabled.
-- Safe to run again (sets the password again, adds the e-mail identity only once).
-- Run 04_ornek_hesaplar.sql first.
-- =================================================================
do $$
declare pw text := 'SIFREYI_BURAYA_YAZ';
begin
  if pw = 'SIFREYI_BURAYA_YAZ' or char_length(pw) < 6 then
    raise exception 'Önce dosyadaki SIFREYI_BURAYA_YAZ yerine en az 6 karakterlik bir şifre yaz.';
  end if;
  update auth.users
     set encrypted_password = extensions.crypt(pw, extensions.gen_salt('bf')),
         email_confirmed_at = coalesce(email_confirmed_at, now()), updated_at = now()
   where email like 'sample_@mypins.test';
  -- e-mail sign-in needs an "email" identity for each account
  insert into auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  select u.id::text, u.id, jsonb_build_object('sub', u.id::text, 'email', u.email, 'email_verified', true), 'email', now(), now(), now()
    from auth.users u
   where u.email like 'sample_@mypins.test'
     and not exists (select 1 from auth.identities i where i.user_id = u.id and i.provider = 'email');
end $$;

select u.email, (u.encrypted_password <> '') as sifre_var,
       exists (select 1 from auth.identities i where i.user_id = u.id and i.provider = 'email') as eposta_kimligi
from auth.users u where u.email like 'sample_@mypins.test' order by u.email;
