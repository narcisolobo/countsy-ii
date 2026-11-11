import { Minus, Plus } from "lucide-react";

interface CounterControlsProps {
  onDecrement: () => void;
  onIncrement: () => void;
}

function CounterControls({ onDecrement, onIncrement }: CounterControlsProps) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-3">
      <button
        className="ui-btn min-h-[50px]"
        aria-label="Decrement"
        onClick={onDecrement}
      >
        <Minus />
      </button>
      <button
        className="ui-btn min-h-[50px]"
        aria-label="Increment"
        onClick={onIncrement}
      >
        <Plus />
      </button>
    </div>
  );
}

export default CounterControls;
