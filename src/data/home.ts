// Ana səhifə bloklarının strukturu + 3 dildə defolt məzmun.
// Admin "Səhifə blokları"ndan hər dil ayrıca redaktə olunur; DB-də Setting-də JSON kimi saxlanılır.
// Şəkil sahələri (image?) dildən asılı deyil — yalnız AZ tabında yüklənir, digər dillər AZ-dən götürür.
import type { Locale } from "@/i18n/config";

export interface HeroSlideC {
  badge: string;
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  imageLabel: string;
  image?: string;
}
export interface PathC {
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
  imageLabel: string;
  image?: string;
}
export interface GalleryItemC {
  label: string;
  image?: string;
}
export interface HomeContent {
  hero: HeroSlideC[];
  stats: { value: string; label: string }[];
  partner: { eyebrow: string; title: string };
  paths: PathC[];
  made: { eyebrow: string; title: string; text: string; cta: { label: string; href: string }; image?: string };
  processSteps: string[];
  gallery: GalleryItemC[];
  quality: { eyebrow: string; title: string; cta: { label: string; href: string }; note: string };
  certs: GalleryItemC[];
  industriesHead: { eyebrow: string; title: string };
  industries: { name: string; status: string; image?: string }[];
  testimonial: { quote: string; attribution: string };
  retail: { eyebrow: string; title: string };
  cta: {
    title: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
    image?: string;
  };
}

const az: HomeContent = {
  hero: [
    {
      badge: "2015-ci ildən matras istehsalı",
      title: "Brendiniz və biznesiniz üçün matras istehsalı.",
      text: "KOMFY brendlər, pərakəndə satıcılar, otellər, səhiyyə müəssisələri və iri kommersiya layihələri üçün fərdiləşdirilə bilən matras həlləri istehsal edir.",
      primary: { label: "OEM layihəsinə başla", href: "/oem" },
      secondary: { label: "Pərakəndə məhsullar", href: "/products" },
      imageLabel: "Factory floor — wide shot, warm natural light",
    },
    {
      badge: "OEM və Fərdi Marka",
      title: "Sizin brend, bizim istehsal xəttimiz.",
      text: "Matras brendləri və distribyutorlar üçün spesifikasiyadan çatdırılmaya qədər istehsal — birgə işləməkdən markalı, qablaşdırılmış göndərişə qədər.",
      primary: { label: "OEM imkanları", href: "/oem" },
      secondary: { label: "İstehsala bax", href: "/manufacturing" },
      imageLabel: "Private-label packaging line, close-up",
    },
    {
      badge: "Otellər, Səhiyyə və Müəssisələr",
      title: "Topdan təchizat, kommersiya standartına uyğun.",
      text: "Qonaqpərvərlik, səhiyyə və institusional layihələr üçün fərdi ölçülər və həcmli istehsal.",
      primary: { label: "B2B təklif al", href: "/quote" },
      secondary: { label: "Sənayelər", href: "/industries" },
      imageLabel: "Hotel room with made bed, soft daylight",
    },
  ],
  stats: [
    { value: "2015", label: "Təsis ili" },
    { value: "[CAPACITY]", label: "Aylıq istehsal" },
    { value: "6", label: "Xidmət sahəsi" },
    { value: "Bonnell & Pocket", label: "Yay sistemləri" },
  ],
  partner: { eyebrow: "Bizimlə işləyin", title: "KOMFY ilə əməkdaşlığın 3 yolu" },
  paths: [
    {
      eyebrow: "Brendlər və distribyutorlar",
      title: "OEM və Fərdi Marka",
      text: "Öz markanız altında spesifikasiyadan göndərişə qədər istehsal — birgə işləməkdən markalı qablaşdırmaya qədər.",
      cta: { label: "OEM layihəsinə başla", href: "/oem" },
      imageLabel: "Private-label packaging / OEM production line",
    },
    {
      eyebrow: "Otellər, səhiyyə və müəssisələr",
      title: "B2B Layihələr və Topdan Təchizat",
      text: "Fərdi ölçülər və kommersiya davamlılığı ilə həcmli təchizat.",
      cta: { label: "B2B təklif al", href: "/quote" },
      imageLabel: "Hotel room / bulk mattress delivery",
    },
    {
      eyebrow: "Eviniz üçün",
      title: "Pərakəndə Matraslar",
      text: "Eyni fabrikdə istehsal olunan konstruksiya, sərtlik və ölçülərə baxın.",
      cta: { label: "Uyğun matrası tap", href: "/products" },
      imageLabel: "Bedroom lifestyle shot",
    },
  ],
  made: {
    eyebrow: "Necə hazırlanır",
    title: "Yaydan tikişə qədər öz istehsalımız",
    text: "Hər matras yay bloku istehsalı, köpük kəsimi və qatlanması, kapitonaj və tikiş, yığılma, yoxlama və qablaşdırmadan keçir — hamısı öz istehsal xəttimizdə.",
    cta: { label: "Tam İstehsal səhifəsinə bax", href: "/manufacturing" },
  },
  processSteps: ["Spesifikasiya", "İşləmə", "Nümunə", "Test", "İstehsal", "Qablaşdırma", "Çatdırılma"],
  gallery: [
    { label: "İstehsal sahəsi" },
    { label: "Avadanlıq" },
    { label: "Materiallar" },
    { label: "Keyfiyyət nəzarəti" },
  ],
  quality: {
    eyebrow: "Keyfiyyət və uyğunluq",
    title:
      "Hər matras göndərilməzdən əvvəl xammal nəzarətindən, proses yoxlamalarından və son yoxlamadan keçir.",
    cta: { label: "Keyfiyyət standartlarına bax", href: "/quality" },
    note: "Sertifikatlar və test hesabatları yükləndikdən sonra göstərilir — sənəd olmadan heç bir iddia edilmir.",
  },
  certs: [{ label: "Sertifikat" }, { label: "Test hesabatı" }, { label: "Sertifikat" }],
  industriesHead: { eyebrow: "Sənayelər", title: "Xidmət etdiyimiz sənayelər" },
  industries: [
    { name: "Matras brendləri və distribyutorlar", status: "İmkan mövcuddur" },
    { name: "Mebel mağazaları və pərakəndə şəbəkələr", status: "Aktiv B2B təcrübəsi" },
    { name: "Otellər və qonaqpərvərlik", status: "Aktiv B2B təcrübəsi" },
    { name: "Xəstəxanalar və səhiyyə", status: "İmkan mövcuddur" },
    { name: "İnstitusional və yaşayış layihələri", status: "İmkan mövcuddur" },
    { name: "Digər B2B tələblər", status: "İmkan mövcuddur" },
  ],
  testimonial: {
    quote:
      "[Otel şəbəkəsi], 120 otaq — fərdi sərtlik spesifikasiyası, çevrilməyən dizayn, bütün obyektə mərhələli çatdırılma.",
    attribution: "Təsdiqlənmiş müştəri rəyi — təsdiq gözləyir",
  },
  retail: { eyebrow: "Eviniz üçün", title: "Pərakəndə kataloqa baxış" },
  cta: {
    title: "Matras istehsalı üçün tərəfdaş axtarırsınız?",
    primary: { label: "OEM layihəsinə başla", href: "/oem" },
    secondary: { label: "B2B təklif al", href: "/quote" },
  },
};

