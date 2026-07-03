import { Fragment } from "react/jsx-runtime";
import Features from "@/sections/Features";
import Hero from "@/sections/Hero";
import TechStack from "@/sections/TechStack";

function LandingPage() {
  return (
    <Fragment>
      <Hero />
      <Features />
      <TechStack />
    </Fragment>
  );
}

export default LandingPage;
