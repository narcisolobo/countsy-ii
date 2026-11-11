import { Minus, Plus } from "lucide-react";
import { useUpdateCounterValue } from "@/hooks/useUpdateCounterValue";

interface CounterControlsProps {
  id: string;
  value: number;
  onDecrement: (value: number) => void;
  onIncrement: (value: number) => void;
}

function CounterControls({
  id,
  value,
  onDecrement,
  onIncrement,
}: CounterControlsProps) {
  const updateCounterValue = useUpdateCounterValue(id);

  return (
    <div className="mt-4 flex justify-center gap-4">
      <button
        className="ui-btn-icon"
        aria-label="Decrement"
        title="Decrement"
        onClick={() => onDecrement(value)}
        disabled={updateCounterValue.isPending}
      >
        <Minus />
      </button>
      <button
        className="ui-btn-icon"
        aria-label="Increment"
        title="Increment"
        onClick={() => onIncrement(value)}
        disabled={updateCounterValue.isPending}
      >
        <Plus />
      </button>
    </div>
  );
}

export default CounterControls;
