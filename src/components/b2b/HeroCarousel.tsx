"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { useEffect, useRef, useState } from "react";
import { defaultHomeContent } from "@/data/home";
import type { HeroSlideC } from "@/data/home";

const defaultSlides: HeroSlideC[] = defaultHomeContent.hero;

const SLIDE_BG = [
  "radial-gradient(60% 60% at 80% 15%, rgba(163,121,100,.55), rgba(163,121,100,0) 70%), linear-gradient(135deg,#2b2620,#1a1712)",
  "linear-gradient(120deg,#3a2f27,#211b16)",
  "radial-gradient(70% 70% at 20% 20%, rgba(163,121,100,.4), rgba(163,121,100,0) 70%), linear-gradient(135deg,#2b2620,#171310)",
];

export function HeroCarousel({ slides }: { slides?: HeroSlideC[] }) {
  const heroSlides = slides && slides.length ? slides : defaultSlides;
  const [slide, setSlide] = useState(0);
  const paused = useRef(false);
  const n = heroSlides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) setSlide((s) => (s + 1) % n);
    }, 6000);
    return () => clearInterval(timer);
  }, [n]);

  return (
    <section className="mx-auto max-w-[1344px] px-5 pt-5">
      <div
        className="relative h-[min(80vh,640px)] min-h-[480px] overflow-hidden rounded-3xl bg-[#2b2620]"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: i === slide ? 1 : 0,
              pointerEvents: i === slide ? "auto" : "none",
              zIndex: i === slide ? 1 : 0,
            }}
          >
            {s.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.image} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0" style={{ background: SLIDE_BG[i % SLIDE_BG.length] }} />
            )}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg,rgba(20,17,13,.82) 0%,rgba(20,17,13,.55) 45%,rgba(20,17,13,.05) 80%)",
              }}
            />
            <div className="absolute bottom-[clamp(56px,7vw,80px)] left-[clamp(76px,8vw,104px)] right-[76px] max-w-[620px] text-white">
              <span className="inline-block rounded-full border border-white/35 bg-white/[.14] px-3.5 py-1.5 text-[12.5px] font-bold backdrop-blur-sm">
                {s.badge}
              </span>
              <h1 className="mb-4 mt-5 font-grotesk text-[clamp(32px,4.6vw,58px)] font-bold leading-[1.06] tracking-[-0.02em]">
                {s.title}
              </h1>
              <p className="mb-7 max-w-[480px] text-[17px] leading-[1.6] text-white/[.88]">
                {s.text}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={s.primary.href}
                  className="rounded-[10px] bg-white px-6 py-3.5 text-[15px] font-bold text-b2b-ink transition hover:bg-b2b-band"
                >
                  {s.primary.label}
                </Link>
                <Link
                  href={s.secondary.href}
                  className="rounded-[10px] border-[1.5px] border-white/60 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10"
                >
                  {s.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setSlide((s) => (s + n - 1) % n)}
          aria-label="Əvvəlki"
          className="absolute left-5 top-1/2 z-[5] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-black/35 text-lg text-white backdrop-blur-sm hover:bg-black/60"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setSlide((s) => (s + 1) % n)}
          aria-label="Növbəti"
          className="absolute right-5 top-1/2 z-[5] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-black/35 text-lg text-white backdrop-blur-sm hover:bg-black/60"
        >
          →
        </button>

        <div className="absolute bottom-6 left-[clamp(76px,8vw,104px)] z-[5] flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Slayd ${i + 1}`}
              className="h-[9px] rounded-full transition-all"
              style={{
                width: i === slide ? 26 : 9,
                background: i === slide ? "#fff" : "rgba(255,255,255,.45)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
