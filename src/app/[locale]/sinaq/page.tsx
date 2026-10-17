import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import Image from "next/image";
import { site, trialSteps, warrantyTiers } from "@/data/site";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = {
  title: "30 gün yat, sonra seç",
  description:
    "Matrasınızı 30 gün evinizdə sınayın — bəyənməsəniz başqa modellə dəyişin və ya qaytarın. Zəmanət şərtləri və tez-tez verilən suallar.",
};

export default function TrialPage() {
  return (
    <>
      {/* Hero */}
      <section className="grid border-b border-komfy-line md:grid-cols-2">
        <div className="flex flex-col justify-center gap-5 px-5 py-16 sm:px-8 md:py-20 lg:px-[60px] lg:py-[80px]">
          <span className="eyebrow">Yalnız KOMFY</span>
          <h1 className="font-serif text-[42px] font-light leading-[1.08] text-komfy-ink sm:text-[54px]">
            30 gün yat, sonra seç
          </h1>
          <p className="max-w-[460px] text-[16.5px] font-light leading-[1.7] text-komfy-text3">
            Matrası mağazada beş dəqiqəyə seçmək mümkün deyil — komfort və sərtlik hər insana
            görə dəyişir. Matrasınızı alın, düz 30 gün yatın: yuxunuz şirin olmasa, istədiyiniz
            başqa modellə dəyişin və ya qaytarın.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/secim" className="btn-primary">
              Rahatlıq testinə başla
            </Link>
            <Link href="/mehsullar" className="btn-outline">
              Matraslara bax
            </Link>
          </div>
        </div>
        <div className="relative min-h-[280px] bg-gradient-to-br from-[#EAE3D6] to-[#DCD3C2] md:min-h-[420px]">
          <Image
            src="/brand/hero.webp"
            alt="Səhər yatağı"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="container-komfy py-[70px]">
        <h2 className="font-serif text-[30px] font-light text-komfy-ink sm:text-[34px]">
          Necə işləyir
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {trialSteps.map((s) => (
            <div key={s.n} className="flex flex-col gap-2.5 border-t-2 border-komfy-green pt-5">
              <span className="text-[13px] tracking-[0.14em] text-komfy-gold">{s.n}</span>
              <span className="font-serif text-[21px] text-komfy-ink">{s.title}</span>
              <span className="text-[14.5px] font-light leading-[1.65] text-komfy-text3">
                {s.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Warranty + FAQ */}
      <section className="border-y border-komfy-line bg-komfy-panel px-5 py-[70px] sm:px-8 lg:px-[60px]">
        <div className="mx-auto grid max-w-container gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-[30px] font-light text-komfy-ink sm:text-[34px]">
              Zəmanət
            </h2>
            <div className="flex flex-col">
              {warrantyTiers.map((t, i) => (
                <div
                  key={t.title}
                  className={`flex items-baseline justify-between gap-4 py-5 ${
                    i < warrantyTiers.length - 1 ? "border-b border-komfy-line" : ""
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-serif text-[19px] text-komfy-ink">{t.title}</span>
                    <span className="text-[13px] font-light text-komfy-muted2">
                      {t.models}
                    </span>
                  </div>
                  <span className="text-[15px] font-light text-komfy-text2">{t.value}</span>
                </div>
              ))}
            </div>
            <p className="text-[14px] font-light leading-[1.65] text-komfy-muted">
              Zəmanət şərtlərimiz sadədir — ətraflı məlumat üçün zəng edin: {site.phone}
            </p>
            <a href={site.warrantyPortalUrl} className="link-more self-start">
              Zəmanəti onlayn qeydiyyatdan keçir →
            </a>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-[30px] font-light text-komfy-ink sm:text-[34px]">
              Tez-tez verilən suallar
            </h2>
            <FaqList />
          </div>
        </div>
      </section>
    </>
  );
}
