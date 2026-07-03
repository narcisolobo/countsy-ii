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
      <div className="tooltip" data-tip="decrement">
        <button
          className="btn btn-circle btn-ghost"
          onClick={() => onDecrement(value)}
          disabled={updateCounterValue.isPending}
        >
          <Minus />
        </button>
      </div>
      <div className="tooltip" data-tip="increment">
        <button
          className="btn btn-circle btn-ghost"
          onClick={() => onIncrement(value)}
          disabled={updateCounterValue.isPending}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}

export default CounterControls;