const en: HomeContent = {
  hero: [
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
  ],
  stats: [
    { value: "2015", label: "Founded" },
    { value: "[CAPACITY]", label: "Units per month" },
    { value: "6", label: "Industries served" },
    { value: "Bonnell & Pocket", label: "Spring systems" },
  ],
  partner: { eyebrow: "Work with us", title: "Three ways to partner with KOMFY" },
  paths: [
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
  ],
  made: {
    eyebrow: "How it's made",
    title: "Built in-house, from spring to stitch",
    text: "Every mattress moves through spring-unit manufacturing, foam cutting and layering, quilting and sewing, assembly, inspection and packaging — all on our own production floor.",
    cta: { label: "See the full Manufacturing page", href: "/manufacturing" },
  },
  processSteps: ["Specification", "Development", "Sampling", "Testing", "Production", "Packaging", "Delivery"],
  gallery: [
    { label: "Production floor" },
    { label: "Machinery" },
    { label: "Materials" },
    { label: "QC / testing" },
  ],
  quality: {
    eyebrow: "Quality & compliance",
    title:
      "Every mattress passes raw-material control, in-process checks and final inspection before it ships.",
    cta: { label: "View Quality Standards", href: "/quality" },
    note: "Certificates & test reports shown once uploaded — none implied without a document on file.",
  },
  certs: [{ label: "Certificate" }, { label: "Test report" }, { label: "Certificate" }],
  industriesHead: { eyebrow: "Industries", title: "Industries served" },
  industries: [
    { name: "Mattress Brands & Distributors", status: "Capability available" },
    { name: "Furniture Stores & Retail Chains", status: "Active B2B experience" },
    { name: "Hotels & Hospitality", status: "Active B2B experience" },
    { name: "Hospitals & Healthcare", status: "Capability available" },
    { name: "Institutional & Accommodation Projects", status: "Capability available" },
    { name: "Other B2B Requirements", status: "Capability available" },
  ],
  testimonial: {
    quote:
      "[Hotel chain], 120 rooms — custom firmness spec, non-flip design, delivered in phases across the full property.",
    attribution: "Verified client quote — placeholder pending approval",
  },
  retail: { eyebrow: "For your home", title: "Retail catalog preview" },
  cta: {
    title: "Looking for a mattress manufacturing partner?",
    primary: { label: "Start an OEM Project", href: "/oem" },
    secondary: { label: "Request a B2B Quote", href: "/quote" },
  },
};

