/**
 * HafizRing — SVG circular progress ring.
 * Props: current (juz done), total (30).
 * Neon green glow via CSS animation defined in globals.css.
 */
"use client";

interface Props { current: number; total: number; }

export default function HafizRing({ current, total }: Props) {
  const size   = 120;
  const stroke = 6;
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const pct    = current / total;
  const offset = circ * (1 - pct);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", overflow: "visible" }}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#1A1A1A" strokeWidth={stroke}
        />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="#CEFF05"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="neon-ring"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      {/* Center text */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          color: "#CEFF05", fontSize: 28, fontWeight: 900,
          letterSpacing: "-0.04em", lineHeight: 1,
          fontFamily: "var(--font-inter)",
        }}>
          {current}
        </span>
        <span style={{ color: "#333", fontSize: 10, fontWeight: 600, fontFamily: "var(--font-inter)" }}>
          / {total} Juz
        </span>
      </div>
    </div>
  );
}
