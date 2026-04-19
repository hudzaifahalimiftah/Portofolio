/**
 * HOME PAGE
 * All content driven by src/data/data.json
 */
import Link from "next/link";
import Image from "next/image";
import data from "@/data/data.json";
import Reveal from "@/components/Reveal";

/* ── design tokens ───────────────────────────────────────────── */
const card: React.CSSProperties = {
  background: "#0A0A0A",
  border: "1.5px solid #1A1A1A",
  borderRadius: 24,
  padding: 32,
  position: "relative",
  overflow: "hidden",
  height: "100%",           // uniform height inside grid cell
  display: "flex",
  flexDirection: "column",
};

const lbl: React.CSSProperties = {
  color: "#333",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  marginBottom: 16,
  fontFamily: "var(--font-inter)",
};

export default function Home() {
  const { persona, hafiz, skills, japanGoal } = data;
  const pct = Math.round((hafiz.current / hafiz.total) * 100);

  return (
    <main style={{ background: "transparent" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "stretch",
        padding: "0 24px",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}>
        {/* Two-column layout: text left, photo right */}
        <div className="hero-layout" style={{
          display: "flex", alignItems: "stretch", justifyContent: "space-between",
          gap: 64, width: "100%", paddingTop: 120, paddingBottom: 80,
        }}>

          {/* LEFT — text content, vertically centered */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="fu fu-1" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1.5px solid #1A1A1A", borderRadius: 999,
              padding: "5px 16px", marginBottom: 32, alignSelf: "flex-start",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#CEFF05", boxShadow: "0 0 8px #CEFF05" }} />
              <span style={{ color: "#555", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>
                {persona.school} · {persona.status}
              </span>
            </div>

            <p className="fu fu-2" style={{
              color: "#CEFF05", fontSize: 20, fontWeight: 600,
              letterSpacing: "-0.02em", marginBottom: 12,
              fontFamily: "var(--font-inter)",
            }}>
              Hi, I&apos;m Ali.
            </p>

            <h1 className="fu fu-3 hero-h1" style={{
              fontSize: "clamp(38px, 4.5vw, 72px)",
              fontWeight: 900, letterSpacing: "-0.06em", lineHeight: 1.0,
              color: "#F5F5F5", marginBottom: 24,
              fontFamily: "var(--font-inter)",
            }}>
              ARCHITECTING CODE,<br />
              <span style={{ color: "#CEFF05" }}>PRESERVING QUR&apos;AN.</span>
            </h1>

            <p className="fu fu-4" style={{
              color: "#666", fontSize: 16, maxWidth: 480,
              lineHeight: 1.7, marginBottom: 32,
              fontFamily: "var(--font-jakarta)",
            }}>
              {persona.subTagline}
              <br />
              <span style={{ color: "#888", fontStyle: "italic" }}>Connecting logic with devotion.</span>
            </p>

            <div className="fu fu-5" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <Link href="/archive" className="btn-spring" style={{
                background: "#CEFF05", color: "#000", fontWeight: 700, fontSize: 14,
                padding: "14px 32px", borderRadius: 12, textDecoration: "none",
                boxShadow: "0 0 32px rgba(206,255,5,0.2)", fontFamily: "var(--font-inter)",
              }}>
                Explore Archive →
              </Link>
              <a href="/images/cv.jpg" download className="btn-spring" style={{
                background: "transparent", color: "#F5F5F5", fontWeight: 700, fontSize: 14,
                padding: "14px 32px", borderRadius: 12, textDecoration: "none",
                border: "1.5px solid #1A1A1A", fontFamily: "var(--font-inter)",
              }}>
                Download CV
              </a>
            </div>

            {/* Social links */}
            <div className="fu fu-5" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {data.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-spring"
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "transparent", border: "1.5px solid #1A1A1A",
                    borderRadius: 999, padding: "7px 16px",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ color: "#CEFF05", fontSize: 10, fontWeight: 800, fontFamily: "var(--font-inter)", letterSpacing: "0.05em" }}>
                    {s.icon}
                  </span>
                  <span style={{ color: "#555", fontSize: 12, fontWeight: 500, fontFamily: "var(--font-jakarta)" }}>
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>{/* end LEFT col */}

          {/* RIGHT — profile photo, full height */}
          <div className="fu fu-2 hero-photo-col" style={{ flexShrink: 0, display: "flex", alignItems: "stretch" }}>
            <div className="hero-photo-wrap" style={{
              width: 420,
              borderRadius: 28,
              border: "1.5px solid #1A1A1A",
              boxShadow: "0 0 80px rgba(206,255,5,0.07)",
              overflow: "hidden", position: "relative",
            }}>
              <Image
                src="/images/ali.jpg"
                alt={persona.name}
                fill
                style={{ objectFit: "cover", objectPosition: "center top", filter: "grayscale(100%) sepia(40%) hue-rotate(20deg) saturate(300%) brightness(0.85)" }}
                priority
              />
            </div>
          </div>

        </div>{/* end two-col flex */}
      </section>

      {/* ── EDUCATION TIMELINE ───────────────────────────── */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal delay={0}>
          <div style={{ marginBottom: 40 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1.5px solid #1A1A1A", borderRadius: 999,
              padding: "5px 16px", marginBottom: 16,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#CEFF05", boxShadow: "0 0 8px #CEFF05" }} />
              <span style={{ color: "#555", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>
                track record
              </span>
            </div>
            <h2 style={{
              color: "#F5F5F5", fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.0,
              fontFamily: "var(--font-inter)",
            }}>
              EDUCATIONAL<br />
              <span style={{ color: "#1A1A1A" }}>_____ JOURNEY</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 19, top: 0, bottom: 0,
            width: 1.5, background: "#1A1A1A",
          }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {data.education.map((edu, i) => {
              const isCurrent = edu.status === "current";
              const isDream   = edu.status === "dream";
              return (
                <Reveal key={edu.id} delay={i * 80}>
                  <div style={{ display: "flex", gap: 24, paddingBottom: 8 }}>
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: isDream ? "#CEFF05" : isCurrent ? "#111" : "#0A0A0A",
                        border: `1.5px solid ${isDream ? "#CEFF05" : isCurrent ? "#CEFF05" : "#1A1A1A"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: isDream ? "0 0 20px rgba(206,255,5,0.3)" : isCurrent ? "0 0 12px rgba(206,255,5,0.15)" : "none",
                        zIndex: 1, position: "relative",
                      }}>
                        <span style={{
                          fontSize: 8, fontWeight: 900, letterSpacing: "0.05em",
                          color: isDream ? "#000" : isCurrent ? "#CEFF05" : "#333",
                          fontFamily: "var(--font-inter)",
                          textAlign: "center", lineHeight: 1.2,
                        }}>
                          {edu.level}
                        </span>
                      </div>
                    </div>
                    <div style={{
                      flex: 1, background: "#0A0A0A",
                      border: `1.5px solid ${isDream ? "#CEFF05" : isCurrent ? "#222" : "#111"}`,
                      borderRadius: 16, padding: "16px 20px", marginBottom: 12,
                      boxShadow: isDream ? "0 0 32px rgba(206,255,5,0.06)" : "none",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                        <p style={{
                          color: isDream ? "#CEFF05" : isCurrent ? "#F5F5F5" : "#888",
                          fontSize: 14, fontWeight: 700,
                          fontFamily: "var(--font-inter)", letterSpacing: "-0.02em",
                        }}>
                          {edu.name}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {isCurrent && (
                            <span style={{
                              background: "#0f1a00", border: "1px solid #CEFF05",
                              color: "#CEFF05", fontSize: 9, fontWeight: 700,
                              padding: "2px 8px", borderRadius: 999,
                              fontFamily: "var(--font-inter)", letterSpacing: "0.08em",
                            }}>SEKARANG</span>
                          )}
                          {isDream && (
                            <span style={{
                              background: "#CEFF05", color: "#000",
                              fontSize: 9, fontWeight: 700,
                              padding: "2px 8px", borderRadius: 999,
                              fontFamily: "var(--font-inter)", letterSpacing: "0.08em",
                            }}>IMPIAN</span>
                          )}
                          <span style={{ color: "#333", fontSize: 11, fontFamily: "var(--font-jakarta)" }}>
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SKILL SECTION ────────────────────────────────── */}
      <section style={{ padding: "0 24px 120px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Badge penanda */}
        <Reveal delay={0}>
          <div style={{ marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1.5px solid #1A1A1A", borderRadius: 999,
              padding: "5px 16px",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#CEFF05", boxShadow: "0 0 8px #CEFF05" }} />
              <span style={{ color: "#555", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>
                Skill
              </span>
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>

          {/* Hafiz Tracker */}
          <Reveal delay={0}>
            <div className="bento-card" style={{
              ...card, alignItems: "center", justifyContent: "center",
              gap: 0, minHeight: 380, position: "relative", overflow: "hidden",
            }}>
              {/* Radial glow bg */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 50% 60%, rgba(206,255,5,0.10) 0%, transparent 65%)",
                pointerEvents: "none",
              }} />
              <p style={{ ...lbl, marginBottom: 20, position: "relative", zIndex: 1 }}>Hafiz Tracker</p>

              {/* Ring */}
              <div style={{ position: "relative", marginBottom: 20 }}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {/* Track */}
                  <circle cx="100" cy="100" r="85" fill="none" stroke="#111" strokeWidth="10" />
                  {/* Glow layer */}
                  <circle
                    cx="100" cy="100" r="85" fill="none"
                    stroke="#CEFF05" strokeWidth="14" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 85}`}
                    strokeDashoffset={`${2 * Math.PI * 85 * (1 - hafiz.current / hafiz.total)}`}
                    transform="rotate(-90 100 100)"
                    style={{ filter: "blur(6px)", opacity: 0.4 }}
                  />
                  {/* Main arc */}
                  <circle
                    cx="100" cy="100" r="85" fill="none"
                    stroke="#CEFF05" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 85}`}
                    strokeDashoffset={`${2 * Math.PI * 85 * (1 - hafiz.current / hafiz.total)}`}
                    transform="rotate(-90 100 100)"
                    style={{ filter: "drop-shadow(0 0 6px #CEFF05)" }}
                  />
                </svg>
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 2,
                }}>
                  <span style={{ color: "#CEFF05", fontSize: 52, fontWeight: 900, fontFamily: "var(--font-inter)", letterSpacing: "-0.06em", lineHeight: 1 }}>
                    {hafiz.current}
                  </span>
                  <span style={{ color: "#444", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}>
                    / {hafiz.total} JUZ
                  </span>
                </div>
              </div>

              {/* Pct badge */}
              <div style={{
                background: "#0f1a00", border: "1.5px solid #CEFF05",
                borderRadius: 999, padding: "4px 16px", marginBottom: 10,
                boxShadow: "0 0 16px rgba(206,255,5,0.2)",
              }}>
                <span style={{ color: "#CEFF05", fontSize: 13, fontWeight: 800, fontFamily: "var(--font-inter)" }}>
                  {pct}% Complete
                </span>
              </div>
              <p style={{ color: "#333", fontSize: 11, fontFamily: "var(--font-jakarta)", textAlign: "center" }}>
                {hafiz.note}
              </p>
            </div>
          </Reveal>

          {/* Skill Stack — spans 2 cols */}
          <div style={{ gridColumn: "span 2" }}>
            <Reveal delay={80}>
              <div className="bento-card" style={{ ...card, minHeight: 380, gap: 0, position: "relative", overflow: "hidden" }}>
                {/* bg glow */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(ellipse at 80% 20%, rgba(206,255,5,0.05) 0%, transparent 60%)",
                  pointerEvents: "none",
                }} />

                <p style={{ ...lbl, marginBottom: 32, position: "relative", zIndex: 1 }}>Skill Stack</p>

                {/* Skills grid — varied sizes */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, position: "relative", zIndex: 1 }}>
                  {[
                    { name: "HTML/CSS", featured: true, icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>
                    )},
                    { name: "JavaScript", featured: false, icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>
                    )},
                    { name: "PHP", featured: true, icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.555 1.15 2.194 2.194 0 0 1-.311.4zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.624H9.388l1.23-6.326h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.56 1.15 2.194 2.194 0 0 1-.311.4c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164h-1.181l-.327 1.681h-1.378l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752zm-2.595-.186h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29z"/></svg>
                    )},
                    { name: "Laravel", featured: false, icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027.29.29 0 01-.066.009.316.316 0 01-.065-.009.29.29 0 01-.066-.027L.534 18.755a.378.378 0 01-.189-.326V3.644a.367.367 0 01.014-.1.277.277 0 01.028-.068L.39 3.45a.379.379 0 01.136-.125L4.849.327a.378.378 0 01.378 0l4.323 2.494a.378.378 0 01.189.326v4.934l3.935-2.268V.653a.378.378 0 01.189-.326L18.186.003a.378.378 0 01.378 0l4.323 2.494a.378.378 0 01.189.326v2.494l.566.113z"/></svg>
                    )},
                    { name: "MySQL", featured: true, icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.357-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.976-.505z"/></svg>
                    )},
                    { name: "Canva", featured: false, icon: (
                      <svg width="16" height="16" viewBox="0 0 508 508" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M446.744 276.845c-.665 0-1.271.43-1.584 1.33-4.011 11.446-9.43 18.254-13.891 18.254-2.563 0-3.6-2.856-3.6-7.336 0-11.21 6.71-34.982 10.095-45.82.392-1.312.646-2.485.646-3.483 0-3.15-1.722-4.696-5.987-4.696-4.598 0-9.547 1.8-14.36 10.233-1.663-7.435-6.691-10.683-13.715-10.683-8.12 0-15.965 5.224-22.421 13.696-6.456 8.471-14.048 11.25-19.76 9.88 4.108-10.057 5.634-17.57 5.634-23.145 0-8.746-4.324-14.028-11.308-14.028-10.624 0-16.747 10.134-16.747 20.797 0 8.237 3.736 16.708 11.954 20.817-6.887 15.573-16.943 29.66-20.758 29.66-4.93 0-6.379-24.123-6.105-41.38.176-9.9.998-10.408.998-13.401 0-1.722-1.115-2.896-5.595-2.896-10.448 0-13.676 8.844-14.165 18.998a50.052 50.052 0 01-1.8 11.406c-4.363 15.573-13.363 27.39-19.232 27.39-2.72 0-3.463-2.72-3.463-6.28 0-11.21 6.28-25.219 6.28-37.173 0-8.784-3.854-14.34-11.112-14.34-8.55 0-19.858 10.173-30.56 29.229 3.521-14.595 4.97-28.721-5.459-28.721a14.115 14.115 0 00-6.476 1.683 3.689 3.689 0 00-2.113 3.56c.998 15.535-12.521 55.329-25.336 55.329-2.328 0-3.463-2.524-3.463-6.593 0-11.23 6.691-34.943 10.056-45.801.43-1.409.666-2.622.666-3.678 0-2.974-1.84-4.5-6.007-4.5-4.578 0-9.547 1.741-14.34 10.174-1.683-7.435-6.711-10.683-13.735-10.683-11.523 0-24.397 12.19-30.051 28.076-7.572 21.208-22.832 41.692-43.375 41.692-18.645 0-28.486-15.515-28.486-40.03 0-35.392 25.982-64.308 45.253-64.308 9.215 0 13.617 5.869 13.617 14.869 0 10.897-6.085 15.964-6.085 20.112 0 1.272 1.057 2.524 3.15 2.524 8.374 0 18.234-9.841 18.234-23.262 0-13.422-10.897-23.243-30.168-23.243-31.851 0-63.898 32.047-63.898 73.113 0 32.673 16.121 52.374 44 52.374 19.017 0 35.628-14.79 44.588-32.047 1.018 14.302 7.513 21.776 17.413 21.776 8.804 0 15.925-5.243 21.364-14.458 2.094 9.645 7.65 14.36 14.87 14.36 8.275 0 15.201-5.243 21.794-14.986-.097 7.65 1.644 14.85 8.276 14.85 3.13 0 6.867-.725 7.533-3.464 6.984-28.877 24.24-52.453 29.523-52.453 1.565 0 1.995 1.507 1.995 3.287 0 7.846-5.537 23.928-5.537 34.2 0 11.092 4.716 18.43 14.459 18.43 10.8 0 21.775-13.227 29.092-32.556 2.29 18.058 7.24 32.633 14.987 32.633 9.508 0 26.392-20.014 36.625-41.203 4.01.509 10.036.372 15.827-3.717-2.465 6.241-3.912 13.07-3.912 19.897 0 19.663 9.39 25.18 17.47 25.18 8.785 0 15.907-5.243 21.365-14.458 1.8 8.315 6.398 14.34 14.85 14.34 13.225 0 24.71-13.519 24.71-24.612 0-2.934-1.252-4.715-2.72-4.715zm-274.51 18.547c-5.342 0-7.435-5.38-7.435-13.401 0-13.93 9.528-37.193 19.604-37.193 4.402 0 6.065 5.185 6.065 11.524 0 14.145-9.059 39.07-18.235 39.07zm182.948-41.574c-3.189-3.796-4.343-8.961-4.343-13.559 0-5.673 2.074-10.467 4.558-10.467 2.485 0 3.248 2.446 3.248 5.85 0 5.693-2.035 14.008-3.463 18.176zm41.418 41.574c-5.34 0-7.434-6.182-7.434-13.401 0-13.441 9.528-37.193 19.682-37.193 4.402 0 5.967 5.146 5.967 11.524 0 14.145-8.902 39.07-18.215 39.07z"/></svg>
                    )},
                    { name: "CapCut", featured: true, icon: (
                      <svg width="16" height="16" viewBox="0 0 512 509.659" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M109.095 181.505c2.223-19.532 18.316-34.578 37.955-35.483l167.194-.001a40.612 40.612 0 0130.095 17.427 42.152 42.152 0 016.39 14.915l49.135-24.364a2.185 2.185 0 013.141 1.674v27.628l.001.096a4.571 4.571 0 01-2.837 4.229 177620.936 177620.936 0 00-135.63 67.336l135.324 66.948a4.695 4.695 0 013.142 4.08v27.685a2.266 2.266 0 01-3.613 1.821c-16.12-8.162-32.464-15.854-48.462-24.18a63.503 63.503 0 01-4.282 11.225 40.813 40.813 0 01-26.098 20.135 44.994 44.994 0 01-11.221.919l-155.833.003c-3.51 0-7.04 0-10.53-.266-18.089-2.705-32.049-17.363-33.869-35.565v-26.77a5.935 5.935 0 014.08-4.879c27.791-13.732 55.521-27.587 83.353-41.258a32412.61 32412.61 0 00-84.17-41.748 5.41 5.41 0 01-3.223-4.918c-.042-8.876-.185-17.792-.042-26.689zm30.975.184c-1.674 3.367-.898 7.263-1.041 10.896 30.608 15.12 60.99 30.321 91.536 45.339 30.185-14.963 60.384-29.927 90.596-44.89 0-2.714.123-5.428 0-8.162a10.203 10.203 0 00-10.096-8.734h-.106l-161.565.001a10.082 10.082 0 00-9.345 5.55h.021zm-1.041 135.406c.142 3.673-.654 7.631 1.122 11.039a10.204 10.204 0 009.284 5.405l161.667.002.081-.001c3.618 0 6.961-1.94 8.754-5.081 2.04-3.57 1.102-7.855 1.305-11.773-30.26-14.936-60.48-30.118-90.801-44.89a43915.126 43915.126 0 00-91.432 45.299h.02z"/></svg>
                    )},
                  ].map((sk) => (
                    <div key={sk.name} className="btn-spring" style={{
                      display: "flex", alignItems: "center", gap: 8,
                      background: sk.featured ? "#CEFF05" : "#111",
                      border: `1.5px solid ${sk.featured ? "#CEFF05" : "#222"}`,
                      borderRadius: 999,
                      padding: sk.featured ? "12px 24px" : "10px 20px",
                      color: sk.featured ? "#000" : "#666",
                      fontSize: sk.featured ? 15 : 13,
                      fontWeight: 800,
                      fontFamily: "var(--font-inter)",
                      letterSpacing: "-0.02em",
                      cursor: "default",
                      boxShadow: sk.featured ? "0 0 28px rgba(206,255,5,0.25), inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
                    }}>
                      <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{sk.icon}</span>
                      {sk.name}
                    </div>
                  ))}
                </div>

                {/* Bottom — total skills count */}
                <div style={{
                  marginTop: "auto", paddingTop: 32,
                  display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                  position: "relative", zIndex: 1,
                }}>
                  <div>
                    <p style={{ color: "#CEFF05", fontSize: 48, fontWeight: 900, fontFamily: "var(--font-inter)", letterSpacing: "-0.06em", lineHeight: 1 }}>
                      {skills.length}
                    </p>
                    <p style={{ color: "#333", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-inter)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>
                      Skills & Tools
                    </p>
                  </div>
                  <p style={{ color: "#222", fontSize: 11, fontFamily: "var(--font-jakarta)", maxWidth: 200, textAlign: "right", lineHeight: 1.6 }}>
                    From frontend to backend,<br />design to deployment.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ── IMPIAN · MOTTO · DOUBLE LIFE ─────────────────── */}
      <section style={{ padding: "0 24px 120px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Badge penanda */}
        <Reveal delay={0}>
          <div style={{ marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1.5px solid #1A1A1A", borderRadius: 999,
              padding: "5px 16px",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#CEFF05", boxShadow: "0 0 8px #CEFF05" }} />
              <span style={{ color: "#555", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>
                Impian · Motto · Identitas
              </span>
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>

          {/* Japan Dream */}
          <Reveal delay={0}>
            <div className="bento-card" style={{ ...card, minHeight: 280, justifyContent: "space-between" }}>
              <p style={lbl}>Japan Dream</p>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  width: 80, height: 54, background: "#fff", borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 0 1px #1A1A1A", position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, background: "#F5F5F5" }} />
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", background: "#BC002D",
                    position: "relative", zIndex: 1, boxShadow: "0 0 12px rgba(188,0,45,0.4)",
                  }} />
                </div>
              </div>
              <div>
                <p style={{ color: "#CEFF05", fontSize: 13, fontWeight: 700, marginBottom: 4, fontFamily: "var(--font-inter)" }}>
                  {japanGoal.scholarship}
                </p>
                <p style={{ color: "#444", fontSize: 11, fontFamily: "var(--font-jakarta)" }}>
                  {japanGoal.universities[0]}
                </p>
                <p style={{ color: "#333", fontSize: 10, marginTop: 4, fontFamily: "var(--font-jakarta)" }}>
                  Target: {japanGoal.targetYear} · {japanGoal.currentLevel}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Motto */}
          <Reveal delay={80}>
            <div className="bento-card" style={{
              ...card, minHeight: 280,
              background: "#CEFF05", border: "1.5px solid #CEFF05",
              justifyContent: "space-between",
            }}>
              <p style={{ ...lbl, color: "#00000055" }}>Motto</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  border: "2px solid rgba(0,0,0,0.2)",
                  overflow: "hidden", flexShrink: 0,
                }}>
                  <Image
                    src="/images/ali.jpg"
                    alt={persona.name}
                    width={44} height={44}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div>
                  <p style={{ color: "#000", fontSize: 12, fontWeight: 800, fontFamily: "var(--font-inter)" }}>{persona.name}</p>
                  <p style={{ color: "#00000066", fontSize: 10, fontFamily: "var(--font-jakarta)" }}>Santri · Developer</p>
                </div>
              </div>
              <p style={{ color: "#000", fontSize: 17, fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.03em", fontFamily: "var(--font-inter)" }}>
                &ldquo;{japanGoal.reason}&rdquo;
              </p>
            </div>
          </Reveal>

          {/* The Double Life */}
          <Reveal delay={160}>
            <div className="bento-card grain" style={{ ...card, minHeight: 280 }}>
              <p style={lbl}>The Double Life</p>
              <h2 style={{
                color: "#F5F5F5", fontSize: 22, fontWeight: 900,
                letterSpacing: "-0.04em", lineHeight: 1.2, marginBottom: 16,
                fontFamily: "var(--font-inter)",
              }}>
                Santri di Pagi Hari,<br />
                <span style={{ color: "#CEFF05" }}>Developer di Siang Hari.</span>
              </h2>
              <p style={{ color: "#555", fontSize: 13, lineHeight: 1.7, fontFamily: "var(--font-jakarta)" }}>
                Setiap hari dimulai dengan Muraja&apos;ah sebelum fajar, lalu laptop terbuka
                untuk React, PHP, dan Laravel. Hafalan Al-Qur&apos;an dan coding bukan dua hal
                yang bertentangan — keduanya adalah bentuk ibadah.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div style={{
        overflow: "hidden",
        borderTop: "1.5px solid #0a0a0a",
        borderBottom: "1.5px solid #0a0a0a",
        padding: "14px 0",
      }}>
        <div className="marquee-inner" style={{ userSelect: "none" }}>
          {[0, 1].map((i) => (
            <span key={i} style={{
              fontSize: "clamp(44px, 5.5vw, 88px)",
              fontWeight: 900, letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
              color: "#fff",
              opacity: 0.08,
              fontFamily: "var(--font-inter)",
            }}>
              {"SANTRI CODER • HAFIZ DEVELOPER • JAPAN DREAMER • ".repeat(4)}
            </span>
          ))}
        </div>
      </div>

    </main>
  );
}
