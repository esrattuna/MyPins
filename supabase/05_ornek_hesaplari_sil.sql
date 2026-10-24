-- MyPins · removes the sample1 … sample5 test accounts and everything they own
-- (profiles, pins, "Belki bir gün" lists and follow links go with the account).
delete from auth.users where email like 'sample_@mypins.test';
select count(*) as kalan_ornek_hesap from public.profiles where username like 'sample%';
