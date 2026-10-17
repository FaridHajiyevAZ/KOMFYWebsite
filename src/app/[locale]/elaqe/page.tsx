import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Əlaqə",
  description:
    "KOMFY ilə əlaqə: telefon, WhatsApp, Instagram. Matras seçimi və zəmanət üçün bizə yazın.",
};

export default function ContactPage() {
  const channels = [
    { title: "Telefon", value: site.phone, href: site.phoneHref, cta: "Zəng et" },
    { title: "WhatsApp", value: "Mesaj yazın", href: site.whatsapp, cta: "WhatsApp aç" },
    {
      title: "Instagram",
      value: site.instagramHandle,
      href: site.instagram,
      cta: "İzlə",
    },
  ];

  return (
    <section className="container-komfy py-[72px]">
      <div className="max-w-2xl">
        <span className="eyebrow">Əlaqə</span>
        <h1 className="mt-3 font-serif text-[42px] font-light leading-[1.1] text-komfy-ink sm:text-[48px]">
          Bizimlə əlaqə
        </h1>
        <p className="mt-4 text-[16px] font-light leading-[1.7] text-komfy-text3">
          Matras seçimi, sifariş və ya zəmanət — istənilən sualda buradayıq. Sizə ən rahat
          olan kanaldan yazın.
        </p>
      </div>

      <div className="mt-10 grid gap-px border border-komfy-line bg-komfy-line md:grid-cols-3">
        {channels.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="group flex flex-col gap-2 bg-komfy-card p-8 transition-colors hover:bg-komfy-panel"
          >
            <span className="eyebrow text-[10.5px]">{c.title}</span>
            <span className="font-serif text-[22px] text-komfy-ink">{c.value}</span>
            <span className="link-more mt-3 self-start">{c.cta} →</span>
          </a>
        ))}
      </div>

      <div className="mt-10 grid gap-10 border border-komfy-line bg-komfy-panel p-8 sm:grid-cols-2">
        <div>
          <h3 className="font-serif text-[18px] text-komfy-ink">İş saatları</h3>
          <p className="mt-2 text-[14px] font-light text-komfy-muted">Hər gün: 10:00 – 20:00</p>
          <h3 className="mt-6 font-serif text-[18px] text-komfy-ink">Ünvan</h3>
          <p className="mt-2 text-[14px] font-light text-komfy-muted">{site.address}</p>
        </div>
        <div>
          <h3 className="font-serif text-[18px] text-komfy-ink">Sürətli sifariş</h3>
          <p className="mt-2 text-[14px] font-light leading-[1.65] text-komfy-muted">
            Bəyəndiyiniz modeli WhatsApp-da yazın — ölçü, qiymət və çatdırılma barədə dərhal
            məlumat verək.
          </p>
          <a href={site.whatsapp} className="btn-primary mt-4">
            WhatsApp ilə yaz
          </a>
        </div>
      </div>
    </section>
  );
}
