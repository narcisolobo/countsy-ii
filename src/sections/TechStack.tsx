import DaisyUILogo from "@/assets/daisy-ui-logo.svg";
import LucideLogo from "@/assets/lucide-logo.svg";
import ReactLogo from "@/assets/react-logo.svg";
import SupabaseLogo from "@/assets/supabase-logo.svg";

function TechStack() {
  return (
    <section id="tech-stack" className="bg-base-200">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center p-4 text-center">
        <h2 className="font-display text-4xl font-semibold">Built With</h2>
        <div className="text-sm md:text-base">
          <p className="text-base-content/60 mt-8">
            <a
              target="_blank"
              href="https://react.dev/"
              className="link-info hover:underline"
            >
              React
            </a>
            ,{" "}
            <a
              target="_blank"
              href="https://daisyui.com/"
              className="link-info hover:underline"
            >
              daisyUI
            </a>
            ,{" "}
            <a
              target="_blank"
              href="https://supabase.com/"
              className="link-info hover:underline"
            >
              Supabase
            </a>
            , and{" "}
            <a
              target="_blank"
              href="https://lucide.dev/"
              className="link-info hover:underline"
            >
              Lucide
            </a>
            .
          </p>
          <p className="text-base-content/60 mt-2">
            Designed and developed by{" "}
            <a
              target="_blank"
              href="https://www.cisocodes.com/"
              className="hover:underline"
            >
              Narciso Lobo
            </a>
            .
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6">
          <a href="https://react.dev/" target="_blank">
            <img src={ReactLogo} alt="React" className="h-6" />
          </a>
          <a href="https://daisyui.com/" target="_blank">
            <img src={DaisyUILogo} alt="daisyUI" className="h-6" />
          </a>
          <a href="https://supabase.com/" target="_blank">
            <img src={SupabaseLogo} alt="Supabase" className="h-6" />
          </a>
          <a href="https://lucide.dev/" target="_blank">
            <img src={LucideLogo} alt="Lucide" className="h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
