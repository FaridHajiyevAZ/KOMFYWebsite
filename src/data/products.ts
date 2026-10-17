export type Category = "Ekonomik" | "Komfort" | "Premium";

export interface SizePrice {
  size: string; // e.g. "160×190/200"
  price: number; // AZN
}

export interface Layer {
  title: string;
  text: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string; // "Premium ortopedik" (eyebrow on product page)
  category: Category;
  priceFrom: number;
  priceTo: number;
  heightCm: number;
  springType: string;
  comfortLayer: string;
  firmness: string; // slider label, e.g. "Orta yumşaq"
  firmnessPct: number; // 0 (soft) – 100 (firm) slider position
  fabric: string;
  cooling: boolean;
  hypoallergenic: boolean;
  warrantyYears: number;
  trialDays: number;
  image: string;
  popular?: boolean;
  specLine: string; // catalog card sub-line
  shortDescription: string;
  description: string;
  whoFor: string[];
  whoNot?: string;
  layers?: Layer[];
  sizes: SizePrice[];
}

// Dizaynda göstərilən 5 standart ölçü, 160 default seçili
const STANDARD_SIZES = [
  "90×190/200",
  "120×190/200",
  "160×190/200",
  "180×190/200",
  "200×190/200",
];
export const DEFAULT_SIZE_INDEX = 2; // 160×190/200

// Adaptive-in real qiymət pilləsinə (759→949→1169→1279→1369) uyğun nisbətlər
const RATIOS = [0, 0.311, 0.672, 0.852, 1];

function buildSizes(from: number, to: number): SizePrice[] {
  return STANDARD_SIZES.map((size, i) => ({
    size,
    price: Math.round(from + (to - from) * RATIOS[i]),
  }));
}

