-- =================================================================
-- MyPins · lets a signed-in person delete their own account
-- (Settings → "Hesabımı sil"). Run once in Supabase → SQL Editor.
-- Deleting the account removes the profile, pins, "Belki bir gün" list and
-- follow links with it (existing ON DELETE CASCADE). Photos are removed by
-- the app through the Storage API just before this is called.
-- Only the person themselves can delete their account; nobody else's.
-- =================================================================
create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = public, auth as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'Giriş yapılmamış'; end if;
  delete from auth.users where id = me;
end $$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- the app calls this first, so photos are only removed when deletion is set up
create or replace function public.can_delete_account()
returns boolean language sql stable security definer set search_path = public as $$ select auth.uid() is not null $$;
revoke all on function public.can_delete_account() from public, anon;
grant execute on function public.can_delete_account() to authenticated;
