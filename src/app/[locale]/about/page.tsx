import type { Metadata } from "next";
import { ComingSoon } from "@/components/b2b/ComingSoon";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <ComingSoon
      eyebrow="About KOMFY"
      title="Manufacturing mattresses since 2015"
      text="A local mattress manufacturer producing for brands, retailers, hotels, healthcare facilities and large-scale commercial projects."
    />
  );
}
