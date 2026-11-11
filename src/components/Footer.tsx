import { Link } from "react-router";

function Footer() {
  return (
    <footer className="text-ink-muted mx-auto mt-12 max-w-5xl px-4 text-sm">
      <div className="border-line flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t py-6">
        <p>© {new Date().getFullYear()} Narciso Lobo</p>
        <nav className="flex gap-6">
          <a
            href="https://github.com/narcisolobo/countsy-ii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink underline underline-offset-2"
          >
            GitHub
          </a>
          <Link
            to="/privacy"
            className="hover:text-ink underline underline-offset-2"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="hover:text-ink underline underline-offset-2"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
