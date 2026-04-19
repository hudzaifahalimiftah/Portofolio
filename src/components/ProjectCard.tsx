"use client";
import { useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
  stack: string[];
  status: string;
  github: string;
  demo: string | null;
  featured: boolean;
};

const tagStyle = (accent = false): React.CSSProperties => ({
  display: "inline-block",
  border: `1.5px solid ${accent ? "#CEFF05" : "#1A1A1A"}`,
  borderRadius: 999,
  padding: "4px 12px",
  fontSize: 10, fontWeight: 700,
  color: accent ? "#CEFF05" : "#444",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--font-inter)",
  whiteSpace: "nowrap" as const,
});

const card: React.CSSProperties = {
  background: "#0A0A0A",
  border: "1.5px solid #1A1A1A",
  borderRadius: 24,
  padding: 28,
  position: "relative",
  overflow: "hidden",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export default function ProjectCard({ proj }: { proj: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bento-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...card,
        minHeight: 280,
        border: `1.5px solid ${hovered ? "#CEFF05" : "#1A1A1A"}`,
        transition: "border-color 0.2s ease, transform 0.22s cubic-bezier(0.34,1.4,0.64,1)",
        transform: hovered ? "scale(1.015)" : "scale(1)",
      }}
    >
      <span style={{
        position: "absolute",
        bottom: 16, right: 20,
        fontSize: 80, fontWeight: 900,
        color: "#F5F5F5",
        opacity: 0.04,
        letterSpacing: "-0.05em",
        lineHeight: 1,
        fontFamily: "var(--font-inter)",
        userSelect: "none",
        pointerEvents: "none",
      }}>
        {String(proj.id).padStart(2, "0")}
      </span>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 8 }}>
        <span style={{ ...tagStyle(proj.status === "Completed"), background: proj.status === "In Progress" ? "#111" : "transparent" }}>
          {proj.status}
        </span>
        {proj.featured && (
          <span style={{
            background: "#CEFF05", color: "#000",
            fontSize: 9, fontWeight: 700, padding: "4px 10px",
            borderRadius: 999, letterSpacing: "0.08em",
            textTransform: "uppercase", fontFamily: "var(--font-inter)",
            whiteSpace: "nowrap",
          }}>
            Featured
          </span>
        )}
      </div>

      <h3 style={{ color: "#F5F5F5", fontSize: 18, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 10, fontFamily: "var(--font-inter)" }}>
        {proj.name}
      </h3>

      <p style={{ color: "#555", fontSize: 13, lineHeight: 1.6, fontFamily: "var(--font-jakarta)", flex: 1, marginBottom: 16 }}>
        {proj.description}
      </p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {proj.stack.map((s) => (
          <span key={s} style={tagStyle()}>{s}</span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        {proj.demo && (
          <a href={proj.demo} className="btn-spring" style={{
            background: "#CEFF05", color: "#000",
            fontSize: 11, fontWeight: 700, padding: "8px 16px",
            borderRadius: 8, textDecoration: "none", fontFamily: "var(--font-inter)",
          }}>
            Live Demo ↗
          </a>
        )}
        {proj.github && (
          <a href={proj.github} className="btn-spring" style={{
            border: "1.5px solid #1A1A1A", color: "#555",
            fontSize: 11, fontWeight: 700, padding: "8px 16px",
            borderRadius: 8, textDecoration: "none", fontFamily: "var(--font-inter)",
          }}>
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}
