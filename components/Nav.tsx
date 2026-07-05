"use client";

import Link from "next/link";
import AmazonButton from "./AmazonButton";
import { books } from "@/data/books";

export default function Nav() {
  const book = books[0];
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-[var(--ink)]/90 backdrop-blur-sm border-b border-[var(--line)]">
      <Link
        href="/"
        className="font-serif text-xl tracking-wide text-[var(--cream)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
      >
        Kepler <span className="text-[var(--accent)]">Vel</span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/books/the-art-of-almost-being-chosen"
          className="hidden md:block text-xs tracking-widest uppercase text-[var(--cream-dim)] hover:text-[var(--cream)] transition-[color] duration-150 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
        >
          The Book
        </Link>
        <AmazonButton asin={book.asin} label="Buy on Amazon" variant="primary" className="py-2 px-5 text-xs" />
      </nav>
    </header>
  );
}
