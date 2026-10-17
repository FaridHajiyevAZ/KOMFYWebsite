import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Source_Serif_4,
  Space_Grotesk,
  Karla,
} from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

// B2B rebrand fontları
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-karla",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://komfy.az"),
  title: {
    default: `${site.fullName} — OEM & Private Label Mattress Manufacturer`,
    template: `%s — ${site.name}`,
  },
  description:
    "KOMFY — mattress manufacturer. OEM & private label, B2B bulk supply, retail mattresses. Since 2015.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const lang = hdrs.get("x-locale") || "az";
  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${grotesk.variable} ${karla.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
