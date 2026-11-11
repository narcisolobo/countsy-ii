import { Link } from "react-router";
import Crow from "@/assets/countsy-crow.png";

function Hero() {
  return (
    <section className="bg-page py-8" id="top">
      <div className="container mx-auto">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <img
              src={Crow}
              alt="Countsy Crow"
              title="Image by Mohamed Hassan from Pixabay"
              className="max-w-xs"
            />
            <div>
              <h1 className="font-display text-4xl font-semibold">
                Track Anything, Count Everything
              </h1>
              <p className="py-6">
                Create and manage custom counters for habits, projects, or
                anything else.
              </p>
              <Link to="/sign-in" className="ui-btn ui-btn-primary">
                Start Counting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
