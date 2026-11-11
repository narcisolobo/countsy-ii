import { Plus } from "lucide-react";
import { useCreateCounter } from "@/hooks/useCreateCounter";

interface EmptyCounterCardProps {
  filteredCountersLength: number | undefined;
}

function EmptyCounterCard({ filteredCountersLength }: EmptyCounterCardProps) {
  const createCounter = useCreateCounter(filteredCountersLength || 0);

  return (
    <button
      type="button"
      className="border-ink-muted text-ink-muted hover:border-ink hover:text-ink font-label focus-visible:outline-accent flex min-h-56 cursor-pointer items-center justify-center gap-2 rounded-sm border-2 border-dashed text-xl font-semibold tracking-wider uppercase focus-visible:outline-3 focus-visible:outline-offset-2"
      onClick={() => createCounter.mutate()}
    >
      <Plus /> New counter
    </button>
  );
}

export default EmptyCounterCard;
