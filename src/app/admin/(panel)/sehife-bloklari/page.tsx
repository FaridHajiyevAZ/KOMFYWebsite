import Link from "next/link";
import { getHomeContent } from "@/lib/content";
import { getSession } from "@/lib/auth";
import { PageHeader } from "@/components/admin/PageHeader";
import { HomeEditor } from "@/components/admin/HomeEditor";
import { locales, localeFullNames, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function HomeBlocksPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale: Locale = lang && isLocale(lang) ? lang : "az";
  const [home, session] = await Promise.all([getHomeContent(locale), getSession()]);

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Səhifə blokları"
        subtitle="Ana səhifənin bütün bölmələri — hər dil ayrıca"
      />
      <div className="px-8 pt-5">
        {/* Dil tabları */}
        <div className="flex gap-2">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/admin/sehife-bloklari?lang=${l}`}
              className={`rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors ${
                l === locale
                  ? "bg-komfy-green text-komfy-surface"
                  : "border border-komfy-line2 text-komfy-text2 hover:bg-komfy-card"
              }`}
            >
              {localeFullNames[l]}
            </Link>
          ))}
        </div>
      </div>
      <div className="p-8 pt-4">
        <HomeEditor key={locale} initial={home} canEdit={!!session} locale={locale} />
      </div>
    </div>
  );
}
