interface GoalColumnProps {
  value: number;
  goal: number;
}

/** The brim line marks the goal, at 94% of the glass height. */
const BRIM = 94;
const TICKS = [25, 50, 75];

/**
 * A narrow measuring glass down the card's right edge. Water rises with the
 * count; at the goal it reaches the brim line and the glass turns Meter Blue.
 * Past the goal it tops up to the rim.
 */
function GoalColumn({ value, goal }: GoalColumnProps) {
  const reached = value >= goal;
  const fill =
    value > goal ? 100 : Math.min(Math.max(value / goal, 0), 1) * BRIM;
  const mark = reached ? "bg-accent" : "bg-ink-muted";

  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={goal}
      aria-valuenow={Math.min(Math.max(value, 0), goal)}
      aria-label={`${value} of ${goal}${reached ? ", goal reached" : ""}`}
      className="relative h-full w-3.5"
    >
      {/* Open-topped glass. */}
      <div
        className={`absolute inset-0 overflow-hidden rounded-b-[3px] border-2 border-t-0 transition-colors duration-200 ${
          reached ? "border-accent" : "border-ink-muted"
        }`}
      >
        <div
          className="bg-accent/85 absolute inset-x-0 bottom-0 transition-[height] duration-[180ms] ease-out"
          style={{ height: `${fill}%` }}
        >
          {fill > 0 && fill < 100 && (
            <div className="bg-accent absolute inset-x-0 top-0 h-0.5" />
          )}
        </div>
      </div>
      {/* Lip. */}
      <div
        className={`absolute -top-px -right-1 left-0 h-0.5 transition-colors duration-200 ${mark}`}
      />
      {/* Brim line (the goal) and quarter marks. */}
      <div
        className={`absolute right-0 h-0.5 w-1/2 ${mark}`}
        style={{ bottom: `${BRIM}%` }}
      />
      {TICKS.map((t) => (
        <div
          key={t}
          className={`absolute right-0 h-px w-2/5 ${mark}`}
          style={{ bottom: `${(t * BRIM) / 100}%` }}
        />
      ))}
    </div>
  );
}

export default GoalColumn;
