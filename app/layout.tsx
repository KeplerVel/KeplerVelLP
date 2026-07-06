import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keplervel.com"),
  icons: { icon: "/favicon.svg" },
  title: {
    default: "Kepler Vel — Australian Literary Fiction Author",
    template: "%s | Kepler Vel",
  },
  description:
    "Kepler Vel is an Australian literary fiction author. Her debut novel, The Art of Almost Being Chosen, is available in Paperback and Kindle on Amazon worldwide.",
  keywords: ["Kepler Vel", "The Art of Almost Being Chosen", "literary fiction", "Australian author", "debut novel", "women's fiction", "The Blink He Waited For"],
  authors: [{ name: "Kepler Vel", url: "https://keplervel.com" }],
  creator: "Kepler Vel",
  openGraph: {
    title: "The Art of Almost Being Chosen — Kepler Vel",
    description: "A story about ambition, silence, and the women who mistake potential for love. Debut novel by Kepler Vel, available on Amazon.",
    url: "https://keplervel.com",
    siteName: "Kepler Vel",
    images: [{ url: "/assets/book-cover-on-brick-blue-wall.jpg", width: 1200, height: 630, alt: "The Art of Almost Being Chosen by Kepler Vel" }],
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Art of Almost Being Chosen — Kepler Vel",
    description: "A story about ambition, silence, and the women who mistake potential for love.",
    images: ["/assets/book-cover-on-brick-blue-wall.jpg"],
    creator: "@keplervel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://keplervel.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased grain`}>
      <head>
        <meta name="theme-color" content="#0d0c10" />
      </head>
      <body className="min-h-full flex flex-col bg-(--ink) text-(--cream)">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:bg-(--accent) focus:text-(--btn-ink) focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
