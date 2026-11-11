import { useCreateCounter } from "@/hooks/useCreateCounter";

interface EmptyCounterCardProps {
  filteredCountersLength: number | undefined;
}

function EmptyCounterCard({ filteredCountersLength }: EmptyCounterCardProps) {
  const createCounter = useCreateCounter(filteredCountersLength || 0);

  return (
    <div
      className="bg-surface border-line text-ink-muted hover:border-ink hover:text-ink flex min-h-56 cursor-pointer items-center justify-center rounded-lg border-4 border-dashed"
      onClick={() => createCounter.mutate()}
    >
      <h3 className="text-lg font-semibold">Add New Counter</h3>
    </div>
  );
}

export default EmptyCounterCard;
