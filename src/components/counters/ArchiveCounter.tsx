import { Archive, ArchiveRestore } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { useArchiveCounter } from "@/hooks/useArchiveCounter";
import { type Counter } from "@/types/counter";

interface ArchiveCounterProps {
  counter: Counter;
}

function ArchiveCounter({ counter }: ArchiveCounterProps) {
  const archive = useArchiveCounter(counter.id);

  const showArchiveModal = () => {
    const modalId = `archive-modal-${counter.id}`;
    const modalElement = document.getElementById(modalId) as HTMLDialogElement;
    modalElement.showModal();
  };

  return (
    <Fragment>
      {!counter.is_archived ? (
        <button
          aria-label="Archive counter"
          title="Archive counter"
          onClick={() => showArchiveModal()}
          className="ui-btn-icon"
        >
          <Archive size={22} />
        </button>
      ) : (
        <button
          aria-label="Restore counter"
          title="Restore counter"
          onClick={() => archive.mutate(false)}
          className="ui-btn-icon"
        >
          <ArchiveRestore size={22} />
        </button>
      )}
    </Fragment>
  );
}

export default ArchiveCounter;
