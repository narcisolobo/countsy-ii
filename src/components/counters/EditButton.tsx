import { PencilLine } from "lucide-react";
import { Link } from "react-router";

interface EditButtonProps {
  id: string;
}

function EditButton({ id }: EditButtonProps) {
  return (
    <Link
      to={`/counters/${id}/edit`}
      aria-label="Edit counter"
      title="Edit counter"
      className="ui-btn-icon"
    >
      <PencilLine size={22} />
    </Link>
  );
}

export default EditButton;
