"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/data/books";

type Props = { reviews: Review[] };

export default function ReviewRotator({ reviews }: Props) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const touchStart = useRef(0);
  const n = reviews.length;

  // Desktop: auto-rotate every 9s
  useEffect(() => {
    if (n < 2) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setActive((i) => (i + 1) % n); setVisible(true); }, 500);
    }, 9000);
    return () => clearInterval(id);
  }, [n]);

  function go(dir: 1 | -1) {
    setActive((i) => (i + dir + n) % n);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) go(delta > 0 ? 1 : -1);
  }

  const r = reviews[active];

  // Position of each card relative to active: -2 -1 0 1 2
  function offset(i: number) {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }

  return (
    <section className="border-b border-(--line)" aria-label="Reader reviews">

      {/* ── MOBILE: 3D carousel ── */}
      <div
        className="md:hidden py-10 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-96" style={{ perspective: "1000px" }}>
          {reviews.map((rev, i) => {
            const d = offset(i);
            const abs = Math.abs(d);
            if (abs > 1) return null;

            const translateX = d * 72;
            const rotateY = d * -22;
            const scale = abs === 0 ? 1 : 0.82;
            const opacity = abs === 0 ? 1 : 0.45;
            const zIndex = abs === 0 ? 10 : 5;

            return (
              <div
                key={i}
                onClick={() => abs > 0 && go(d > 0 ? 1 : -1)}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "8%",
                  right: "8%",
                  transform: `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "transform 0.45s cubic-bezier(.23,1,.32,1), opacity 0.45s ease",
                  transformStyle: "preserve-3d",
                  cursor: abs > 0 ? "pointer" : "default",
                }}
              >
                <div className="h-full border border-(--accent)/20 bg-(--cream) px-6 py-8 flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="text-sm text-(--accent) mb-4 tracking-widest">
                      {"★".repeat(rev.stars)}{"☆".repeat(5 - rev.stars)}
                    </div>
                    <p className="font-serif text-base italic text-(--ink) leading-relaxed mb-3 line-clamp-7">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>
                  <p className="text-xs tracking-widest uppercase mt-2" style={{ color: "#7a6e63" }}>
                    {rev.source}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Reviews">
          {reviews.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Review ${i + 1}`}
              onClick={() => setActive(i)}
              className="w-1.5 h-1.5 rounded-full transition-[background-color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-(--accent)"
              style={{
                backgroundColor: i === active ? "var(--accent)" : "var(--line)",
                transform: i === active ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: fading quote ── */}
      <div className="hidden md:block py-16 px-6 text-center bg-(--cream)">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="text-base text-(--accent) mb-5 tracking-widest">
            {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
          </div>
          <blockquote
            className="font-serif text-lg md:text-2xl italic text-(--ink) max-w-2xl mx-auto leading-relaxed mb-6"
            style={{ textWrap: "balance" }}
          >
            &ldquo;{r.quote}&rdquo;
          </blockquote>
          <p className="text-xs tracking-widest uppercase" style={{ color: "#7a6e63" }}>{r.source}</p>
        </div>
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Reviews">
          {reviews.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Review ${i + 1}`}
              onClick={() => { setVisible(false); setTimeout(() => { setActive(i); setVisible(true); }, 300); }}
              className="w-1.5 h-1.5 rounded-full transition-[background-color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-(--accent)"
              style={{
                backgroundColor: i === active ? "var(--accent)" : "var(--line)",
                transform: i === active ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
