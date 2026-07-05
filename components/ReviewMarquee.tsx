"use client";

import type { Review } from "@/data/books";

type Props = { reviews: Review[] };

export default function ReviewMarquee({ reviews }: Props) {
  // Duplicate enough times to fill wide screens without gaps
  const items = [...reviews, ...reviews, ...reviews];

  return (
    <section
      className="py-10 border-b border-(--line) overflow-hidden"
      aria-label="Reader reviews"
    >
      <div className="marquee-track flex gap-6 w-max">
        {items.map((r, i) => (
          <div
            key={i}
            className="shrink-0 w-80 border border-(--line) bg-(--bg2) px-7 py-6"
          >
            <div className="text-sm text-(--accent) mb-3 tracking-widest">
              {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
            </div>
            <p className="font-serif text-lg italic text-(--cream) leading-snug mb-3">
              &ldquo;{r.title}&rdquo;
            </p>
            <p className="text-(--cream-dim) text-sm leading-relaxed line-clamp-3">
              {r.quote}
            </p>
            <p className="text-xs tracking-widest uppercase text-(--cream-dim)/60 mt-4">
              {r.source}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
