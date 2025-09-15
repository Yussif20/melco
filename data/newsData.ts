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
  image: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    translations: {
      en: {
        title: "Melco Opens New State-of-the-Art Facility",
        description:
          "Expanding our capacity to serve the growing safety equipment market in Saudi Arabia with a new facility featuring advanced logistics and quality control systems.",
        category: "Company News",
        content: {
          intro:
            "Melco Safety Equipment has taken a significant step forward in its mission to enhance workplace safety across Saudi Arabia with the opening of its new state-of-the-art facility.",
          details: [
            "The new 10,000 square meter facility features advanced warehousing systems and enhanced quality control capabilities.",
            "This expansion enables us to stock a wider range of safety equipment and respond more quickly to customer needs.",
            "The facility includes a dedicated training center for safety equipment demonstrations and certification courses.",
          ],
          quote: {
            text: "This new facility represents our commitment to providing the highest quality safety equipment and services to our customers across the Kingdom.",
            author: "Abdullah Al-Saud",
            position: "CEO of Melco Safety Equipment",
          },
        },
      },
      ar: {
        title: "ملكو تفتتح منشأة جديدة متطورة",
        description:
          "توسيع قدرتنا على خدمة سوق معدات السلامة المتنامي في المملكة العربية السعودية من خلال منشأة جديدة تتميز بأنظمة لوجستية ومراقبة جودة متقدمة.",
        category: "أخبار الشركة",
        content: {
          intro:
            "اتخذت شركة ملكو لمعدات السلامة خطوة مهمة إلى الأمام في مهمتها لتعزيز السلامة المهنية في جميع أنحاء المملكة العربية السعودية من خلال افتتاح منشأتها الجديدة المتطورة.",
          details: [
            "تتميز المنشأة الجديدة البالغة مساحتها 10,000 متر مربع بأنظمة تخزين متقدمة وقدرات محسنة لمراقبة الجودة.",
            "يتيح هذا التوسع لنا تخزين مجموعة أوسع من معدات السلامة والاستجابة بشكل أسرع لاحتياجات العملاء.",
            "تتضمن المنشأة مركزاً تدريبياً مخصصاً لعروض معدات السلامة ودورات الشهادات.",
          ],
          quote: {
            text: "تمثل هذه المنشأة الجديدة التزامنا بتقديم أعلى جودة من معدات وخدمات السلامة لعملائنا في جميع أنحاء المملكة.",
            author: "عبدالله آل سعود",
            position: "الرئيس التنفيذي لشركة ملكو لمعدات السلامة",
          },
        },
      },
    },
    date: "2024-01-15",
    image: "/news/new-facility.jpg",
  },
  {
    id: 2,
    translations: {
      en: {
        title: "ISO 45001:2018 Certification Achievement",
        description:
          "Melco demonstrates commitment to occupational health and safety with ISO 45001:2018 certification.",
        category: "Certification",
        content: {
          intro:
            "Melco Safety Equipment has successfully achieved ISO 45001:2018 certification, demonstrating our commitment to occupational health and safety management systems.",
          details: [
            "The certification process involved a comprehensive audit of our safety management systems.",
            "This achievement reinforces our position as a leader in workplace safety solutions.",
            "The certification will help us better serve our clients with enhanced safety standards.",
          ],
        },
      },
      ar: {
        title: "الحصول على شهادة الأيزو 45001:2018",
        description:
          "ملكو تثبت التزامها بالصحة والسلامة المهنية بالحصول على شهادة الأيزو 45001:2018.",
        category: "شهادات",
        content: {
          intro:
            "نجحت شركة ملكو لمعدات السلامة في الحصول على شهادة الأيزو 45001:2018، مما يؤكد التزامنا بأنظمة إدارة الصحة والسلامة المهنية.",
          details: [
            "تضمنت عملية الحصول على الشهادة تدقيقاً شاملاً لأنظمة إدارة السلامة لدينا.",
            "يعزز هذا الإنجاز مكانتنا كشركة رائدة في حلول السلامة المهنية.",
            "ستساعدنا هذه الشهادة على خدمة عملائنا بشكل أفضل من خلال معايير سلامة معززة.",
          ],
        },
      },
    },
    date: "2023-12-10",
    image: "/news/iso-certification.jpg",
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
