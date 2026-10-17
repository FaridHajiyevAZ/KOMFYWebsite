import type { CSSProperties } from "react";

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="M21 16l-5-5-5 5-2-2-5 5" />
    </svg>
  );
}

/**
 * Şəkil yer-tutucu — real foto yüklənənə qədər dizaynın "image-slot"-unu əvəz edir.
 * variant: "light" (açıq, kəsik-çərçivə + etiket), "photo" (isti qradiyent, kart fonu),
 * "dark" (tünd qradiyent, CTA/hero fonu).
 */
export function ImageSlot({
  label,
  className = "",
  variant = "light",
  rounded = "rounded-2xl",
  style,
}: {
  label?: string;
  className?: string;
  variant?: "light" | "photo" | "dark";
  rounded?: string;
  style?: CSSProperties;
}) {
  if (variant === "photo") {
    return (
      <div
        className={`relative overflow-hidden ${rounded} ${className}`}
        style={{
          background:
            "linear-gradient(150deg,#A37964 0%,#7A4E34 55%,#3a2f27 100%)",
          ...style,
        }}
      >
        {label && (
          <span className="absolute left-3 top-3 rounded-full bg-black/25 px-2.5 py-1 text-[10.5px] font-medium text-white/80 backdrop-blur-sm">
            {label}
          </span>
        )}
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <div
        className={`relative overflow-hidden ${rounded} ${className}`}
        style={{
          background: "linear-gradient(135deg,#2b2620 0%,#1a1712 100%)",
          ...style,
        }}
      >
        {label && (
          <span className="absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-medium text-white/70">
            {label}
          </span>
        )}
      </div>
    );
  }

  // light (default)
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-dashed border-b2b-line bg-b2b-band px-4 text-center ${rounded} ${className}`}
      style={style}
    >
      <ImageIcon className="h-7 w-7 text-b2b-tan" />
      {label && (
        <span className="max-w-[80%] text-[12px] font-medium leading-snug text-b2b-muted">
          {label}
        </span>
      )}
    </div>
  );
}
