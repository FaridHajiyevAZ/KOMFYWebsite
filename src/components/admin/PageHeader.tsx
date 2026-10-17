import Link from "next/link";

export function PageHeader({
  title,
  subtitle,
  action,
  right,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
  right?: React.ReactNode;
  breadcrumb?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-komfy-line px-8 pb-[22px] pt-7">
      <div className="flex flex-col gap-1.5">
        {breadcrumb && (
          <span className="text-[12.5px] font-light text-komfy-muted2">{breadcrumb}</span>
        )}
        <h1 className="font-serif text-[30px] font-light text-komfy-ink">{title}</h1>
        {subtitle && (
          <span className="text-[13px] font-light text-komfy-muted2">{subtitle}</span>
        )}
      </div>
      <div className="flex items-center gap-2.5">
        {right}
        {action && (
          <Link
            href={action.href}
            className="rounded-full bg-komfy-green px-[18px] py-2.5 text-[12.5px] font-medium text-komfy-surface transition hover:bg-komfy-greenSoft"
          >
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}
