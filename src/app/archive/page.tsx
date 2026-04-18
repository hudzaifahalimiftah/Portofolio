/**
 * ARCHIVE PAGE
 * All data read from src/data/data.json — edit that file to update content.
 */
"use client";
import { useState } from "react";
import data from "@/data/data.json";
import Reveal from "@/components/Reveal";

/* ── design tokens ───────────────────────────────────────────── */
const card: React.CSSProperties = {
  background: "#0A0A0A",
  border: "1.5px solid #1A1A1A",
  borderRadius: 24,
  padding: 28,
  position: "relative",   // needed for absolute watermark
  overflow: "hidden",
  height: "100%",         // fill grid cell
  display: "flex",
  flexDirection: "column",
};

const sectionLabel: React.CSSProperties = {
  color: "#333", fontSize: 10, fontWeight: 700,
  letterSpacing: "0.2em", textTransform: "uppercase",
  marginBottom: 24, fontFamily: "var(--font-inter)",
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

const medalColor: Record<string, string> = {
  Silver: "#C0C0C0",
  Bronze: "#CD7F32",
  Participant: "#555",
};

export default function ArchivePage() {
  const { experience, achievements, projects } = data;
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <main style={{ background: "transparent", minHeight: "100vh", padding: "120px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* ── Page header ──────────────────────────────────── */}
        <Reveal>
          <div style={{ marginBottom: 80 }}>
            <p style={sectionLabel}>Portfolio Archive</p>
            <h1 style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.0,
              color: "#F5F5F5", fontFamily: "var(--font-inter)",
            }}>
              EXPERIENCE,<br />
              <span style={{ color: "#1A1A1A" }}>AWARDS &amp; PROJECTS.</span>
            </h1>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════════════
            SECTION 1 — EXPERIENCE TIMELINE
        ══════════════════════════════════════════════════ */}
        <Reveal>
          <p style={sectionLabel}>Work Experience</p>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 80 }}>
          {experience.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 80}>
              <div className="bento-card" style={card}>
                {/* Header */}
                <div style={{
                  display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between", gap: 16,
                  marginBottom: 20, flexWrap: "wrap",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                      background: "#111", border: "1.5px solid #1A1A1A",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 16 }}>🏢</span>
                    </div>
                    <div>
                      <h3 style={{
                        color: "#F5F5F5", fontSize: 17, fontWeight: 800,
                        letterSpacing: "-0.02em", fontFamily: "var(--font-inter)",
                        marginBottom: 2,
                      }}>
                        {exp.company}
                      </h3>
                      <p style={{ color: "#555", fontSize: 12, fontFamily: "var(--font-jakarta)" }}>
                        {exp.role}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span style={tagStyle(true)}>{exp.type}</span>
                    <span style={tagStyle()}>{exp.period}</span>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #111", marginBottom: 20 }} />

                {/* Tasks */}
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {exp.tasks.map((task, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: "#CEFF05", fontSize: 11, fontWeight: 900, marginTop: 2, flexShrink: 0 }}>✓</span>
                      <span style={{ color: "#666", fontSize: 14, lineHeight: 1.5, fontFamily: "var(--font-jakarta)" }}>
                        {task}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 20 }}>
                  {exp.tags.map((t) => (
                    <span key={t} style={tagStyle()}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════
            SECTION 2 — AWARDS GALLERY
            3 equal columns, uniform card height
        ══════════════════════════════════════════════════ */}
        <Reveal>
          <p style={sectionLabel}>Awards &amp; Achievements</p>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",   // strict 3-col
          gap: 12,
          marginBottom: 80,
        }}>
          {achievements.map((ach, i) => (
            <Reveal key={ach.id} delay={i * 70}>
              {/* height:100% on card fills the grid row uniformly */}
              <div className="bento-card" style={{ ...card, minHeight: 220 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ fontSize: 32 }}>{ach.icon}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    color: medalColor[ach.medal] ?? "#555",
                    fontFamily: "var(--font-inter)",
                    letterSpacing: "0.06em",
                  }}>
                    {ach.medal}
                  </span>
                </div>

                {/* Content grows to fill */}
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    color: "#F5F5F5", fontSize: 15, fontWeight: 800,
                    letterSpacing: "-0.02em", marginBottom: 6,
                    fontFamily: "var(--font-inter)",
                  }}>
                    {ach.title}
                  </h3>
                  <p style={{ color: "#444", fontSize: 12, lineHeight: 1.5, fontFamily: "var(--font-jakarta)" }}>
                    {ach.event}
                  </p>
                </div>

                {/* Tags pinned to bottom */}
                <div style={{ display: "flex", gap: 6, marginTop: 20, flexWrap: "wrap" }}>
                  <span style={tagStyle(true)}>{ach.category}</span>
                  <span style={tagStyle()}>{ach.year}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════
            SECTION 3 — DEVELOPMENT LAB
            3 equal columns, buttons pinned to bottom
        ══════════════════════════════════════════════════ */}
        <Reveal>
          <p style={sectionLabel}>Development Lab</p>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",   // strict 3-col
          gap: 12,
        }}>
          {projects.map((proj, i) => (
            <Reveal key={proj.id} delay={i * 80}>
              <div
                className="bento-card"
                onMouseEnter={() => setHoveredProject(proj.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  ...card,
                  minHeight: 280,
                  border: `1.5px solid ${hoveredProject === proj.id ? "#CEFF05" : "#1A1A1A"}`,
                  transition: "border-color 0.2s ease, transform 0.22s cubic-bezier(0.34,1.4,0.64,1)",
                  transform: hoveredProject === proj.id ? "scale(1.015)" : "scale(1)",
                }}
              >
                {/*
                  Watermark number — position:absolute, bottom-right,
                  opacity 0.04 so it doesn't distract from content
                */}
                <span style={{
                  position: "absolute",
                  bottom: 16, right: 20,
                  fontSize: 80, fontWeight: 900,
                  color: "#F5F5F5",
                  opacity: 0.04,                  // subtle watermark
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  fontFamily: "var(--font-inter)",
                  userSelect: "none",
                  pointerEvents: "none",
                }}>
                  {String(proj.id).padStart(2, "0")}
                </span>

                {/* Status + Featured badges — top row, no overlap with title */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16, gap: 8,
                }}>
                  <span style={{
                    ...tagStyle(proj.status === "Completed"),
                    background: proj.status === "In Progress" ? "#111" : "transparent",
                  }}>
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

                {/* Title */}
                <h3 style={{
                  color: "#F5F5F5", fontSize: 18,
                  fontWeight: 900, letterSpacing: "-0.03em",
                  marginBottom: 10, fontFamily: "var(--font-inter)",
                }}>
                  {proj.name}
                </h3>

                {/* Description — flex:1 pushes buttons to bottom */}
                <p style={{
                  color: "#555", fontSize: 13, lineHeight: 1.6,
                  fontFamily: "var(--font-jakarta)",
                  flex: 1,                        // fills remaining space
                  marginBottom: 16,
                }}>
                  {proj.description}
                </p>

                {/* Stack tags */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                  {proj.stack.map((s) => (
                    <span key={s} style={tagStyle()}>{s}</span>
                  ))}
                </div>

                {/* Action buttons — always at bottom because of flex:1 above */}
                <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                  {proj.demo && (
                    <a href={proj.demo} className="btn-spring" style={{
                      background: "#CEFF05", color: "#000",
                      fontSize: 11, fontWeight: 700, padding: "8px 16px",
                      borderRadius: 8, textDecoration: "none",
                      fontFamily: "var(--font-inter)",
                    }}>
                      Live Demo ↗
                    </a>
                  )}
                  {proj.github && (
                    <a href={proj.github} className="btn-spring" style={{
                      border: "1.5px solid #1A1A1A", color: "#555",
                      fontSize: 11, fontWeight: 700, padding: "8px 16px",
                      borderRadius: 8, textDecoration: "none",
                      fontFamily: "var(--font-inter)",
                    }}>
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </main>
  );
}
