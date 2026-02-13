import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

export interface NewsArticle {
  id: number;
  translations: {
    en: {
      title: string;
      description: string;
      category: string;
      content: {
        intro: string;
        details: string[];
        quote?: {
          text: string;
          author: string;
          position: string;
        };
      };
    };
    ar: {
      title: string;
      description: string;
      category: string;
      content: {
        intro: string;
        details: string[];
        quote?: {
          text: string;
          author: string;
          position: string;
        };
      };
    };
  };
  date: string;
  image: string; // Main cover image
  images?: string[]; // Additional gallery images (optional)
  featured?: boolean; // Featured news (optional)
  slug?: string; // URL-friendly slug (optional)
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    translations: {
      en: {
        title: "Strategic Partnership with Safety Jogger Works",
        description:
          "MELCO announces strategic supply partnership with Safety Jogger Works, a leading global brand in industrial safety footwear and PPE.",
        category: "Partnership",
        content: {
          intro:
            "We are pleased to announce a strategic supply partnership agreement between MELCO | ميلكو and Safety Jogger Works, one of the leading global brands in industrial safety footwear and PPE.",
          details: [
            "This partnership expands our product portfolio with globally certified solutions, ensuring enhanced protection and performance for workers across vital sectors such as oil & gas, construction, and industrial operations in Saudi Arabia.",
            "Safety Jogger Works brings decades of expertise in manufacturing high-quality safety footwear that meets international standards and certifications.",
            "The collaboration will enable MELCO to offer a comprehensive range of safety footwear solutions tailored to the specific needs of Saudi Arabia's industrial sectors.",
            "Both companies are committed to delivering innovative safety solutions that prioritize worker protection and operational efficiency.",
          ],
        },
      },
      ar: {
        title: "شراكة استراتيجية مع Safety Jogger Works",
        description:
          "ميلكو تعلن عن شراكة توريد استراتيجية مع Safety Jogger Works، إحدى العلامات العالمية الرائدة في أحذية ومعدات السلامة المهنية.",
        category: "شراكات",
        content: {
          intro:
            "يسعدنا الإعلان عن إتفاقية شراكة توريد استراتيجية بين شركة MELCO | ميلكو و Safety Jogger Works، إحدى العلامات العالمية المتميزة في أحذية ومعدات السلامة المهنية.",
          details: [
            "تهدف هذه الشراكة إلى توسيع مجموعة منتجاتنا المعتمدة دوليًا، ودعم قطاعات النفط والغاز والإنشاءات والصناعات المختلفة بحلول سلامة موثوقة تعزز أداء القوى العاملة وتحميها.",
            "تقدم Safety Jogger Works عقوداً من الخبرة في تصنيع أحذية السلامة عالية الجودة التي تلبي المعايير والشهادات الدولية.",
            "سيمكن هذا التعاون ميلكو من تقديم مجموعة شاملة من حلول أحذية السلامة المصممة خصيصاً لتلبية احتياجات القطاعات الصناعية في المملكة العربية السعودية.",
            "تلتزم كلتا الشركتين بتقديم حلول سلامة مبتكرة تعطي الأولوية لحماية العمال والكفاءة التشغيلية.",
          ],
        },
      },
    },
    date: "2025-10-29",
    image: "/news/safety-jogger/safety-jogger-partnership-2.jpeg",
    images: [
      "/news/safety-jogger/safety-jogger-partnership-1.jpeg",
      "/news/safety-jogger/safety-jogger-partnership-3.jpeg",
    ],
    featured: true,
    slug: "strategic-partnership-safety-jogger-works",
  },
  {
    id: 2,
    translations: {
      en: {
        title: "Strategic Partnership with Arco: Experts In Safety",
        description:
          "130 years of safety excellence… now aligned with our ambition.",
        category: "Partnership",
        content: {
          intro:
            "We are pleased to announce that MELCO | ميلكو has signed a strategic supply partnership with Arco: Experts In Safety, the UK's leading safety company, protecting industries for over a century.",
          details: [
            "This is not just a supply agreement, but a concrete step toward elevating safety standards, strengthening compliance culture, and delivering globally certified PPE solutions.",
            "At MELCO | ميلكو, we believe safety is not a product, it is a responsibility.",
            "A partnership that combines distinguished British heritage with forward-driven ambition.",
          ],
        },
      },
      ar: {
        title: "شراكة استراتيجية مع Arco: Experts In Safety",
        description: "130 عامًا من التميز في السلامة… واليوم تتكامل مع طموحنا.",
        category: "شراكات",
        content: {
          intro:
            "يسرّنا الإعلان عن توقيع MELCO | ميلكو اتفاقية شراكة توريد استراتيجية مع Arco: Experts In Safety، الشركة البريطانية الرائدة في مجال السلامة، التي تحمي القطاعات الصناعية منذ أكثر من قرن.",
          details: [
            "هذه ليست مجرد اتفاقية توريد، بل خطوة عملية لرفع معايير السلامة، وتعزيز ثقافة الامتثال، وتقديم حلول معدات وقاية شخصية بمعايير عالمية.",
            "في MELCO | ميلكو نؤمن أن السلامة ليست منتجًا بل مسؤولية.",
            "شراكة تجمع بين خبرة بريطانية عريقة وطموح يتطلع إلى صناعة فرق حقيقي في بيئات العمل.",
          ],
        },
      },
    },
    date: "2026-02-13",
    image: "/news/arco-partnership/arco-partnership-1.jpg",
    images: [
      "/news/arco-partnership/arco-partnership-2.jpg",
      "/news/arco-partnership/arco-partnership-3.jpg",
      "/news/arco-partnership/arco-partnership-4.jpg",
    ],
    featured: true,
    slug: "strategic-partnership-arco-experts-in-safety",
  },
];

export function getNewsArticle(id: number): NewsArticle | undefined {
  return newsArticles.find((article) => article.id === id);
}

export function formatArticleDate(date: string, locale: string) {
  return format(new Date(date), "MMMM d, yyyy", {
    locale: locale === "ar" ? ar : enUS,
  });
}
