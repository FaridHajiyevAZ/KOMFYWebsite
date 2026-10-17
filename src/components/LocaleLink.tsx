"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

function currentLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : defaultLocale;
}

// next/link əvəzlənir: daxili "/..." linklərini cari dil prefiksi ilə verir.
export function LocaleLink({ href, ...rest }: Props) {
  const pathname = usePathname();
  const locale = currentLocale(pathname);

  let finalHref = href;
  if (href.startsWith("/")) {
    const first = href.split("/")[1];
    if (!(locales as readonly string[]).includes(first)) {
      finalHref = href === "/" ? `/${locale}` : `/${locale}${href}`;
    }
  }

  return <NextLink href={finalHref} {...rest} />;
}
