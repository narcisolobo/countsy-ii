import CounterList from "@/components/counters/CounterList";
import CreateCounterButton from "@/components/counters/CreateCounterButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase-client";
import type { Counter } from "@/types/counter";

function CountersPage() {
  const [showArchived, setShowArchived] = useState(false);
  const { user, isLoading } = useAuth();

  const {
    data: counters,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["counters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("counters")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;

      return data as Counter[];
    },

    enabled: !!user && !isLoading,
  });

  if (isError) {
    return (
      <div role="alert" className="text-fail p-4 text-center font-semibold">
        Something went wrong while loading your counters.
      </div>
    );
  }

  if (isPending || !counters) {
    return <LoadingSpinner />;
  }

  const filteredCounters = counters.filter((counter) => {
    if (showArchived) return true;
    return !counter.is_archived;
  });

  return (
    <section id="counters" className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-label text-3xl font-bold tracking-wider uppercase">
          Counters
        </h1>
        <div className="flex gap-3">
          <button
            className="ui-btn"
            onClick={() => setShowArchived((prev) => !prev)}
          >
            {showArchived ? "Hide archived" : "Show archived"}
          </button>
          <CreateCounterButton
            filteredCountersLength={filteredCounters.length}
          />
        </div>
      </div>
      <CounterList filteredCounters={filteredCounters} />
    </section>
  );
}

export default CountersPage;
