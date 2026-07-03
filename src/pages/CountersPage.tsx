import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CounterList from "@/components/counters/CounterList";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase-client";
import type { Counter } from "../types/counter";

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

  if (isPending || !counters) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-error p-4 text-center">
        Something went wrong while loading your counters.
      </div>
    );
  }

  const filteredCounters = counters?.filter((counter) => {
    if (showArchived) return true;
    return !counter.is_archived;
  });

  return (
    <section id="counters" className="bg-base-200 text-center">
      <div className="mx-auto min-h-[70vh] max-w-5xl px-4 md:px-6">
        <h1 className="mb-6 text-3xl font-bold">Your Counters</h1>
        <div className="mb-4 flex justify-end">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setShowArchived((prev) => !prev)}
          >
            {showArchived ? "Hide Archived" : "Show Archived"}
          </button>
        </div>
        <CounterList filteredCounters={filteredCounters} />
      </div>
    </section>
  );
}

export default CountersPage;
