-- Atomic plus/minus for a counter.
--
-- The app sends a change ("+1", or "+3" when quick taps are combined) instead
-- of a new total, so requests that arrive out of order, or from two devices at
-- once, can never overwrite each other's counts.
--
-- security invoker: runs as the signed-in user, so the counters RLS policies
-- and the column-level UPDATE grant on `value` still decide what it may touch.
-- Returns the new value, or null when the row doesn't exist or isn't the
-- caller's (RLS hides it, so the update matches nothing).

create function public.increment_counter(counter_id uuid, delta integer)
returns integer
language sql
security invoker
set search_path = ''
as $$
  update public.counters
  set value = value + delta
  where id = counter_id
  returning value;
$$;

comment on function public.increment_counter(uuid, integer) is
  'Adds delta to one of the caller''s counters and returns the new value; null if not found.';

-- New functions are executable by everyone; only signed-in users need this.
revoke execute on function public.increment_counter(uuid, integer) from public, anon;
grant execute on function public.increment_counter(uuid, integer) to authenticated;
