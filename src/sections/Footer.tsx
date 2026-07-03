import { Link } from "react-router";

function Footer() {
  return (
    <section id="footer">
      <footer className="footer footer-horizontal footer-center text-base-content mx-auto max-w-5xl p-10">
        <aside>
          <p className="font-semibold">
            Countsy
            <br />
            Count anything. Track everything.
          </p>
          <p>© {new Date().getFullYear()} Narciso Lobo. All rights reserved.</p>
        </aside>

        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://github.com/narcisolobo/countsy"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.28 3.438 9.76 8.207 11.345.6.11.793-.26.793-.577v-2.234c-3.338.725-4.033-1.415-4.033-1.415-.547-1.39-1.335-1.76-1.335-1.76-1.09-.744.082-.729.082-.729 1.204.085 1.84 1.237 1.84 1.237 1.07 1.832 2.806 1.303 3.49.997.11-.775.42-1.303.763-1.602-2.665-.303-5.466-1.333-5.466-5.932 0-1.31.47-2.38 1.236-3.22-.125-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 013.006-.404 11.49 11.49 0 013.006.404c2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.243 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.922.43.37.823 1.102.823 2.222v3.293c0 .32.192.693.8.576C20.565 22.257 24 17.777 24 12.5 24 5.87 18.63.5 12 .5z" />
              </svg>
            </a>
            <a
              href="https://www.cisocodes.com"
              aria-label="Narciso Lobo portfolio"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
            <Link to="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>
          </div>
        </nav>
      </footer>
    </section>
  );
}

export default Footer;
