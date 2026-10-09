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
  links?: { url: string; label: { en: string; ar: string } }[]; // Related external links (optional)
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
  {
    id: 3,
    translations: {
      en: {
        title: "Congratulations to Dr. Abdulaziz bin Saad Al-Qahtani",
        description:
          "Our co-founder and board member has been elected to the Board of Directors of the Saudi Management Association (SMA) and appointed as Treasurer.",
        category: "Congratulations",
        content: {
          intro:
            "We extend our sincere congratulations to Dr. Abdulaziz bin Saad Al-Qahtani, Co-Founder and Board Member of MELCO | ميلكو, on his election to the Board of Directors of the Saudi Management Association (SMA) and his appointment as Treasurer.",
          details: [
            "We wish him every success in this responsibility, and that his contribution will be an extension of a professional career rich in giving, supporting the development of management practices and strengthening the Association's role in serving professionals and those interested in the field of management.",
            "At MELCO | ميلكو, we take pride in our people and believe that active participation in professional organizations is both a responsibility and an opportunity to create impact that extends beyond the boundaries of the organization.",
            "With our sincere wishes to him and his fellow board members for success in this new chapter.",
            "MELCO – Driven by Quality, Defined by Trust",
          ],
        },
      },
      ar: {
        title: "تهنئة للدكتور عبدالعزيز بن سعد القحطاني",
        description:
          "انتخاب الشريك المؤسس في ميلكو وعضو مجلس إدارتها عضوًا في مجلس إدارة الجمعية السعودية للإدارة وأمينًا للمال.",
        category: "تهاني",
        content: {
          intro:
            "نتقدم بخالص التهنئة والتبريكات للدكتور عبدالعزيز بن سعد القحطاني الشريك المؤسس في MELCO | ميلكو وعضو مجلس إدارتها، بمناسبة فوزه وانتخابه عضوًا في مجلس إدارة الجمعية السعودية للإدارة | Saudi Management Association SMA وأمينًا للمال.",
          details: [
            "نسأل الله له التوفيق والسداد في هذه المسؤولية، وأن يكون إسهامه امتدادًا لمسيرة مهنية حافلة بالعطاء، وداعمًا لتطوير الممارسات الإدارية وتعزيز دور الجمعية في خدمة المختصين والمهتمين بمجال الإدارة.",
            "في MELCO | ميلكو، نفخر بكفاءاتنا ونؤمن بأن المشاركة الفاعلة في المنظمات المهنية مسؤولية وفرصة لصناعة أثر يتجاوز حدود المنشأة.",
            "مع خالص تمنياتنا له ولزملائه في المجلس بالتوفيق والنجاح في هذه المرحلة الجديدة.",
            "MELCO – Driven by Quality, Defined by Trust",
          ],
        },
      },
    },
    date: "2026-10-09",
    image: "/news/sma-board-election/sma-board-election-1.jpg",
    images: ["/news/sma-board-election/sma-board-election-2.jpg"],
    featured: true,
    slug: "congratulations-dr-abdulaziz-alqahtani-sma-board",
    links: [
      {
        url: "https://www.linkedin.com/company/smaorgsa/home/",
        label: {
          en: "Saudi Management Association (SMA)",
          ar: "الجمعية السعودية للإدارة",
        },
      },
      {
        url: "https://www.linkedin.com/company/melcosa/posts/",
        label: { en: "MELCO on LinkedIn", ar: "ميلكو على LinkedIn" },
      },
    ],
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
