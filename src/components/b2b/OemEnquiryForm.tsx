"use client";

import { useRef, useState } from "react";

// İlk sahə `name` sütununa, qalanları `data` JSON-a gedir
const fields: { label: string; name: string }[] = [
  { label: "Company / contact name", name: "name" },
  { label: "Country / target market", name: "country" },
  { label: "Product type & quantity", name: "product_type_quantity" },
  { label: "Private-label requirements", name: "private_label_requirements" },
  { label: "Packaging requirements", name: "packaging_requirements" },
  { label: "Required certificates / standards", name: "required_certificates" },
];

export function OemEnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    setError("");
    try {
      const fd = new FormData(formRef.current);
      fd.set("type", "oem");
      fd.set("path", "OEM & Private Label");
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
      <div className="flex flex-col items-start gap-4 rounded-[20px] bg-white p-7 shadow-[0_10px_30px_rgba(33,30,27,0.08)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-b2b-ink text-[22px] text-white">
          ✓
        </span>
        <h3 className="font-grotesk text-[20px] font-bold">Thank you — enquiry received</h3>
        <p className="text-[14.5px] leading-[1.6] text-b2b-text2">
          Our team will reply with a feasibility review and sample plan.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="grid gap-3.5 rounded-[20px] bg-white p-7 shadow-[0_10px_30px_rgba(33,30,27,0.08)] [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]"
    >
      {fields.map((f) => (
        <label key={f.name} className="flex flex-col gap-1.5 text-[12.5px] font-bold text-b2b-text2">
          {f.label}
          <input
            name={f.name}
            className="rounded-[10px] border border-b2b-line bg-b2b-bg px-3.5 py-3 text-[14px] font-normal text-b2b-ink outline-none focus:border-b2b-ink focus:bg-white"
          />
        </label>
      ))}
      <label className="col-span-full cursor-pointer rounded-xl border-[1.5px] border-dashed border-[#C7B9A6] p-[18px] text-center text-[14px] font-semibold text-b2b-brown hover:bg-b2b-bg">
        Upload technical specification (PDF, DWG, XLSX)
        <input type="file" name="file" className="hidden" />
      </label>
      {status === "error" && (
        <p className="col-span-full rounded-[10px] bg-red-50 px-4 py-3 text-[13.5px] text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="col-span-full rounded-[10px] bg-b2b-ink px-6 py-[15px] text-[15px] font-bold text-white transition hover:bg-[#3a342d] disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Submit OEM Enquiry"}
      </button>
    </form>
  );
}
