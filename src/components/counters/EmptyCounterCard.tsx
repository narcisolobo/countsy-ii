import { useCreateCounter } from "@/hooks/useCreateCounter";

interface EmptyCounterCardProps {
  filteredCountersLength: number | undefined;
}

function EmptyCounterCard({ filteredCountersLength }: EmptyCounterCardProps) {
  const createCounter = useCreateCounter(filteredCountersLength || 0);

  return (
    <div
      className="card bg-base-100 border-base-content/50 hover:border-base-content text-base-content/50 hover:text-base-content min-h-56 cursor-pointer items-center justify-center border-4 border-dashed shadow-md"
      onClick={() => createCounter.mutate()}
    >
      <h3 className="card-title">Add New Counter</h3>
    </div>
  );
}

export default EmptyCounterCard;
