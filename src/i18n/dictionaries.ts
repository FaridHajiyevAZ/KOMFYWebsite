import type { Locale } from "./config";

export interface Dict {
  nav: {
    manufacturing: string;
    oem: string;
    industries: string;
    products: string;
    quality: string;
    about: string;
  };
  header: { requestQuote: string };
  footer: {
    company: string;
    business: string;
    products: string;
    resources: string;
    contact: string;
    projectsB2b: string;
    requestQuote: string;
    catalog: string;
    qualityCompliance: string;
    companyProfile: string;
    certificates: string;
  };
  common: {
    viewAllProducts: string;
    requestPrice: string;
    details: string;
    allIndustries: string;
    products: string;
    sort: string;
    from: string;
  };
}

const az: Dict = {
  nav: {
    manufacturing: "İstehsal",
    oem: "OEM və Fərdi Marka",
    industries: "Sənayelər",
    products: "Məhsullar",
    quality: "Keyfiyyət",
    about: "Haqqımızda",
  },
  header: { requestQuote: "Təklif al" },
  footer: {
    company: "Şirkət",
    business: "Biznes",
    products: "Məhsullar",
    resources: "Resurslar",
    contact: "Əlaqə",
    projectsB2b: "Layihələr / B2B",
    requestQuote: "Təklif al",
    catalog: "Kataloq",
    qualityCompliance: "Keyfiyyət və uyğunluq",
    companyProfile: "Şirkət profili (PDF)",
    certificates: "Sertifikatlar və sənədlər",
  },
  common: {
    viewAllProducts: "Bütün məhsullar",
    requestPrice: "Sifariş",
    details: "Ətraflı",
    allIndustries: "Bütün sənayelər",
    products: "məhsul",
    sort: "Sırala",
    from: "dən",
  },
};

const en: Dict = {
  nav: {
    manufacturing: "Manufacturing",
    oem: "OEM & Private Label",
    industries: "Industries",
    products: "Products",
    quality: "Quality",
    about: "About",
  },
  header: { requestQuote: "Request a Quote" },
  footer: {
    company: "Company",
    business: "Business",
    products: "Products",
    resources: "Resources",
    contact: "Contact",
    projectsB2b: "Projects / B2B",
    requestQuote: "Request a Quote",
    catalog: "Catalog",
    qualityCompliance: "Quality & Compliance",
    companyProfile: "Company Profile (PDF)",
    certificates: "Certificates & Documents",
  },
  common: {
    viewAllProducts: "View All Retail Products",
    requestPrice: "Request Price",
    details: "Details",
    allIndustries: "All industries",
    products: "products",
    sort: "Sort",
    from: "from",
  },
};

const ru: Dict = {
  nav: {
    manufacturing: "Производство",
    oem: "OEM и частная марка",
    industries: "Отрасли",
    products: "Продукты",
    quality: "Качество",
    about: "О компании",
  },
  header: { requestQuote: "Запросить предложение" },
  footer: {
    company: "Компания",
    business: "Бизнес",
    products: "Продукты",
    resources: "Ресурсы",
    contact: "Контакты",
    projectsB2b: "Проекты / B2B",
    requestQuote: "Запросить предложение",
    catalog: "Каталог",
    qualityCompliance: "Качество и соответствие",
    companyProfile: "Профиль компании (PDF)",
    certificates: "Сертификаты и документы",
  },
  common: {
    viewAllProducts: "Все товары",
    requestPrice: "Заказать",
    details: "Подробнее",
    allIndustries: "Все отрасли",
    products: "товаров",
    sort: "Сортировка",
    from: "от",
  },
};

const dictionaries: Record<Locale, Dict> = { az, en, ru };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale] ?? az;
}
