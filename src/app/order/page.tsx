"use client";

import { useState } from "react";
import Link from "next/link";

const inp = (focused: boolean, error = false): React.CSSProperties => ({
  width: "100%",
  background: "#0A0A0A",
  border: `1.5px solid ${error ? "#ff4444" : focused ? "#CEFF05" : "#1A1A1A"}`,
  borderRadius: 12,
  outline: "none",
  color: "#F5F5F5",
  fontSize: 14,
  fontWeight: 500,
  padding: "12px 16px",
  transition: "border-color 0.2s ease",
  fontFamily: "var(--font-jakarta)",
  boxSizing: "border-box",
});

const lbl: React.CSSProperties = {
  display: "block",
  color: "#444",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  marginBottom: 8,
  fontFamily: "var(--font-inter)",
};

const terms = [
  {
    icon: "⚡",
    title: "Limited Slots",
    desc: "Maximum 2 projects per month to maintain quality. Slots fill fast — order early.",
    accent: false,
  },
  {
    icon: "📅",
    title: "Minimum 7 Days",
    desc: "No rush projects. Minimum delivery time is 1 week (7 days). Quality code takes time.",
    accent: false,
  },
  {
    icon: "⚙️",
    title: "Laravel (PHP) Stack",
    desc: "All projects are built using the Laravel framework. No exceptions on tech stack.",
    accent: false,
  },
  {
    icon: "🌐",
    title: "Hosting & Domain — Client's Cost",
    desc: "Hosting and domain fees are fully covered by the client. I will provide a technical guide so all assets remain yours.",
    accent: false,
  },
  {
    icon: "💳",
    title: "50% DP · 50% on Completion",
    desc: "Down payment of 50% is required before work begins. Remaining 50% after the project passes testing.",
    accent: true,
  },
  {
    icon: "🛡️",
    title: "Honest Guarantee",
    desc: "I reserve the right to decline projects if slots are full or requirements are too complex. If I accept and fail to deliver due to technical issues, I will refund 100% of the DP — no questions asked.",
    accent: true,
  },
];

// Get today + 7 days as min date string
function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

