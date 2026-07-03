import { useCreateCounter } from "@/hooks/useCreateCounter";

interface CounterButtonProps {
  filteredCountersLength: number;
}

function CreateCounterButton({ filteredCountersLength }: CounterButtonProps) {
  const createCounter = useCreateCounter(filteredCountersLength);

  return (
    <button className="btn btn-primary" onClick={() => createCounter.mutate()}>
      + Create Counter
    </button>
  );
}

export default CreateCounterButton;
