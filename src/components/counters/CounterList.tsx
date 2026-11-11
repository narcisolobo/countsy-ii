import { type Counter } from "@/types/counter";
import CounterCard from "./CounterCard";
import CreateCounterButton from "./CreateCounterButton";
import EmptyCounterCard from "./EmptyCounterCard";

interface CounterListProps {
  filteredCounters: Counter[] | undefined;
}

function CounterList({ filteredCounters }: CounterListProps) {
  if (filteredCounters?.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="text-ink-muted">
          No counters yet. Create one to start counting.
        </p>
        <CreateCounterButton filteredCountersLength={0} />
      </div>
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
