import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { seedProducts } from "../src/data/products";
import { site, reviews } from "../src/data/site";

const prisma = new PrismaClient();

const CATEGORY_ORDER: Record<string, number> = {
  Ekonomik: 0,
  Komfort: 1,
  Premium: 2,
};

// Ölçüyə görə stok/hazırlanma nümunə dəyərləri (dizayndakı kimi)
const STOCK_BY_INDEX = ["Anbarda 14", "Anbarda 8", "Anbarda 6", "Sifarişlə", "Sifarişlə"];
const LEAD_BY_INDEX = ["2 gün", "2 gün", "2 gün", "5 gün", "5 gün"];

const FEATURED_ON_HOME = new Set(["rose", "goldline", "adaptive"]);

async function main() {
  console.log("Təmizlənir…");
  await prisma.changeLog.deleteMany();
  await prisma.size.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.review.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();

  // Kateqoriyalar
  const catNames = [...new Set(seedProducts.map((p) => p.category))];
  const catMap = new Map<string, string>();
  for (const name of catNames) {
    const c = await prisma.category.create({
      data: {
        name,
        slug: name.toLowerCase(),
        order: CATEGORY_ORDER[name] ?? 9,
      },
    });
    catMap.set(name, c.id);
  }

  // Məhsullar + ölçülər
  let order = 0;
  for (const p of seedProducts) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        categoryId: catMap.get(p.category)!,
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
        specLine: p.specLine,
        shortDescription: p.shortDescription,
        description: p.description,
        whoFor: JSON.stringify(p.whoFor),
        whoNot: p.whoNot ?? null,
        layers: p.layers ? JSON.stringify(p.layers) : null,
        active: true,
        popular: !!p.popular,
        showOnHome: FEATURED_ON_HOME.has(p.slug),
        showInCompare: true,
        includeInHotel: true,
        order: order++,
        customSizeAllowed: p.slug !== "honeymoon",
        depositPct: 30,
        customReturnable: false,
        sizes: {
          create: p.sizes.map((s, i) => ({
            label: s.size,
            price: s.price,
            discountPrice: null,
            stock: STOCK_BY_INDEX[i] ?? "Sifarişlə",
            leadTime: LEAD_BY_INDEX[i] ?? "5 gün",
            active: true,
            isDefault: i === 2,
            order: i,
          })),
        },
      },
    });
  }

  // Rəylər
  for (let i = 0; i < reviews.length; i++) {
    const r = reviews[i];
    await prisma.review.create({
      data: {
        author: r.author,
        model: r.model,
        stars: r.stars,
        text: r.text,
        status: "published",
        order: i,
      },
    });
  }

  // Sayt parametrləri
  await prisma.setting.create({
    data: { id: 1, data: JSON.stringify(site) },
  });

  // İstifadəçilər (Admin + Satış operatoru)
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  const operPass = process.env.OPERATOR_PASSWORD || "operator123";
  await prisma.user.create({
    data: {
      email: "admin@komfy.az",
      name: "Nurlan A.",
      role: "admin",
      passwordHash: await bcrypt.hash(adminPass, 10),
    },
  });
  await prisma.user.create({
    data: {
      email: "operator@komfy.az",
      name: "Elvin H.",
      role: "operator",
      passwordHash: await bcrypt.hash(operPass, 10),
    },
  });

  console.log("Seed tamamlandı:");
  console.log(`  ${catNames.length} kateqoriya, ${seedProducts.length} məhsul, ${reviews.length} rəy`);
  console.log(`  Admin:    admin@komfy.az / ${adminPass}`);
  console.log(`  Operator: operator@komfy.az / ${operPass}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
