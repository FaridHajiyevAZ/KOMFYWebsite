"use client";

import { useState } from "react";

export function SizePicker({ sizes }: { sizes: string[] }) {
  const [sel, setSel] = useState(sizes[0]);
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {sizes.map((label) => {
        const active = label === sel;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setSel(label)}
            className={`rounded-[10px] border-[1.5px] px-[18px] py-[11px] text-[14px] font-bold transition ${
              active
                ? "border-b2b-ink bg-b2b-ink text-white"
                : "border-b2b-line bg-white text-b2b-ink hover:border-b2b-ink"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
