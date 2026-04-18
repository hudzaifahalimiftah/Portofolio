"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  src?: string;
  name: string;
  size?: number;
  style?: React.CSSProperties;
}

export default function ProfileAvatar({ src = "/profile.jpg", name, size = 96, style }: Props) {
  const [error, setError] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (error || !src) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        <span
          style={{
            color: "#CEFF05",
            fontWeight: 900,
            fontSize: size * 0.28,
            fontFamily: "var(--font-inter)",
            letterSpacing: "-0.04em",
          }}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ objectFit: "cover", borderRadius: "50%", ...style }}
      onError={() => setError(true)}
      unoptimized
    />
  );
}
