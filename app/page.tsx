"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import AmazonButton from "@/components/AmazonButton";
import ReviewRotator from "@/components/ReviewRotator";
import { books } from "@/data/books";

export default function HomePage() {
  const book = books[0];

  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  function rev(i: number) {
    return (el: HTMLElement | null) => { revealRefs.current[i] = el; };
  }

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-150 flex items-end overflow-hidden pt-16">
        <Image
          src={book.heroImage}
          alt="The Art of Almost Being Chosen"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "90% center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(13,12,16,.92) 0%, rgba(13,12,16,.55) 55%, rgba(13,12,16,.15) 100%), linear-gradient(to top, rgba(13,12,16,.9) 0%, transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-3xl px-6 md:px-14 pb-16 md:pb-24">
          <p className="text-xs tracking-[0.22em] uppercase text-(--accent) font-medium mb-5">
            A Novel · Literary Fiction
          </p>
          <h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-light leading-tight text-(--cream) mb-5"
            style={{ textWrap: "balance" }}
          >
            The Art of<br />
            <em className="italic text-(--accent-soft)">Almost Being</em><br />
            Chosen
          </h1>
          <p className="font-serif text-xl md:text-2xl italic text-(--cream-dim) mb-4 leading-relaxed max-w-xl">
            {book.hook}
          </p>
          <p className="text-sm text-(--cream-dim) mb-8 max-w-lg leading-relaxed">
            {book.sub}
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <AmazonButton asin={book.asin} label="Buy Paperback" variant="primary" />
            <AmazonButton asin={book.asinKindle} label="Read on Kindle" variant="outline" />
          </div>
          <p className="mt-5 text-xs text-(--cream-dim) tracking-wide">
            ★★★★★ · Kindle &amp; Paperback · Available worldwide
          </p>
        </div>
      </section>

      {/* REVIEWS — rotating quote */}
      <ReviewRotator reviews={book.reviews} />

      {/* HOOK BAND */}
      <section className="py-20 md:py-28 px-6 border-y border-(--line) text-center">
        <p
          className="font-serif text-3xl md:text-5xl text-(--cream) max-w-3xl mx-auto leading-snug"
          style={{ textWrap: "balance" }}
        >
          Some women don&apos;t fall in love.<br />
          They <em className="italic text-(--accent-soft)">audition</em> for it.
        </p>
      </section>

      {/* LIFESTYLE STRIP */}
      <section ref={rev(0)} className="reveal grid grid-cols-1 md:grid-cols-3 gap-0">
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            src="/assets/lifestyle-reading-candid-01.jpg"
            alt="Reader absorbed in the book by a window"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            className="object-cover object-top hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            src="/assets/lifestyle-reading-couch-profile.jpg"
            alt="Author reading on couch with multiple copies of the book"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            className="object-cover object-center hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-(--ink)/20" aria-hidden="true" />
        </div>
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            src="/assets/lifestyle-reading-candid-02.jpg"
            alt="Person holding the book on a couch"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
            className="object-cover object-center hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      {/* THE BOOK */}
      <section ref={rev(1)} className="reveal py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          <div className="shrink-0 w-56 md:w-72">
            <div className="relative aspect-2/3 shadow-2xl shadow-black/60">
              <Image
                src="/assets/book-cover-on-brick-blue-wall.jpg"
                alt="The Art of Almost Being Chosen book cover"
                fill
                sizes="(max-width: 768px) 224px, 288px"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-4">The Book</p>
            <h2
              className="font-serif text-4xl md:text-5xl font-light text-(--cream) mb-6 leading-tight"
              style={{ textWrap: "balance" }}
            >
              {book.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {book.themes.map((t) => (
                <span key={t} className="text-xs tracking-widest uppercase border border-(--line) text-(--cream-dim) px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
            <p className="font-serif text-xl italic text-(--accent-soft) mb-4 leading-relaxed">
              Her debut. About the women who wait, accommodate, and call it love.
            </p>
            <p className="text-(--cream-dim) leading-relaxed mb-8 max-w-prose">
              {book.synopsis}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <AmazonButton asin={book.asin} label="Buy Paperback" variant="primary" />
              <Link
                href="/books/the-art-of-almost-being-chosen"
                className="text-sm tracking-widest uppercase text-(--accent) border-b border-(--accent)/40 pb-0.5 hover:border-(--accent) transition-[border-color] duration-150 focus-visible:outline-2 focus-visible:outline-(--accent)"
              >
                Read an excerpt →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section ref={rev(2)} className="reveal relative py-24 md:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/assets/lifestyle-open-book-coffee-chapter.jpg"
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover object-top opacity-25"
          />
          <div className="absolute inset-0 bg-(--ink)/75" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-8">From the Book</p>
          <blockquote
            className="font-serif text-3xl md:text-5xl italic text-(--cream) leading-snug mb-6"
            style={{ textWrap: "balance" }}
          >
            &ldquo;{book.excerpt}&rdquo;
          </blockquote>
          <p className="text-xs tracking-widest uppercase text-(--cream-dim)">From the Opening Chapter</p>
        </div>
      </section>

      {/* AUTHOR */}
      <section ref={rev(3)} className="reveal py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-12 md:gap-20 items-center">
          <div className="shrink-0 w-72 md:w-96">
            <div className="relative aspect-3/4 overflow-hidden">
              <Image
                src="/assets/author-black-pink-saree-cityscape.jpg"
                alt="Kepler Vel, author"
                fill
                sizes="(max-width: 768px) 288px, 384px"
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-4">The Author</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-(--cream) mb-6">Kepler Vel</h2>
            <p className="text-(--cream-dim) leading-relaxed mb-6 max-w-prose">
              Kepler Vel writes about women who are good at waiting and worse at stopping. Based in Australia,{" "}
              <em className="italic">The Art of Almost Being Chosen</em> is her debut novel.
            </p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/keplervel/" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase text-(--accent) hover:text-(--accent-soft) transition-[color] duration-150 focus-visible:outline-2 focus-visible:outline-(--accent)">Instagram</a>
              <a href="https://www.tiktok.com/@keplervel" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase text-(--accent) hover:text-(--accent-soft) transition-[color] duration-150 focus-visible:outline-2 focus-visible:outline-(--accent)">TikTok</a>
            </div>
          </div>
        </div>
      </section>

      {/* SEEN IN THE WILD */}
      <section ref={rev(5)} className="reveal py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          <div className="shrink-0 w-full md:w-96">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/assets/lifestyle-book-on-shelf-dark.jpg"
                alt="The book on a shelf beside Atomic Habits, Big Magic, The Subtle Art of Not Giving a F*ck and other bestsellers"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-3">On the Shelf</p>
            <p className="font-serif text-2xl md:text-3xl text-(--cream) leading-snug mb-3" style={{ textWrap: "balance" }}>
              It belongs here.
            </p>
            <p className="text-(--cream-dim) text-sm leading-relaxed">
              On shelves beside Atomic Habits, Big Magic, The Subtle Art of Not Giving a F*ck. It found its people.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section ref={rev(6)} className="reveal py-24 md:py-36 px-6 text-center">
        <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-6">Out Now</p>
        <h2 className="font-serif text-4xl md:text-6xl font-light text-(--cream) mb-6" style={{ textWrap: "balance" }}>
          One sitting. Maybe two.
        </h2>
        <p className="text-(--cream-dim) mb-10 max-w-md mx-auto leading-relaxed">
          Paperback and Kindle. On Amazon, wherever you are.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <AmazonButton asin={book.asin} label="Buy Paperback" variant="primary" />
          <AmazonButton asin={book.asinKindle} label="Read on Kindle" variant="outline" />
        </div>
      </section>

      {/* REACH OUT */}
      <section className="py-16 px-6 text-center border-t border-(--line)">
        <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-4">Say Hello</p>
        <p className="font-serif text-2xl md:text-3xl text-(--cream) mb-6" style={{ textWrap: "balance" }}>
          Kepler reads every message.
        </p>
        <a
          href="https://www.instagram.com/keplervel/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm tracking-widest uppercase text-(--accent) border border-(--accent)/40 px-8 py-3 hover:border-(--accent) hover:text-(--accent-soft) transition-[border-color,color] duration-200"
        >
          DM on Instagram →
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-(--line) py-8 px-6">
        <div className="max-w-6xl mx-auto text-xs text-(--cream-dim) tracking-wide flex flex-col md:grid md:grid-cols-3 items-center gap-4">
          {/* Centre — copyright first on mobile */}
          <span className="text-center order-1 md:order-2">© Kepler Vel</span>
          {/* Left */}
          <a href="https://streetsideweb.com.au" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-200 order-2 md:order-1">
            <span className="text-xs text-(--cream-dim) tracking-wide shrink-0">Built by</span>
            <img src="/assets/SSW_APPIcon.png" alt="StreetSide Web" width={100} height={28} className="h-7 w-auto" />
          </a>
          {/* Right */}
          <div className="flex items-center justify-center md:justify-end gap-5 order-3">
            <a href="https://www.instagram.com/keplervel/" target="_blank" rel="noopener noreferrer" className="hover:text-(--cream) transition-[color] duration-150 uppercase tracking-widest">Instagram</a>
            <a href="https://www.tiktok.com/@keplervel" target="_blank" rel="noopener noreferrer" className="hover:text-(--cream) transition-[color] duration-150 uppercase tracking-widest">TikTok</a>
            <AmazonButton asin={book.asin} label="Amazon" variant="outline" className="text-xs px-4 py-2 tracking-widest" />
          </div>
        </div>
      </footer>
    </>
  );
}
