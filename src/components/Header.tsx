"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site, announcement } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement */}
      <div className="bg-komfy-green py-2.5 text-center text-[12.5px] tracking-[0.02em] text-komfy-onDark2">
        <span className="hidden sm:inline">{announcement}</span>
        <span className="sm:hidden">30 gün yat, sonra seç</span>
      </div>

      {/* Main bar */}
      <div className="border-b border-komfy-line bg-komfy-surface/95 backdrop-blur">
        <div className="container-komfy flex h-[68px] items-center justify-between gap-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-serif text-[20px] font-semibold tracking-wordmark text-komfy-ink"
          >
            KOMFY
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] transition-colors hover:text-komfy-gold ${
                  isActive(item.href) ? "text-komfy-ink" : "text-komfy-text2"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={site.phoneHref}
              className="text-[14px] text-komfy-muted hover:text-komfy-ink"
            >
              {site.phone}
            </a>
            <Link
              href="/secim"
              className="rounded-full bg-komfy-green px-5 py-2.5 text-[13px] font-medium text-komfy-surface transition-colors hover:bg-komfy-greenSoft"
            >
              Testə başla
            </Link>
          </div>

          <button
            type="button"
            className="text-2xl leading-none text-komfy-text2 lg:hidden"
            aria-label="Menyu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <div className="border-t border-komfy-line bg-komfy-surface lg:hidden">
            <nav className="container-komfy flex flex-col py-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-[15px] text-komfy-text2 hover:bg-komfy-card"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-3 px-2">
                <Link
                  href="/secim"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-komfy-green py-3 text-center text-[14px] font-medium text-komfy-surface"
                >
                  Testə başla
                </Link>
                <a
                  href={site.phoneHref}
                  className="rounded-full border border-komfy-border px-4 py-3 text-[14px] font-medium text-komfy-green"
                >
                  Zəng
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
