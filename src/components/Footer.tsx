import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-komfy-ink px-5 pb-9 pt-16 text-komfy-onDark2 sm:px-8 lg:px-[60px]">
      <div className="mx-auto max-w-container">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="font-serif text-[20px] font-semibold tracking-wordmark text-komfy-surface">
              KOMFY
            </span>
            <p className="max-w-xs text-[14px] font-light leading-[1.7]">
              {site.since}-ci ildən fəaliyyət göstərən yerli matras istehsalçısı və yataq
              markası. Premium ortopedik matraslar, topdan və pərakəndə satış.
            </p>
          </div>

          <FooterCol title="Kateqoriyalar">
            <FooterLink href="/mehsullar?kateqoriya=Ekonomik">Ekonomik seriya</FooterLink>
            <FooterLink href="/mehsullar?kateqoriya=Komfort">Komfort seriya</FooterLink>
            <FooterLink href="/mehsullar?kateqoriya=Premium">Premium seriya</FooterLink>
            <FooterLink href="/mehsullar/honeymoon">Özəl seriya — Honeymoon</FooterLink>
          </FooterCol>

          <FooterCol title="Kömək">
            <FooterLink href="/sinaq">30 gün yat, sonra seç</FooterLink>
            <FooterLink href="/zemanet">Zəmanət şərtləri</FooterLink>
            <FooterLink href="/sinaq">Çatdırılma</FooterLink>
            <FooterLink href="/oteller">Otellər üçün</FooterLink>
          </FooterCol>

          <FooterCol title="Əlaqə">
            <a href={site.phoneHref} className="footer-a">
              {site.phone}
            </a>
            <a href={site.whatsapp} className="footer-a">
              WhatsApp
            </a>
            <a href={site.instagram} className="footer-a">
              Instagram: {site.instagramHandle}
            </a>
          </FooterCol>
        </div>

        <div className="mt-11 flex flex-col justify-between gap-2 border-t border-[#33322B] pt-6 text-[12.5px] text-[#7D776B] sm:flex-row">
          <span>© 2026 KOMFY</span>
          <span>Bütün şəkil və materiallar KOMFY-yə məxsusdur</span>
        </div>
      </div>

      <style>{`.footer-a{font-size:14px;font-weight:300;color:#B9B3A6}.footer-a:hover{color:#F4F0E9}`}</style>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#7D776B]">
        {title}
      </span>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="footer-a">
      {children}
    </Link>
  );
}
