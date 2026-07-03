import { useArchiveCounter } from "@/hooks/useArchiveCounter";
import type { Counter } from "@/types/counter";

interface ArchiveModalProps {
  counter: Counter;
}

function ArchiveModal({ counter: { id, title } }: ArchiveModalProps) {
  const archive = useArchiveCounter(id);

  return (
    <dialog id={`archive-modal-${id}`} className="modal">
      <div className="modal-box animate-[modal-fade-in]">
        <h3 className="text-lg font-bold">Archive this counter?</h3>
        <p className="py-4">
          Are you sure you want to archive{" "}
          <span className="font-semibold">{title}</span>?
          <br />
          You can unarchive it later.
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            {/* Cancel button closes modal */}
            <button className="btn">Cancel</button>

            {/* Confirm archive button */}
            <button
              className="btn btn-warning"
              onClick={() => archive.mutate(true)}
            >
              Yes, archive
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ArchiveModal;
