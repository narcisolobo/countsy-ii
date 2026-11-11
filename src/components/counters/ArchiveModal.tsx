import { useArchiveCounter } from "@/hooks/useArchiveCounter";
import type { Counter } from "@/types/counter";

interface ArchiveModalProps {
  counter: Counter;
  onArchived?: () => void;
}

function ArchiveModal({
  counter: { id, title },
  onArchived,
}: ArchiveModalProps) {
  const archive = useArchiveCounter(id);

  return (
    <dialog
      id={`archive-modal-${id}`}
      className="bg-surface text-ink border-line m-auto w-full max-w-md rounded-sm border-2 p-0 backdrop:bg-black/50"
    >
      <div className="p-6">
        <h3 className="ui-label text-xl">Archive this counter?</h3>
        <p className="py-4">
          Are you sure you want to archive{" "}
          <span className="font-semibold">{title}</span>?
          <br />
          You can unarchive it later.
        </p>
        <div className="mt-4 flex justify-end">
          <form method="dialog" className="flex gap-2">
            {/* Cancel button closes modal */}
            <button className="ui-btn">Cancel</button>

            {/* Confirm archive button */}
            <button
              className="ui-btn ui-btn-primary"
              onClick={() => archive.mutate(true, { onSuccess: onArchived })}
            >
              Archive
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ArchiveModal;
