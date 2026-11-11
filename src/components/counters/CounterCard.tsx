import { useUpdateCounterValue } from "@/hooks/useUpdateCounterValue";
import type { Counter } from "@/types/counter";
import ArchiveCounter from "./ArchiveCounter";
import ArchiveModal from "./ArchiveModal";
import CounterControls from "./CounterControls";
import DrumRegister from "./DrumRegister";
import EditButton from "./EditButton";
import GoalColumn from "./GoalColumn";
import InlineTitleEdit from "./InlineTitleEdit";

interface CounterCardProps {
  counter: Counter;
}

function CounterCard({ counter }: CounterCardProps) {
  const updateCounterValue = useUpdateCounterValue(counter.id);
  const value = counter.value ?? 0;
  const goal = counter.goal !== null && counter.goal > 0 ? counter.goal : null;
  const reached = goal !== null && value >= goal;

  return (
    <article className="bg-surface border-line flex rounded-sm border">
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-1 pt-1 pr-1 pl-4">
          <InlineTitleEdit counter={counter} initialTitle={counter.title} />
          <EditButton id={counter.id} />
          <ArchiveCounter counter={counter} />
        </div>

        <div className="px-4 pt-2 pb-4">
          <DrumRegister value={value} label={counter.title} />
          {updateCounterValue.isError && (
            <p role="alert" className="text-fail mt-2 font-semibold">
              Not saved. The count was put back.
            </p>
          )}
          <p className="font-label text-ink-muted mt-2 h-6 text-lg tracking-wider uppercase">
            {goal !== null && (
              <>
                of {goal}
                {reached && <span className="font-semibold"> · reached</span>}
              </>
            )}
            {counter.is_archived && (
              <span className={`font-semibold ${goal !== null ? "ml-3" : ""}`}>
                Archived
              </span>
            )}
          </p>
          <CounterControls
            onDecrement={() => updateCounterValue.mutate(value - 1)}
            onIncrement={() => updateCounterValue.mutate(value + 1)}
          />
        </div>
      </div>
      {goal !== null && (
        <div className="py-4 pr-4">
          <GoalColumn value={value} goal={goal} />
        </div>
      )}
      <ArchiveModal counter={counter} />
    </article>
  );
}

export default CounterCard;
