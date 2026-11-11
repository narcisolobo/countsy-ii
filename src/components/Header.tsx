import { CircleUserRound } from "lucide-react";
import { Link } from "react-router";
import ThemeSwitcher from "@/components/ThemeSwitcher";

function Header() {
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
        <label
          htmlFor="user-menu"
          aria-label="Open menu"
          tabIndex={0}
          role="button"
          className="ui-btn-icon text-plate-ink hover:text-plate-ink focus-visible:outline-white"
        >
          <CircleUserRound size={32} />
        </label>
      </nav>
    </header>
  );
}

export default Header;
