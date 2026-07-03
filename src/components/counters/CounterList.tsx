import { type Counter } from "@/types/counter";
import { Fragment } from "react";
import CounterCard from "./CounterCard";
import CreateCounterButton from "./CreateCounterButton";
import EmptyCounterCard from "./EmptyCounterCard";

interface CounterListProps {
  filteredCounters: Counter[] | undefined;
}

function CounterList({ filteredCounters }: CounterListProps) {
  if (filteredCounters?.length === 0) {
    return (
      <Fragment>
        <p className="text-base-content/70 mb-4">
          You don't have any counters yet. Let's fix that!
        </p>
        <CreateCounterButton filteredCountersLength={0} />
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
        <EmptyCounterCard filteredCountersLength={filteredCounters?.length} />
      </div>
    </Fragment>
  );
}

export default CounterList;
