"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  wide?: boolean;
};

export default function BookReveal({ src, alt, wide = false }: Props) {
  const [phase, setPhase] = useState<"hidden" | "flash" | "revealing" | "done">("hidden");

  function reveal() {
    if (phase !== "hidden") return;
    setPhase("flash");
    setTimeout(() => setPhase("revealing"), 350);
    setTimeout(() => setPhase("done"), 1600);
  }

  return (
    <div className="relative w-full shadow-2xl shadow-black/80 overflow-hidden" style={{ cursor: phase === "hidden" ? "pointer" : "default" }} onClick={reveal}>

      {/* THE COVER — natural dimensions, no crop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto block" />

      {/* SHIMMER SWEEP — runs once during revealing */}
      {(phase === "revealing" || phase === "done") && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, transparent 30%, rgba(200,162,74,0.55) 50%, transparent 70%)",
            animation: "shimmer-sweep 1.1s cubic-bezier(.23,1,.32,1) forwards",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
      )}

      {/* LIGHT RAYS — radiate on reveal */}
      {phase === "revealing" && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none" }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "2px",
                height: "120%",
                background: "linear-gradient(to top, transparent, rgba(200,162,74,0.4), transparent)",
                transformOrigin: "bottom center",
                transform: `rotate(${i * 45}deg) translateX(-50%)`,
                animation: "ray-fade 0.9s ease-out forwards",
                animationDelay: `${i * 30}ms`,
              }}
            />
          ))}
        </div>
      )}

      {/* OVERLAY — tears away on reveal */}
      <div
        aria-hidden={phase !== "hidden"}
        style={{
          position: "absolute",
          inset: 0,
          background: "#0d0c10",
          zIndex: 10,
          transition: phase === "revealing" ? "clip-path 1.1s cubic-bezier(.23,1,.32,1), opacity 1.1s ease" : "none",
          clipPath: phase === "revealing" || phase === "done"
            ? "circle(0% at 50% 50%)"
            : "circle(150% at 50% 50%)",
          opacity: phase === "done" ? 0 : 1,
          pointerEvents: phase === "hidden" ? "auto" : "none",
        }}
      >
        {/* Title on overlay */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", gap: "1.5rem" }}>
          <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", fontStyle: "italic", color: "rgba(243,236,225,0.5)", letterSpacing: "0.2em", textAlign: "center", lineHeight: 1.4, textTransform: "uppercase" }}>
            Coming Soon
          </p>
          <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 300, color: "#f3ece1", letterSpacing: "0.02em", textAlign: "center", lineHeight: 1.1 }}>
            The Blink He<br />Waited For
          </p>

          {/* Pulsing reveal button */}
          <button
            onClick={reveal}
            style={{
              marginTop: "0.5rem",
              padding: "0.6rem 1.5rem",
              border: "1px solid rgba(200,162,74,0.6)",
              background: "transparent",
              color: "#c8a24a",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              animation: "pulse-border 2s ease-in-out infinite",
            }}
          >
            Reveal Cover
          </button>
        </div>
      </div>

      {/* WHITE FLASH */}
      {phase === "flash" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            zIndex: 30,
            animation: "flash-out 0.35s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      )}

      <style>{`
        @keyframes flash-out {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-100%); opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        @keyframes ray-fade {
          0%   { opacity: 0.8; transform: rotate(var(--r, 0deg)) translateX(-50%) scaleY(0.3); }
          60%  { opacity: 0.5; transform: rotate(var(--r, 0deg)) translateX(-50%) scaleY(1.2); }
          100% { opacity: 0; transform: rotate(var(--r, 0deg)) translateX(-50%) scaleY(1); }
        }
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200,162,74,0); border-color: rgba(200,162,74,0.6); }
          50%       { box-shadow: 0 0 12px 3px rgba(200,162,74,0.25); border-color: rgba(200,162,74,1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pulse-border { 0%, 100% {} }
          @keyframes shimmer-sweep { 0%, 100% {} }
          @keyframes flash-out { 0%, 100% { opacity: 0; } }
        }
      `}</style>
    </div>
  );
}
