"use client";

import { useState } from "react";
import { faq } from "@/data/site";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="flex flex-col">
      {faq.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-komfy-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-5 py-5 text-left text-[15.5px] text-komfy-ink"
            >
              <span>{f.q}</span>
              <span className="text-komfy-muted2">{isOpen ? "−" : "＋"}</span>
            </button>
            {isOpen && (
              <p className="max-w-[440px] pb-5 text-[14.5px] font-light leading-[1.7] text-komfy-text3">
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
