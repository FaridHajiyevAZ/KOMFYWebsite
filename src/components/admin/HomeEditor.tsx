"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { HomeContent } from "@/data/home";

/* ---------- small inputs ---------- */
function Inp({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px] text-komfy-ink outline-none focus:border-komfy-green"
    />
  );
}
function Area({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={2}
      className="w-full resize-y rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px] leading-[1.6] text-komfy-ink outline-none focus:border-komfy-green"
    />
  );
}
function Lbl({ children }: { children: React.ReactNode }) {
  return <span className="text-[11.5px] font-medium text-komfy-text2">{children}</span>;
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border border-komfy-line bg-komfy-card p-5">
      <h2 className="font-serif text-[18px] text-komfy-ink">{title}</h2>
      {children}
    </div>
  );
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}
function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-start rounded-full border border-komfy-border px-3.5 py-1.5 text-[12px] font-medium text-komfy-green hover:bg-komfy-panel"
    >
      + {label}
    </button>
  );
}
function DelBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[12px] font-medium text-red-500 hover:text-red-700"
    >
      Sil
    </button>
  );
}

export function HomeEditor({
  initial,
  canEdit,
  locale = "az",
}: {
  initial: HomeContent;
  canEdit: boolean;
  locale?: string;
}) {
  const router = useRouter();
  const [c, setC] = useState<HomeContent>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");

  const patch = (p: Partial<HomeContent>) => setC((s) => ({ ...s, ...p }));

  async function save() {
    if (!canEdit) return;
    setStatus("saving");
    try {
      const res = await fetch(`/api/admin/home?locale=${locale}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) router.refresh();
    } catch {
      setStatus("error");
    }
  }

  const fs = canEdit ? "" : "pointer-events-none opacity-60";

  return (
    <div className="flex flex-col gap-5">
      {/* Save bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-komfy-line bg-komfy-surface py-3">
        <span className="text-[13px] text-komfy-muted2">
          Dəyişikliklər dərhal ana səhifədə görünəcək
        </span>
        <div className="flex items-center gap-3">
          {status === "ok" && <span className="text-[13px] text-komfy-green">Yadda saxlanıldı ✓</span>}
          {status === "error" && <span className="text-[13px] text-red-600">Xəta</span>}
          {canEdit ? (
            <button
              type="button"
              onClick={save}
              disabled={status === "saving"}
              className="rounded-full bg-komfy-green px-6 py-2.5 text-[13px] font-medium text-komfy-surface hover:bg-komfy-greenSoft disabled:opacity-50"
            >
              {status === "saving" ? "Saxlanılır…" : "Yadda saxla"}
            </button>
          ) : (
            <span className="text-[12.5px] text-komfy-muted2">Yalnız oxuma (admin deyil)</span>
          )}
        </div>
      </div>

      <div className={`flex flex-col gap-5 ${fs}`}>
        {/* HERO */}
        <Section title="Hero karusel (slaydlar)">
          {c.hero.map((h, i) => (
            <div key={i} className="flex flex-col gap-3 border border-komfy-line/60 bg-komfy-panel p-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-komfy-muted2">Slayd {i + 1}</span>
                <DelBtn onClick={() => patch({ hero: c.hero.filter((_, x) => x !== i) })} />
              </div>
              <label className="flex flex-col gap-1">
                <Lbl>Nişan (badge)</Lbl>
                <Inp value={h.badge} onChange={(v) => patch({ hero: c.hero.map((s, x) => (x === i ? { ...s, badge: v } : s)) })} />
              </label>
              <label className="flex flex-col gap-1">
                <Lbl>Başlıq</Lbl>
                <Area value={h.title} onChange={(v) => patch({ hero: c.hero.map((s, x) => (x === i ? { ...s, title: v } : s)) })} />
              </label>
              <label className="flex flex-col gap-1">
                <Lbl>Mətn</Lbl>
                <Area value={h.text} onChange={(v) => patch({ hero: c.hero.map((s, x) => (x === i ? { ...s, text: v } : s)) })} />
              </label>
              <Row>
                <label className="flex flex-col gap-1">
                  <Lbl>Əsas düymə — mətn</Lbl>
                  <Inp value={h.primary.label} onChange={(v) => patch({ hero: c.hero.map((s, x) => (x === i ? { ...s, primary: { ...s.primary, label: v } } : s)) })} />
                </label>
                <label className="flex flex-col gap-1">
                  <Lbl>Əsas düymə — link</Lbl>
                  <Inp value={h.primary.href} onChange={(v) => patch({ hero: c.hero.map((s, x) => (x === i ? { ...s, primary: { ...s.primary, href: v } } : s)) })} />
                </label>
                <label className="flex flex-col gap-1">
                  <Lbl>İkinci düymə — mətn</Lbl>
                  <Inp value={h.secondary.label} onChange={(v) => patch({ hero: c.hero.map((s, x) => (x === i ? { ...s, secondary: { ...s.secondary, label: v } } : s)) })} />
                </label>
                <label className="flex flex-col gap-1">
                  <Lbl>İkinci düymə — link</Lbl>
                  <Inp value={h.secondary.href} onChange={(v) => patch({ hero: c.hero.map((s, x) => (x === i ? { ...s, secondary: { ...s.secondary, href: v } } : s)) })} />
                </label>
              </Row>
            </div>
          ))}
          <AddBtn label="Slayd əlavə et" onClick={() => patch({ hero: [...c.hero, { badge: "", title: "", text: "", primary: { label: "", href: "/" }, secondary: { label: "", href: "/" }, imageLabel: "" }] })} />
        </Section>

        {/* STATS */}
        <Section title="Statistika zolağı">
          {c.stats.map((s, i) => (
            <div key={i} className="flex items-end gap-3">
              <label className="flex flex-1 flex-col gap-1">
                <Lbl>Rəqəm</Lbl>
                <Inp value={s.value} onChange={(v) => patch({ stats: c.stats.map((x, idx) => (idx === i ? { ...x, value: v } : x)) })} />
              </label>
              <label className="flex flex-1 flex-col gap-1">
                <Lbl>Etiket</Lbl>
                <Inp value={s.label} onChange={(v) => patch({ stats: c.stats.map((x, idx) => (idx === i ? { ...x, label: v } : x)) })} />
              </label>
              <div className="pb-2"><DelBtn onClick={() => patch({ stats: c.stats.filter((_, x) => x !== i) })} /></div>
            </div>
          ))}
          <AddBtn label="Statistika əlavə et" onClick={() => patch({ stats: [...c.stats, { value: "", label: "" }] })} />
        </Section>

        {/* PARTNER + PATHS */}
        <Section title="«Üç yol» bölməsi">
          <Row>
            <label className="flex flex-col gap-1"><Lbl>Üst etiket</Lbl><Inp value={c.partner.eyebrow} onChange={(v) => patch({ partner: { ...c.partner, eyebrow: v } })} /></label>
            <label className="flex flex-col gap-1"><Lbl>Başlıq</Lbl><Inp value={c.partner.title} onChange={(v) => patch({ partner: { ...c.partner, title: v } })} /></label>
          </Row>
          {c.paths.map((p, i) => (
            <div key={i} className="flex flex-col gap-3 border border-komfy-line/60 bg-komfy-panel p-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-komfy-muted2">Kart {i + 1}</span>
                <DelBtn onClick={() => patch({ paths: c.paths.filter((_, x) => x !== i) })} />
              </div>
              <Row>
                <label className="flex flex-col gap-1"><Lbl>Üst etiket</Lbl><Inp value={p.eyebrow} onChange={(v) => patch({ paths: c.paths.map((s, x) => (x === i ? { ...s, eyebrow: v } : s)) })} /></label>
                <label className="flex flex-col gap-1"><Lbl>Başlıq</Lbl><Inp value={p.title} onChange={(v) => patch({ paths: c.paths.map((s, x) => (x === i ? { ...s, title: v } : s)) })} /></label>
              </Row>
              <label className="flex flex-col gap-1"><Lbl>Mətn</Lbl><Area value={p.text} onChange={(v) => patch({ paths: c.paths.map((s, x) => (x === i ? { ...s, text: v } : s)) })} /></label>
              <Row>
                <label className="flex flex-col gap-1"><Lbl>Düymə mətni</Lbl><Inp value={p.cta.label} onChange={(v) => patch({ paths: c.paths.map((s, x) => (x === i ? { ...s, cta: { ...s.cta, label: v } } : s)) })} /></label>
                <label className="flex flex-col gap-1"><Lbl>Düymə linki</Lbl><Inp value={p.cta.href} onChange={(v) => patch({ paths: c.paths.map((s, x) => (x === i ? { ...s, cta: { ...s.cta, href: v } } : s)) })} /></label>
              </Row>
            </div>
          ))}
          <AddBtn label="Kart əlavə et" onClick={() => patch({ paths: [...c.paths, { eyebrow: "", title: "", text: "", cta: { label: "", href: "/" }, imageLabel: "" }] })} />
        </Section>

        {/* MADE */}
        <Section title="«Necə hazırlanır» bölməsi">
          <Row>
            <label className="flex flex-col gap-1"><Lbl>Üst etiket</Lbl><Inp value={c.made.eyebrow} onChange={(v) => patch({ made: { ...c.made, eyebrow: v } })} /></label>
            <label className="flex flex-col gap-1"><Lbl>Başlıq</Lbl><Inp value={c.made.title} onChange={(v) => patch({ made: { ...c.made, title: v } })} /></label>
          </Row>
          <label className="flex flex-col gap-1"><Lbl>Mətn</Lbl><Area value={c.made.text} onChange={(v) => patch({ made: { ...c.made, text: v } })} /></label>
          <label className="flex flex-col gap-1">
            <Lbl>Proses addımları (hər sətir ayrı)</Lbl>
            <textarea
              value={c.processSteps.join("\n")}
              onChange={(e) => patch({ processSteps: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
              rows={7}
              className="w-full resize-y rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px] leading-[1.7] text-komfy-ink outline-none focus:border-komfy-green"
            />
          </label>
        </Section>

        {/* QUALITY */}
        <Section title="Keyfiyyət bölməsi">
          <Row>
            <label className="flex flex-col gap-1"><Lbl>Üst etiket</Lbl><Inp value={c.quality.eyebrow} onChange={(v) => patch({ quality: { ...c.quality, eyebrow: v } })} /></label>
            <label className="flex flex-col gap-1"><Lbl>Başlıq</Lbl><Area value={c.quality.title} onChange={(v) => patch({ quality: { ...c.quality, title: v } })} /></label>
          </Row>
        </Section>

        {/* INDUSTRIES */}
        <Section title="Sənayelər bölməsi">
          <Row>
            <label className="flex flex-col gap-1"><Lbl>Üst etiket</Lbl><Inp value={c.industriesHead.eyebrow} onChange={(v) => patch({ industriesHead: { ...c.industriesHead, eyebrow: v } })} /></label>
            <label className="flex flex-col gap-1"><Lbl>Başlıq</Lbl><Inp value={c.industriesHead.title} onChange={(v) => patch({ industriesHead: { ...c.industriesHead, title: v } })} /></label>
          </Row>
          {c.industries.map((ind, i) => (
            <div key={i} className="flex items-end gap-3">
              <label className="flex flex-1 flex-col gap-1"><Lbl>Ad</Lbl><Inp value={ind.name} onChange={(v) => patch({ industries: c.industries.map((x, idx) => (idx === i ? { ...x, name: v } : x)) })} /></label>
              <label className="flex flex-1 flex-col gap-1"><Lbl>Status</Lbl><Inp value={ind.status} onChange={(v) => patch({ industries: c.industries.map((x, idx) => (idx === i ? { ...x, status: v } : x)) })} /></label>
              <div className="pb-2"><DelBtn onClick={() => patch({ industries: c.industries.filter((_, x) => x !== i) })} /></div>
            </div>
          ))}
          <AddBtn label="Sənaye əlavə et" onClick={() => patch({ industries: [...c.industries, { name: "", status: "Capability available" }] })} />
        </Section>

        {/* TESTIMONIAL */}
        <Section title="Müştəri rəyi (testimonial)">
          <label className="flex flex-col gap-1"><Lbl>Sitat</Lbl><Area value={c.testimonial.quote} onChange={(v) => patch({ testimonial: { ...c.testimonial, quote: v } })} /></label>
          <label className="flex flex-col gap-1"><Lbl>Müəllif / qeyd</Lbl><Inp value={c.testimonial.attribution} onChange={(v) => patch({ testimonial: { ...c.testimonial, attribution: v } })} /></label>
        </Section>

        {/* RETAIL + CTA */}
        <Section title="Retail başlığı və CTA">
          <Row>
            <label className="flex flex-col gap-1"><Lbl>Retail — üst etiket</Lbl><Inp value={c.retail.eyebrow} onChange={(v) => patch({ retail: { ...c.retail, eyebrow: v } })} /></label>
            <label className="flex flex-col gap-1"><Lbl>Retail — başlıq</Lbl><Inp value={c.retail.title} onChange={(v) => patch({ retail: { ...c.retail, title: v } })} /></label>
          </Row>
          <label className="flex flex-col gap-1"><Lbl>CTA başlığı</Lbl><Inp value={c.cta.title} onChange={(v) => patch({ cta: { title: v } })} /></label>
        </Section>
      </div>
    </div>
  );
}
