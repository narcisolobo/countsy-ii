-- Countsy baseline: one table of per-user counters.
--
-- A counter must be archived before it can be deleted; the delete policy
-- enforces that, so the UI's two-step flow is backed by the database.

create table public.counters (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null default auth.uid()
                          references auth.users (id) on delete cascade,
  title       text        not null
                          check (char_length(btrim(title)) between 1 and 24),
  description text        check (char_length(btrim(description)) between 1 and 100),
  value       integer     not null default 0,
  goal        integer     check (goal > 0),
  is_archived boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.counters is 'Countsy counters, one row per named tally.';
comment on column public.counters.title is 'Short name shown large on the card; 24 characters max.';
comment on column public.counters.description is 'Optional detail under the title; null when empty, never an empty string.';
comment on column public.counters.goal is 'Optional target; null means no goal.';

-- Serves the RLS predicate, the FK cascade and the list query
-- (where user_id = ? order by created_at).
create index counters_user_id_created_at_idx
  on public.counters (user_id, created_at);

-- updated_at --------------------------------------------------------------

create function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- Trigger-only; nobody should call it through the API.
revoke execute on function public.set_updated_at() from public, anon, authenticated;

create trigger counters_set_updated_at
  before update on public.counters
  for each row
  execute function public.set_updated_at();

-- Access ------------------------------------------------------------------

alter table public.counters enable row level security;

-- Supabase grants everything on new public tables to anon and authenticated.
-- Signed-out visitors get nothing; signed-in users get only what the app uses.
revoke all on table public.counters from anon, authenticated;
grant select, insert, delete on table public.counters to authenticated;
-- Column-level so id, user_id and created_at can never be rewritten.
grant update (title, description, value, goal, is_archived) on table public.counters to authenticated;

create policy "Users can read their own counters"
  on public.counters for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own counters"
  on public.counters for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own counters"
  on public.counters for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own archived counters"
  on public.counters for delete
  to authenticated
  using ((select auth.uid()) = user_id and is_archived);
