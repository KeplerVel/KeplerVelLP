export type Review = {
  stars: number;
  title: string;
  quote: string;
  source: string;
};

export type Book = {
  slug: string;
  title: string;
  status: "published" | "coming-soon";
  eyebrow: string;
  hook: string;
  sub: string;
  synopsis: string;
  themes: string[];
  excerpt?: string;
  heroImage: string;
  coverImage: string;
  flatLayImage: string;
  openBookImage: string;
  authorImage: string;
  formats: string[];
  asin: string;
  asinKindle: string;
  reviews: Review[];
};

export const books: Book[] = [
  {
    slug: "the-art-of-almost-being-chosen",
    title: "The Art of Almost Being Chosen",
    status: "published",
    eyebrow: "A Novel · Literary Fiction",
    hook: "A story about ambition, silence, and the women who mistake potential for love.",
    sub: "For everyone who has ever confused endurance with being loved, and called the waiting devotion.",
    synopsis:
      "She is brilliant, patient, and endlessly accommodating: the kind of woman who mistakes potential for promise and waiting for love. The Art of Almost Being Chosen follows her through the rooms where ambition is rewarded and tenderness is not, tracing what it costs to keep auditioning for a life that keeps almost happening.",
    themes: ["Ambition", "Silence", "Longing", "Self-worth", "Female interiority"],
    excerpt:
      "She had learned to make herself small enough to be carried, and then wondered why no one ever did.",
    heroImage: "/assets/lifestyle-book-espresso-window.jpg",
    coverImage: "/assets/book-cover-on-brick-blue-wall.jpg",
    flatLayImage: "/assets/book-cover-flatlay-table-01.jpg",
    openBookImage: "/assets/lifestyle-open-book-coffee-chapter.jpg",
    authorImage: "/assets/author-green-saree-portrait.jpg",
    formats: ["Kindle", "Paperback"],
    asin: "B0H1172P1Z",
    asinKindle: "B0GZZTY4FM",
    reviews: [
      {
        stars: 5,
        title: "She found her own voice!",
        quote:
          "This book truly resonated with me on a personal level. I could deeply connect with the journey of the girl — from having limited exposure and understanding of the world to gradually finding her own voice, confidence, and stance through experiences and self-learning. The emotions felt authentic, relatable, and beautifully portrayed. What stood out to me most was the way the story reflected personal growth, vulnerability, and the courage it takes to evolve through life’s challenges. A heartfelt and meaningful read that leaves a lasting impression.",
        source: "Amazon Customer · Australia · Kindle",
      },
      {
        stars: 5,
        title: "Great writing style",
        quote:
          "I finished this book in two sittings. I really enjoyed the way it was written, a style I’ve not read before and one that meant I couldn’t put it down.",
        source: "Amazon Customer · Australia · Paperback · Verified Purchase",
      },
      {
        stars: 5,
        title: "Best read in recent days",
        quote:
          "Amazing book. Felt I have gone through some real life experiences. Definitely recommend it.",
        source: "Amazon Customer · Australia · Paperback · Verified Purchase",
      },
      {
        stars: 5,
        title: "Great novel to read at night alone",
        quote:
          "I really like the way she told stories. Peaceful and mindful. The girl keeps quiet but has a clear target — and she achieved that. She is not perfect, but she just likes us in the normal world. Deeply motivated by this novel. Highly recommended to read at night alone.",
        source: "Amazon Customer · Australia · Kindle",
      },
      {
        stars: 5,
        title: "Very addictive and relatable",
        quote:
          "Once I start reading I was glued to the book. A beautifully emotional story that feels deeply personal and relatable. The author captures a woman’s journey through love, pain, and self-discovery with so much honesty and depth. A touching read that stays with you long after finishing the book.",
        source: "Amazon Customer · Australia · Paperback · Verified Purchase",
      },
    ],
  },
  {
    slug: "the-blink-he-waited-for",
    title: "The Blink He Waited For",
    status: "coming-soon",
    eyebrow: "Coming Soon · Contemporary Romance · Dual-Timeline",
    hook: "She forgot the most important day of her life. He never could.",
    sub: "A dual-timeline novel about memory, longing, and the words never said.",
    synopsis: "Thirty-five years ago, Maya left without looking back, and forgot the boy who never stopped waiting. When his face resurfaces in a video half a world away, a buried past unravels: a circled date, a cut photograph, a secret that was never hers to keep. Some silences are kindness. Some are theft.",
    themes: [],
    heroImage: "/assets/The_Blink_He_Waited_For_PAPERBACK_COVER.jpg",
    coverImage: "/assets/The_Blink_He_Waited_For_PAPERBACK_COVER.jpg",
    flatLayImage: "",
    openBookImage: "",
    authorImage: "",
    formats: [],
    asin: "",
    asinKindle: "",
    reviews: [],
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}
