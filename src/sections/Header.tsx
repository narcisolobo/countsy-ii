import { CircleUserRound } from "lucide-react";
import { Link } from "react-router";
import ThemeSwitcher from "@/components/ThemeSwitcher";

function Header() {
  return (
    <header className="bg-base-100 font-sans shadow-sm">
      <nav className="navbar">
        <div className="container mx-auto flex">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost font-display text-3xl">
              COUNTSY
            </Link>
          </div>
          <div className="flex flex-none gap-4">
            <label
              htmlFor="user-menu"
              aria-label="Open user menu"
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <CircleUserRound size={36} />
            </label>
            <div className="divider divider-horizontal"></div>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
