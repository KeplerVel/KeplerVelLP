# keplervel.md — Brand & Landing-Page Spec

Source of truth for **copy, brand, palette, and page structure** of the Kepler Vel author
site. Engineering/setup lives in `CLAUDE.md`; curated media in `assets/` (see
`assets/README-ASSET-INDEX.md`). Copy marked `[ ... ]` is placeholder — replace with final
text before launch.

---

## 1. Author & book

- **Author:** Kepler Vel (pen name of Vasu Velgoti). Based in Australia 🇦🇺.
- **Instagram:** https://www.instagram.com/keplervel/  ·  **TikTok:** https://www.tiktok.com/@keplervel
- **Debut book:** *The Art of Almost Being Chosen*
- **Formats:** Kindle eBook + Paperback
- **Availability:** Amazon, multiple marketplaces (live on Amazon AU & India; rolling out
  worldwide). See §7 for geo routing.
- **Positioning line:** *Literary fiction about ambition, silence, and the women who mistake
  potential for love.*
- **Sharpest hook (from the author's own bio):** *women who confuse endurance with love.*

## 2. Conversion goal

Primary and only KPI: **clicks to the reader's local Amazon store to buy the book.**
Keep a buy CTA in the hero, again mid-page, in a sticky mobile bar, and in the final
section. Everything else (mood, story, reviews) exists to support that click.

## 3. Brand voice

Intimate, literary, quietly devastating. Short declarative lines next to lush italic serif.
Emotionally honest, never salesy or hype-y. Speaks to readers who see themselves in the
book's theme of waiting to be chosen. Avoid clichés, exclamation marks, and marketing
jargon. Think back-cover copy of a serious novel, not an ad.

## 4. Visual design — "Midnight Gold" (dark only)

Palette (CSS variables; see `CLAUDE.md` / `globals.css`):

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0d0c10` | page background |
| `--bg2` | `#13111a` | secondary/gradient dark |
| `--ink-soft` | `#16141b` | cards, panels |
| `--accent` | `#c8a24a` | gold — eyebrows, CTA buttons, rules |
| `--accent-soft` | `#e0c376` | lighter gold — italic emphasis |
| `--accent2` | `#a8657a` | dusty rose — secondary glow/accent |
| `--cream` | `#f3ece1` | primary text |
| `--cream-dim` | `#c9c0b4` | muted/body text |
| `--line` | `rgba(243,236,225,.14)` | hairline borders |
| `--btn-ink` | `#160f04` | text on gold buttons |

Typography: **Cormorant Garamond** (serif) for headings, titles, pull-quotes, italic
emphasis; **Inter** for body, UI, eyebrows, buttons. Generous negative space; hairline
dividers; subtle grain/gradient over dark.

## 5. Book landing page — structure & copy

Order top to bottom. This is the reusable template; the current book's content is below.

### 5.1 Nav (sticky)
Left: `Kepler Vel` wordmark (Vel in gold). Right: **Read on Amazon** button (geo-aware).

### 5.2 HERO — full-bleed live photo  ⭐
- **Background image:** `public/assets/lifestyle-book-espresso-window.jpg`
  (the live photo of the paperback beside an espresso by a window — author's chosen hero).
  Full-bleed, `next/image` with `fill`, `priority`, `object-cover`.
- **Legibility scrim:** dark left-to-right / bottom gradient over the photo so cream text
  stays readable (e.g. `linear-gradient(90deg, rgba(13,12,16,.85), rgba(13,12,16,.35))`
  plus a bottom fade). Text sits on the darker (left/lower) side.
- **Overlay copy (Midnight Gold text on the photo):**
  - Eyebrow: `A NOVEL · LITERARY FICTION`
  - H1: **The Art of Almost Being Chosen**
  - Hook (italic serif): *A story about ambition, silence, and the women who mistake
    potential for love.*
  - Sub: For everyone who has ever confused endurance with being loved — and called the
    waiting devotion.
  - CTA row: **Read on Amazon** (geo-aware) + secondary "Read an excerpt" (anchor).
  - Meta: ★★★★★ · Kindle & Paperback · Available worldwide

### 5.3 Hook band
Full-width, centered, large serif:
> Some women don't fall in love. They *audition* for it.

### 5.4 The story (synopsis + themes)
- Eyebrow `THE STORY`, H2 **What the book is about**
- Theme chips: Ambition · Silence · Longing · Self-worth · Female interiority
- Lede (italic): *A quietly devastating debut about the distance between being wanted and
  being chosen.*
- Body: `[ Placeholder synopsis — swap in final back-cover copy. ]` She is brilliant,
  patient, and endlessly accommodating — the kind of woman who mistakes potential for
  promise and waiting for love. *The Art of Almost Being Chosen* follows her through the
  rooms where ambition is rewarded and tenderness is not, tracing what it costs to keep
  auditioning for a life that keeps almost happening.

### 5.5 Excerpt
Pull-quote card (big serif italic):
> `[ Placeholder excerpt — final opening lines. ]` She had learned to make herself small
> enough to be carried, and then wondered why no one ever did.

Tag: `FROM THE OPENING CHAPTER`

### 5.6 Reviews / social proof
Use the **real Amazon 5★ review** (asset
`assets/05-reviews-social-proof/review-amazon-5star-she-found-her-voice.jpg`):

> ★★★★★ **"She found her own voice!"** — This book truly resonated with me on a personal
> level… The emotions felt authentic, relatable, and beautifully portrayed. A heartfelt and
> meaningful read that leaves a lasting impression.
> *— Verified Amazon review, Australia (Kindle)*

Add more real reviews as they come. Do not invent quotes; mark any placeholders clearly.

### 5.7 About the author
- Image: an author portrait — default `public/assets/author-green-saree-portrait.jpg`.
- Eyebrow `THE AUTHOR`, H2 **Kepler Vel**
- Bio: `[ Placeholder bio — author to supply. ]` Kepler Vel writes literary fiction about
  ambition, silence, and the inner lives of women who are used to waiting. Based in
  Australia, *The Art of Almost Being Chosen* is her debut novel.
- Links: Instagram · TikTok

### 5.8 Final CTA
Centered, glow accent. Eyebrow `OUT NOW`, H2 **Start reading tonight.**, line: *Available in
Kindle and paperback on Amazon, wherever you are in the world.* → **Read on Amazon**
(geo-aware) + detected-store note + country selector. Optional: first-chapter email capture.

### 5.9 Footer
Instagram · TikTok · Amazon · © Kepler Vel.

## 6. Homepage (author brand)

Since more books are coming, the root `/` is the **author homepage**, not a single book:

- Short cinematic hero for **Kepler Vel** (name + one-line positioning + author photo).
- **Books** grid (`BookCard` per book): cover, title, one-line tagline, "Read on Amazon" +
  "Learn more" → `/books/<slug>`. Currently one card; grows automatically from `data/books.ts`.
- Short about-the-author strip + social links + footer.
- Each individual book keeps its own dedicated landing page at `/books/<slug>`.

## 7. Geo-aware Amazon configuration

- **Per book:** a default `asin` in `data/books.ts`, with optional per-marketplace overrides.
- **Affiliate tag:** env `NEXT_PUBLIC_AMAZON_AFFILIATE_TAG` (omit if none).
- **Marketplace routing** (`lib/amazon.ts`): detect country via `navigator.language` →
  timezone → fallback `amazon.com`. Countries without their own store route to the nearest
  (e.g. NZ→AU, Ireland→UK, Gulf states→UAE, Austria/Switzerland→DE). Supported TLDs:
  com, com.au, in, co.uk, ca, de, fr, it, es, co.jp, com.mx, com.br, nl, se, pl, com.be,
  com.tr, ae, sa, eg, sg. Always provide a manual country picker as a fallback.
- URL: `https://www.amazon.<tld>/dp/<ASIN>[?tag=<affiliate>]`.

## 8. Book data model (per book, `data/books.ts`)

```ts
export type Review = { stars: number; title: string; quote: string; source: string };

export type Book = {
  slug: string;                 // "the-art-of-almost-being-chosen"
  title: string;                // "The Art of Almost Being Chosen"
  status: "published" | "coming-soon";
  eyebrow: string;              // "A Novel · Literary Fiction"
  hook: string;                 // italic serif hero line
  sub: string;                  // supporting hero line
  synopsis: string;
  themes: string[];             // ["Ambition","Silence",...]
  excerpt?: string;
  heroImage: string;            // "/assets/lifestyle-book-espresso-window.jpg"
  coverImage: string;           // "/assets/book-cover-on-brick-blue-wall.jpg"
  authorImage?: string;         // "/assets/author-green-saree-portrait.jpg"
  formats: string[];            // ["Kindle","Paperback"]
  asin: string;                 // default ASIN
  asinOverrides?: Record<string, string>; // { "com.au": "...", "in": "..." }
  reviews: Review[];
};
```

### Current book values
- slug: `the-art-of-almost-being-chosen`
- status: `published`
- heroImage: `/assets/lifestyle-book-espresso-window.jpg`  ← author's chosen hero
- coverImage: `/assets/book-cover-on-brick-blue-wall.jpg`
- authorImage: `/assets/author-green-saree-portrait.jpg`
- formats: Kindle, Paperback
- **asin: `TODO` — get the real ASIN from the Amazon listing** (and any per-store overrides)
- reviews: seed with the real "She found her own voice!" 5★ review (§5.6)

## 9. Asset mapping (from `/assets`, copied to `public/assets/`)

| Section | Asset |
|---|---|
| Hero background | `lifestyle-book-espresso-window.jpg` |
| Book cover (cards, meta) | `book-cover-on-brick-blue-wall.jpg` (hero product), flat-lays for variety |
| Author portrait | `author-green-saree-portrait.jpg` (primary); others for homepage/about |
| Story/excerpt mood | `lifestyle-open-book-coffee-chapter.jpg`, `lifestyle-reading-candid-01/02.jpg` |
| Social proof | `review-amazon-5star-she-found-her-voice.jpg` |
| Promo graphics (social only) | `04-promo-graphics/*` — already carry text; not for clean page imagery |
| Video (optional hero loop / social) | `06-videos-promos/*`, `07-videos-reels/*` |

## 10. Pre-launch checklist

- [ ] Replace all `[ ... ]` placeholders (synopsis, excerpt, author bio).
- [ ] Insert the real **ASIN** (and per-marketplace overrides if different).
- [ ] Set `NEXT_PUBLIC_AMAZON_AFFILIATE_TAG` if using Amazon Associates.
- [ ] Confirm hero photo crops well on mobile + desktop (scrim keeps text legible).
- [ ] Verify geo routing + manual country selector across a few marketplaces.
- [ ] Add any additional real reviews.
- [ ] Custom domain on Vercel; Open Graph/social preview image set per page.
