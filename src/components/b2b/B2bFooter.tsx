import { LocaleLink as Link } from "@/components/LocaleLink";
import { b2bContact } from "@/data/b2b";
import { getSettings } from "@/lib/content";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export async function B2bFooter({ locale }: { locale: Locale }) {
  const s = await getSettings().catch(() => null);
  const d = getDictionary(locale);
  const phone = s?.phone || b2bContact.phone;
  const email = s?.email || b2bContact.email;
  const address = s?.address || b2bContact.address;
  const instagram = s?.instagram;
  const instagramHandle = s?.instagramHandle;

  const cols = [
    {
      title: d.footer.company,
      links: [
        { label: d.nav.manufacturing, href: "/manufacturing" },
        { label: d.nav.oem, href: "/oem" },
        { label: d.nav.about, href: "/about" },
      ],
    },
    {
      title: d.footer.business,
      links: [
        { label: d.nav.industries, href: "/industries" },
        { label: d.footer.projectsB2b, href: "/quote" },
        { label: d.footer.requestQuote, href: "/quote" },
      ],
    },
    {
      title: d.footer.products,
      links: [
        { label: d.footer.catalog, href: "/products" },
        { label: d.footer.qualityCompliance, href: "/quality" },
      ],
    },
    {
      title: d.footer.resources,
      links: [
        { label: d.footer.companyProfile, href: "#" },
        { label: d.footer.certificates, href: "#" },
      ],
    },
  ];

  return (
    <footer className="grid grid-cols-2 gap-6 bg-b2b-ink2 px-5 py-12 text-[13px] text-b2b-footer sm:px-8 md:grid-cols-3 lg:grid-cols-5">
      {cols.map((col) => (
        <div key={col.title}>
          <b className="text-white">{col.title}</b>
          <div className="mt-2 flex flex-col gap-1.5">
            {col.links.map((l, i) => (
              <Link key={i} href={l.href} className="text-b2b-footer hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <div>
        <b className="text-white">{d.footer.contact}</b>
        <div className="mt-2 flex flex-col gap-1 leading-relaxed text-b2b-footer">
          <span>{address}</span>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-b2b-footer hover:text-white">
            {phone}
          </a>
          <a href={`mailto:${email}`} className="text-b2b-footer hover:text-white">
            {email}
          </a>
          {instagram && (
            <a href={instagram} className="text-b2b-footer hover:text-white">
              Instagram: {instagramHandle}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
