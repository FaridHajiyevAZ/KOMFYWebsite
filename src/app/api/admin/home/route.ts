import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard } from "@/lib/admin-guard";
import { isLocale, type Locale } from "@/i18n/config";

const HOME_SETTING_ID: Record<Locale, number> = { az: 2, en: 3, ru: 4 };

export async function PUT(request: Request) {
  const g = await guard();
  if (g instanceof NextResponse) return g;

  const url = new URL(request.url);
  const localeParam = url.searchParams.get("locale") || "az";
  const locale: Locale = isLocale(localeParam) ? localeParam : "az";

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Yanlış məlumat" }, { status: 400 });
  }

  const id = HOME_SETTING_ID[locale];
  await prisma.setting.upsert({
    where: { id },
    update: { data: JSON.stringify(body) },
    create: { id, data: JSON.stringify(body) },
  });

  return NextResponse.json({ ok: true });
}
