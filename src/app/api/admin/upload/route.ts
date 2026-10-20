import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { guard } from "@/lib/admin-guard";

// İcazə verilən şəkil tipləri və maksimum ölçü
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// Şəkil yükləmə — public/uploads/ qovluğuna saxlayır, /uploads/<fayl> URL-ni qaytarır.
export async function POST(request: Request) {
  const g = await guard();
  if (g instanceof NextResponse) return g;

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fayl tapılmadı" }, { status: 400 });
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Yalnız JPG, PNG, WEBP, AVIF və ya GIF şəkillər" },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Şəkil 5 MB-dan böyük olmamalıdır" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const rand = Math.random().toString(36).slice(2, 8);
  const filename = `${Date.now()}-${rand}.${ext}`;

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
