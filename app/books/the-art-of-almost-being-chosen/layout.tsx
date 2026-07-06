import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Art of Almost Being Chosen",
  description: "The debut novel by Kepler Vel. A story about ambition, silence, and the women who mistake potential for love. Available in Paperback and Kindle on Amazon.",
  alternates: { canonical: "https://keplervel.com/books/the-art-of-almost-being-chosen" },
  openGraph: {
    title: "The Art of Almost Being Chosen — Kepler Vel",
    description: "A debut literary fiction novel about ambition, silence, and the women who mistake potential for love.",
    url: "https://keplervel.com/books/the-art-of-almost-being-chosen",
    images: [{ url: "/assets/book-cover-on-brick-blue-wall.jpg", width: 1200, height: 630, alt: "The Art of Almost Being Chosen by Kepler Vel" }],
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
