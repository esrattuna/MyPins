-- =================================================================
-- MyPins · short bio on the profile card (like an Instagram bio)
-- Adds profiles.tagline (Turkish) and profiles.tagline_en (English).
-- The app limits it to 150 characters; the database allows a little more
-- because a translation can come out longer. Visibility and editing rules are
-- the existing ones for profiles (everyone who can see the profile sees it;
-- only the owner edits it). Safe to run again; changes no existing data.
-- =================================================================
alter table public.profiles add column if not exists tagline    text not null default '';
alter table public.profiles add column if not exists tagline_en text not null default '';
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_tagline_len') then
    alter table public.profiles add constraint profiles_tagline_len check (char_length(tagline) <= 300 and char_length(tagline_en) <= 300);
  end if;
end $$;
