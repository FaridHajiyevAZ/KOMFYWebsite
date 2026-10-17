import { LocaleLink as Link } from "@/components/LocaleLink";

/** Tünd yuvarlaq CTA bandı — başlıq solda, düymələr sağda */
export function CtaBand({
  title,
  primary,
  secondary,
}: {
  title: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-[1280px] px-8 py-24">
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] bg-b2b-ink px-[clamp(32px,5vw,64px)] py-[clamp(32px,5vw,64px)] text-white">
        <h2 className="m-0 max-w-[560px] font-grotesk text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.01em]">
          {title}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={primary.href}
            className="rounded-[10px] bg-white px-6 py-3.5 text-[15px] font-bold text-b2b-ink transition hover:bg-b2b-band"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="rounded-[10px] border-[1.5px] border-white/60 px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
