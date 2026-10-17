"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface SettingsValues {
  fullName: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  email: string;
  address: string;
  since: number;
}

const fields: { key: keyof SettingsValues; label: string; type?: string }[] = [
  { key: "fullName", label: "Brend adı" },
  { key: "slogan", label: "Şüar" },
  { key: "phone", label: "Telefon" },
  { key: "whatsapp", label: "WhatsApp (link)" },
  { key: "instagram", label: "Instagram (link)" },
  { key: "instagramHandle", label: "Instagram adı" },
  { key: "email", label: "Email" },
  { key: "address", label: "Ünvan" },
  { key: "since", label: "Fəaliyyət ili", type: "number" },
];

export function SettingsForm({
  initial,
  canEdit,
}: {
  initial: SettingsValues;
  canEdit: boolean;
}) {
  const router = useRouter();
  const [v, setV] = useState<SettingsValues>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");

  async function save() {
    if (!canEdit) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-komfy-text2">{f.label}</span>
            <input
              type={f.type || "text"}
              value={v[f.key] ?? ""}
              onChange={(e) =>
                setV({
                  ...v,
                  [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                })
              }
              disabled={!canEdit}
              className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px] text-komfy-ink outline-none focus:border-komfy-green disabled:bg-komfy-panel disabled:text-komfy-muted2"
            />
          </label>
        ))}
      </div>

      {canEdit ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={save}
            disabled={status === "saving"}
            className="rounded-full bg-komfy-green px-6 py-2.5 text-[13px] font-medium text-komfy-surface hover:bg-komfy-greenSoft disabled:opacity-50"
          >
            {status === "saving" ? "Saxlanılır…" : "Yadda saxla"}
          </button>
          {status === "ok" && <span className="text-[13px] text-komfy-green">Yadda saxlanıldı ✓</span>}
          {status === "error" && <span className="text-[13px] text-red-600">Xəta baş verdi</span>}
        </div>
      ) : (
        <span className="text-[12.5px] text-komfy-muted2">
          Yalnız admin parametrləri dəyişə bilər (siz operator rejimindəsiniz).
        </span>
      )}

      <p className="mt-2 text-[12.5px] font-light leading-[1.6] text-komfy-muted2">
        Bu məlumatlar saytın altbilgisindəki (footer) əlaqə bölməsində göstərilir.
      </p>
    </div>
  );
}
