import { X as XIcon } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Link } from "react-router";
import { type DrawerItem } from "@/types/drawer-item";

interface DrawerProps {
  children: ReactNode;
  items: DrawerItem[];
}

function Drawer({ children, items }: DrawerProps) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  function closeDrawer() {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <input
        type="checkbox"
        className="peer sr-only"
        id="user-menu"
        ref={checkboxRef}
      />
      <div>{children}</div>
      <label
        htmlFor="user-menu"
        aria-label="Close user menu"
        className="pointer-events-none fixed inset-0 z-40 bg-black/40 opacity-0 transition-opacity peer-checked:pointer-events-auto peer-checked:opacity-100"
      ></label>
      <ul className="bg-surface text-ink border-line invisible fixed inset-y-0 right-0 z-50 flex w-80 max-w-full translate-x-full flex-col gap-1 border-l p-4 transition-transform peer-checked:visible peer-checked:translate-x-0">
        <li className="ml-auto">
          <label
            htmlFor="user-menu"
            aria-label="Close user menu"
            className="ui-btn-icon size-10"
          >
            <XIcon />
          </label>
        </li>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.href ? (
              <Link
                to={item.href}
                onClick={closeDrawer}
                className="hover:bg-page block rounded-md px-3 py-2"
              >
                {item.label}
              </Link>
            ) : (
              <button
                onClick={() => {
                  closeDrawer();
                  item.onClick?.();
                }}
                className="hover:bg-page block w-full cursor-pointer rounded-md px-3 py-2 text-left"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drawer;
