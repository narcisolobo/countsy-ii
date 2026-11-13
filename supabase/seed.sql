-- Local-only seed data, loaded by `supabase db reset`.
-- Sign in locally with a magic link to demo@countsy.test; the email shows up
-- in the local mail inbox printed by `supabase status`.

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_app_meta_data, raw_user_meta_data,
  confirmation_token, recovery_token, email_change_token_new, email_change
) values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-4111-8111-111111111111',
  'authenticated', 'authenticated', 'demo@countsy.test', '',
  now(), now(), now(),
  '{"provider": "email", "providers": ["email"]}', '{}',
  '', '', '', ''
);

insert into auth.identities (
  id, user_id, provider_id, provider, identity_data,
  last_sign_in_at, created_at, updated_at
) values (
  gen_random_uuid(),
  '11111111-1111-4111-8111-111111111111',
  '11111111-1111-4111-8111-111111111111',
  'email',
  '{"sub": "11111111-1111-4111-8111-111111111111", "email": "demo@countsy.test", "email_verified": true}',
  now(), now(), now()
);

-- Covers the card states: goal in progress, goal reached, past goal,
-- no goal, negative value, and archived; with and without a description,
-- and one title and one description at their maximum lengths (24 / 100).
insert into public.counters (user_id, title, description, value, goal, is_archived, created_at) values
  ('11111111-1111-4111-8111-111111111111', 'Glasses of water',         null,                                                    5,   8,    false, now() - interval '6 days'),
  ('11111111-1111-4111-8111-111111111111', 'Brita refills left',       'Office kitchen pitcher, the one with the dead indicator light', 3,   null, false, now() - interval '5 days'),
  ('11111111-1111-4111-8111-111111111111', 'Chapters finished',        'The Count of Monte Cristo, unabridged',                 12,  12,   false, now() - interval '4 days'),
  ('11111111-1111-4111-8111-111111111111', 'Push-ups',                 null,                                                    130, 100,  false, now() - interval '3 days'),
  ('11111111-1111-4111-8111-111111111111', 'Stockroom boxes, shelf B', 'Boxes left in the back stockroom after Friday''s delivery; count again Monday before the early shift.', -2, null, false, now() - interval '2 days'),
  ('11111111-1111-4111-8111-111111111111', 'Old plant waterings',      null,                                                    41,  null, true,  now() - interval '1 day');
