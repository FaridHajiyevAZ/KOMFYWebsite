import { LocaleLink as Link } from "@/components/LocaleLink";
import type { ReactNode } from "react";

/** Eyebrow + h2 başlıq. Sağda istəyə görə link və ya mətn. */
export function SectionHead({
  eyebrow,
  title,
  rightLink,
  rightText,
}: {
  eyebrow: string;
  title: string;
  rightLink?: { label: string; href: string };
  rightText?: ReactNode;
}) {
  const hasRight = rightLink || rightText;
  return (
    <div
      className={`mb-7 gap-4 ${
        hasRight ? "flex flex-wrap items-end justify-between" : ""
      }`}
    >
      <div>
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-b2b-tan">
          {eyebrow}
        </span>
        <h2 className="mt-2.5 font-grotesk text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.01em]">
          {title}
        </h2>
      </div>
      {rightLink && (
        <Link href={rightLink.href} className="text-[14.5px] font-bold text-b2b-ink">
          {rightLink.label} →
        </Link>
      )}
      {rightText && (
        <p className="max-w-[380px] text-[15px] leading-[1.6] text-b2b-text2">{rightText}</p>
      )}
    </div>
  );
}

/** Tünd statistika zolağı kartı */
export function StatsBand({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="grid gap-8 rounded-3xl bg-b2b-ink px-[clamp(32px,4vw,48px)] py-[clamp(32px,4vw,48px)] text-white [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
      {items.map((s) => (
        <div key={s.label}>
          <div className="font-grotesk text-[clamp(26px,3vw,36px)] font-bold text-[#E3C9B8]">
            {s.value}
          </div>
          <div className="mt-2 text-[13px] font-bold uppercase tracking-[0.07em] text-white/70">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
