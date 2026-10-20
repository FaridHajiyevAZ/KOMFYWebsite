"use client";

import { useRef, useState } from "react";

/**
 * Admin şəkil yükləmə widgeti — fayl seçilir, /api/admin/upload-a göndərilir,
 * qaytarılan URL onChange ilə forma state-inə yazılır. Thumbnail + Sil düyməsi.
 */
export function ImageUpload({
  value,
  onChange,
  label,
}: {
  value?: string;
  onChange: (url: string | undefined) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Yükləmə alınmadı");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Şəbəkə xətası");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-[11.5px] font-medium text-komfy-text2">{label}</span>}
      <div className="flex items-center gap-3">
        <div className="relative h-[72px] w-[108px] shrink-0 overflow-hidden rounded-[4px] border border-komfy-line2 bg-komfy-panel">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[11px] text-komfy-muted2">
              Şəkil yoxdur
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="self-start rounded-full border border-komfy-border px-3.5 py-1.5 text-[12px] font-medium text-komfy-green hover:bg-komfy-panel disabled:opacity-50"
          >
            {busy ? "Yüklənir…" : value ? "Şəkli dəyiş" : "Şəkil yüklə"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="self-start text-[12px] font-medium text-red-500 hover:text-red-700"
            >
              Şəkli sil
            </button>
          )}
          {error && <span className="text-[11.5px] text-red-600">{error}</span>}
        </div>
      </div>
    </div>
  );
}
