import type { CSSProperties } from "react";
import { ImageSlot } from "./ImageSlot";

/**
 * Yüklənmiş şəkil varsa onu göstərir (object-cover), yoxdursa ImageSlot yer-tutucusunu.
 * Admin paneldən şəkil əlavə edilən bütün ana səhifə bloklarında istifadə olunur.
 */
export function SlotOrImage({
  src,
  alt = "",
  label,
  className = "",
  variant = "light",
  rounded = "rounded-2xl",
  style,
}: {
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
  variant?: "light" | "photo" | "dark";
  rounded?: string;
  style?: CSSProperties;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }
  return (
    <ImageSlot label={label} className={className} variant={variant} rounded={rounded} style={style} />
  );
}
