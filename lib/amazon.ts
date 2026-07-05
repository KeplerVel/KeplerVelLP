"use client";

const TLD_MAP: Record<string, string> = {
  AU: "com.au", NZ: "com.au",
  IN: "in",
  GB: "co.uk", IE: "co.uk",
  CA: "ca",
  DE: "de", AT: "de", CH: "de",
  FR: "fr",
  IT: "it",
  ES: "es",
  JP: "co.jp",
  MX: "com.mx",
  BR: "com.br",
  NL: "nl",
  SE: "se",
  PL: "pl",
  BE: "com.be",
  TR: "com.tr",
  AE: "ae", SA: "sa",
  EG: "eg",
  SG: "sg",
};

const CACHE_KEY = "kv_country";
const CACHE_TTL = 6 * 60 * 60 * 1000;

async function detectCountry(): Promise<string> {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { country, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) return country;
    }
    const res = await fetch("https://api.country.is");
    const data = await res.json();
    const country = data.country ?? "US";
    localStorage.setItem(CACHE_KEY, JSON.stringify({ country, ts: Date.now() }));
    return country;
  } catch {
    return "US";
  }
}

export async function buildAmazonUrl(asin: string, affiliate?: string): Promise<string> {
  const country = await detectCountry();
  const tld = TLD_MAP[country] ?? "com";
  const tag = affiliate ? `?tag=${affiliate}` : "";
  return `https://www.amazon.${tld}/dp/${asin}${tag}`;
}

export function getTld(country: string): string {
  return TLD_MAP[country] ?? "com";
}

export { detectCountry };
