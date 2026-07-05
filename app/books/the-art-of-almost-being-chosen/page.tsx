"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import AmazonButton from "@/components/AmazonButton";
import VideoPlayer from "@/components/VideoPlayer";
import ReviewRotator from "@/components/ReviewRotator";
import { books } from "@/data/books";

export default function BookPage() {
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
      <section className="relative min-h-screen flex items-end overflow-hidden pt-16">
        <Image
          src={book.heroImage}
          alt="The Art of Almost Being Chosen"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "75% center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(13,12,16,.95) 0%, rgba(13,12,16,.6) 50%, rgba(13,12,16,.2) 100%), linear-gradient(to top, rgba(13,12,16,.95) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-3xl px-6 md:px-14 pb-20 md:pb-32">
          <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-5">{book.eyebrow}</p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-light leading-none text-(--cream) mb-6" style={{ textWrap: "balance" }}>
            {book.title}
          </h1>
          <p className="font-serif text-xl md:text-2xl italic text-(--cream-dim) mb-4 leading-relaxed max-w-xl">
            {book.hook}
          </p>
          <p className="text-sm text-(--cream-dim) mb-10 max-w-md leading-relaxed">{book.sub}</p>
          <div className="flex flex-wrap gap-4">
            <AmazonButton asin={book.asin} label="Buy Paperback" variant="primary" />
            <AmazonButton asin={book.asinKindle} label="Read on Kindle" variant="outline" />
          </div>
          <p className="mt-5 text-xs text-(--cream-dim)">★★★★★ · Kindle &amp; Paperback · Available worldwide</p>
        </div>
      </section>

      {/* REVIEWS — rotating quote */}
      <ReviewRotator reviews={book.reviews} />

      {/* COVER SHOWCASE */}
      <section ref={rev(0)} className="reveal py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          {/* Dramatic cover shot */}
          <div className="shrink-0 w-full md:w-1/2">
            <div className="relative aspect-2/3 max-w-sm mx-auto md:mx-0 shadow-[0_32px_80px_rgba(0,0,0,.7)]">
              <Image
                src="/assets/book-cover-on-brick-blue-wall.jpg"
                alt="The Art of Almost Being Chosen — striking editorial cover photo"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
          {/* Synopsis */}
          <div className="flex-1 min-w-0 md:pt-8">
            <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-6">The Story</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-(--cream) mb-5 leading-tight" style={{ textWrap: "balance" }}>
              What the book is about
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {book.themes.map((t) => (
                <span key={t} className="text-xs tracking-widest uppercase border border-(--line) text-(--cream-dim) px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
            <p className="font-serif text-xl italic text-(--accent-soft) mb-5 leading-relaxed">
              Her debut. About the women who wait, accommodate, and call it love.
            </p>
            <p className="text-(--cream-dim) leading-relaxed mb-8 max-w-prose">{book.synopsis}</p>
            <div className="flex flex-wrap gap-2 text-xs text-(--cream-dim)">
              {book.formats.map((f) => (
                <span key={f} className="border border-(--line) px-3 py-1">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXCERPT with open-book image */}
      <section ref={rev(1)} className="reveal relative py-24 md:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/assets/lifestyle-open-book-coffee-chapter.jpg"
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-(--ink)/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto" id="excerpt">
          <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-10 text-center">From the Opening Chapter</p>
          <blockquote className="font-serif text-3xl md:text-5xl italic text-(--cream) leading-snug mb-8 text-center" style={{ textWrap: "balance" }}>
            &ldquo;{book.excerpt}&rdquo;
          </blockquote>
          <p className="font-serif text-lg md:text-xl italic text-(--cream-dim) leading-relaxed text-center max-w-2xl mx-auto">
            The first love arrived quietly. Not in the office. Not in the city. But through a screen…
          </p>
        </div>
      </section>

      {/* FLATLAY + FORMATS */}
      <section ref={rev(2)} className="reveal py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-12 md:gap-16 items-center">
          <div className="shrink-0 w-full md:w-96">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/assets/book-cover-flatlay-table-01.jpg"
                alt="Two copies of the book flat on a warm wooden table"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-4">Formats</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-(--cream) mb-6" style={{ textWrap: "balance" }}>
              Two ways in.
            </h2>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center justify-between border border-(--line) p-5">
                <div>
                  <p className="text-(--cream) font-medium mb-1">Paperback</p>
                  <p className="text-(--cream-dim) text-sm">Hold it. Dog-ear it. Carry it everywhere.</p>
                </div>
                <AmazonButton asin={book.asin} label="Buy" variant="primary" className="text-xs px-5 py-2.5" />
              </div>
              <div className="flex items-center justify-between border border-(--line) p-5">
                <div>
                  <p className="text-(--cream) font-medium mb-1">Kindle eBook</p>
                  <p className="text-(--cream-dim) text-sm">Download now, read tonight.</p>
                </div>
                <AmazonButton asin={book.asinKindle} label="Buy" variant="outline" className="text-xs px-5 py-2.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO TRAILER — hidden until videos are hosted externally */}
      {/* <section ref={rev(3)} className="reveal py-16 md:py-24 px-6"> ... </section> */}

      {/* SHELF PHOTO */}
      <section ref={rev(6)} className="reveal py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          <div className="shrink-0 w-full md:w-96">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/assets/lifestyle-book-on-shelf-dark.jpg"
                alt="The book on a shelf alongside Atomic Habits, Big Magic and other bestsellers"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-[0.22em] uppercase text-(--accent) mb-3">In the Wild</p>
            <p className="font-serif text-2xl md:text-3xl text-(--cream) leading-snug mb-3" style={{ textWrap: "balance" }}>
              On shelves beside Atomic Habits, Big Magic, and The Subtle Art of Not Giving a F*ck.
            </p>
            <p className="text-(--cream-dim) text-sm leading-relaxed">
              This is the company it keeps.
            </p>
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section ref={rev(7)} className="reveal py-20 md:py-28 px-6 border-t border-(--line)">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          <div className="shrink-0 w-64 md:w-80">
            <div className="relative aspect-3/4 overflow-hidden">
              <Image
                src="/assets/author-green-saree-portrait.jpg"
                alt="Kepler Vel, author"
                fill
                sizes="(max-width: 768px) 256px, 320px"
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

      {/* FINAL CTA */}
      <section ref={rev(8)} className="reveal py-24 md:py-36 px-6 text-center">
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

      {/* FOOTER */}
      <footer className="border-t border-(--line) py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 items-center gap-4 text-xs text-(--cream-dim) tracking-wide">
          {/* Left */}
          <a href="https://streetsideweb.com.au" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-200">
            <span className="text-xs text-(--cream-dim) tracking-wide shrink-0">Built by</span>
            <img src="/assets/SSW_APPIcon.png" alt="StreetSide Web" width={100} height={28} className="h-7 w-auto" />
          </a>
          {/* Centre */}
          <span className="text-center">© Kepler Vel</span>
          {/* Right */}
          <div className="flex items-center justify-end gap-5">
            <a href="https://www.instagram.com/keplervel/" target="_blank" rel="noopener noreferrer" className="hover:text-(--cream) transition-[color] duration-150 uppercase tracking-widest">Instagram</a>
            <a href="https://www.tiktok.com/@keplervel" target="_blank" rel="noopener noreferrer" className="hover:text-(--cream) transition-[color] duration-150 uppercase tracking-widest">TikTok</a>
            <AmazonButton asin={book.asin} label="Amazon" variant="outline" className="text-xs px-4 py-2 tracking-widest" />
          </div>
        </div>
      </footer>
    </>
  );
}
