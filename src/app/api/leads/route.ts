import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { sendLeadEmail } from "@/lib/mail";

export const runtime = "nodejs";

// Sütun kimi saxlanılan açarlar; qalan bütün sahələr `data` JSON-a yığılır
const KNOWN = new Set([
  "type",
  "path",
  "name",
  "company",
  "country",
  "email",
  "phone",
  "businessType",
  "comments",
  "file",
]);

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Yanlış format" }, { status: 400 });
  }

  const get = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" && v.trim() ? v.trim() : null;
  };

  const name = get("name");
  if (!name) {
    return NextResponse.json({ error: "Ad tələb olunur" }, { status: 400 });
  }

  // Dinamik (naməlum) sahələri topla
  const data: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (KNOWN.has(key)) continue;
    if (typeof value === "string" && value.trim()) data[key] = value.trim();
  }

  // Fayl yükləməsi (varsa) — uploads/ qovluğuna
  let fileName: string | null = null;
  const file = form.get("file");
  if (file && typeof file !== "string" && file.size > 0) {
    try {
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
      fileName = `${Date.now()}-${safe}`;
      const dir = path.join(process.cwd(), "uploads");
      await mkdir(dir, { recursive: true });
      const bytes = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(dir, fileName), bytes);
    } catch (e) {
      console.error("[leads] fayl yüklənmədi:", e);
      fileName = null;
    }
  }

  const type = get("type") === "oem" ? "oem" : "quote";
  const lead = {
    type,
    path: get("path"),
    name,
    company: get("company"),
    email: get("email"),
    phone: get("phone"),
    country: get("country"),
    businessType: get("businessType"),
    comments: get("comments"),
    data: JSON.stringify(data),
    fileName,
  };

  try {
    await prisma.lead.create({ data: lead });
  } catch (e) {
    console.error("[leads] baza xətası:", e);
    return NextResponse.json({ error: "Server xətası" }, { status: 500 });
  }

  // Email bildirişi (SMTP varsa) — uğursuz olsa belə sorğu artıq saxlanılıb
  await sendLeadEmail({ ...lead, data }).catch(() => {});

  return NextResponse.json({ ok: true });
}
