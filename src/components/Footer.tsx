import Link from "next/link";
import data from "@/data/data.json";

export default function Footer() {
  return (
    <footer style={{
      background: "#000",
      borderTop: "1.5px solid #0f0f0f",
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: 16,
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6, background: "#CEFF05",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#000", fontWeight: 900, fontSize: 8 }}>AL</span>
          </div>
          <span style={{ color: "#333", fontWeight: 700, fontSize: 12, letterSpacing: "-0.02em" }}>
            Ali<span style={{ color: "#CEFF05" }}>.</span>dev
          </span>
        </Link>

        {/* Social links */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {data.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                border: "1.5px solid #1a1a1a", borderRadius: 999,
                padding: "5px 12px", textDecoration: "none",
                transition: "border-color 0.2s ease",
              }}
            >
              <span style={{ color: "#CEFF05", fontSize: 9, fontWeight: 800, fontFamily: "var(--font-inter)" }}>{s.icon}</span>
              <span style={{ color: "#2a2a2a", fontSize: 11, fontFamily: "var(--font-jakarta)" }}>{s.handle}</span>
            </a>
          ))}
        </div>

        {/* Copyright — pulled from JSON */}
        <p style={{ color: "#1f1f1f", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textAlign: "center" }}>
          © 2024 {data.persona.name} • Created with Grit &amp; Prayer.
        </p>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Home",    href: "/" },
            { label: "Archive", href: "/archive" },
            { label: "Admin",   href: "/admin" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ color: "#2a2a2a", fontSize: 11, fontWeight: 500, textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
