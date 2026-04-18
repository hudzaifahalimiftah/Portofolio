"use client";

const skills = ["React", "PHP", "Laravel", "Canva", "CapCut", "Figma", "MySQL", "Tailwind"];

export default function SkillChips() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
      {skills.map((sk) => (
        <span
          key={sk}
          style={{
            border: "1.5px solid #1A1A1A",
            borderRadius: 999,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            color: "#888",
            fontFamily: "var(--font-jakarta)",
            transition: "all 0.15s ease",
            cursor: "default",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "#CEFF05";
            (e.currentTarget as HTMLElement).style.color = "#CEFF05";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A";
            (e.currentTarget as HTMLElement).style.color = "#888";
          }}
        >
          {sk}
        </span>
      ))}
    </div>
  );
}
