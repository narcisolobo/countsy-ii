import { Link } from "react-router";
import Crow from "@/assets/countsy-crow.png";

function Hero() {
  return (
    <section className="bg-base-200 py-8" id="top">
      <div className="container mx-auto">
        <div className="hero min-h-[70vh]">
          <div className="hero-content flex-col lg:flex-row">
            <div
              className="tooltip"
              data-tip="Image by Mohamed Hassan from Pixabay"
            >
              <img src={Crow} alt="Countsy Crow" className="max-w-xs" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-semibold">
                Track Anything, Count Everything
              </h1>
              <p className="py-6">
                Create and manage custom counters for habits, projects, or
                anything else.
              </p>
              <Link to="/sign-in" className="btn btn-primary">
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