const ru: HomeContent = {
  hero: [
    {
      badge: "Производство матрасов с 2015 года",
      title: "Производство матрасов для вашего бренда и бизнеса.",
      text: "KOMFY производит индивидуальные матрасные решения для брендов, ритейлеров, отелей, медицинских учреждений и крупных коммерческих проектов.",
      primary: { label: "Начать OEM-проект", href: "/oem" },
      secondary: { label: "Розничные товары", href: "/products" },
      imageLabel: "Factory floor — wide shot, warm natural light",
    },
    {
      badge: "OEM и частная марка",
      title: "Ваш бренд, наше производство.",
      text: "Производство от спецификации до отгрузки для матрасных брендов и дистрибьюторов — от совместной разработки до упакованной отгрузки под брендом.",
      primary: { label: "Возможности OEM", href: "/oem" },
      secondary: { label: "Производство", href: "/manufacturing" },
      imageLabel: "Private-label packaging line, close-up",
    },
    {
      badge: "Отели, медицина и учреждения",
      title: "Оптовые поставки по коммерческим стандартам.",
      text: "Индивидуальные размеры и объёмное производство для гостиниц, медицины и учреждений.",
      primary: { label: "B2B-предложение", href: "/quote" },
      secondary: { label: "Отрасли", href: "/industries" },
      imageLabel: "Hotel room with made bed, soft daylight",
    },
  ],
  stats: [
    { value: "2015", label: "Основан" },
    { value: "[CAPACITY]", label: "Единиц в месяц" },
    { value: "6", label: "Отраслей" },
    { value: "Bonnell & Pocket", label: "Пружинные системы" },
  ],
  partner: { eyebrow: "Работайте с нами", title: "Три способа сотрудничества с KOMFY" },
  paths: [
    {
      eyebrow: "Бренды и дистрибьюторы",
      title: "OEM и частная марка",
      text: "Производство под вашей маркой от спецификации до отгрузки — от совместной разработки до упаковки под брендом.",
      cta: { label: "Начать OEM-проект", href: "/oem" },
      imageLabel: "Private-label packaging / OEM production line",
    },
    {
      eyebrow: "Отели, медицина и учреждения",
      title: "B2B-проекты и оптовые поставки",
      text: "Объёмные поставки с индивидуальными размерами и коммерческой прочностью.",
      cta: { label: "B2B-предложение", href: "/quote" },
      imageLabel: "Hotel room / bulk mattress delivery",
    },
    {
      eyebrow: "Для вашего дома",
      title: "Розничные матрасы",
      text: "Конструкции, жёсткость и размеры от того же завода.",
      cta: { label: "Подобрать матрас", href: "/products" },
      imageLabel: "Bedroom lifestyle shot",
    },
  ],
  made: {
    eyebrow: "Как это сделано",
    title: "Собственное производство — от пружины до строчки",
    text: "Каждый матрас проходит производство пружинного блока, раскрой и укладку пены, стёжку и пошив, сборку, контроль и упаковку — всё на нашем производстве.",
    cta: { label: "Открыть страницу производства", href: "/manufacturing" },
  },
  processSteps: ["Спецификация", "Разработка", "Образец", "Тестирование", "Производство", "Упаковка", "Доставка"],
  gallery: [
    { label: "Производство" },
    { label: "Оборудование" },
    { label: "Материалы" },
    { label: "Контроль качества" },
  ],
  quality: {
    eyebrow: "Качество и соответствие",
    title:
      "Каждый матрас проходит контроль сырья, промежуточные проверки и финальную инспекцию перед отгрузкой.",
    cta: { label: "Стандарты качества", href: "/quality" },
    note: "Сертификаты и тест-отчёты показываются после загрузки — без документа ничего не подразумевается.",
  },
  certs: [{ label: "Сертификат" }, { label: "Тест-отчёт" }, { label: "Сертификат" }],
  industriesHead: { eyebrow: "Отрасли", title: "Обслуживаемые отрасли" },
  industries: [
    { name: "Матрасные бренды и дистрибьюторы", status: "Возможность доступна" },
    { name: "Мебельные магазины и розничные сети", status: "Активный B2B-опыт" },
    { name: "Отели и гостеприимство", status: "Активный B2B-опыт" },
    { name: "Больницы и здравоохранение", status: "Возможность доступна" },
    { name: "Институциональные проекты и размещение", status: "Возможность доступна" },
    { name: "Другие B2B-запросы", status: "Возможность доступна" },
  ],
  testimonial: {
    quote:
      "[Сеть отелей], 120 номеров — индивидуальная жёсткость, несъёмный дизайн, поэтапная поставка по всему объекту.",
    attribution: "Проверенный отзыв клиента — ожидает подтверждения",
  },
  retail: { eyebrow: "Для вашего дома", title: "Обзор розничного каталога" },
  cta: {
    title: "Ищете партнёра по производству матрасов?",
    primary: { label: "Начать OEM-проект", href: "/oem" },
    secondary: { label: "B2B-предложение", href: "/quote" },
  },
};

export const defaultHomeContentByLocale: Record<Locale, HomeContent> = { az, en, ru };
export const defaultHomeContent: HomeContent = az;
