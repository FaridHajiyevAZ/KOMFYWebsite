import { prisma } from "./prisma";
import type { Product, Category, SizePrice, Layer } from "@/data/products";
import { site as siteDefaults } from "@/data/site";
import { defaultHomeContentByLocale, type HomeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";

// Ana səhifə kontenti üçün hər dilin ayrıca Setting sətri
const HOME_SETTING_ID: Record<Locale, number> = { az: 2, en: 3, ru: 4 };

type DbProductWithSizes = Awaited<
  ReturnType<typeof prisma.product.findFirst>
> & { sizes: DbSize[]; category: { name: string } };

interface DbSize {
  label: string;
  price: number;
  discountPrice: number | null;
  active: boolean;
  order: number;
}

function mapSizes(sizes: DbSize[]): SizePrice[] {
  return sizes
    .filter((s) => s.active)
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ size: s.label, price: s.discountPrice ?? s.price }));
}

// DB sətrini saytın gözlədiyi `Product` formasına çevirir
function toPublic(p: DbProductWithSizes): Product {
  const sizes = mapSizes(p.sizes as DbSize[]);
  const prices = sizes.map((s) => s.price);
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    category: p.category.name as Category,
    priceFrom: prices.length ? Math.min(...prices) : 0,
    priceTo: prices.length ? Math.max(...prices) : 0,
    heightCm: p.heightCm,
    springType: p.springType,
    comfortLayer: p.comfortLayer,
    firmness: p.firmness,
    firmnessPct: p.firmnessPct,
    fabric: p.fabric,
    cooling: p.cooling,
    hypoallergenic: p.hypoallergenic,
    warrantyYears: p.warrantyYears,
    trialDays: p.trialDays,
    image: p.image,
    popular: p.popular,
    specLine: p.specLine,
    shortDescription: p.shortDescription,
    description: p.description,
    whoFor: safeJson<string[]>(p.whoFor, []),
    whoNot: p.whoNot ?? undefined,
    layers: p.layers ? safeJson<Layer[]>(p.layers, []) : undefined,
    sizes,
  };
}

function safeJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    include: { category: true, sizes: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  return rows.map((r) => toPublic(r as unknown as DbProductWithSizes));
}

// Ana səhifədə göstərilməsi admin-də seçilmiş (showOnHome) məhsullar
export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true, showOnHome: true },
    include: { category: true, sizes: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    take: limit,
  });
  return rows.map((r) => toPublic(r as unknown as DbProductWithSizes));
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, sizes: true },
  });
  if (!row || !row.active) return undefined;
  return toPublic(row as unknown as DbProductWithSizes);
}

export async function getProductSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export interface PublicReview {
  stars: number;
  text: string;
  author: string;
  model: string;
}

export async function getReviews(): Promise<PublicReview[]> {
  const rows = await prisma.review.findMany({
    where: { status: "published" },
    orderBy: { order: "asc" },
  });
  return rows.map((r) => ({
    stars: r.stars,
    text: r.text,
    author: r.author,
    model: r.model,
  }));
}

export type SiteSettings = typeof siteDefaults;

export async function getSettings(): Promise<SiteSettings> {
  const row = await prisma.setting.findUnique({ where: { id: 1 } });
  if (!row) return siteDefaults;
  return { ...siteDefaults, ...safeJson<Partial<SiteSettings>>(row.data, {}) };
}

// Dildən asılı olmayan şəkil sahələrini mənbədən (AZ) hədəfə köçürür — hədəfdə yoxdursa.
function backfillImages(target: HomeContent, src: HomeContent): HomeContent {
  const pick = (a?: string, b?: string) => a || b || undefined;
  return {
    ...target,
    hero: target.hero.map((h, i) => ({ ...h, image: pick(h.image, src.hero[i]?.image) })),
    paths: target.paths.map((p, i) => ({ ...p, image: pick(p.image, src.paths[i]?.image) })),
    made: { ...target.made, image: pick(target.made.image, src.made.image) },
    gallery: target.gallery.map((g, i) => ({ ...g, image: pick(g.image, src.gallery[i]?.image) })),
    certs: target.certs.map((g, i) => ({ ...g, image: pick(g.image, src.certs[i]?.image) })),
    industries: target.industries.map((ind, i) => ({
      ...ind,
      image: pick(ind.image, src.industries[i]?.image),
    })),
    cta: { ...target.cta, image: pick(target.cta.image, src.cta.image) },
  };
}

// DB sətrini defolt tərcümə ilə birləşdirir (bir dil üçün).
function mergeHome(d: HomeContent, p: Partial<HomeContent>): HomeContent {
  return {
    hero: p.hero ?? d.hero,
    stats: p.stats ?? d.stats,
    partner: { ...d.partner, ...p.partner },
    paths: p.paths ?? d.paths,
    made: { ...d.made, ...p.made },
    processSteps: p.processSteps ?? d.processSteps,
    gallery: p.gallery ?? d.gallery,
    quality: { ...d.quality, ...p.quality },
    certs: p.certs ?? d.certs,
    industriesHead: { ...d.industriesHead, ...p.industriesHead },
    industries: p.industries ?? d.industries,
    testimonial: { ...d.testimonial, ...p.testimonial },
    retail: { ...d.retail, ...p.retail },
    cta: { ...d.cta, ...p.cta },
  };
}

// Ana səhifə blokları — hər dil üçün ayrı mətn. Şəkillər AZ-də saxlanılır və bütün dillərə şamil olunur.
export async function getHomeContent(locale: Locale = "az"): Promise<HomeContent> {
  const d = defaultHomeContentByLocale[locale] ?? defaultHomeContentByLocale.az;
  const row = await prisma.setting.findUnique({ where: { id: HOME_SETTING_ID[locale] } });
  const content = mergeHome(d, row ? safeJson<Partial<HomeContent>>(row.data, {}) : {});

  // Şəkilləri AZ sətrindən götür (dil-neytral). AZ üçün özü mənbədir.
  if (locale === "az") return content;
  const azRow = await prisma.setting.findUnique({ where: { id: HOME_SETTING_ID.az } });
  const azContent = mergeHome(
    defaultHomeContentByLocale.az,
    azRow ? safeJson<Partial<HomeContent>>(azRow.data, {}) : {}
  );
  return backfillImages(content, azContent);
}
