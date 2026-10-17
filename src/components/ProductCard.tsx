import Link from "next/link";
import Image from "next/image";
import { formatFrom, type Product } from "@/data/products";
import { FirmnessBar } from "./FirmnessBar";

export function ProductCard({
  product,
  variant = "full",
}: {
  product: Product;
  variant?: "full" | "compact";
}) {
  const featured = product.popular;
  const imgH = variant === "compact" ? "h-[180px]" : "h-[260px]";

  return (
    <Link
      href={`/mehsullar/${product.slug}`}
      className={`group relative flex flex-col overflow-hidden bg-komfy-card transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(27,27,22,0.45)] ${
        featured ? "border border-komfy-green" : "border border-komfy-line"
      }`}
    >
      {featured && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-komfy-green px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-komfy-surface">
          Ən çox seçilən
        </span>
      )}

      <div className={`relative ${imgH} overflow-hidden bg-komfy-line`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div
        className={`flex flex-1 flex-col ${
          variant === "compact" ? "gap-2.5 p-5" : "gap-3.5 p-[26px]"
        }`}
      >
        <span className="eyebrow text-[10.5px] tracking-[0.16em]">
          {product.category}
        </span>
        <h3 className="font-serif text-[22px] font-normal text-komfy-ink">
          {product.name}
        </h3>
        {variant === "full" ? (
          <p className="text-[14px] font-light leading-[1.55] text-komfy-muted">
            {product.shortDescription}
          </p>
        ) : (
          <p className="text-[13px] font-light leading-[1.55] text-komfy-muted">
            {product.specLine}
          </p>
        )}

        <div className="mt-1">
          <FirmnessBar pct={product.firmnessPct} labels={variant === "full"} />
        </div>

        <div className="mt-auto flex items-baseline justify-between border-t border-komfy-line/70 pt-4">
          <span className="font-serif text-[21px] font-normal text-komfy-ink">
            {formatFrom(product.priceFrom)}
          </span>
          <span className="link-more">Ətraflı</span>
        </div>
      </div>
    </Link>
  );
}
