import { useState } from "react";

interface DrumRegisterProps {
  value: number;
  label: string;
}

const MIN_DIGITS = 4;

function sizeClass(chars: number) {
  if (chars <= 4) return "text-[74px]";
  if (chars === 5) return "text-[60px]";
  if (chars === 6) return "text-[48px]";
  return "text-[38px]";
}

function toDigits(value: number) {
  return String(Math.abs(value)).padStart(MIN_DIGITS, "0").split("");
}

/** Water-meter register: one black tile per digit, all digits alike. */
function DrumRegister({ value, label }: DrumRegisterProps) {
  const negative = value < 0;
  const digits = toDigits(value);
  const chars = digits.length + (negative ? 1 : 0);

  // Roll only the tiles whose digit changed, never on first render.
  const [prevDigits, setPrevDigits] = useState(digits);
  const [rolled, setRolled] = useState<boolean[]>([]);
  if (digits.join("") !== prevDigits.join("")) {
    const offset = prevDigits.length - digits.length;
    setRolled(digits.map((d, i) => prevDigits[i + offset] !== d));
    setPrevDigits(digits);
  }

  return (
    <div>
      <div
        aria-hidden="true"
        className={`flex gap-[3px] leading-none font-semibold tabular-nums ${sizeClass(chars)}`}
      >
        {negative && <Tile char="−" />}
        {digits.map((digit, i) => (
          <Tile key={`${i}-${digit}`} char={digit} rolled={rolled[i]} />
        ))}
      </div>
      <span role="status" className="sr-only">
        {label}: {value}
      </span>
    </div>
  );
}

function Tile({ char, rolled = false }: { char: string; rolled?: boolean }) {
  return (
    <span className="bg-tile text-tile-ink after:bg-tile-ink/15 relative flex h-[1.3em] w-[0.7em] items-center justify-center overflow-hidden rounded-[0.06em] after:absolute after:inset-x-0 after:top-1/2 after:h-px">
      <span className={rolled ? "drum-roll" : undefined}>{char}</span>
    </span>
  );
}

export default DrumRegister;
