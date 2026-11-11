import { CircleUserRound } from "lucide-react";
import { Link } from "react-router";
import ThemeSwitcher from "@/components/ThemeSwitcher";

function Header() {
  return (
    <header className="bg-surface border-line border-b font-sans">
      <nav className="px-4 py-2">
        <div className="container mx-auto flex items-center">
          <div className="flex-1">
            <Link
              to="/"
              className="font-display hover:bg-page rounded-md px-3 py-1 text-3xl"
            >
              COUNTSY
            </Link>
          </div>
          <div className="flex flex-none items-center gap-4">
            <label
              htmlFor="user-menu"
              aria-label="Open user menu"
              tabIndex={0}
              role="button"
              className="ui-btn-icon"
            >
              <CircleUserRound size={36} />
            </label>
            <div className="bg-line h-8 w-px" aria-hidden="true"></div>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
