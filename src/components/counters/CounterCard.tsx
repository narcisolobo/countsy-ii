import type { Counter } from "@/types/counter";
import ArchiveModal from "./ArchiveModal";
import EditButton from "./EditButton";
import ArchiveCounter from "./ArchiveCounter";
import CounterControls from "./CounterControls";
import { useUpdateCounterValue } from "@/hooks/useUpdateCounterValue";
import InlineTitleEdit from "./InlineTitleEdit";

interface CounterCardProps {
  counter: Counter;
}

function CounterCard({ counter }: CounterCardProps) {
  const updateCounterValue = useUpdateCounterValue(counter.id);

  return (
    <div className="card bg-base-100 border-base-200 border shadow-md">
      {/* card header */}
      <InlineTitleEdit counter={counter} initialTitle={counter.title} />

      <div className="flex gap-2">
        <div className="border-base-content/10 flex-2 border-r p-4">
          {/* counter value */}
          <p className="text-base-content/70">
            <span className="text-8xl">{counter.value}</span>
          </p>
          {/* decrement/increment buttons */}
          <CounterControls
            id={counter.id}
            value={(counter.value ?? 0) - 1}
            onDecrement={() =>
              updateCounterValue.mutate((counter.value ?? 0) - 1)
            }
            onIncrement={() =>
              updateCounterValue.mutate((counter.value ?? 0) + 1)
            }
          />
        </div>
        <div className="flex h-full flex-1 flex-col justify-center p-4">
          <p className="text-base-content/70">
            Goal: {counter.goal !== null ? counter.goal : `n/a`}
          </p>
          <EditButton id={counter.id} />
          <ArchiveCounter counter={counter} />
        </div>
      </div>
      <ArchiveModal counter={counter} />
    </div>
  );
}

export default CounterCard;
