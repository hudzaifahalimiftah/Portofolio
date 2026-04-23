/**
 * ARCHIVE PAGE
 * All data read from src/data/data.json — edit that file to update content.
 */

// Revalidate every 30 seconds (ISR) so data updates without full redeploy
export const revalidate = 30;

import data from "@/data/data.json";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";

/* ── design tokens ───────────────────────────────────────────── */
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
  Gold: "#FFD700",
  Silver: "#C0C0C0",
  Bronze: "#CD7F32",
  Participant: "#555",
  "1st Place": "#FFD700",
  "2nd Place": "#C0C0C0",
  "3rd Place": "#CD7F32",
  "Honorable Mention": "#888",
};

export default function ArchivePage() {
  const { experience, achievements, projects } = data;

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
        ══════════════════════════════════════════════════ */}
        <Reveal>
          <p style={sectionLabel}>Awards &amp; Achievements</p>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 80,
        }}>
          {achievements.map((ach, i) => (
            <Reveal key={ach.id} delay={i * 70}>
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
        ══════════════════════════════════════════════════ */}
        <Reveal>
          <p style={sectionLabel}>Development Lab</p>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}>
          {projects.map((proj, i) => (
            <Reveal key={proj.id} delay={i * 80}>
              <ProjectCard proj={proj} />
            </Reveal>
          ))}
        </div>

      </div>
    </main>
  );
}
