import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

function fmtDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default async function DashboardPage() {
  const [newLeads, totalLeads, productCount, reviewCount, pendingReviews, recentLeads] =
    await Promise.all([
      prisma.lead.count({ where: { status: "new" } }),
      prisma.lead.count(),
      prisma.product.count({ where: { active: true } }),
      prisma.review.count(),
      prisma.review.count({ where: { status: "pending" } }),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    ]);

  const stats = [
    { label: "Yeni sorğu", value: String(newLeads), note: "cavab gözləyir", href: "/admin/sorgular" },
    { label: "Cəmi sorğu", value: String(totalLeads), note: "bütün vaxtlar", href: "/admin/sorgular" },
    { label: "Aktiv məhsul", value: String(productCount), note: "kataloqda", href: "/admin/mehsullar" },
    { label: "Rəylər", value: String(reviewCount), note: `${pendingReviews} moderasiyada`, href: "/admin/reyler" },
  ];

  const tasks: { title: string; sub: string; href: string; action: string }[] = [];
  if (newLeads > 0)
    tasks.push({
      title: `${newLeads} yeni sorğu cavab gözləyir`,
      sub: "Quote və OEM formalarından",
      href: "/admin/sorgular",
      action: "Bax",
    });
  if (pendingReviews > 0)
    tasks.push({
      title: `${pendingReviews} rəy moderasiya gözləyir`,
      sub: "Dərc olunana qədər saytda görünmür",
      href: "/admin/reyler",
      action: "Bax",
    });
  tasks.push({
    title: "Sayt əlaqə məlumatlarını yoxlayın",
    sub: "Telefon, email, ünvan — footer-də göstərilir",
    href: "/admin/parametrler",
    action: "Aç",
  });

  return (
    <div className="flex flex-col">
      <PageHeader
        title="İdarə paneli"
        subtitle={`${productCount} aktiv məhsul · ${totalLeads} sorğu · komfy.az`}
        action={{ label: "Yeni məhsul", href: "/admin/mehsullar" }}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-px border-b border-komfy-line bg-komfy-line lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="flex flex-col gap-2 bg-komfy-panel px-6 py-[22px] transition-colors hover:bg-komfy-card"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-komfy-muted2">
              {s.label}
            </span>
            <span className="font-serif text-[34px] font-light leading-none text-komfy-ink">
              {s.value}
            </span>
            <span className="text-[12.5px] font-light text-komfy-muted">{s.note}</span>
          </Link>
        ))}
      </div>

      {/* Tasks */}
      <div className="border-b border-komfy-line p-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-serif text-[19px] text-komfy-ink">Diqqət tələb edən işlər</h2>
        </div>
        <div className="flex flex-col gap-px border border-komfy-line bg-komfy-line">
          {tasks.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="flex items-center gap-4 bg-komfy-card px-[18px] py-[15px] transition-colors hover:bg-komfy-panel"
            >
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-komfy-gold" />
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[13.5px] font-medium text-komfy-ink">{t.title}</span>
                <span className="text-[12px] font-light text-komfy-muted2">{t.sub}</span>
              </div>
              <span className="ml-auto whitespace-nowrap text-[12.5px] text-komfy-green underline decoration-komfy-border underline-offset-2">
                {t.action}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent leads */}
      <div className="p-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-serif text-[19px] text-komfy-ink">Son sorğular</h2>
          <Link href="/admin/sorgular" className="link-more">
            Bütün sorğular
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="border border-dashed border-komfy-line2 bg-komfy-panel p-10 text-center text-[13.5px] font-light text-komfy-muted2">
            Hələ sorğu yoxdur. Saytdakı Quote/OEM forması doldurulduqda burada görünəcək.
          </div>
        ) : (
          <div className="overflow-x-auto border border-komfy-line">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[90px_1.2fr_1.4fr_1fr_100px] border-b border-komfy-line bg-komfy-panel text-[11px] font-medium uppercase tracking-[0.1em] text-komfy-muted2">
                {["Tip", "Ad / şirkət", "Əlaqə", "Yol", "Tarix"].map((h) => (
                  <span key={h} className="px-4 py-3">
                    {h}
                  </span>
                ))}
              </div>
              {recentLeads.map((l) => (
                <Link
                  key={l.id}
                  href="/admin/sorgular"
                  className="grid grid-cols-[90px_1.2fr_1.4fr_1fr_100px] items-center border-b border-komfy-line/60 bg-komfy-card text-[13px] font-light transition-colors last:border-0 hover:bg-komfy-panel"
                >
                  <span className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        l.type === "oem"
                          ? "bg-komfy-green text-komfy-surface"
                          : "bg-komfy-gold text-komfy-ink"
                      }`}
                    >
                      {l.type}
                    </span>
                  </span>
                  <span className="px-4 py-3">
                    {l.name}
                    {l.company ? ` · ${l.company}` : ""}
                  </span>
                  <span className="px-4 py-3 text-komfy-muted">{l.email || l.phone || "—"}</span>
                  <span className="px-4 py-3 text-komfy-muted2">{l.path || "—"}</span>
                  <span className="px-4 py-3 text-komfy-muted2">{fmtDate(l.createdAt)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
