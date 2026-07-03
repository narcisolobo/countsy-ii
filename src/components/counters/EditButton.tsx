import { PencilLine } from "lucide-react";
import { Link } from "react-router";

interface EditButtonProps {
  id: string;
}

function EditButton({ id }: EditButtonProps) {
  return (
    <div className="tooltip" data-tip="edit counter">
      <Link
        to={`/counters/${id}/edit`}
        className="btn btn-circle btn-ghost text-base-content/70 hover:text-base-content"
      >
        <PencilLine size={28} />
      </Link>
    </div>
  );
}

export default EditButton;
