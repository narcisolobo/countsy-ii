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
    <div className="drawer drawer-end">
      <input
        type="checkbox"
        className="drawer-toggle"
        id="user-menu"
        ref={checkboxRef}
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="user-menu"
          aria-label="Close user menu"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li className="ml-auto">
            <label
              htmlFor="user-menu"
              aria-label="Close user menu"
              className="btn btn-ghost btn-sm rounded-full"
            >
              <XIcon />
            </label>
          </li>
          {items.map((item, idx) => (
            <li key={idx}>
              {item.href ? (
                <Link to={item.href} onClick={closeDrawer}>
                  {item.label}
                </Link>
              ) : (
                <button onClick={item.onClick}>{item.label}</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
