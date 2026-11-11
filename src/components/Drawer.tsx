import { X as XIcon } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { DrawerContext } from "@/context/DrawerContext";
import { type DrawerItem } from "@/types/drawer-item";

interface DrawerProps {
  children: ReactNode;
  items: DrawerItem[];
}

/** Side menu on a native modal dialog: focus trap, Esc and focus return come free. */
function Drawer({ children, items }: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <DrawerContext.Provider value={{ isOpen, open: () => setIsOpen(true) }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        id="user-menu"
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
        className="bg-surface text-ink border-line fixed inset-y-0 right-0 m-0 ml-auto h-dvh max-h-none w-80 max-w-full border-l p-0 backdrop:bg-black/40"
      >
        <nav className="flex flex-col gap-1 p-4">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="ui-btn-icon ml-auto size-10"
          >
            <XIcon />
          </button>
          {items.map((item, idx) =>
            item.href ? (
              <Link
                key={idx}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="hover:bg-page block rounded-sm px-3 py-3 text-lg"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={idx}
                onClick={() => {
                  setIsOpen(false);
                  item.onClick?.();
                }}
                className="hover:bg-page block w-full cursor-pointer rounded-sm px-3 py-3 text-left text-lg"
              >
                {item.label}
              </button>
            ),
          )}
        </nav>
      </dialog>
    </DrawerContext.Provider>
  );
}

export default Drawer;
