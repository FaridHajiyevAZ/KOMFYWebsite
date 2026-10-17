import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { ReviewsManager } from "@/components/admin/ReviewsManager";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const rows = await prisma.review.findMany({ orderBy: { order: "asc" } });
  const reviews = rows.map((r) => ({
    id: r.id,
    author: r.author,
    model: r.model,
    stars: r.stars,
    text: r.text,
    status: r.status,
  }));

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Rəylər"
        subtitle="Ana səhifədə yalnız «dərc olunmuş» rəylər göstərilir"
      />
      <div className="p-8">
        <ReviewsManager reviews={reviews} />
      </div>
    </div>
  );
}