export default function OrderPage() {
  const [focused, setFocused] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    deadline: "",
    budget: "",
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.type) e.type = "Please select a project type.";
    if (!form.description.trim()) e.description = "Please describe your project.";
    if (!form.deadline) e.deadline = "Please select a deadline.";
    else if (form.deadline < getMinDate()) e.deadline = "Deadline must be at least 7 days from today.";
    if (!form.budget.trim()) e.budget = "Budget is required.";
    if (!agreed) e.agreed = "You must agree to the terms before submitting.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID";
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          project_type: form.type,
          description: form.description,
          deadline: form.deadline,
          budget: form.budget,
          _replyto: "letsgrowtocuan@gmail.com",
          _subject: `[Web Order] ${form.type} — ${form.name}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", type: "", description: "", deadline: "", budget: "" });
        setAgreed(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main style={{ background: "transparent", minHeight: "100vh", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 56 }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#444", fontSize: 12, fontWeight: 600,
            textDecoration: "none", fontFamily: "var(--font-inter)",
            marginBottom: 32, letterSpacing: "0.05em",
          }}>
            ← Back to Home
          </Link>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1.5px solid #1A1A1A", borderRadius: 999,
            padding: "5px 16px", marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#CEFF05", boxShadow: "0 0 8px #CEFF05", flexShrink: 0 }} />
            <span style={{ color: "#555", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>
              Web Dev Services · Open for Orders
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.0,
            color: "#F5F5F5", fontFamily: "var(--font-inter)", marginBottom: 16,
          }}>
            BUILD YOUR<br />
            <span style={{ color: "#CEFF05" }}>WEB WITH ME.</span>
          </h1>
          <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7, fontFamily: "var(--font-jakarta)", maxWidth: 520 }}>
            I build clean, functional websites using Laravel. Read the terms carefully before placing an order.
          </p>
        </div>

        {/* ── Terms & Conditions ── */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            color: "#333", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            marginBottom: 20, fontFamily: "var(--font-inter)",
          }}>
            ⚠ Terms, Risks & Commitments — Read Before Ordering
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {terms.map((t) => (
              <div key={t.title} style={{
                background: t.accent ? "#0f1a00" : "#0A0A0A",
                border: `1.5px solid ${t.accent ? "#CEFF05" : "#1A1A1A"}`,
                borderRadius: 16,
                padding: "18px 20px",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{t.icon}</span>
                <div>
                  <p style={{
                    color: t.accent ? "#CEFF05" : "#F5F5F5",
                    fontSize: 13, fontWeight: 800,
                    fontFamily: "var(--font-inter)",
                    letterSpacing: "-0.02em",
                    marginBottom: 4,
                  }}>
                    {t.title}
                  </p>
                  <p style={{
                    color: t.accent ? "#aaa" : "#555",
                    fontSize: 13, lineHeight: 1.6,
                    fontFamily: "var(--font-jakarta)",
                  }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Order Form ── */}
        <div style={{
          background: "#0A0A0A",
          border: "1.5px solid #1A1A1A",
          borderRadius: 24,
          padding: 32,
        }}>
          <p style={{
            color: "#333", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            marginBottom: 28, fontFamily: "var(--font-inter)",
          }}>
            Order Form
          </p>

          {/* Success banner */}
          {status === "success" && (
            <div style={{
              background: "#0f1a00", border: "1.5px solid #CEFF05",
              borderRadius: 12, padding: "16px 20px", marginBottom: 24,
              display: "flex", alignItems: "flex-start", gap: 12,
            }}>
              <span style={{ color: "#CEFF05", fontSize: 18, flexShrink: 0 }}>✓</span>
              <div>
                <p style={{ color: "#CEFF05", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-inter)", marginBottom: 4 }}>
                  Message sent!
                </p>
                <p style={{ color: "#aaa", fontSize: 13, fontFamily: "var(--font-jakarta)" }}>
                  I will review your request within 24 hours.
                </p>
              </div>
            </div>
          )}

          {/* Error banner */}
          {status === "error" && (
            <div style={{
              background: "#1a0000", border: "1.5px solid #ff4444",
              borderRadius: 12, padding: "14px 20px", marginBottom: 24,
            }}>
              <p style={{ color: "#ff4444", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-jakarta)" }}>
                Failed to send. Please try again or contact me directly.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Name */}
            <div>
              <label style={lbl}>Name / Organization *</label>
              <input
                value={form.name}
                onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                placeholder="e.g. Yayasan Ar-Rahman"
                style={inp(focused === "name", !!errors.name)}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
              {errors.name && <p style={{ color: "#ff4444", fontSize: 11, marginTop: 6, fontFamily: "var(--font-jakarta)" }}>{errors.name}</p>}
            </div>

            {/* Type */}
            <div>
              <label style={lbl}>Project Type *</label>
              <select
                value={form.type}
                onChange={e => { setForm({ ...form, type: e.target.value }); setErrors({ ...errors, type: "" }); }}
                style={{ ...inp(focused === "type", !!errors.type), cursor: "pointer", appearance: "none" }}
                onFocus={() => setFocused("type")}
                onBlur={() => setFocused(null)}
              >
                <option value="" style={{ background: "#0A0A0A" }}>Select project type...</option>
                <option value="School Website" style={{ background: "#0A0A0A" }}>School Website</option>
                <option value="Organization Profile" style={{ background: "#0A0A0A" }}>Organization Profile</option>
                <option value="Custom System" style={{ background: "#0A0A0A" }}>Custom System</option>
              </select>
              {errors.type && <p style={{ color: "#ff4444", fontSize: 11, marginTop: 6, fontFamily: "var(--font-jakarta)" }}>{errors.type}</p>}
            </div>

            {/* Description */}
            <div>
              <label style={lbl}>Description & Required Features *</label>
              <textarea
                rows={5}
                value={form.description}
                onChange={e => { setForm({ ...form, description: e.target.value }); setErrors({ ...errors, description: "" }); }}
                placeholder="Describe what your website needs — pages, features, integrations, etc."
                style={{ ...inp(focused === "desc", !!errors.description), resize: "vertical" }}
                onFocus={() => setFocused("desc")}
                onBlur={() => setFocused(null)}
              />
              {errors.description && <p style={{ color: "#ff4444", fontSize: 11, marginTop: 6, fontFamily: "var(--font-jakarta)" }}>{errors.description}</p>}
            </div>

            {/* Deadline + Budget */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={lbl}>Target Deadline * (min. 7 days)</label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={form.deadline}
                  onChange={e => { setForm({ ...form, deadline: e.target.value }); setErrors({ ...errors, deadline: "" }); }}
                  style={{ ...inp(focused === "deadline", !!errors.deadline), colorScheme: "dark" }}
                  onFocus={() => setFocused("deadline")}
                  onBlur={() => setFocused(null)}
                />
                {errors.deadline && <p style={{ color: "#ff4444", fontSize: 11, marginTop: 6, fontFamily: "var(--font-jakarta)" }}>{errors.deadline}</p>}
              </div>
              <div>
                <label style={lbl}>Budget Range *</label>
                <select
                  value={form.budget}
                  onChange={e => { setForm({ ...form, budget: e.target.value }); setErrors({ ...errors, budget: "" }); }}
                  style={{ ...inp(focused === "budget", !!errors.budget), cursor: "pointer", appearance: "none" }}
                  onFocus={() => setFocused("budget")}
                  onBlur={() => setFocused(null)}
                >
                  <option value="" style={{ background: "#0A0A0A" }}>Select budget range...</option>
                  <option value="Rp 1.000.000 - Rp 1.500.000 (Standard)" style={{ background: "#0A0A0A" }}>Rp 1.000.000 – Rp 1.500.000 (Standard)</option>
                  <option value="Rp 1.500.000 - Rp 3.000.000 (Medium)" style={{ background: "#0A0A0A" }}>Rp 1.500.000 – Rp 3.000.000 (Medium)</option>
                  <option value="Above Rp 3.000.000 (Custom / Complex System)" style={{ background: "#0A0A0A" }}>Above Rp 3.000.000 (Custom / Complex System)</option>
                </select>
                {errors.budget && <p style={{ color: "#ff4444", fontSize: 11, marginTop: 6, fontFamily: "var(--font-jakarta)" }}>{errors.budget}</p>}
                <p style={{ color: "#333", fontSize: 11, marginTop: 8, fontFamily: "var(--font-jakarta)", lineHeight: 1.5 }}>
                  * Final price will be confirmed after technical review.
                </p>
              </div>
            </div>

            {/* Agreement checkbox */}
            <div style={{
              background: "#111", border: `1.5px solid ${errors.agreed ? "#ff4444" : "#1A1A1A"}`,
              borderRadius: 12, padding: "14px 16px",
              display: "flex", alignItems: "flex-start", gap: 12,
            }}>
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={e => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: "" }); }}
                style={{ marginTop: 2, accentColor: "#CEFF05", width: 16, height: 16, flexShrink: 0, cursor: "pointer" }}
              />
              <label htmlFor="agree" style={{ color: "#666", fontSize: 12, lineHeight: 1.6, fontFamily: "var(--font-jakarta)", cursor: "pointer" }}>
                I have read and agree to all the terms, risks, and commitments listed above. I understand the payment structure (50% DP) and the minimum 7-day delivery timeline.
              </label>
            </div>
            {errors.agreed && <p style={{ color: "#ff4444", fontSize: 11, marginTop: -12, fontFamily: "var(--font-jakarta)" }}>{errors.agreed}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                background: status === "loading" ? "#555" : "#CEFF05",
                color: "#000", fontWeight: 700, fontSize: 14,
                padding: "16px", borderRadius: 12, border: "none",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                fontFamily: "var(--font-inter)",
                boxShadow: status === "loading" ? "none" : "0 0 32px rgba(206,255,5,0.25)",
                transition: "all 0.2s ease",
                width: "100%",
              }}
            >
              {status === "loading" ? "Sending..." : "Send Order Request →"}
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}
