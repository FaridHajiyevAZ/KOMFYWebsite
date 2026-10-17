"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/data/products";

export interface EditorSize {
  label: string;
  price: number;
  discountPrice: number | null;
  stock: string;
  leadTime: string;
  active: boolean;
  isDefault: boolean;
}

export interface EditorProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  categoryId: string;
  categoryName: string;
  heightCm: number;
  springType: string;
  comfortLayer: string;
  firmness: string;
  firmnessPct: number;
  fabric: string;
  cooling: boolean;
  hypoallergenic: boolean;
  warrantyYears: number;
  trialDays: number;
  deliveryNote: string;
  image: string;
  specLine: string;
  shortDescription: string;
  description: string;
  whoFor: string[];
  whoNot: string | null;
  active: boolean;
  popular: boolean;
  showOnHome: boolean;
  showInCompare: boolean;
  includeInHotel: boolean;
  customSizeAllowed: boolean;
  depositPct: number;
  customReturnable: boolean;
  sizes: EditorSize[];
}

interface Props {
  product: EditorProduct;
  categories: { id: string; name: string }[];
  changelog: { message: string; author: string; date: string }[];
  canEdit: boolean;
}

const TABS = [
  "Ölçü və qiymətlər",
  "Əsas məlumat",
  "Qatlar və materiallar",
  "Şəkillər",
  "Testdə çəkisi",
  "SEO",
];

