/**
 * HOME PAGE
 * All content driven by src/data/data.json
 */
import Link from "next/link";
import Image from "next/image";
import data from "@/data/data.json";
import Reveal from "@/components/Reveal";
import HafizRing from "@/components/HafizRing";
import SkillChip from "@/components/SkillChip";

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
        <div style={{
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
          <div className="fu fu-2" style={{ flexShrink: 0, display: "flex", alignItems: "stretch" }}>
            <div style={{
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

      {/* ── MISSION BENTO ────────────────────────────────────── */}
      <section style={{ padding: "0 24px 120px", maxWidth: 1200, margin: "0 auto" }}>

        {/*
          ROW 1 — 3 equal columns on desktop.
          Reveal wraps each cell; gridColumn is on the Reveal wrapper
          via the `style` prop passed directly to the grid container's
          direct children. We avoid putting gridColumn on the inner div
          so the grid tracks the Reveal wrapper correctly.
        */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",   // 3 cols desktop
          gap: 16,
          marginBottom: 16,
        }}>
          {/* Cell 1 — Hafiz Ring */}
          <Reveal delay={0}>
            <div className="bento-card" style={{ ...card, alignItems: "center", justifyContent: "center", gap: 20, minHeight: 300 }}>
              <p style={lbl}>Hafiz Tracker</p>
              <HafizRing current={hafiz.current} total={hafiz.total} />
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#CEFF05", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-jakarta)" }}>
                  {pct}% Complete
                </p>
                <p style={{ color: "#333", fontSize: 11, marginTop: 4, fontFamily: "var(--font-jakarta)" }}>
                  {hafiz.note}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Cell 2 — Double Life (spans 2 cols on desktop) */}
          <div style={{ gridColumn: "span 2" }}>
            <Reveal delay={80}>
              <div className="bento-card grain" style={{ ...card, minHeight: 300 }}>
                <p style={lbl}>The Double Life</p>
                <h2 style={{
                  color: "#F5F5F5", fontSize: 24, fontWeight: 900,
                  letterSpacing: "-0.04em", lineHeight: 1.2, marginBottom: 16,
                  fontFamily: "var(--font-inter)",
                }}>
                  Santri di Pagi Hari,<br />
                  <span style={{ color: "#CEFF05" }}>Developer di Siang Hari.</span>
                </h2>
                <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, fontFamily: "var(--font-jakarta)" }}>
                  Setiap hari dimulai dengan Muraja&apos;ah sebelum fajar, lalu laptop terbuka
                  untuk React, PHP, dan Laravel. Hafalan Al-Qur&apos;an dan coding bukan dua hal
                  yang bertentangan — keduanya adalah bentuk ibadah.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ROW 2 — Japan + Skills + Quote */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}>
          {/* Japan Dream */}
          <Reveal delay={0}>
            <div className="bento-card" style={{ ...card, minHeight: 240, justifyContent: "space-between" }}>
              <p style={lbl}>Japan Dream</p>
              {/* Japanese flag */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  width: 80, height: 54,
                  background: "#fff",
                  borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 0 1px #1A1A1A",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* White background */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "#F5F5F5",
                  }} />
                  {/* Red circle */}
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "#BC002D",
                    position: "relative", zIndex: 1,
                    boxShadow: "0 0 12px rgba(188,0,45,0.4)",
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

          {/* Skills */}
          <Reveal delay={80}>
            <div className="bento-card" style={{ ...card, minHeight: 240 }}>
              <p style={lbl}>Skill Stack</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.map((sk) => (
                  <SkillChip key={sk} label={sk} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Quote */}
          <Reveal delay={160}>
            <div className="bento-card" style={{
              ...card, minHeight: 240,
              background: "#CEFF05", border: "1.5px solid #CEFF05",
              justifyContent: "space-between",
            }}>
              <p style={{ ...lbl, color: "#00000055" }}>Motto</p>
              {/* Profile photo in motto */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(0,0,0,0.15)",
                  border: "2px solid rgba(0,0,0,0.2)",
                  overflow: "hidden", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Image
                    src="/images/ali.jpg"
                    alt={persona.name}
                    width={44}
                    height={44}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div>
                  <p style={{ color: "#000", fontSize: 12, fontWeight: 800, fontFamily: "var(--font-inter)" }}>
                    {persona.name}
                  </p>
                  <p style={{ color: "#00000066", fontSize: 10, fontFamily: "var(--font-jakarta)" }}>
                    Santri · Developer
                  </p>
                </div>
              </div>
              <p style={{
                color: "#000", fontSize: 17, fontWeight: 800,
                lineHeight: 1.3, letterSpacing: "-0.03em",
                fontFamily: "var(--font-inter)",
              }}>
                &ldquo;{japanGoal.reason}&rdquo;
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
