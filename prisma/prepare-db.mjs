// Build-dan əvvəl Prisma hazırlığı.
// Lokal (iCloud) build-da `prisma db push` DONUR, ona görə baza qurulması YALNIZ
// Render-də (RENDER env dəyişəni avtomatik təyin olunur) işə salınır.
// `prisma generate` hər yerdə lazımdır (next build üçün klient).
import { execSync } from "node:child_process";

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

console.log("[prepare-db] prisma generate");
run("npx prisma generate");

if (!process.env.RENDER) {
  console.log("[prepare-db] Render deyil — db push/seed ötürülür (yalnız generate).");
  process.exit(0);
}
if (!process.env.DATABASE_URL) {
  console.warn("[prepare-db] DATABASE_URL təyin edilməyib — db push/seed ötürülür. Render env-də əlavə edin.");
  process.exit(0);
}

try {
  console.log("[prepare-db] prisma db push (sxemi bazaya tətbiq edir, Lead cədvəli daxil)");
  run("npx prisma db push --skip-generate");
} catch (e) {
  console.warn("[prepare-db] db push alınmadı:", e.message);
}

try {
  run("npx tsx prisma/seed-if-empty.ts");
} catch (e) {
  console.warn("[prepare-db] seed ötürüldü:", e.message);
}
