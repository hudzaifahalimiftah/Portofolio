"use client";
import { useState } from "react";
import AdminPage from "@/app/admin/page";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res  = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();

      if (json.success) {
        setUnlocked(true);
      } else {
        setError(json.message ?? "Wrong password.");
        setPassword("");
      }
    } catch {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  if (unlocked) return <AdminPage />;

  return (
    <main style={{
      background: "transparent", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 40 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: "#CEFF05",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 16,
          }}>
            <span style={{ color: "#000", fontWeight: 900, fontSize: 16, fontFamily: "var(--font-inter)" }}>AL</span>
          </div>
          <h1 style={{
            color: "#F5F5F5", fontSize: 24, fontWeight: 900,
            letterSpacing: "-0.04em", fontFamily: "var(--font-inter)", marginBottom: 6,
          }}>
            Admin Only.
          </h1>
          <p style={{ color: "#444", fontSize: 13, fontFamily: "var(--font-jakarta)", textAlign: "center" }}>
            This page can only be accessed by{" "}
            <span style={{ color: "#CEFF05", fontWeight: 700 }}>Ali</span>.
          </p>
        </div>

        {/* Form */}
        <div style={{ background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 24, padding: 32 }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{
                display: "block", color: "#444", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                marginBottom: 8, fontFamily: "var(--font-inter)",
              }}>
                Password
              </label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                style={{
                  width: "100%", background: "#111",
                  border: `1.5px solid ${error ? "#ff4444" : "#1A1A1A"}`,
                  borderRadius: 12, outline: "none", color: "#F5F5F5",
                  fontSize: 16, fontWeight: 500, padding: "12px 16px",
                  transition: "border-color 0.2s ease",
                  fontFamily: "var(--font-jakarta)", boxSizing: "border-box",
                  letterSpacing: "0.1em",
                }}
              />
              {error && (
                <p style={{ color: "#ff4444", fontSize: 12, marginTop: 8, fontFamily: "var(--font-jakarta)" }}>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#555" : "#CEFF05",
                color: "#000", fontWeight: 700, fontSize: 14,
                padding: "14px", borderRadius: 12, border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "var(--font-inter)",
                boxShadow: loading ? "none" : "0 0 24px rgba(206,255,5,0.2)",
                transition: "all 0.2s ease", width: "100%",
              }}
            >
              {loading ? "Checking..." : "Enter →"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
