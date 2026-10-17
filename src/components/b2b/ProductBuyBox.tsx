"use client";

import { useState } from "react";
import { formatPrice, type SizePrice } from "@/data/products";

export function ProductBuyBox({ sizes }: { sizes: SizePrice[] }) {
  const defaultIdx = Math.max(
    0,
    sizes.findIndex((s) => s.size.includes("160"))
  );
  const [idx, setIdx] = useState(defaultIdx === -1 ? 0 : defaultIdx);
  const selected = sizes[idx];

  return (
    <div className="flex flex-col gap-4">
      {selected && (
        <div className="font-grotesk text-[32px] font-bold leading-none text-b2b-ink">
          {formatPrice(selected.price)}
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <div className="mb-2.5 text-[13px] font-bold">Size</div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s, i) => {
              const on = i === idx;
              return (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`rounded-[10px] border-[1.5px] px-[14px] py-[10px] text-[13.5px] font-bold transition ${
                    on
                      ? "border-b2b-ink bg-b2b-ink text-white"
                      : "border-b2b-line bg-white text-b2b-ink hover:border-b2b-ink"
                  }`}
                >
                  {s.size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
