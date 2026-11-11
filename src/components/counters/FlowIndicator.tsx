interface FlowIndicatorProps {
  reached: boolean;
  /** Changing this key restarts the one-time spin. */
  spinning: boolean;
}

/** The small star-wheel on a water meter dial. Spins once when a goal is reached. */
function FlowIndicator({ reached, spinning }: FlowIndicatorProps) {
  return (
    <svg
      role="img"
      aria-label={reached ? "Goal reached" : "Goal not reached"}
      viewBox="0 0 40 40"
      className={`size-10 ${reached ? "text-accent" : "text-ink-muted"}`}
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <g
        className={spinning ? "meter-spin" : undefined}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        {[0, 60, 120].map((angle) => (
          <line
            key={angle}
            x1="20"
            y1="6"
            x2="20"
            y2="34"
            transform={`rotate(${angle} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="3" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export default FlowIndicator;
