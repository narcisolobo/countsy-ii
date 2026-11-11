import { CircleUserRound } from "lucide-react";
import { Link } from "react-router";
import { useDrawer } from "@/hooks/useDrawer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

function Header() {
  const { isOpen, open } = useDrawer();
  return (
    <header className="bg-plate text-plate-ink">
      <nav className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2">
        <Link
          to="/"
          className="font-label flex-1 py-1 text-3xl font-bold tracking-widest uppercase focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Countsy
        </Link>
        <ThemeSwitcher />
        <button
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="user-menu"
          onClick={open}
          className="ui-btn-icon text-plate-ink hover:text-plate-ink focus-visible:outline-white"
        >
          <CircleUserRound size={32} />
        </button>
      </nav>
    </header>
  );
}

export default Header;
