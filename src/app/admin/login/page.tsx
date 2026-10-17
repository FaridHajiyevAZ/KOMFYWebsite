"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Giriş alınmadı");
        setLoading(false);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError("Şəbəkə xətası");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 text-center">
          <span className="font-serif text-[22px] font-semibold tracking-[0.32em] text-komfy-ink">
            KOMFY
          </span>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-komfy-muted2">
            İdarə paneli
          </p>
        </div>

        <form
          onSubmit={submit}
          className="flex flex-col gap-4 border border-komfy-line bg-komfy-card p-7"
        >
          <h1 className="font-serif text-[24px] font-light text-komfy-ink">Giriş</h1>

          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-komfy-text2">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2.5 text-[14px] text-komfy-ink outline-none focus:border-komfy-green"
              placeholder="admin@komfy.az"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-komfy-text2">Parol</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2.5 text-[14px] text-komfy-ink outline-none focus:border-komfy-green"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="rounded-[3px] bg-red-50 px-3 py-2 text-[13px] text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 rounded-full bg-komfy-green py-3 text-[14px] font-medium text-komfy-surface transition hover:bg-komfy-greenSoft disabled:opacity-50"
          >
            {loading ? "Yoxlanılır…" : "Daxil ol"}
          </button>
        </form>

        <p className="mt-4 text-center text-[12px] font-light text-komfy-muted2">
          Yalnız səlahiyyətli işçilər üçün
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
