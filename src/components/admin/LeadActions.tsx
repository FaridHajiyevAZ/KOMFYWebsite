"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES: { key: string; label: string }[] = [
  { key: "new", label: "Yeni" },
  { key: "contacted", label: "Cavablandı" },
  { key: "closed", label: "Bağlandı" },
];

export function LeadActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(s: string) {
    if (s === status) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: s }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Bu sorğu silinsin?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex overflow-hidden rounded-full border border-komfy-border">
        {STATUSES.map((s) => (
          <button
            key={s.key}
            type="button"
            disabled={busy}
            onClick={() => setStatus(s.key)}
            className={`px-3 py-1 text-[11.5px] font-medium transition-colors disabled:opacity-50 ${
              status === s.key
                ? "bg-komfy-green text-komfy-surface"
                : "bg-komfy-card text-komfy-text2 hover:bg-komfy-panel"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={busy}
        onClick={remove}
        className="text-[11.5px] font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
      >
        Sil
      </button>
    </div>
  );
}
