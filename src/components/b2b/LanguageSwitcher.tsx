"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, isLocale, defaultLocale } from "@/i18n/config";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const parts = pathname.split("/");
  const current = isLocale(parts[1]) ? parts[1] : defaultLocale;

  function switchTo(l: string) {
    if (l === current) return;
    const p = pathname.split("/");
    if (isLocale(p[1])) p[1] = l;
    else p.splice(1, 0, l);
    router.push(p.join("/") || `/${l}`);
  }

  return (
    <div className="flex overflow-hidden rounded-lg text-[12px] font-bold shadow-[0_2px_8px_rgba(33,30,27,0.07)]">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === current}
          className={`px-2.5 py-[5px] transition-colors ${
            l === current ? "bg-b2b-ink text-white" : "bg-white text-b2b-muted2 hover:text-b2b-ink"
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  );
}