// Statik məhsul datası — verilənlər bazasının ilkin doldurulması (seed) üçün mənbədir.
// Canlı sayt bunu birbaşa deyil, `src/lib/content.ts` vasitəsilə bazadan oxuyur.
export const seedProducts: Product[] = [
  {
    slug: "rose",
    name: "Rose",
    tagline: "Ekonomik ortopedik",
    category: "Ekonomik",
    priceFrom: 199,
    priceTo: 429,
    heightCm: 24,
    springType: "Bonel yay",
    comfortLayer: "Standart",
    firmness: "Sərt",
    firmnessPct: 80,
    fabric: "Antiallergik trikotaj",
    cooling: false,
    hypoallergenic: true,
    warrantyYears: 5,
    trialDays: 30,
    image: "/products/rose.webp",
    specLine: "Bonel yay · 24 sm · sərt",
    shortDescription:
      "Sərt döşək — üzərinə əlavə nazik döşək sərmək istəyənlər üçün sərfəli ortopedik seçim.",
    description:
      "Rose büdcəyə uyğun, lakin ortopedik keyfiyyətdən güzəştə getməyən modeldir. Bonel yay sistemi onurğaya bərabər dəstək verir, antiallergik parça sağlam yuxu üçün təmiz mühit yaradır. Sərt səth sevənlər, uşaq otaqları və qonaq çarpayıları üçün mükəmməldir.",
    whoFor: [
      "Sərt matras sevənlər",
      "Uşaq otağı və qonaq otağı",
      "Sərfəli büdcə axtaranlar",
    ],
    whoNot: "Yumşaq, qucaqlayan səth istəyənlər — Morbido daha uyğundur",
    sizes: buildSizes(199, 429),
  },
  {
    slug: "maksima",
    name: "Maksima",
    tagline: "Ekonomik pedli",
    category: "Ekonomik",
    priceFrom: 229,
    priceTo: 449,
    heightCm: 28,
    springType: "Bonel yay + pedli qat",
    comfortLayer: "Pedli qat",
    firmness: "Orta-sərt",
    firmnessPct: 66,
    fabric: "Yumşaq pedli trikotaj",
    cooling: false,
    hypoallergenic: true,
    warrantyYears: 5,
    trialDays: 30,
    image: "/products/maksima.jpg",
    specLine: "Bonel yay + pedli qat · 28 sm · orta-sərt",
    shortDescription:
      "Pedli üst qatı ilə əlavə yumşaqlıq təqdim edən sərfəli, balanslı model.",
    description:
      "Maksima ekonomik seqmentdə əlavə rahatlıq axtaranlar üçündür. Bonel yay sisteminin üzərinə əlavə edilmiş pedli qat bədəni yumşaq qarşılayır, 28 sm hündürlük dolğun görünüş və dayanıqlıq verir. Gündəlik istifadə üçün balanslı seçim.",
    whoFor: [
      "Sərfəli qiymətə əlavə komfort istəyənlər",
      "Gündəlik istifadə",
      "Orta-sərt səth sevənlər",
    ],
    sizes: buildSizes(229, 449),
  },
  {
    slug: "goldline",
    name: "Goldline",
    tagline: "Komfort ortopedik",
    category: "Komfort",
    priceFrom: 299,
    priceTo: 669,
    heightCm: 28,
    springType: "Bonel yay",
    comfortLayer: "Standart komfort qatı",
    firmness: "Orta",
    firmnessPct: 54,
    fabric: "Keyfiyyətli trikotaj",
    cooling: false,
    hypoallergenic: true,
    warrantyYears: 5,
    trialDays: 30,
    image: "/products/goldline.webp",
    popular: true,
    specLine: "Bonel yay · 28 sm · orta",
    shortDescription:
      "Minlərlə müştərinin alıb dost-tanışına tövsiyə etdiyi orta sərtlikdə model.",
    description:
      "Goldline KOMFY-nin ən populyar modelidir. Ortopedik dəstək, rahat komfort qatı və dözümlü konstruksiyanı əlçatan qiymətə birləşdirir. Orta sərtlik hər tip yatana uyğun gəldiyi üçün ən çox seçilən modeldir.",
    whoFor: [
      "İlk dəfə ortopedik matras alanlar",
      "Balanslı, orta sərtlik istəyənlər",
      "Ailələr",
    ],
    sizes: buildSizes(299, 669),
  },
  {
    slug: "morbido",
    name: "Morbido",
    tagline: "Komfort ortopedik",
    category: "Komfort",
    priceFrom: 359,
    priceTo: 769,
    heightCm: 30,
    springType: "Bonel yay + pedli qat",
    comfortLayer: "Qalın pedli qat",
    firmness: "Orta",
    firmnessPct: 47,
    fabric: "Yumşaq pedli trikotaj",
    cooling: false,
    hypoallergenic: true,
    warrantyYears: 5,
    trialDays: 30,
    image: "/products/morbido.jpg",
    specLine: "Bonel yay + pedli qat · 30 sm · orta",
    shortDescription:
      "Qalın pedli səthi ilə yumşaq, qucaqlayan yuxu hissi verən komfort modeli.",
    description:
      "Morbido yumşaq və qucaqlayan yuxu hissi sevənlər üçündür. 30 sm hündürlük və qalın pedli qat təzyiq nöqtələrini azaldır, bonel yay sistemi isə lazımi dəstəyi qoruyur. Yumşaq, amma çökməyən bir səth axtaranlar üçün.",
    whoFor: [
      "Yumşaq, qucaqlayan səth sevənlər",
      "Yan üstə yatanlar",
      "Təzyiq nöqtələrini azaltmaq istəyənlər",
    ],
    sizes: buildSizes(359, 769),
  },
  {
    slug: "belissimo",
    name: "Belissimo",
    tagline: "Komfort ortopedik",
    category: "Komfort",
    priceFrom: 509,
    priceTo: 949,
    heightCm: 31,
    springType: "Poket yay",
    comfortLayer: "Bamboo parça",
    firmness: "Orta",
    firmnessPct: 50,
    fabric: "Bamboo parça",
    cooling: true,
    hypoallergenic: true,
    warrantyYears: 5,
    trialDays: 30,
    image: "/products/belissimo.webp",
    specLine: "Poket yay · 31 sm · bamboo parça",
    shortDescription:
      "Müstəqil poket yaylar və təbii bamboo parça ilə fərdi dəstək və təravət.",
    description:
      "Belissimo poket yay texnologiyasına keçid modelidir. Hər yay müstəqil hərəkət edir — bədənin hər nöqtəsinə fərdi dəstək verir və partnyorun hərəkətini ötürmür. Təbii bamboo parça nəfəs alan, təravətli səth yaradır.",
    whoFor: [
      "Cütlüklər — hərəkət ötürülmür",
      "Sərin, nəfəs alan səth istəyənlər",
      "Fərdi dəstək axtaranlar",
    ],
    sizes: buildSizes(509, 949),
  },
  {
    slug: "adaptive",
    name: "Adaptive",
    tagline: "Premium ortopedik",
    category: "Premium",
    priceFrom: 759,
    priceTo: 1369,
    heightCm: 32,
    springType: "7 zonalı poket yay",
    comfortLayer: "Eurotop ped + memory foam",
    firmness: "Orta yumşaq",
    firmnessPct: 38,
    fabric: "Dry & Cool",
    cooling: true,
    hypoallergenic: true,
    warrantyYears: 10,
    trialDays: 30,
    image: "/products/adaptive.webp",
    specLine: "7 zonalı poket · 32 sm · Dry & Cool",
    shortDescription:
      "7 zonalı poket yay, Eurotop ped və memory foam. 5 ulduzlu hotel komfortu evinizdə.",
    description:
      "7 zonalı poket yay, Eurotop ped və memory foam. İstehsalında 5 ulduzlu hotellərin komfort standartları əsas götürülüb — orta yumşaqlıqda, maksimum komfortlu model.",
    whoFor: [
      "Otel komfortunu evdə istəyənlər",
      "İsti yatanlar: Dry & Cool parça tərləməni azaldır",
      "Cütlüklər: 7 zonalı poket yay hərəkəti ötürmür",
    ],
    whoNot: "Sərt matras sevənlər — Rose və ya Maksima daha uyğundur",
    layers: [
      {
        title: "Dry & Cool parça",
        text: "Tərləməni azaldır, tərin tez buxarlanmasını təmin edir",
      },
      {
        title: "Eurotop ped",
        text: "Quş tükü materialı (feather foam) — hiss olunan yumşaqlıq",
      },
      {
        title: "Memory foam",
        text: "Bədən konturlarına görə erqonomik dəstək",
      },
      {
        title: "7 zonalı poket yay",
        text: "Hər zona ayrıca işləyir — hərəkət o biri tərəfə ötürülmür",
      },
    ],
    sizes: buildSizes(759, 1369),
  },
  {
    slug: "majestic",
    name: "Majestic",
    tagline: "Premium hibrid",
    category: "Premium",
    priceFrom: 809,
    priceTo: 1549,
    heightCm: 31,
    springType: "Hibrid poket yay + visko",
    comfortLayer: "HyperCool Visco",
    firmness: "Orta",
    firmnessPct: 43,
    fabric: "HyperCool",
    cooling: true,
    hypoallergenic: true,
    warrantyYears: 10,
    trialDays: 30,
    image: "/products/majestic.webp",
    popular: true,
    specLine: "Hibrid · 31 sm · HyperCool Visco",
    shortDescription:
      "Poket yay və HyperCool Visco qatın hibrid birləşməsi — dəstək və qucaqlama bir arada.",
    description:
      "Majestic hibrid konstruksiya ilə poket yayın dəstəyini visko yaddaş köpüyünün qucaqlayan rahatlığı ilə birləşdirir. HyperCool Visco qat bədən istisini idarə edərək viskonun isti saxlama problemini həll edir. Lüks hiss, dözümlü performans.",
    whoFor: [
      "Visko yaddaş hissini sevənlər",
      "İsti yatanlar — HyperCool tənzimləyir",
      "Premium rahatlıq axtaranlar",
    ],
    sizes: buildSizes(809, 1549),
  },
  {
    slug: "intense",
    name: "Intense",
    tagline: "Premium · təbii lateks",
    category: "Premium",
    priceFrom: 849,
    priceTo: 1739,
    heightCm: 31,
    springType: "Poket yay + təbii lateks",
    comfortLayer: "100% təbii lateks",
    firmness: "Orta-sərt",
    firmnessPct: 45,
    fabric: "Nega-Stat antistatik",
    cooling: true,
    hypoallergenic: true,
    warrantyYears: 10,
    trialDays: 30,
    image: "/products/intense.jpg",
    specLine: "100% təbii lateks · 31 sm · Nega-Stat",
    shortDescription:
      "100% təbii lateks və antistatik Nega-Stat parça ilə ən sağlam premium yuxu.",
    description:
      "Intense təbii materialları sevənlər üçün ən yüksək seçimdir. 100% təbii lateks qat elastik, nəfəs alan və antibakterial dəstək verir. Nega-Stat antistatik parça statik elektriki neytrallaşdırır.",
    whoFor: [
      "Təbii material sevənlər",
      "Allergiyası olanlar",
      "Elastik, dözümlü dəstək istəyənlər",
    ],
    sizes: buildSizes(849, 1739),
  },
  {
    slug: "honeymoon",
    name: "Honeymoon",
    tagline: "Özəl seriya · lüks",
    category: "Premium",
    priceFrom: 1109,
    priceTo: 1290,
    heightCm: 31,
    springType: "7 zonalı poket yay",
    comfortLayer: "HyCare pambıq ped",
    firmness: "Orta",
    firmnessPct: 50,
    fabric: "HyCare pambıq",
    cooling: true,
    hypoallergenic: true,
    warrantyYears: 10,
    trialDays: 30,
    image: "/products/honeymoon.webp",
    specLine: "7 zonalı poket · 31 sm · HyCare pambıq",
    shortDescription:
      "Bal ayı konsepti. Ölkədə HyCare pambıq parça ilə istehsal olunan yeganə matras.",
    description:
      "Honeymoon KOMFY-nin lüks özəl modelidir. Bal ayı konsepti üçün düşünülüb: 7 zonalı poket yay və HyCare texnologiyalı pambıq parça. Ölkədə bu parça ilə istehsal olunan yeganə matras. Yalnız 160×200, 180×200 və 200×200 ölçülərində.",
    whoFor: [
      "Cütlüklər və yeni ailələr",
      "Təbii pambıq parça sevənlər",
      "Lüks, özəl hədiyyə axtaranlar",
    ],
    whoNot: "Fərdi/kiçik ölçü lazım olanlar — yalnız 160, 180, 200 mövcuddur",
    sizes: buildSizes(1109, 1290),
  },
];

export const categories: Category[] = ["Ekonomik", "Komfort", "Premium"];

function group(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatPrice(price: number): string {
  return `${group(price)} AZN`;
}

export function formatFrom(price: number): string {
  return `${group(price)} AZN-dən`;
}
