"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { label: "Home",    href: "/" },
  { label: "Archive", href: "/archive" },
  { label: "Login",   href: "/admin/login" },
];

export default function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "center", padding: "12px 16px",
    }}>
      <div style={{
        width: "100%", maxWidth: 1200, height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", borderRadius: 999,
        border: "1.5px solid #1A1A1A",
        background: scrolled ? "rgba(0,0,0,0.92)" : "rgba(10,10,10,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "relative",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, background: "#CEFF05",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#000", fontWeight: 900, fontSize: 11, fontFamily: "var(--font-inter)" }}>
              AL
            </span>
          </div>
          <span style={{ color: "#F5F5F5", fontWeight: 800, fontSize: 13, letterSpacing: "-0.03em", fontFamily: "var(--font-inter)" }}>
            Ali<span style={{ color: "#CEFF05" }}>.</span>dev
          </span>
        </Link>

        {/* Center links — desktop */}
        <nav
          className="hidden md:flex"
          style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 2 }}
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              color: path === l.href ? "#F5F5F5" : "#555",
              fontSize: 13, fontWeight: 500,
              padding: "5px 14px", borderRadius: 999,
              textDecoration: "none",
              background: path === l.href ? "#111" : "transparent",
              border: path === l.href ? "1.5px solid #222" : "1.5px solid transparent",
              transition: "all 0.15s ease",
            }}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/archive"
          className="btn-spring hidden md:block"
          style={{
            background: "#CEFF05", color: "#000",
            fontWeight: 700, fontSize: 12,
            padding: "7px 18px", borderRadius: 999,
            textDecoration: "none",
            boxShadow: "0 0 20px rgba(206,255,5,0.2)",
          }}
        >
          View Archive
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "#F5F5F5", cursor: "pointer", padding: 6 }}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden"
          style={{
            position: "absolute", top: 72, left: 16, right: 16,
            background: "#0A0A0A", border: "1.5px solid #1A1A1A",
            borderRadius: 24, padding: 12,
            display: "flex", flexDirection: "column", gap: 2,
          }}
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              color: path === l.href ? "#F5F5F5" : "#555",
              fontSize: 14, fontWeight: 500,
              padding: "10px 14px", borderRadius: 12,
              textDecoration: "none",
              background: path === l.href ? "#111" : "transparent",
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/archive" onClick={() => setOpen(false)} style={{
            background: "#CEFF05", color: "#000", fontWeight: 700, fontSize: 13,
            padding: "10px 14px", borderRadius: 12, textDecoration: "none",
            textAlign: "center", marginTop: 4,
          }}>
            View Archive
          </Link>
        </div>
      )}
    </header>
  );
}
