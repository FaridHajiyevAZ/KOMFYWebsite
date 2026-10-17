import type { Metadata } from "next";
import { MatrasQuiz } from "@/components/MatrasQuiz";
import { getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Rahatlıq testi",
  description:
    "Beş sual, bir tövsiyə. Yatma vərdişinizə və büdcənizə görə uyğun KOMFY matrasını tapın.",
};

export default async function SelectionPage() {
  const products = await getProducts();
  return <MatrasQuiz products={products} />;
}
