// Build zamanı təhlükəsiz seed: baza boşdursa (məhsul yoxdursa) seed edir,
// məlumat varsa ötürür — belə ki, persistent diskdə admin dəyişiklikləri silinmir.
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";

const prisma = new PrismaClient();

async function main() {
  let count = 0;
  try {
    count = await prisma.product.count();
  } catch {
    count = 0; // cədvəl yoxdursa boş sayılır
  }
  await prisma.$disconnect();

  if (count > 0) {
    console.log(`[seed-if-empty] Bazada ${count} məhsul var — seed ötürülür.`);
    return;
  }
  console.log("[seed-if-empty] Baza boşdur — ilkin məlumat (məhsullar, rəylər, istifadəçilər) yüklənir…");
  execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
}

main().catch((e) => {
  console.error("[seed-if-empty] xəta:", e);
  process.exit(1);
});
