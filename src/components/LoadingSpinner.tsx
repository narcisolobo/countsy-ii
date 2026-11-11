import { Loader2 } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Loader2
        className="text-accent size-10 animate-spin"
        aria-label="Loading"
      />
    </div>
  );
}

export default LoadingSpinner;