export function ProductEditor({ product, categories, changelog, canEdit }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState<EditorProduct>(product);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);

  const set = <K extends keyof EditorProduct>(key: K, value: EditorProduct[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const defaultSize =
    form.sizes.find((s) => s.isDefault) ?? form.sizes[0] ?? null;
  const previewPrice = defaultSize
    ? defaultSize.discountPrice ?? defaultSize.price
    : 0;

  function updateSize(i: number, patch: Partial<EditorSize>) {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    }));
  }
  function setDefaultSize(i: number) {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.map((s, idx) => ({ ...s, isDefault: idx === i })),
    }));
  }
  function addSize() {
    setForm((f) => ({
      ...f,
      sizes: [
        ...f.sizes,
        {
          label: "",
          price: 0,
          discountPrice: null,
          stock: "Sifarişlə",
          leadTime: "5 gün",
          active: true,
          isDefault: false,
        },
      ],
    }));
  }
  function removeSize(i: number) {
    setForm((f) => ({ ...f, sizes: f.sizes.filter((_, idx) => idx !== i) }));
  }

  async function save() {
    if (!canEdit) return;
    setSaving(true);
    setToast(null);
    try {
      const res = await fetch(`/api/admin/products/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setToast({ ok: false, msg: data.error || "Yadda saxlanmadı" });
      } else {
        setToast({ ok: true, msg: "Yadda saxlanıldı" });
        router.refresh();
      }
    } catch {
      setToast({ ok: false, msg: "Şəbəkə xətası" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-komfy-line px-8 py-[22px]">
        <div className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-light text-komfy-muted2">
            <Link href="/admin/mehsullar" className="hover:text-komfy-ink">
              Məhsullar
            </Link>{" "}
            / {form.categoryName} / {form.name}
          </span>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-[28px] font-light text-komfy-ink">{form.name}</h1>
            <StatusBadge active={form.active} />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href={`/mehsullar/${form.slug}`}
            target="_blank"
            className="rounded-full border border-komfy-line2 bg-komfy-card px-4 py-2 text-[12.5px] text-komfy-text2 hover:border-komfy-border"
          >
            Saytda gör ↗
          </Link>
          {canEdit ? (
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-full bg-komfy-green px-5 py-2.5 text-[12.5px] font-medium text-komfy-surface transition hover:bg-komfy-greenSoft disabled:opacity-50"
            >
              {saving ? "Saxlanılır…" : "Yadda saxla"}
            </button>
          ) : (
            <span className="rounded-full border border-komfy-line2 px-4 py-2 text-[12.5px] text-komfy-muted2">
              Yalnız oxuma rejimi
            </span>
          )}
        </div>
      </div>

      {toast && (
        <div
          className={`px-8 py-2.5 text-[13px] ${
            toast.ok ? "bg-komfy-green/10 text-komfy-green" : "bg-red-50 text-red-700"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-6 overflow-x-auto border-b border-komfy-line px-8 text-[13px]">
        {TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(i)}
            className={`whitespace-nowrap py-3.5 ${
              tab === i
                ? "border-b-2 border-komfy-green font-medium text-komfy-ink"
                : "text-komfy-muted hover:text-komfy-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-[1fr_330px]">
        <div className="flex flex-col gap-7 border-komfy-line p-8 lg:border-r">
          {tab === 0 && (
            <SizesTab
              form={form}
              canEdit={canEdit}
              updateSize={updateSize}
              setDefaultSize={setDefaultSize}
              addSize={addSize}
              removeSize={removeSize}
              set={set}
            />
          )}
          {tab === 1 && <MainTab form={form} categories={categories} canEdit={canEdit} set={set} />}
          {tab > 1 && (
            <div className="rounded-[4px] border border-dashed border-komfy-line2 bg-komfy-panel p-10 text-center text-[13.5px] font-light text-komfy-muted2">
              «{TABS[tab]}» bölməsi tezliklə əlavə olunacaq.
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-6 bg-komfy-panel p-6 pb-10">
          <div className="flex flex-col gap-2.5">
            <SideLabel>Saytda görünüş</SideLabel>
            <div className="flex flex-col gap-2.5 border border-komfy-line bg-komfy-card p-3.5">
              <div className="relative h-[120px] overflow-hidden border border-komfy-line bg-komfy-line">
                <Image src={form.image} alt="" fill className="object-cover" sizes="300px" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-komfy-gold">
                  {form.categoryName}
                </span>
                <span className="font-serif text-[18px] text-komfy-ink">{form.name}</span>
                <span className="text-[12px] font-light leading-[1.5] text-komfy-muted">
                  {form.specLine}
                </span>
                <span className="pt-1 font-serif text-[16px] text-komfy-ink">
                  {formatPrice(previewPrice)}
                </span>
              </div>
            </div>
            <span className="text-[11.5px] font-light text-komfy-muted2">
              Kataloq kartı default ölçü qiyməti ilə göstərilir.
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            <SideLabel>Yerləşdirmə</SideLabel>
            <div className="flex flex-col border border-komfy-line bg-komfy-card">
              <ToggleRow label="Ana səhifədə göstər" value={form.showOnHome} onChange={(v) => set("showOnHome", v)} disabled={!canEdit} />
              <ToggleRow label={'"Ən çox seçilən" nişanı'} value={form.popular} onChange={(v) => set("popular", v)} disabled={!canEdit} />
              <ToggleRow label="Müqayisə səhifəsində" value={form.showInCompare} onChange={(v) => set("showInCompare", v)} disabled={!canEdit} />
              <ToggleRow label="Otel təklifinə daxil" value={form.includeInHotel} onChange={(v) => set("includeInHotel", v)} disabled={!canEdit} last />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <SideLabel>Dəyişiklik tarixi</SideLabel>
            <div className="flex flex-col gap-3">
              {changelog.length === 0 && (
                <span className="text-[12px] font-light text-komfy-muted2">Hələ dəyişiklik yoxdur.</span>
              )}
              {changelog.map((c, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-[12.5px] text-komfy-ink">{c.message}</span>
                  <span className="text-[11.5px] font-light text-komfy-muted2">
                    {c.author} · {c.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sizes tab ---------- */
function SizesTab({
  form,
  canEdit,
  updateSize,
  setDefaultSize,
  addSize,
  removeSize,
  set,
}: {
  form: EditorProduct;
  canEdit: boolean;
  updateSize: (i: number, patch: Partial<EditorSize>) => void;
  setDefaultSize: (i: number) => void;
  addSize: () => void;
  removeSize: (i: number) => void;
  set: <K extends keyof EditorProduct>(key: K, value: EditorProduct[K]) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-[18px] text-komfy-ink">Ölçü cədvəli</h2>
          <span className="text-[12.5px] font-light text-komfy-muted2">
            Saytda birbaşa məhsul səhifəsində göstərilir
          </span>
        </div>
        <div className="overflow-x-auto border border-komfy-line">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[44px_1.1fr_110px_110px_120px_100px_48px] items-center border-b border-komfy-line bg-komfy-panel text-[11px] font-medium uppercase tracking-[0.1em] text-komfy-muted2">
              {["Def", "Ölçü", "Qiymət", "Endirimli", "Stok", "Hazırlanma", ""].map((h, i) => (
                <span key={i} className={`px-3 py-2.5 ${i === 2 || i === 3 ? "text-right" : ""}`}>
                  {h}
                </span>
              ))}
            </div>
            {form.sizes.map((s, i) => (
              <div
                key={i}
                className={`grid grid-cols-[44px_1.1fr_110px_110px_120px_100px_48px] items-center border-b border-komfy-line/60 text-[13px] ${
                  s.isDefault ? "bg-komfy-rowAlt" : "bg-komfy-card"
                }`}
              >
                <span className="px-3 py-2">
                  <input
                    type="radio"
                    name="defaultSize"
                    checked={s.isDefault}
                    onChange={() => setDefaultSize(i)}
                    disabled={!canEdit}
                    className="accent-komfy-green"
                    title="Default (kataloq qiyməti)"
                  />
                </span>
                <span className="px-3 py-1.5">
                  <input
                    value={s.label}
                    onChange={(e) => updateSize(i, { label: e.target.value })}
                    disabled={!canEdit}
                    className="w-full rounded-[3px] border border-komfy-line2 bg-white px-2 py-1.5 font-mono text-[12.5px] disabled:bg-komfy-panel disabled:text-komfy-muted2"
                  />
                </span>
                <span className="px-2 py-1.5">
                  <NumInput value={s.price} onChange={(v) => updateSize(i, { price: v ?? 0 })} disabled={!canEdit} />
                </span>
                <span className="px-2 py-1.5">
                  <NumInput value={s.discountPrice} onChange={(v) => updateSize(i, { discountPrice: v })} disabled={!canEdit} dashed placeholder="—" />
                </span>
                <span className="px-2 py-1.5">
                  <input
                    value={s.stock}
                    onChange={(e) => updateSize(i, { stock: e.target.value })}
                    disabled={!canEdit}
                    className="w-full rounded-[3px] border border-komfy-line2 bg-white px-2 py-1.5 text-[12.5px] disabled:bg-komfy-panel disabled:text-komfy-muted2"
                  />
                </span>
                <span className="px-2 py-1.5">
                  <input
                    value={s.leadTime}
                    onChange={(e) => updateSize(i, { leadTime: e.target.value })}
                    disabled={!canEdit}
                    className="w-full rounded-[3px] border border-komfy-line2 bg-white px-2 py-1.5 text-[12.5px] disabled:bg-komfy-panel disabled:text-komfy-muted2"
                  />
                </span>
                <span className="px-3 py-2 text-center">
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => removeSize(i)}
                      className="text-komfy-muted2 hover:text-red-600"
                      title="Sil"
                    >
                      ✕
                    </button>
                  )}
                </span>
              </div>
            ))}
            {canEdit && (
              <button
                type="button"
                onClick={addSize}
                className="grid w-full grid-cols-[44px_1fr] items-center bg-komfy-panel text-left text-[12.5px] text-komfy-green"
              >
                <span className="px-3 py-3 text-komfy-muted2">＋</span>
                <span className="px-3 py-3">Ölçü əlavə et</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Custom size */}
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-[18px] text-komfy-ink">Fərdi ölçü</h2>
        <div className="grid gap-3.5 sm:grid-cols-3">
          <Card>
            <FieldLabel>Fərdi ölçüyə icazə</FieldLabel>
            <InlineToggle value={form.customSizeAllowed} onChange={(v) => set("customSizeAllowed", v)} disabled={!canEdit} onLabel="Açıq" offLabel="Bağlı" />
          </Card>
          <Card>
            <FieldLabel>Beh faizi</FieldLabel>
            <div className="flex items-center gap-2">
              <NumInput value={form.depositPct} onChange={(v) => set("depositPct", v ?? 0)} disabled={!canEdit} align="left" />
              <span className="font-mono text-[13px] text-komfy-muted">%</span>
            </div>
          </Card>
          <Card>
            <FieldLabel>Qaytarılma</FieldLabel>
            <InlineToggle value={form.customReturnable} onChange={(v) => set("customReturnable", v)} disabled={!canEdit} onLabel="Qaytarılır" offLabel="Qaytarılmır" />
          </Card>
        </div>
      </div>

      {/* Firmness & trial */}
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-[18px] text-komfy-ink">Sərtlik və sınaq</h2>
        <div className="flex flex-col gap-5 border border-komfy-line bg-komfy-card p-[22px]">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[12.5px]">
              <span className="text-komfy-muted">Sərtlik mövqeyi (saytdakı şkalada)</span>
              <span className="font-mono">{form.firmnessPct} / 100</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={form.firmnessPct}
              onChange={(e) => set("firmnessPct", Number(e.target.value))}
              disabled={!canEdit}
              className="accent-komfy-green"
            />
            <div className="flex justify-between text-[11.5px] font-light text-komfy-muted2">
              <span>Yumşaq</span>
              <span>Orta</span>
              <span>Sərt</span>
            </div>
          </div>
          <div className="grid gap-4 border-t border-komfy-line pt-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Zəmanət (il)</FieldLabel>
              <NumInput value={form.warrantyYears} onChange={(v) => set("warrantyYears", v ?? 0)} disabled={!canEdit} align="left" />
            </div>
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Sınaq (gün)</FieldLabel>
              <NumInput value={form.trialDays} onChange={(v) => set("trialDays", v ?? 0)} disabled={!canEdit} align="left" />
            </div>
            <div className="flex flex-col gap-1.5">
              <FieldLabel>Çatdırılma</FieldLabel>
              <TextInput value={form.deliveryNote} onChange={(v) => set("deliveryNote", v)} disabled={!canEdit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Main info tab ---------- */
function MainTab({
  form,
  categories,
  canEdit,
  set,
}: {
  form: EditorProduct;
  categories: { id: string; name: string }[];
  canEdit: boolean;
  set: <K extends keyof EditorProduct>(key: K, value: EditorProduct[K]) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled label="Model adı">
          <TextInput value={form.name} onChange={(v) => set("name", v)} disabled={!canEdit} />
        </Labeled>
        <Labeled label="Alt başlıq (tagline)">
          <TextInput value={form.tagline} onChange={(v) => set("tagline", v)} disabled={!canEdit} />
        </Labeled>
        <Labeled label="Kateqoriya">
          <select
            value={form.categoryId}
            onChange={(e) => {
              const c = categories.find((x) => x.id === e.target.value);
              set("categoryId", e.target.value);
              if (c) set("categoryName", c.name);
            }}
            disabled={!canEdit}
            className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px] disabled:bg-komfy-panel"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Hündürlük (sm)">
          <NumInput value={form.heightCm} onChange={(v) => set("heightCm", v ?? 0)} disabled={!canEdit} align="left" />
        </Labeled>
        <Labeled label="Yay sistemi">
          <TextInput value={form.springType} onChange={(v) => set("springType", v)} disabled={!canEdit} />
        </Labeled>
        <Labeled label="Komfort qatı">
          <TextInput value={form.comfortLayer} onChange={(v) => set("comfortLayer", v)} disabled={!canEdit} />
        </Labeled>
        <Labeled label="Sərtlik (mətn)">
          <TextInput value={form.firmness} onChange={(v) => set("firmness", v)} disabled={!canEdit} />
        </Labeled>
        <Labeled label="Parça">
          <TextInput value={form.fabric} onChange={(v) => set("fabric", v)} disabled={!canEdit} />
        </Labeled>
      </div>

      <div className="flex gap-6">
        <InlineToggle value={form.cooling} onChange={(v) => set("cooling", v)} disabled={!canEdit} onLabel="Sərinlədici parça" offLabel="Sərinlədici yox" />
        <InlineToggle value={form.hypoallergenic} onChange={(v) => set("hypoallergenic", v)} disabled={!canEdit} onLabel="Hipoallergen" offLabel="Hipoallergen deyil" />
      </div>

      <Labeled label="Kataloq sətri (specLine)">
        <TextInput value={form.specLine} onChange={(v) => set("specLine", v)} disabled={!canEdit} />
      </Labeled>
      <Labeled label="Qısa təsvir">
        <TextArea value={form.shortDescription} onChange={(v) => set("shortDescription", v)} disabled={!canEdit} rows={2} />
      </Labeled>
      <Labeled label="Tam təsvir">
        <TextArea value={form.description} onChange={(v) => set("description", v)} disabled={!canEdit} rows={4} />
      </Labeled>

      <Labeled label="Kimin üçün (hər sətir ayrı)">
        <TextArea
          value={form.whoFor.join("\n")}
          onChange={(v) => set("whoFor", v.split("\n").map((x) => x.trim()).filter(Boolean))}
          disabled={!canEdit}
          rows={3}
        />
      </Labeled>
      <Labeled label="Kimə uyğun deyil (istəyə görə)">
        <TextInput value={form.whoNot ?? ""} onChange={(v) => set("whoNot", v || null)} disabled={!canEdit} />
      </Labeled>
    </div>
  );
}

/* ---------- Small UI pieces ---------- */
function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
        active ? "border-komfy-green text-komfy-green" : "border-komfy-border text-komfy-muted"
      }`}
    >
      {active ? "Aktiv" : "Passiv"}
    </span>
  );
}

function SideLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-komfy-muted2">
      {children}
    </span>
  );
}
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[12px] font-medium text-komfy-text2">{children}</span>;
}
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border border-komfy-line bg-komfy-card p-4">{children}</div>
  );
}
function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </label>
  );
}
function TextInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px] text-komfy-ink outline-none focus:border-komfy-green disabled:bg-komfy-panel disabled:text-komfy-muted2"
    />
  );
}
function TextArea({
  value,
  onChange,
  disabled,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      rows={rows}
      className="resize-y rounded-[3px] border border-komfy-line2 bg-white px-3 py-2 text-[13px] leading-[1.6] text-komfy-ink outline-none focus:border-komfy-green disabled:bg-komfy-panel disabled:text-komfy-muted2"
    />
  );
}
function NumInput({
  value,
  onChange,
  disabled,
  dashed,
  placeholder,
  align = "right",
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  disabled?: boolean;
  dashed?: boolean;
  placeholder?: string;
  align?: "left" | "right";
}) {
  return (
    <input
      inputMode="numeric"
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => {
        const raw = e.target.value.replace(/[^\d]/g, "");
        onChange(raw === "" ? null : Number(raw));
      }}
      disabled={disabled}
      className={`w-full rounded-[3px] border bg-white px-2.5 py-1.5 font-mono text-[13px] text-komfy-ink outline-none focus:border-komfy-green disabled:bg-komfy-panel disabled:text-komfy-muted2 ${
        dashed ? "border-dashed border-komfy-line2" : "border-komfy-line2"
      } ${align === "right" ? "text-right" : "text-left"}`}
    />
  );
}

function InlineToggle({
  value,
  onChange,
  disabled,
  onLabel,
  offLabel,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  onLabel: string;
  offLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!value)}
      disabled={disabled}
      className="flex items-center gap-2.5 disabled:cursor-default"
    >
      <Switch on={value} />
      <span className="text-[12.5px] font-light text-komfy-muted">
        {value ? onLabel : offLabel}
      </span>
    </button>
  );
}
function ToggleRow({
  label,
  value,
  onChange,
  disabled,
  last,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!value)}
      disabled={disabled}
      className={`flex items-center justify-between px-4 py-3 text-left text-[12.5px] font-light text-komfy-ink disabled:cursor-default ${
        last ? "" : "border-b border-komfy-line/60"
      }`}
    >
      <span>{label}</span>
      <Switch on={value} />
    </button>
  );
}
function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={`relative block h-[19px] w-[34px] flex-none rounded-full transition-colors ${
        on ? "bg-komfy-green" : "bg-komfy-border"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[15px] w-[15px] rounded-full bg-komfy-surface transition-all ${
          on ? "right-[2px]" : "left-[2px]"
        }`}
      />
    </span>
  );
}
