import { Minus, Plus } from "lucide-react";
import { useUpdateCounterValue } from "@/hooks/useUpdateCounterValue";

interface CounterControlsProps {
  id: string;
  onDecrement: () => void;
  onIncrement: () => void;
}

function CounterControls({
  id,
  onDecrement,
  onIncrement,
}: CounterControlsProps) {
  const updateCounterValue = useUpdateCounterValue(id);

  return (
    <div className="mt-2 grid grid-cols-2 gap-3">
      <button
        className="ui-btn min-h-[50px]"
        aria-label="Decrement"
        onClick={onDecrement}
        disabled={updateCounterValue.isPending}
      >
        <Minus />
      </button>
      <button
        className="ui-btn min-h-[50px]"
        aria-label="Increment"
        onClick={onIncrement}
        disabled={updateCounterValue.isPending}
      >
        <Plus />
      </button>
    </div>
  );
}

export default CounterControls;
