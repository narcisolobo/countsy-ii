import { Moon, Sun } from "lucide-react";

function ThemeSwitcher() {
  return (
    <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller" value="synthwave" />
      <Moon size={36} className="swap-off" />
      <Sun size={36} className="swap-on" />
    </label>
  );
}

export default ThemeSwitcher;
