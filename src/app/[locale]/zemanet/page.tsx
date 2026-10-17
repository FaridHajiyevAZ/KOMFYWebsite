import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/LocaleLink";
import { site, warrantyTiers } from "@/data/site";
import { getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Zəmanət",
  description:
    "KOMFY zəmanət şərtləri: premium modellərə 10 il, komfort modellərə 5 il. Zəmanətinizi onlayn qeydiyyatdan keçirin.",
};

export default async function WarrantyPage() {
  const products = await getProducts();
  const premium = products.filter((p) => p.warrantyYears >= 10);
  const comfort = products.filter((p) => p.warrantyYears < 10);

  return (
    <>
      <section className="container-komfy py-[72px]">
        <div className="max-w-2xl">
          <span className="eyebrow">Rahatlığınıza zəmanət</span>
          <h1 className="mt-3 font-serif text-[42px] font-light leading-[1.1] text-komfy-ink sm:text-[48px]">
            Zəmanət və dəstək
          </h1>
          <p className="mt-4 text-[16px] font-light leading-[1.7] text-komfy-text3">
            Hər KOMFY matrası istehsalçı zəmanəti, 30 günlük sınaq müddəti və pulsuz
            çatdırılma ilə gəlir. Rahatlığınız bizim üçün öhdəlikdir.
          </p>
        </div>

        <div className="mt-10 grid gap-px border border-komfy-line bg-komfy-line sm:grid-cols-3">
          {warrantyTiers.map((t) => (
            <div key={t.title} className="flex flex-col gap-2 bg-komfy-card p-7">
              <span className="font-serif text-[28px] font-light text-komfy-gold">
                {t.value}
              </span>
              <span className="font-serif text-[17px] text-komfy-ink">{t.title}</span>
              <span className="text-[13px] font-light text-komfy-muted">{t.models}</span>
            </div>
          ))}
        </div>
      </section>

      {/* By model */}
      <section className="border-y border-komfy-line bg-komfy-panel px-5 py-[70px] sm:px-8 lg:px-[60px]">
        <div className="mx-auto max-w-container">
          <h2 className="font-serif text-[28px] font-light text-komfy-ink sm:text-[32px]">
            Modellərə görə zəmanət
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ModelList title="Premium — 10 il" items={premium.map((p) => p.name)} />
            <ModelList title="Komfort və ekonomik — 5 il" items={comfort.map((p) => p.name)} />
          </div>
        </div>
      </section>

      {/* Covered + register */}
      <section className="container-komfy py-[70px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-[28px] font-light text-komfy-ink sm:text-[32px]">
              Zəmanət nələri əhatə edir?
            </h2>
            <div className="mt-5 flex flex-col gap-3.5 text-[15px] font-light leading-[1.6] text-komfy-text2">
              {[
                "İstehsal qüsurları və material nöqsanları",
                "Yay sisteminin normal istifadədə sınması",
                "Tikiş və struktur bütövlüyü",
                "Norma xaricində çökmə",
              ].map((t) => (
                <div key={t} className="flex gap-3">
                  <span className="text-komfy-gold">—</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13.5px] font-light leading-[1.6] text-komfy-muted2">
              Qeyd: Fərdi (qeyri-standart) ölçülü sifarişlərdə 30% beh alınır və bu sifarişlər
              geri qaytarılmır. Zəmanət düzgün istifadə şərtilə etibarlıdır.
            </p>
          </div>

          <div className="flex flex-col gap-4 bg-komfy-green p-8 text-komfy-onDark">
            <h3 className="font-serif text-[22px] text-[#F7F4EE]">
              Zəmanətinizi qeydiyyatdan keçirin
            </h3>
            <p className="text-[15px] font-light leading-[1.7] text-komfy-onDark2">
              Matrasınızı aldıqdan sonra zəmanət portalında qeydiyyatdan keçin — sənədləriniz
              rəqəmsal saxlanılsın, dəstək lazım olduqda bir kliklə müraciət edin.
            </p>
            <ol className="flex flex-col gap-1.5 text-[14px] font-light text-komfy-onDark2">
              <li>1. Portala daxil olun</li>
              <li>2. Model və satınalma tarixini qeyd edin</li>
              <li>3. Zəmanətiniz aktivləşsin</li>
            </ol>
            <a
              href={site.warrantyPortalUrl}
              className="mt-2 self-start rounded-full bg-komfy-surface px-7 py-4 text-[15px] font-medium text-komfy-green transition hover:brightness-[0.98]"
            >
              Zəmanət portalına keç
            </a>
            <p className="text-[12.5px] text-komfy-onDark3">Dəstək üçün: {site.phone}</p>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/sinaq" className="link-more">
            30 gün sınaq şərtləri və FAQ →
          </Link>
        </div>
      </section>
    </>
  );
}

function ModelList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3 border border-komfy-line bg-komfy-card p-6">
      <span className="font-serif text-[18px] text-komfy-ink">{title}</span>
      <div className="flex flex-wrap gap-2">
        {items.map((m) => (
          <span
            key={m}
            className="rounded-full border border-komfy-line2 px-3 py-1.5 text-[13px] font-light text-komfy-text2"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
