import { LocaleLink as Link } from "@/components/LocaleLink";

export function ComingSoon({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[900px] flex-col justify-center px-8 py-24 font-karla">
      <span className="text-[12.5px] font-bold uppercase tracking-[0.1em] text-b2b-tan">
        {eyebrow}
      </span>
      <h1 className="mb-4 mt-3.5 font-grotesk text-[clamp(28px,4vw,42px)] font-bold leading-[1.15] text-b2b-ink">
        {title}
      </h1>
      <p className="mb-8 max-w-[560px] text-[16px] leading-[1.6] text-b2b-text2">{text}</p>
      <div className="flex flex-wrap gap-3.5">
        <Link
          href="/quote"
          className="rounded-[10px] bg-b2b-ink px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-b2b-ink2"
        >
          Request a Quote
        </Link>
        <Link
          href="/"
          className="rounded-[10px] border-[1.5px] border-b2b-ink px-6 py-3.5 text-[15px] font-bold text-b2b-ink transition hover:bg-b2b-ink hover:text-white"
        >
          Back to home
        </Link>
      </div>
      <p className="mt-10 text-[13px] italic text-b2b-muted">
        Bu səhifənin tam dizaynı hazırdır — növbəti addımda tətbiq olunacaq.
      </p>
    </section>
  );
}
