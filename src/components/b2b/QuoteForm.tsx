"use client";

import { useRef, useState } from "react";

const fieldsByPath: Record<string, string[]> = {
  "OEM / Private Label": [
    "Product type & quantity",
    "Dimensions / firmness / construction",
    "Private-label requirements",
    "Packaging requirements",
    "Target market",
    "Required certificates / standards",
    "Target delivery date",
  ],
  "Hotel or B2B Project": [
    "Product type & quantity",
    "Dimensions / firmness / construction",
    "Number of rooms / units",
    "Target delivery date",
    "Additional project notes",
  ],
  "Furniture Retailer / Distributor": [
    "Product range of interest",
    "Estimated volume",
    "Private-label requirements",
    "Packaging requirements",
    "Target delivery date",
  ],
  "Retail Product Enquiry": [
    "Product of interest",
    "Quantity",
    "Preferred size / firmness",
    "Target delivery date",
  ],
};

const paths = Object.keys(fieldsByPath);

// label → stabil input adı; əsas sahələr sütunlara map olunur
const basics: { label: string; name: string }[] = [
  { label: "Name", name: "name" },
  { label: "Company", name: "company" },
  { label: "Country / city", name: "country" },
  { label: "Email", name: "email" },
  { label: "Phone", name: "phone" },
  { label: "Business type", name: "businessType" },
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-b2b-ink font-grotesk text-[13px] font-bold text-white">
      {n}
    </span>
  );
}

function Field({ label, name }: { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-1.5 text-[12.5px] font-bold text-b2b-text2">
      {label}
      <input
        name={name}
        className="rounded-[10px] border border-b2b-line bg-b2b-bg px-3.5 py-3 text-[14px] font-normal text-b2b-ink outline-none focus:border-b2b-ink focus:bg-white"
      />
    </label>
  );
}

export function QuoteForm() {
  const [selected, setSelected] = useState(paths[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const activeFields = fieldsByPath[selected];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    setError("");
    try {
      const fd = new FormData(formRef.current);
      fd.set("type", "quote");
      fd.set("path", selected);
      const res = await fetch("/api/leads", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Göndərilmədi");
        setStatus("error");
        return;
      }
      setStatus("ok");
      formRef.current.reset();
    } catch {
      setError("Şəbəkə xətası");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[20px] bg-white p-8 shadow-[0_2px_10px_rgba(33,30,27,0.06)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-b2b-ink text-[22px] text-white">
          ✓
        </span>
        <h3 className="font-grotesk text-[22px] font-bold">Thank you — request received</h3>
        <p className="text-[15px] leading-[1.6] text-b2b-text2">
          Our team will review your enquiry and get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="rounded-[10px] border-[1.5px] border-b2b-ink px-5 py-3 text-[14px] font-bold text-b2b-ink transition hover:bg-b2b-ink hover:text-white"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Step 1 */}
      <div className="rounded-[20px] bg-white p-7 shadow-[0_2px_10px_rgba(33,30,27,0.06)]">
        <div className="mb-[18px] flex items-center gap-3">
          <StepBadge n={1} />
          <span className="font-grotesk text-[18px] font-bold">Choose your path</span>
        </div>
        <div className="grid gap-2.5 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
          {paths.map((p) => {
            const on = p === selected;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setSelected(p)}
                className={`rounded-xl border-[1.5px] p-4 text-left text-[14.5px] font-bold transition ${
                  on
                    ? "border-b2b-ink bg-b2b-ink text-white"
                    : "border-b2b-line bg-b2b-bg text-b2b-ink hover:border-b2b-ink"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 */}
      <div className="rounded-[20px] bg-white p-7 shadow-[0_2px_10px_rgba(33,30,27,0.06)]">
        <div className="mb-[18px] flex items-center gap-3">
          <StepBadge n={2} />
          <span className="font-grotesk text-[18px] font-bold">A few basics</span>
        </div>
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {basics.map((f) => (
            <Field key={f.name} label={f.label} name={f.name} />
          ))}
        </div>
      </div>

      {/* Step 3 */}
      <div className="rounded-[20px] bg-white p-7 shadow-[0_2px_10px_rgba(33,30,27,0.06)]">
        <div className="mb-1.5 flex items-center gap-3">
          <StepBadge n={3} />
          <span className="font-grotesk text-[18px] font-bold">
            Details for: <span className="text-b2b-tan">{selected}</span>
          </span>
        </div>
        <p className="mb-[18px] ml-[42px] text-[13.5px] text-b2b-muted2">
          Fields below change based on the path chosen in Step 1.
        </p>
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
          {activeFields.map((f) => (
            <Field key={f} label={f} name={slug(f)} />
          ))}
        </div>
        <label className="mt-3.5 block cursor-pointer rounded-xl border-[1.5px] border-dashed border-[#C7B9A6] p-[18px] text-center text-[14px] font-semibold text-b2b-brown hover:bg-b2b-bg">
          File upload — technical specification (optional)
          <input type="file" name="file" className="hidden" />
        </label>
        <label className="mt-3.5 flex flex-col gap-1.5 text-[12.5px] font-bold text-b2b-text2">
          Additional comments
          <textarea
            name="comments"
            className="min-h-[100px] resize-y rounded-[10px] border border-b2b-line bg-b2b-bg px-3.5 py-3 text-[14px] font-normal text-b2b-ink outline-none focus:border-b2b-ink focus:bg-white"
          />
        </label>
      </div>

      {status === "error" && (
        <p className="rounded-[10px] bg-red-50 px-4 py-3 text-[14px] text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-xl bg-b2b-ink px-6 py-[17px] text-[16px] font-bold text-white transition hover:bg-[#3a342d] disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Submit Request"}
      </button>
    </form>
  );
}
