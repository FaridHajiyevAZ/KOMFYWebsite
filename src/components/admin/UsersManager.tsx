"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export function UsersManager({
  users,
  currentUserId,
  canManage,
}: {
  users: AdminUser[];
  currentUserId: string;
  canManage: boolean;
}) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState({ name: "", email: "", role: "operator", password: "" });

  async function create() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Xəta");
        return;
      }
      setAdding(false);
      setDraft({ name: "", email: "", role: "operator", password: "" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Bu istifadəçi silinsin?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Silinmədi");
      else router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {canManage && (
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-komfy-muted2">{users.length} istifadəçi</span>
          <button
            type="button"
            onClick={() => setAdding((v) => !v)}
            className="rounded-full bg-komfy-green px-4 py-2 text-[12.5px] font-medium text-komfy-surface hover:bg-komfy-greenSoft"
          >
            {adding ? "Ləğv et" : "+ Yeni istifadəçi"}
          </button>
        </div>
      )}

      {error && <p className="rounded-[4px] bg-red-50 px-4 py-2 text-[13px] text-red-700">{error}</p>}

      {adding && (
        <div className="grid gap-3 border border-komfy-green/40 bg-komfy-panel p-5 sm:grid-cols-2">
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            placeholder="Ad Soyad"
            className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px]"
          />
          <input
            value={draft.email}
            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            placeholder="email@komfy.az"
            className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px]"
          />
          <select
            value={draft.role}
            onChange={(e) => setDraft({ ...draft, role: e.target.value })}
            className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px]"
          >
            <option value="operator">Satış operatoru</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="password"
            value={draft.password}
            onChange={(e) => setDraft({ ...draft, password: e.target.value })}
            placeholder="Parol (min 4 simvol)"
            className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px]"
          />
          <button
            type="button"
            onClick={create}
            disabled={busy}
            className="rounded-full bg-komfy-green px-5 py-2 text-[12.5px] font-medium text-komfy-surface hover:bg-komfy-greenSoft disabled:opacity-50 sm:col-span-2"
          >
            {busy ? "…" : "Əlavə et"}
          </button>
        </div>
      )}

      <div className="border border-komfy-line">
        <div className="grid grid-cols-[1.2fr_1.6fr_120px_100px] border-b border-komfy-line bg-komfy-panel text-[11px] font-medium uppercase tracking-[0.1em] text-komfy-muted2">
          {["Ad", "Email", "Rol", ""].map((h, i) => (
            <span key={i} className="px-4 py-3">
              {h}
            </span>
          ))}
        </div>
        {users.map((u) => (
          <div
            key={u.id}
            className="grid grid-cols-[1.2fr_1.6fr_120px_100px] items-center border-b border-komfy-line/60 bg-komfy-card text-[13px] font-light last:border-0"
          >
            <span className="px-4 py-3 font-medium text-komfy-ink">
              {u.name}
              {u.id === currentUserId && (
                <span className="ml-2 text-[10.5px] text-komfy-muted2">(siz)</span>
              )}
            </span>
            <span className="px-4 py-3 text-komfy-muted">{u.email}</span>
            <span className="px-4 py-3">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium ${
                  u.role === "admin"
                    ? "border-komfy-green text-komfy-green"
                    : "border-komfy-border text-komfy-muted"
                }`}
              >
                {u.role === "admin" ? "Admin" : "Operator"}
              </span>
            </span>
            <span className="px-4 py-3">
              {canManage && u.id !== currentUserId && (
                <button
                  type="button"
                  onClick={() => remove(u.id)}
                  disabled={busy}
                  className="text-[12px] font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  Sil
                </button>
              )}
            </span>
          </div>
        ))}
      </div>

      {!canManage && (
        <span className="text-[12.5px] text-komfy-muted2">
          Yalnız admin istifadəçiləri idarə edə bilər.
        </span>
      )}
    </div>
  );
}
