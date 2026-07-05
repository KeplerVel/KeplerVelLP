"use client";

import { useEffect, useState } from "react";
import { buildAmazonUrl } from "@/lib/amazon";

type Props = {
  asin: string;
  label?: string;
  variant?: "primary" | "outline";
  className?: string;
};

export default function AmazonButton({
  asin,
  label = "Read on Amazon",
  variant = "primary",
  className = "",
}: Props) {
  const [href, setHref] = useState(`https://www.amazon.com/dp/${asin}`);

  useEffect(() => {
    buildAmazonUrl(asin).then(setHref);
  }, [asin]);

  const base =
    "inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-widest uppercase transition-[background-color,transform,opacity] duration-200 rounded-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-[.98] touch-action-manipulation";

  const styles =
    variant === "primary"
      ? "bg-[var(--accent)] text-[var(--btn-ink)] hover:bg-[var(--accent-soft)]"
      : "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--btn-ink)]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M1 7h12M7 1l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
