import { type Counter } from "@/types/counter";
import CounterCard from "./CounterCard";
import EmptyCounterCard from "./EmptyCounterCard";

interface CounterListProps {
  filteredCounters: Counter[] | undefined;
}

function CounterList({ filteredCounters }: CounterListProps) {
  if (filteredCounters?.length === 0) {
    return (
      <p className="text-ink-muted">
        No counters yet. Use New counter to start counting.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCounters?.map((counter) => (
        <CounterCard key={counter.id} counter={counter} />
      ))}
      <EmptyCounterCard filteredCountersLength={filteredCounters?.length} />
    </div>
  );
}

export default CounterList;
