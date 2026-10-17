import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import Image from "next/image";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "KOMFY 2015-ci ildən Azərbaycanda müasir texnologiya ilə ortopedik matras istehsal edir. Missiyamız — hər kəs üçün sağlam yuxu.",
};

export default function AboutPage() {
  return (
    <>
      <section className="container-komfy grid items-center gap-12 py-[72px] lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="eyebrow">{site.since}-ci ildən</span>
          <h1 className="font-serif text-[42px] font-light leading-[1.1] text-komfy-ink sm:text-[52px]">
            Sağlam yuxunu hər evə çatdırmaq
          </h1>
          <p className="text-[16px] font-light leading-[1.7] text-komfy-text3">
            KOMFY 2015-ci ildə Azərbaycanda quruldu. Məqsədimiz sadə idi: dünya
            standartlarında ortopedik matrasları yerli istehsalla, əlçatan qiymətə təqdim
            etmək. Bu gün müasir texnologiya və keyfiyyətli materiallarla minlərlə ailənin
            yuxusunu yaxşılaşdırırıq.
          </p>
          <p className="text-[16px] font-light leading-[1.7] text-komfy-text3">
            Bizə görə yuxu ən vacib sağlamlıq amillərindən biridir. Ona görə hər matrası
            fərdi rahatlıq üçün düşünür, hər müştəriyə düzgün seçimdə kömək edirik.
          </p>
          <blockquote className="mt-2 border-l-2 border-komfy-gold pl-4 font-serif text-[19px] font-light text-komfy-ink">
            “{site.slogan}.”
          </blockquote>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden border border-komfy-line bg-komfy-line">
          <Image
            src="/products/adaptive.webp"
            alt="KOMFY matras"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-komfy-line bg-komfy-panel px-5 py-14 sm:px-8 lg:px-[60px]">
        <div className="mx-auto grid max-w-container gap-px border border-komfy-line bg-komfy-line sm:grid-cols-3">
          {[
            { n: "2015", l: "Fəaliyyətə başladığımız il" },
            { n: "9", l: "Ortopedik model" },
            { n: "30", l: "Günlük evdə sınaq" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-2 bg-komfy-surface px-8 py-10 text-center">
              <span className="font-serif text-[40px] font-light text-komfy-ink">{s.n}</span>
              <span className="text-[13.5px] font-light text-komfy-muted">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container-komfy py-[72px]">
        <h2 className="font-serif text-[30px] font-light text-komfy-ink sm:text-[36px]">
          Niyə KOMFY?
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            {
              t: "Yerli istehsal",
              d: "Bütün matraslar Azərbaycanda, ciddi keyfiyyət nəzarəti altında istehsal olunur.",
            },
            {
              t: "Fərdi yanaşma",
              d: "Hər müştəriyə yuxu vərdişinə uyğun model seçməkdə peşəkar dəstək veririk.",
            },
            {
              t: "30 gün sınaq",
              d: "Azərbaycanda yalnız KOMFY 30 günlük evdə sınaq imkanı təqdim edir.",
            },
            {
              t: "Uzunmüddətli zəmanət",
              d: "Premium modellərə 10 ilə qədər istehsalçı zəmanəti.",
            },
          ].map((f) => (
            <div key={f.t} className="flex gap-4 border-t border-komfy-line pt-5">
              <span className="text-komfy-gold">—</span>
              <div>
                <h3 className="font-serif text-[19px] text-komfy-ink">{f.t}</h3>
                <p className="mt-1.5 text-[14px] font-light leading-[1.6] text-komfy-muted">
                  {f.d}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5 bg-komfy-green px-6 py-14 text-center text-komfy-onDark">
          <h2 className="font-serif text-[30px] font-light text-[#F7F4EE] sm:text-[36px]">
            Doğru matrası birlikdə seçək
          </h2>
          <p className="max-w-xl text-[15.5px] font-light leading-[1.7] text-komfy-onDark2">
            Sualınız var? Peşəkar komandamız sizə ən uyğun modeli tapmaqda kömək edəcək.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/secim"
              className="rounded-full bg-komfy-surface px-7 py-4 text-[15px] font-medium text-komfy-green transition hover:brightness-[0.98]"
            >
              Rahatlıq testi
            </Link>
            <Link
              href="/elaqe"
              className="rounded-full border border-komfy-goldSoft/50 px-7 py-4 text-[15px] font-medium text-komfy-onDark transition hover:bg-white/5"
            >
              Bizimlə əlaqə
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
