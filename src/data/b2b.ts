// KOMFY B2B (istehsalçı) sayt kontenti — index.dc.html dizaynından

export const b2bNav = [
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "OEM & Private Label", href: "/oem" },
  { label: "Industries", href: "/industries" },
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/quality" },
  { label: "About", href: "/about" },
];

export interface HeroSlide {
  badge: string;
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  imageLabel: string;
}

export const heroSlides: HeroSlide[] = [
  {
    badge: "Manufacturing mattresses since 2015",
    title: "Mattress manufacturing built for your brand and business.",
    text: "KOMFY manufactures customizable mattress solutions for brands, retailers, hotels, healthcare facilities, and large-scale commercial projects.",
    primary: { label: "Start an OEM Project", href: "/oem" },
    secondary: { label: "View Retail Products", href: "/products" },
    imageLabel: "Factory floor — wide shot, warm natural light",
  },
  {
    badge: "OEM & Private Label",
    title: "Your brand, our production floor.",
    text: "Spec-to-shipment manufacturing for mattress brands and distributors, from co-development to packaged, branded shipment.",
    primary: { label: "Explore OEM Capabilities", href: "/oem" },
    secondary: { label: "See Manufacturing", href: "/manufacturing" },
    imageLabel: "Private-label packaging line, close-up",
  },
  {
    badge: "Hotels, Healthcare & Institutions",
    title: "Bulk supply, built to commercial-grade spec.",
    text: "Custom dimensions and volume production for hospitality, healthcare and institutional projects.",
    primary: { label: "Request a B2B Quote", href: "/quote" },
    secondary: { label: "View Industries", href: "/industries" },
    imageLabel: "Hotel room with made bed, soft daylight",
  },
];

export const stats = [
  { value: "2015", label: "Founded" },
  { value: "[CAPACITY]", label: "Units per month" },
  { value: "6", label: "Industries served" },
  { value: "Bonnell & Pocket", label: "Spring systems" },
];

export const paths = [
  {
    eyebrow: "Brands & distributors",
    title: "OEM & Private Label",
    text: "Spec-to-shipment production under your label — from co-development to branded, packaged shipment.",
    cta: { label: "Start an OEM Project", href: "/oem" },
    imageLabel: "Private-label packaging / OEM production line",
  },
  {
    eyebrow: "Hotels, healthcare & institutions",
    title: "B2B Projects & Bulk Supply",
    text: "Volume supply with custom dimensions and commercial-grade durability.",
    cta: { label: "Request a B2B Quote", href: "/quote" },
    imageLabel: "Hotel room / bulk mattress delivery",
  },
  {
    eyebrow: "For your home",
    title: "Retail Mattresses",
    text: "Browse constructions, firmness and sizes built by the same factory.",
    cta: { label: "Find the Right Mattress", href: "/products" },
    imageLabel: "Bedroom lifestyle shot",
  },
];

export const industries = [
  { name: "Mattress Brands & Distributors", status: "Capability available" },
  { name: "Furniture Stores & Retail Chains", status: "Active B2B experience" },
  { name: "Hotels & Hospitality", status: "Active B2B experience" },
  { name: "Hospitals & Healthcare", status: "Capability available" },
  { name: "Institutional & Accommodation Projects", status: "Capability available" },
  { name: "Other B2B Requirements", status: "Capability available" },
];

export const retailPreview = [
  {
    name: "Orthopedic Comfort 2000",
    construction: "Pocket spring + foam",
    firmness: "Medium",
    height: "24 cm",
  },
  {
    name: "ClassicFirm Bonnell",
    construction: "Bonnell spring",
    firmness: "Firm",
    height: "20 cm",
  },
  {
    name: "CoolGel Hybrid",
    construction: "Hybrid + cooling gel foam",
    firmness: "Medium-soft",
    height: "26 cm",
  },
];

export const processSteps = [
  "Specification",
  "Development",
  "Sampling",
  "Testing",
  "Production",
  "Packaging",
  "Delivery",
];

export const b2bFooter = [
  {
    title: "Company",
    links: [
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "OEM & Private Label", href: "/oem" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Projects / B2B", href: "/quote" },
      { label: "Request a Quote", href: "/quote" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Catalog", href: "/products" },
      { label: "Quality & Compliance", href: "/quality" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Company Profile (PDF)", href: "#" },
      { label: "Certificates & Documents", href: "#" },
    ],
  },
];

export const b2bContact = {
  address: "[Factory address], Baku, Azerbaijan",
  phone: "+994 [phone]",
  email: "info@komfy.az",
};
