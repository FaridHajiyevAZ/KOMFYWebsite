import type { Metadata } from "next";
import { site, hotelFeatures } from "@/data/site";

export const metadata: Metadata = {
  title: "Otellər üçün",
  description:
    "Otellər, hostellər və istirahət mərkəzləri üçün topdan matras təchizatı. Otel standartları, sürətli çatdırılma və fərdi istehsal.",
};

export default function HotelsPage() {
  return (
    <>
      <section className="container-komfy py-[72px]">
        <div className="flex max-w-2xl flex-col gap-5">
          <span className="eyebrow">Otellər üçün</span>
          <h1 className="font-serif text-[42px] font-light leading-[1.1] text-komfy-ink sm:text-[52px]">
            Oteliniz üçün matras təchizatı
          </h1>
          <p className="text-[16.5px] font-light leading-[1.7] text-komfy-text3">
            Otellər, hostellər və istirahət mərkəzləri üçün topdan matras istehsal edirik —
            öz komfort standartınıza uyğun, istənilən ölçü və sayda. 2015-ci ildən yerli
            istehsalçı olaraq həm keyfiyyət, həm də təchizat sürətinə cavabdehik.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a href={site.whatsapp} className="btn-primary">
              Topdan təklif alın
            </a>
            <a href={site.phoneHref} className="btn-outline">
              Zəng edin: {site.phone}
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hotelFeatures.map((f) => (
            <div key={f.title} className="flex flex-col gap-2 border-t border-komfy-line2 pt-[18px]">
              <span className="font-serif text-[18px] text-komfy-ink">{f.title}</span>
              <span className="text-[13.5px] font-light leading-[1.6] text-komfy-muted">
                {f.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-komfy-line bg-komfy-panel px-5 py-[70px] sm:px-8 lg:px-[60px]">
        <div className="mx-auto grid max-w-container items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <h2 className="font-serif text-[32px] font-light leading-[1.15] text-komfy-ink sm:text-[38px]">
            Niyə KOMFY ilə işləmək rahatdır
          </h2>
          <div className="flex flex-col gap-4 text-[15px] font-light leading-[1.6] text-komfy-text2">
            {[
              "İstehsal birbaşa bizdədir — vasitəçisiz qiymət və nəzarət.",
              "Otel üçün fərdi sərtlik, ölçü və parça seçimi.",
              "Böyük həcmli sifarişlərdə topdan qiymət və müqavilə.",
              "Satınalmadan əvvəl nümunə matrası söküb yoxlamaq imkanı.",
            ].map((t) => (
              <div key={t} className="flex gap-3">
                <span className="text-komfy-gold">—</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-komfy py-[70px]">
        <div className="flex flex-col items-center gap-5 border border-komfy-line bg-komfy-card px-6 py-14 text-center">
          <h2 className="font-serif text-[30px] font-light text-komfy-ink sm:text-[36px]">
            Layihəniz üçün təklif hazırlayaq
          </h2>
          <p className="max-w-xl text-[15.5px] font-light leading-[1.7] text-komfy-muted">
            Otel adı, otaq sayı və istədiyiniz standartı bizə yazın — sizə uyğun modelləri və
            topdan qiyməti təqdim edək.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={site.whatsapp} className="btn-primary">
              WhatsApp ilə yazın
            </a>
            <a href={site.phoneHref} className="btn-outline">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
