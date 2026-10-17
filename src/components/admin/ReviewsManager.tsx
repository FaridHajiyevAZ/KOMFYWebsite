"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface AdminReview {
  id: string;
  author: string;
  model: string;
  stars: number;
  text: string;
  status: string;
}

type Draft = { author: string; model: string; stars: number; text: string; status: string };

const empty: Draft = { author: "", model: "", stars: 5, text: "", status: "published" };

function Stars({ n }: { n: number }) {
  return (
    <span className="tracking-[0.2em] text-[13px] text-komfy-gold">
      {"★".repeat(n)}
      <span className="text-komfy-line2">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function ReviewsManager({ reviews }: { reviews: AdminReview[] }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(empty);
  const [busy, setBusy] = useState(false);

  async function call(url: string, method: string, body?: unknown) {
    setBusy(true);
    try {
      const res = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (res.ok) router.refresh();
      return res.ok;
    } finally {
      setBusy(false);
    }
  }

  async function create() {
    if (!draft.author.trim() || !draft.text.trim()) return;
    const ok = await call("/api/admin/reviews", "POST", draft);
    if (ok) {
      setAdding(false);
      setDraft(empty);
    }
  }
  async function saveEdit(id: string) {
    const ok = await call(`/api/admin/reviews/${id}`, "PUT", draft);
    if (ok) setEditingId(null);
  }
  function startEdit(r: AdminReview) {
    setEditingId(r.id);
    setAdding(false);
    setDraft({ author: r.author, model: r.model, stars: r.stars, text: r.text, status: r.status });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-komfy-muted2">{reviews.length} rəy</span>
        <button
          type="button"
          onClick={() => {
            setAdding((v) => !v);
            setEditingId(null);
            setDraft(empty);
          }}
          className="rounded-full bg-komfy-green px-4 py-2 text-[12.5px] font-medium text-komfy-surface hover:bg-komfy-greenSoft"
        >
          {adding ? "Ləğv et" : "+ Yeni rəy"}
        </button>
      </div>

      {adding && <DraftForm draft={draft} setDraft={setDraft} onSave={create} busy={busy} saveLabel="Əlavə et" />}

      <div className="flex flex-col gap-3">
        {reviews.map((r) =>
          editingId === r.id ? (
            <DraftForm
              key={r.id}
              draft={draft}
              setDraft={setDraft}
              onSave={() => saveEdit(r.id)}
              onCancel={() => setEditingId(null)}
              busy={busy}
              saveLabel="Yadda saxla"
            />
          ) : (
            <div key={r.id} className="flex flex-col gap-2 border border-komfy-line bg-komfy-card p-5">
              <div className="flex items-center justify-between">
                <Stars n={r.stars} />
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                    r.status === "published"
                      ? "border-komfy-green text-komfy-green"
                      : "border-komfy-gold text-[#8A6A3B]"
                  }`}
                >
                  {r.status === "published" ? "Dərc olunub" : "Gözləyir"}
                </span>
              </div>
              <p className="font-serif text-[15px] font-light leading-[1.6] text-komfy-ink">{r.text}</p>
              <span className="text-[12.5px] text-komfy-muted2">
                {r.author}
                {r.model ? ` · ${r.model}` : ""}
              </span>
              <div className="mt-1 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() =>
                    call(`/api/admin/reviews/${r.id}`, "PUT", {
                      status: r.status === "published" ? "pending" : "published",
                    })
                  }
                  className="rounded-full border border-komfy-border px-3 py-1.5 text-[12px] font-medium text-komfy-green hover:bg-komfy-panel disabled:opacity-50"
                >
                  {r.status === "published" ? "Gizlət" : "Dərc et"}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => startEdit(r)}
                  className="rounded-full border border-komfy-border px-3 py-1.5 text-[12px] font-medium text-komfy-text2 hover:bg-komfy-panel disabled:opacity-50"
                >
                  Redaktə
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    if (confirm("Bu rəy silinsin?")) call(`/api/admin/reviews/${r.id}`, "DELETE");
                  }}
                  className="rounded-full border border-red-200 px-3 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  Sil
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function DraftForm({
  draft,
  setDraft,
  onSave,
  onCancel,
  busy,
  saveLabel,
}: {
  draft: Draft;
  setDraft: (d: Draft) => void;
  onSave: () => void;
  onCancel?: () => void;
  busy: boolean;
  saveLabel: string;
}) {
  return (
    <div className="flex flex-col gap-3 border border-komfy-green/40 bg-komfy-panel p-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          value={draft.author}
          onChange={(e) => setDraft({ ...draft, author: e.target.value })}
          placeholder="Müəllif (Aysel M.)"
          className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px]"
        />
        <input
          value={draft.model}
          onChange={(e) => setDraft({ ...draft, model: e.target.value })}
          placeholder="Model (Goldline, 160×200)"
          className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px]"
        />
        <select
          value={draft.stars}
          onChange={(e) => setDraft({ ...draft, stars: Number(e.target.value) })}
          className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px]"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} ulduz
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={draft.text}
        onChange={(e) => setDraft({ ...draft, text: e.target.value })}
        placeholder="Rəy mətni…"
        rows={3}
        className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px] leading-[1.6]"
      />
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-[12.5px] text-komfy-text2">
          <input
            type="checkbox"
            checked={draft.status === "published"}
            onChange={(e) => setDraft({ ...draft, status: e.target.checked ? "published" : "pending" })}
            className="accent-komfy-green"
          />
          Dərc olunsun
        </label>
        <button
          type="button"
          onClick={onSave}
          disabled={busy}
          className="ml-auto rounded-full bg-komfy-green px-5 py-2 text-[12.5px] font-medium text-komfy-surface hover:bg-komfy-greenSoft disabled:opacity-50"
        >
          {busy ? "…" : saveLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-komfy-border px-4 py-2 text-[12.5px] font-medium text-komfy-text2"
          >
            Ləğv
          </button>
        )}
      </div>
    </div>
  );
}
