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
    <div className="border-line flex justify-center border-b px-4 py-2">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onBlur={() => handleBlur()}
          onKeyDown={(e) => handleKeyDown(e)}
          className="ui-input font-semibold"
        />
      ) : (
        <h3
          className="cursor-pointer text-lg font-semibold"
          title="Edit title"
          onClick={() => setIsEditing(true)}
        >
          {initialTitle}
        </h3>
      )}
    </div>
  );
}

export default InlineTitleEdit;
