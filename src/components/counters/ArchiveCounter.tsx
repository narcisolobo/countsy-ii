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
        <div className="tooltip" data-tip="archive counter">
          <button
            aria-label="Archive counter"
            onClick={() => showArchiveModal()}
            className="btn btn-circle btn-ghost text-base-content/70 hover:text-base-content"
          >
            <Archive size={28} />
          </button>
        </div>
      ) : (
        <div className="tooltip" data-tip="restore counter">
          <button
            aria-label="Restore counter"
            onClick={() => archive.mutate(false)}
            className="btn btn-circle btn-ghost text-base-content/70 hover:text-base-content"
          >
            <ArchiveRestore size={28} />
          </button>
        </div>
      )}
    </Fragment>
  );
}

export default ArchiveCounter;
