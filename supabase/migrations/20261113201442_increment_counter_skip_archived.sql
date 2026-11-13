-- Archived counters are read-only: plus/minus must not change them.
-- Same function as 20261113192919_increment_counter, plus `not is_archived`.
-- Returns null for an archived counter, like a missing one.

create or replace function public.increment_counter(counter_id uuid, delta integer)
returns integer
language sql
security invoker
set search_path = ''
as $$
  update public.counters
  set value = value + delta
  where id = counter_id
    and not is_archived
  returning value;
$$;

-- create or replace keeps the existing grants (authenticated only).
