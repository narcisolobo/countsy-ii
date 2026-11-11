import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateTitle } from "@/hooks/useUpdateTitle";
import type { Counter } from "@/types/counter";

interface InlineTitleEditProps {
  counter: Counter;
  initialTitle: string;
}

function InlineTitleEdit({ counter, initialTitle }: InlineTitleEditProps) {
  const [draftTitle, setDraftTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitle = useUpdateTitle(counter, setDraftTitle);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (draftTitle.trim() === "") {
        toast.error("Title cannot be empty");
        return;
      }
      updateTitle.mutate(draftTitle.trim());
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setDraftTitle(initialTitle);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setDraftTitle(initialTitle);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className="min-w-0 flex-1 self-center py-2">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          aria-label="Counter title"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onBlur={() => handleBlur()}
          onKeyDown={(e) => handleKeyDown(e)}
          className="ui-input font-label !min-h-10 text-xl font-semibold tracking-wider uppercase"
        />
      ) : (
        <h3 className="min-w-0">
          <button
            type="button"
            title="Rename"
            onClick={() => setIsEditing(true)}
            className="ui-label block max-w-full cursor-pointer truncate text-left text-xl"
          >
            {initialTitle}
          </button>
        </h3>
      )}
    </div>
  );
}

export default InlineTitleEdit;
