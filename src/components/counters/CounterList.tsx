import { Fragment } from "react";
import { useCreateCounter } from "@/hooks/useCreateCounter";
import { type Counter } from "@/types/counter";
import CounterCard from "./CounterCard";

interface CounterListProps {
  filteredCounters: Counter[] | undefined;
}

function CounterList({ filteredCounters }: CounterListProps) {
  const createCounter = useCreateCounter(filteredCounters?.length || 0);

  if (filteredCounters?.length === 0) {
    return (
      <Fragment>
        <p className="text-base-content/70 mb-4">
          You don't have any counters yet. Let's fix that!
        </p>
        <button
          className="btn btn-primary"
          onClick={() => createCounter.mutate()}
        >
          + Create Counter
        </button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {filteredCounters &&
          filteredCounters.map((counter) => (
            <CounterCard key={counter.id} counter={counter} />
          ))}
      </div>
      <button
        className="btn btn-primary fixed right-6 bottom-6 rounded-full"
        onClick={() => createCounter.mutate()}
      >
        +
      </button>
    </Fragment>
  );
}

export default CounterList;
