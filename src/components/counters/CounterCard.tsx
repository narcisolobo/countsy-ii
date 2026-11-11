import { useState } from "react";
import { useUpdateCounterValue } from "@/hooks/useUpdateCounterValue";
import type { Counter } from "@/types/counter";
import ArchiveCounter from "./ArchiveCounter";
import ArchiveModal from "./ArchiveModal";
import CounterControls from "./CounterControls";
import DrumRegister from "./DrumRegister";
import EditButton from "./EditButton";
import FlowIndicator from "./FlowIndicator";
import InlineTitleEdit from "./InlineTitleEdit";

interface CounterCardProps {
  counter: Counter;
}

function CounterCard({ counter }: CounterCardProps) {
  const updateCounterValue = useUpdateCounterValue(counter.id);
  const value = counter.value ?? 0;
  const hasGoal = counter.goal !== null && counter.goal > 0;
  const reached = hasGoal && value >= (counter.goal ?? 0);

  // Spin the flow indicator once, only on the change that reaches the goal.
  const [prevReached, setPrevReached] = useState(reached);
  const [spinKey, setSpinKey] = useState(0);
  if (reached !== prevReached) {
    setPrevReached(reached);
    if (reached) setSpinKey((k) => k + 1);
  }

  return (
    <article className="bg-surface border-line rounded-sm border">
      <div className="flex items-start gap-1 pt-1 pr-1 pl-4">
        <InlineTitleEdit counter={counter} initialTitle={counter.title} />
        <EditButton id={counter.id} />
        <ArchiveCounter counter={counter} />
      </div>

      <div className="px-4 pt-2 pb-4">
        <div className="flex items-end justify-between gap-3">
          <DrumRegister value={value} label={counter.title} />
          {hasGoal && (
            <FlowIndicator
              key={spinKey}
              reached={reached}
              spinning={spinKey > 0}
            />
          )}
        </div>
        <p className="font-label text-ink-muted mt-2 h-6 text-lg tracking-wider uppercase">
          {hasGoal && <>of {counter.goal}</>}
          {counter.is_archived && (
            <span className={`font-semibold ${hasGoal ? "ml-3" : ""}`}>
              Archived
            </span>
          )}
        </p>
        <CounterControls
          id={counter.id}
          onDecrement={() => updateCounterValue.mutate(value - 1)}
          onIncrement={() => updateCounterValue.mutate(value + 1)}
        />
      </div>
      <ArchiveModal counter={counter} />
    </article>
  );
}

export default CounterCard;
