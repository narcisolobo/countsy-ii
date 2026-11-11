import { useCreateCounter } from "@/hooks/useCreateCounter";

interface CounterButtonProps {
  filteredCountersLength: number;
}

function CreateCounterButton({ filteredCountersLength }: CounterButtonProps) {
  const createCounter = useCreateCounter(filteredCountersLength);

  return (
    <button
      className="ui-btn ui-btn-primary"
      onClick={() => createCounter.mutate()}
    >
      New counter
    </button>
  );
}

export default CreateCounterButton;
