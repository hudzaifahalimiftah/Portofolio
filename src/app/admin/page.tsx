"use client";
import { useState } from "react";
import dataRaw from "@/data/data.json";

type Project     = typeof dataRaw.projects[number];
type Achievement = typeof dataRaw.achievements[number];
type Experience  = typeof dataRaw.experience[number];
type Tab = "project" | "achievement" | "experience" | "hafiz";

interface ProjectForm { name: string; description: string; stack: string; status: string; github: string; demo: string; }
interface AchievementForm { title: string; event: string; medal: string; category: string; year: string; }
interface ExperienceForm { company: string; role: string; period: string; type: string; tasks: string; tags: string; }
interface HafizForm { current: number; note: string; }

const inp = (focused: boolean): React.CSSProperties => ({
  width: "100%", background: "#0A0A0A",
  border: `1.5px solid ${focused ? "#CEFF05" : "#1A1A1A"}`,
  borderRadius: 12, outline: "none", color: "#F5F5F5",
  fontSize: 14, fontWeight: 500, padding: "12px 16px",
  transition: "border-color 0.2s ease", fontFamily: "var(--font-jakarta)", boxSizing: "border-box",
});
const lbl: React.CSSProperties = {
  display: "block", color: "#444", fontSize: 10, fontWeight: 700,
  letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-inter)",
};
const medalIcon: Record<string, string> = { Gold: "🥇", Silver: "🥈", Bronze: "🥉", Participant: "🏅" };
const abtn = (color: string): React.CSSProperties => ({
  background: "transparent", border: `1.5px solid ${color}`, color,
  borderRadius: 8, padding: "4px 12px", fontSize: 11, fontWeight: 700,
  cursor: "pointer", fontFamily: "var(--font-inter)", transition: "all 0.15s ease",
});

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("project");
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [liveData, setLiveData] = useState(dataRaw);

  // edit-mode: which item is being edited
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  // add-form states
  const [project, setProject] = useState<ProjectForm>({ name: "", description: "", stack: "", status: "Completed", github: "", demo: "" });
  const [achievement, setAchievement] = useState<AchievementForm>({ title: "", event: "", medal: "Gold", category: "", year: new Date().getFullYear().toString() });
  const [experience, setExperience] = useState<ExperienceForm>({ company: "", role: "", period: "", type: "Internship", tasks: "", tags: "" });
  const [hafiz, setHafiz] = useState<HafizForm>({ current: dataRaw.hafiz.current, note: dataRaw.hafiz.note });

  // ── helpers ──────────────────────────────────────────────────────────────
  const notify = (msg: string, type: "success" | "error" = "success") => {
    setStatus(type); setStatusMsg(msg);
    setTimeout(() => setStatus("idle"), 4000);
  };

  const saveToApi = async (data: typeof liveData, msg: string) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/update", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message ?? "Unknown error");
      setLiveData(data);
      notify(msg);
    } catch (err) {
      notify(err instanceof Error ? err.message : "Failed to save.", "error");
    }
  };

  // ── ADD handlers ─────────────────────────────────────────────────────────
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...liveData,
      projects: [...liveData.projects, {
        id: liveData.projects.length + 1,
        name: project.name, description: project.description,
        stack: project.stack.split(",").map(s => s.trim()).filter(Boolean),
        status: project.status, github: project.github || "#",
        demo: (project.demo || null) as null, featured: false,
      }],
    };
    await saveToApi(updated, `Project "${project.name}" added!`);
    setProject({ name: "", description: "", stack: "", status: "Completed", github: "", demo: "" });
  };

  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...liveData,
      achievements: [...liveData.achievements, {
        id: liveData.achievements.length + 1,
        title: achievement.title, event: achievement.event,
        category: achievement.category, medal: achievement.medal,
        year: achievement.year, icon: medalIcon[achievement.medal] ?? "🏅",
      }],
    };
    await saveToApi(updated, `Achievement "${achievement.title}" added!`);
    setAchievement({ title: "", event: "", medal: "Gold", category: "", year: new Date().getFullYear().toString() });
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...liveData,
      experience: [...liveData.experience, {
        id: liveData.experience.length + 1,
        company: experience.company, role: experience.role,
        period: experience.period, type: experience.type,
        tasks: experience.tasks.split("\n").map(t => t.trim()).filter(Boolean),
        tags: experience.tags.split(",").map(t => t.trim()).filter(Boolean),
      }],
    };
    await saveToApi(updated, `Experience "${experience.company}" added!`);
    setExperience({ company: "", role: "", period: "", type: "Internship", tasks: "", tags: "" });
  };

  const handleUpdateHafiz = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...liveData, hafiz: { ...liveData.hafiz, current: hafiz.current, note: hafiz.note } };
    await saveToApi(updated, `Hafiz updated to ${hafiz.current} Juz!`);
  };

  // ── EDIT save handlers ────────────────────────────────────────────────────
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const updated = {
      ...liveData,
      projects: liveData.projects.map(p => p.id === editingProject.id ? editingProject : p),
    };
    await saveToApi(updated, `Project "${editingProject.name}" updated!`);
    setEditingProject(null);
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement) return;
    const updated = {
      ...liveData,
      achievements: liveData.achievements.map(a => a.id === editingAchievement.id
        ? { ...editingAchievement, icon: medalIcon[editingAchievement.medal] ?? "🏅" }
        : a),
    };
    await saveToApi(updated, `Achievement "${editingAchievement.title}" updated!`);
    setEditingAchievement(null);
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;
    const updated = {
      ...liveData,
      experience: liveData.experience.map(ex => ex.id === editingExperience.id ? editingExperience : ex),
    };
    await saveToApi(updated, `Experience "${editingExperience.company}" updated!`);
    setEditingExperience(null);
  };

  // ── DELETE handlers ───────────────────────────────────────────────────────
  const deleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    const updated = { ...liveData, projects: liveData.projects.filter(p => p.id !== id) };
    await saveToApi(updated, "Project deleted.");
  };

  const deleteAchievement = async (id: number) => {
    if (!confirm("Delete this achievement?")) return;
    const updated = { ...liveData, achievements: liveData.achievements.filter(a => a.id !== id) };
    await saveToApi(updated, "Achievement deleted.");
  };

  const deleteExperience = async (id: number) => {
    if (!confirm("Delete this experience?")) return;
    const updated = { ...liveData, experience: liveData.experience.filter(ex => ex.id !== id) };
    await saveToApi(updated, "Experience deleted.");
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "project",     label: "Projects" },
    { key: "achievement", label: "Achievements" },
    { key: "experience",  label: "Experience" },
    { key: "hafiz",       label: "Hafiz" },
  ];

  const statusBanner = (
    <>
      {status === "success" && (
        <div style={{ background: "#0f1a00", border: "1.5px solid #CEFF05", borderRadius: 12, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#CEFF05" }}>✓</span>
          <p style={{ color: "#CEFF05", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-jakarta)" }}>{statusMsg}</p>
        </div>
      )}
      {status === "error" && (
        <div style={{ background: "#1a0000", border: "1.5px solid #ff4444", borderRadius: 12, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#ff4444" }}>✕</span>
          <p style={{ color: "#ff4444", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-jakarta)" }}>Error: {statusMsg}</p>
        </div>
      )}
    </>
  );

  const submitBtn = (label = "Push to JSON →") => (
    <button type="submit" disabled={status === "loading"} style={{
      background: status === "loading" ? "#555" : "#CEFF05", color: "#000",
      fontWeight: 700, fontSize: 14, padding: "14px 32px", borderRadius: 12,
      border: "none", cursor: status === "loading" ? "not-allowed" : "pointer",
      alignSelf: "flex-start", fontFamily: "var(--font-inter)",
      boxShadow: status === "loading" ? "none" : "0 0 24px rgba(206,255,5,0.2)",
      transition: "all 0.2s ease",
    }}>
      {status === "loading" ? "Saving..." : label}
    </button>
  );

  return (
    <main style={{ background: "transparent", minHeight: "100vh", padding: "120px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1.5px solid #1A1A1A", borderRadius: 999, padding: "5px 14px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#CEFF05", boxShadow: "0 0 8px #CEFF05" }} />
            <span style={{ color: "#555", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>Admin · Live CMS</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.0, color: "#F5F5F5", fontFamily: "var(--font-inter)", marginBottom: 12 }}>
            ADMIN<br /><span style={{ color: "#1A1A1A" }}>GATEWAY.</span>
          </h1>
        </div>

        {/* Snapshot */}
        <div style={{ background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 24, padding: 24, marginBottom: 32 }}>
          <p style={{ ...lbl, marginBottom: 16 }}>Live Snapshot</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { label: "Projects",     value: liveData.projects.length },
              { label: "Achievements", value: liveData.achievements.length },
              { label: "Experience",   value: liveData.experience.length },
              { label: "Hafiz",        value: `${liveData.hafiz.current}/${liveData.hafiz.total} Juz` },
            ].map(s => (
              <div key={s.label} style={{ background: "#111", border: "1.5px solid #1A1A1A", borderRadius: 16, padding: "16px 20px" }}>
                <p style={{ color: "#333", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-inter)" }}>{s.label}</p>
                <p style={{ color: "#CEFF05", fontSize: 22, fontWeight: 900, fontFamily: "var(--font-inter)" }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 16, padding: 4 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setEditingProject(null); setEditingAchievement(null); setEditingExperience(null); }} style={{
              flex: 1, padding: "10px 16px", borderRadius: 12, border: "none", cursor: "pointer",
              background: tab === t.key ? "#1A1A1A" : "transparent",
              color: tab === t.key ? "#F5F5F5" : "#444",
              fontSize: 12, fontWeight: 700, fontFamily: "var(--font-inter)", transition: "all 0.15s ease",
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── PROJECTS TAB ── */}
        {tab === "project" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {statusBanner}

            {/* Existing projects list */}
            <div style={{ background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 24, padding: 24 }}>
              <p style={{ ...lbl, marginBottom: 16 }}>Existing Projects</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {liveData.projects.map(p => (
                  <div key={p.id}>
                    {editingProject?.id === p.id ? (
                      <form onSubmit={handleSaveProject} style={{ background: "#111", border: "1.5px solid #CEFF05", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                        <p style={{ ...lbl, color: "#CEFF05" }}>Editing: {p.name}</p>
                        <input required value={editingProject.name} onChange={e => setEditingProject({ ...editingProject, name: e.target.value })} placeholder="Name" style={inp(focused === "ep-name")} onFocus={() => setFocused("ep-name")} onBlur={() => setFocused(null)} />
                        <textarea required rows={2} value={editingProject.description} onChange={e => setEditingProject({ ...editingProject, description: e.target.value })} placeholder="Description" style={{ ...inp(focused === "ep-desc"), resize: "none" }} onFocus={() => setFocused("ep-desc")} onBlur={() => setFocused(null)} />
                        <input required value={Array.isArray(editingProject.stack) ? editingProject.stack.join(", ") : editingProject.stack} onChange={e => setEditingProject({ ...editingProject, stack: e.target.value.split(",").map(s => s.trim()) })} placeholder="Stack (comma separated)" style={inp(focused === "ep-stack")} onFocus={() => setFocused("ep-stack")} onBlur={() => setFocused(null)} />
                        <select value={editingProject.status} onChange={e => setEditingProject({ ...editingProject, status: e.target.value })} style={{ ...inp(false), cursor: "pointer", appearance: "none" }}>
                          {["Completed", "In Progress", "Planned"].map(s => <option key={s} style={{ background: "#0A0A0A" }}>{s}</option>)}
                        </select>
                        <input value={editingProject.github ?? ""} onChange={e => setEditingProject({ ...editingProject, github: e.target.value })} placeholder="GitHub URL" style={inp(focused === "ep-git")} onFocus={() => setFocused("ep-git")} onBlur={() => setFocused(null)} />
                        <div style={{ display: "flex", gap: 8 }}>
                          <button type="submit" style={{ ...abtn("#CEFF05"), background: "#CEFF05", color: "#000" }}>Save</button>
                          <button type="button" onClick={() => setEditingProject(null)} style={abtn("#555")}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div style={{ background: "#111", border: "1.5px solid #1A1A1A", borderRadius: 16, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                        <div>
                          <p style={{ color: "#F5F5F5", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-inter)" }}>{p.name}</p>
                          <p style={{ color: "#444", fontSize: 11, fontFamily: "var(--font-jakarta)", marginTop: 2 }}>{p.status} · {Array.isArray(p.stack) ? p.stack.join(", ") : p.stack}</p>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                          <button onClick={() => setEditingProject(p)} style={abtn("#CEFF05")}>Edit</button>
                          <button onClick={() => deleteProject(p.id)} style={abtn("#ff4444")}>Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Add new project */}
            <div style={{ background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 24, padding: 24 }}>
              <p style={{ ...lbl, marginBottom: 16 }}>Add New Project</p>
              <form onSubmit={handleAddProject} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div><label style={lbl}>Name *</label><input required value={project.name} onChange={e => setProject({ ...project, name: e.target.value })} placeholder="e.g. Sistem Absensi QR" style={inp(focused === "pname")} onFocus={() => setFocused("pname")} onBlur={() => setFocused(null)} /></div>
                <div><label style={lbl}>Description *</label><textarea required rows={3} value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} placeholder="Describe the project..." style={{ ...inp(focused === "pdesc"), resize: "none" }} onFocus={() => setFocused("pdesc")} onBlur={() => setFocused(null)} /></div>
                <div><label style={lbl}>Stack (comma separated) *</label><input required value={project.stack} onChange={e => setProject({ ...project, stack: e.target.value })} placeholder="React, Laravel, MySQL" style={inp(focused === "pstack")} onFocus={() => setFocused("pstack")} onBlur={() => setFocused(null)} /></div>
                <div><label style={lbl}>Status</label>
                  <select value={project.status} onChange={e => setProject({ ...project, status: e.target.value })} style={{ ...inp(false), cursor: "pointer", appearance: "none" }}>
                    {["Completed", "In Progress", "Planned"].map(s => <option key={s} style={{ background: "#0A0A0A" }}>{s}</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={lbl}>GitHub URL</label><input type="url" value={project.github} onChange={e => setProject({ ...project, github: e.target.value })} placeholder="https://github.com/..." style={inp(focused === "pgit")} onFocus={() => setFocused("pgit")} onBlur={() => setFocused(null)} /></div>
                  <div><label style={lbl}>Demo URL</label><input type="url" value={project.demo} onChange={e => setProject({ ...project, demo: e.target.value })} placeholder="https://..." style={inp(focused === "pdemo")} onFocus={() => setFocused("pdemo")} onBlur={() => setFocused(null)} /></div>
                </div>
                {submitBtn("Add Project →")}
              </form>
            </div>
          </div>
        )}

        {/* ── ACHIEVEMENTS TAB ── */}
        {tab === "achievement" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {statusBanner}

            <div style={{ background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 24, padding: 24 }}>
              <p style={{ ...lbl, marginBottom: 16 }}>Existing Achievements</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {liveData.achievements.map(a => (
                  <div key={a.id}>
                    {editingAchievement?.id === a.id ? (
                      <form onSubmit={handleSaveAchievement} style={{ background: "#111", border: "1.5px solid #CEFF05", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                        <p style={{ ...lbl, color: "#CEFF05" }}>Editing: {a.title}</p>
                        <input required value={editingAchievement.title} onChange={e => setEditingAchievement({ ...editingAchievement, title: e.target.value })} placeholder="Title" style={inp(focused === "ea-title")} onFocus={() => setFocused("ea-title")} onBlur={() => setFocused(null)} />
                        <input required value={editingAchievement.event} onChange={e => setEditingAchievement({ ...editingAchievement, event: e.target.value })} placeholder="Event" style={inp(focused === "ea-event")} onFocus={() => setFocused("ea-event")} onBlur={() => setFocused(null)} />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                          <select value={editingAchievement.medal} onChange={e => setEditingAchievement({ ...editingAchievement, medal: e.target.value })} style={{ ...inp(false), cursor: "pointer", appearance: "none" }}>
                            {["Gold","Silver","Bronze","Participant"].map(m => <option key={m} style={{ background: "#0A0A0A" }}>{m}</option>)}
                          </select>
                          <input required value={editingAchievement.category} onChange={e => setEditingAchievement({ ...editingAchievement, category: e.target.value })} placeholder="Category" style={inp(focused === "ea-cat")} onFocus={() => setFocused("ea-cat")} onBlur={() => setFocused(null)} />
                          <input value={editingAchievement.year} onChange={e => setEditingAchievement({ ...editingAchievement, year: e.target.value })} placeholder="Year" style={inp(focused === "ea-year")} onFocus={() => setFocused("ea-year")} onBlur={() => setFocused(null)} />
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button type="submit" style={{ ...abtn("#CEFF05"), background: "#CEFF05", color: "#000" }}>Save</button>
                          <button type="button" onClick={() => setEditingAchievement(null)} style={abtn("#555")}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div style={{ background: "#111", border: "1.5px solid #1A1A1A", borderRadius: 16, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                        <div>
                          <p style={{ color: "#F5F5F5", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-inter)" }}>{a.icon} {a.title}</p>
                          <p style={{ color: "#444", fontSize: 11, fontFamily: "var(--font-jakarta)", marginTop: 2 }}>{a.event} · {a.year}</p>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                          <button onClick={() => setEditingAchievement(a)} style={abtn("#CEFF05")}>Edit</button>
                          <button onClick={() => deleteAchievement(a.id)} style={abtn("#ff4444")}>Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 24, padding: 24 }}>
              <p style={{ ...lbl, marginBottom: 16 }}>Add New Achievement</p>
              <form onSubmit={handleAddAchievement} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div><label style={lbl}>Title *</label><input required value={achievement.title} onChange={e => setAchievement({ ...achievement, title: e.target.value })} placeholder="e.g. Gold Medal — Web Design" style={inp(focused === "atitle")} onFocus={() => setFocused("atitle")} onBlur={() => setFocused(null)} /></div>
                <div><label style={lbl}>Event *</label><input required value={achievement.event} onChange={e => setAchievement({ ...achievement, event: e.target.value })} placeholder="e.g. LKS Nasional 2025" style={inp(focused === "aevent")} onFocus={() => setFocused("aevent")} onBlur={() => setFocused(null)} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <div><label style={lbl}>Medal</label>
                    <select value={achievement.medal} onChange={e => setAchievement({ ...achievement, medal: e.target.value })} style={{ ...inp(false), cursor: "pointer", appearance: "none" }}>
                      {["Gold","Silver","Bronze","Participant"].map(m => <option key={m} style={{ background: "#0A0A0A" }}>{m}</option>)}
                    </select>
                  </div>
                  <div><label style={lbl}>Category *</label><input required value={achievement.category} onChange={e => setAchievement({ ...achievement, category: e.target.value })} placeholder="Informatics" style={inp(focused === "acat")} onFocus={() => setFocused("acat")} onBlur={() => setFocused(null)} /></div>
                  <div><label style={lbl}>Year</label><input value={achievement.year} onChange={e => setAchievement({ ...achievement, year: e.target.value })} placeholder="2025" style={inp(focused === "ayear")} onFocus={() => setFocused("ayear")} onBlur={() => setFocused(null)} /></div>
                </div>
                {submitBtn("Add Achievement →")}
              </form>
            </div>
          </div>
        )}

        {/* ── EXPERIENCE TAB ── */}
        {tab === "experience" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {statusBanner}

            <div style={{ background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 24, padding: 24 }}>
              <p style={{ ...lbl, marginBottom: 16 }}>Existing Experience</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {liveData.experience.map(ex => (
                  <div key={ex.id}>
                    {editingExperience?.id === ex.id ? (
                      <form onSubmit={handleSaveExperience} style={{ background: "#111", border: "1.5px solid #CEFF05", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                        <p style={{ ...lbl, color: "#CEFF05" }}>Editing: {ex.company}</p>
                        <input required value={editingExperience.company} onChange={e => setEditingExperience({ ...editingExperience, company: e.target.value })} placeholder="Company" style={inp(focused === "ee-co")} onFocus={() => setFocused("ee-co")} onBlur={() => setFocused(null)} />
                        <input required value={editingExperience.role} onChange={e => setEditingExperience({ ...editingExperience, role: e.target.value })} placeholder="Role" style={inp(focused === "ee-role")} onFocus={() => setFocused("ee-role")} onBlur={() => setFocused(null)} />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          <input value={editingExperience.period} onChange={e => setEditingExperience({ ...editingExperience, period: e.target.value })} placeholder="Period e.g. 2024" style={inp(focused === "ee-period")} onFocus={() => setFocused("ee-period")} onBlur={() => setFocused(null)} />
                          <input value={editingExperience.type} onChange={e => setEditingExperience({ ...editingExperience, type: e.target.value })} placeholder="Type e.g. Internship" style={inp(focused === "ee-type")} onFocus={() => setFocused("ee-type")} onBlur={() => setFocused(null)} />
                        </div>
                        <textarea rows={4} value={Array.isArray(editingExperience.tasks) ? editingExperience.tasks.join("\n") : editingExperience.tasks} onChange={e => setEditingExperience({ ...editingExperience, tasks: e.target.value.split("\n") })} placeholder="Tasks (one per line)" style={{ ...inp(focused === "ee-tasks"), resize: "none" }} onFocus={() => setFocused("ee-tasks")} onBlur={() => setFocused(null)} />
                        <input value={Array.isArray(editingExperience.tags) ? editingExperience.tags.join(", ") : editingExperience.tags} onChange={e => setEditingExperience({ ...editingExperience, tags: e.target.value.split(",").map(t => t.trim()) })} placeholder="Tags (comma separated)" style={inp(focused === "ee-tags")} onFocus={() => setFocused("ee-tags")} onBlur={() => setFocused(null)} />
                        <div style={{ display: "flex", gap: 8 }}>
                          <button type="submit" style={{ ...abtn("#CEFF05"), background: "#CEFF05", color: "#000" }}>Save</button>
                          <button type="button" onClick={() => setEditingExperience(null)} style={abtn("#555")}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div style={{ background: "#111", border: "1.5px solid #1A1A1A", borderRadius: 16, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                        <div>
                          <p style={{ color: "#F5F5F5", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-inter)" }}>{ex.company}</p>
                          <p style={{ color: "#444", fontSize: 11, fontFamily: "var(--font-jakarta)", marginTop: 2 }}>{ex.role} · {ex.period}</p>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                          <button onClick={() => setEditingExperience(ex)} style={abtn("#CEFF05")}>Edit</button>
                          <button onClick={() => deleteExperience(ex.id)} style={abtn("#ff4444")}>Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 24, padding: 24 }}>
              <p style={{ ...lbl, marginBottom: 16 }}>Add New Experience</p>
              <form onSubmit={handleAddExperience} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div><label style={lbl}>Company *</label><input required value={experience.company} onChange={e => setExperience({ ...experience, company: e.target.value })} placeholder="PT Example" style={inp(focused === "eco")} onFocus={() => setFocused("eco")} onBlur={() => setFocused(null)} /></div>
                <div><label style={lbl}>Role *</label><input required value={experience.role} onChange={e => setExperience({ ...experience, role: e.target.value })} placeholder="Frontend Developer" style={inp(focused === "erole")} onFocus={() => setFocused("erole")} onBlur={() => setFocused(null)} /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={lbl}>Period</label><input value={experience.period} onChange={e => setExperience({ ...experience, period: e.target.value })} placeholder="2024" style={inp(focused === "eperiod")} onFocus={() => setFocused("eperiod")} onBlur={() => setFocused(null)} /></div>
                  <div><label style={lbl}>Type</label><input value={experience.type} onChange={e => setExperience({ ...experience, type: e.target.value })} placeholder="Internship" style={inp(focused === "etype")} onFocus={() => setFocused("etype")} onBlur={() => setFocused(null)} /></div>
                </div>
                <div><label style={lbl}>Tasks (one per line)</label><textarea rows={4} value={experience.tasks} onChange={e => setExperience({ ...experience, tasks: e.target.value })} placeholder={"Membuat UI\nMengelola database"} style={{ ...inp(focused === "etasks"), resize: "none" }} onFocus={() => setFocused("etasks")} onBlur={() => setFocused(null)} /></div>
                <div><label style={lbl}>Tags (comma separated)</label><input value={experience.tags} onChange={e => setExperience({ ...experience, tags: e.target.value })} placeholder="React, Laravel" style={inp(focused === "etags")} onFocus={() => setFocused("etags")} onBlur={() => setFocused(null)} /></div>
                {submitBtn("Add Experience →")}
              </form>
            </div>
          </div>
        )}

        {/* ── HAFIZ TAB ── */}
        {tab === "hafiz" && (
          <div style={{ background: "#0A0A0A", border: "1.5px solid #1A1A1A", borderRadius: 24, padding: 32 }}>
            {statusBanner}
            <form onSubmit={handleUpdateHafiz} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ background: "#111", border: "1.5px solid #1A1A1A", borderRadius: 16, padding: 20 }}>
                <p style={{ color: "#555", fontSize: 13, fontFamily: "var(--font-jakarta)" }}>
                  Current: <span style={{ color: "#CEFF05", fontWeight: 700 }}>{liveData.hafiz.current} / {liveData.hafiz.total} Juz</span>
                </p>
              </div>
              <div><label style={lbl}>New Juz Count (1–30)</label>
                <input type="number" min={1} max={30} value={hafiz.current} onChange={e => setHafiz({ ...hafiz, current: Number(e.target.value) })} style={inp(focused === "hjuz")} onFocus={() => setFocused("hjuz")} onBlur={() => setFocused(null)} />
              </div>
              <div><label style={lbl}>Note</label>
                <input type="text" value={hafiz.note} onChange={e => setHafiz({ ...hafiz, note: e.target.value })} style={inp(focused === "hnote")} onFocus={() => setFocused("hnote")} onBlur={() => setFocused(null)} />
              </div>
              {submitBtn("Update Hafiz →")}
            </form>
          </div>
        )}

      </div>
    </main>
  );
}
