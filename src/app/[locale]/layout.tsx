import { notFound } from "next/navigation";
import { B2bHeader } from "@/components/b2b/B2bHeader";
import { B2bFooter } from "@/components/b2b/B2bFooter";
import { locales, isLocale, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <B2bHeader locale={locale as Locale} />
      <main className="min-h-screen bg-b2b-bg">{children}</main>
      <B2bFooter locale={locale as Locale} />
    </>
  );
}
