import { redirect } from "next/navigation";
import { getSession, roleLabel } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminSidebar, type NavSection } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [productCount, categoryCount, pendingReviews, reviewCount, newLeads, leadCount, userCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.review.count({ where: { status: "pending" } }),
      prisma.review.count(),
      prisma.lead.count({ where: { status: "new" } }),
      prisma.lead.count(),
      prisma.user.count(),
    ]);

  const sections: NavSection[] = [
    {
      label: "Kataloq",
      items: [
        { label: "İdarə paneli", href: "/admin", ready: true },
        { label: "Məhsullar", href: "/admin/mehsullar", badge: String(productCount), ready: true },
        { label: "Ölçü və qiymətlər", href: "/admin/mehsullar", ready: false },
        { label: "Kateqoriyalar", badge: String(categoryCount), ready: false },
      ],
    },
    {
      label: "Satış",
      items: [
        {
          label: "Sorğular",
          href: "/admin/sorgular",
          badge: leadCount > 0 ? String(newLeads > 0 ? newLeads : leadCount) : undefined,
          badgeGold: newLeads > 0,
          ready: true,
        },
        { label: "Sifarişlər", ready: false },
      ],
    },
    {
      label: "Kontent",
      items: [
        { label: "Səhifə blokları", href: "/admin/sehife-bloklari", ready: true },
        {
          label: "Rəylər",
          href: "/admin/reyler",
          badge: pendingReviews > 0 ? String(pendingReviews) : String(reviewCount),
          badgeGold: pendingReviews > 0,
          ready: true,
        },
        { label: "Rahatlıq testi", ready: false },
        { label: "Media kitabxanası", ready: false },
      ],
    },
    {
      label: "Sistem",
      items: [
        { label: "Parametrlər", href: "/admin/parametrler", ready: true },
        {
          label: "İstifadəçi və rollar",
          href: "/admin/istifadeciler",
          badge: String(userCount),
          ready: true,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        sections={sections}
        userName={session.name}
        roleLabel={roleLabel(session.role)}
      />
      <div className="flex min-w-0 flex-1 flex-col bg-komfy-surface">{children}</div>
    </div>
  );
}
