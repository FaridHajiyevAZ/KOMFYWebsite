"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function B2bHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const nav = [
    { label: dict.nav.manufacturing, href: "/manufacturing" },
    { label: dict.nav.oem, href: "/oem" },
    { label: dict.nav.industries, href: "/industries" },
    { label: dict.nav.products, href: "/products" },
    { label: dict.nav.quality, href: "/quality" },
    { label: dict.nav.about, href: "/about" },
  ];

  const isActive = (href: string) => pathname.startsWith(`/${locale}${href}`);

  return (
    <header className="sticky top-0 z-50 border-b border-b2b-line/60 bg-b2b-bg/[0.92] backdrop-blur-[12px]">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex flex-shrink-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src="/brand/komfy-logo.png"
            alt="KOMFY"
            width={130}
            height={31}
            className="h-[26px] w-auto"
            style={{ width: "auto" }}
            priority
            unoptimized
          />
        </Link>

        <nav className="hidden items-center gap-6 text-[13.5px] font-medium lg:flex xl:gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-b2b-ink ${
                isActive(item.href) ? "text-b2b-ink" : "text-b2b-text2"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/quote"
            className="hidden whitespace-nowrap rounded-lg bg-b2b-ink px-4 py-[9px] text-[13px] font-bold text-white transition-colors hover:bg-b2b-ink2 sm:inline-block"
          >
            {dict.header.requestQuote}
          </Link>
          <button
            type="button"
            className="text-2xl leading-none text-b2b-ink lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-b2b-line/60 bg-b2b-bg lg:hidden">
          <nav className="flex flex-col px-5 py-3 sm:px-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-[15px] font-medium text-b2b-text2 hover:bg-b2b-band"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-b2b-ink px-4 py-3 text-center text-[14px] font-bold text-white"
            >
              {dict.header.requestQuote}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
