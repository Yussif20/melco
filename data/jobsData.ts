import { format, parseISO } from "date-fns";
import { ar, enUS } from "date-fns/locale";

export interface JobPosting {
  id: number;
  translations: {
    en: {
      title: string;
      description: string;
      location: string;
      department: string;
      requirements: string[];
      responsibilities: string[];
      benefits: string[];
    };
    ar: {
      title: string;
      description: string;
      location: string;
      department: string;
      requirements: string[];
      responsibilities: string[];
      benefits: string[];
    };
  };
  type: "full-time" | "part-time" | "contract";
  level: "entry" | "mid" | "senior" | "lead" | "manager";
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  expiryDate: string;
  remote: boolean;
}

export const jobPostings: JobPosting[] = [
  {
    id: 1,
    translations: {
      en: {
        title: "Safety Equipment Specialist",
        description:
          "Join our team as a Safety Equipment Specialist and play a crucial role in ensuring workplace safety across Saudi Arabia. You'll be responsible for advising clients on safety equipment selection, conducting site assessments, and providing technical support.",
        location: "Dammam, Saudi Arabia",
        department: "Technical Support",
        requirements: [
          "Bachelor's degree in Safety Engineering, Industrial Engineering, or related field",
          "3+ years experience in industrial safety or related field",
          "Strong knowledge of safety standards (OSHA, ANSI, EN)",
          "Excellent communication and presentation skills",
          "Fluency in English and Arabic",
          "Valid Saudi driving license",
        ],
        responsibilities: [
          "Conduct safety equipment assessments and recommendations",
          "Provide technical support and training to clients",
          "Maintain up-to-date knowledge of safety regulations and standards",
          "Collaborate with sales team to provide technical expertise",
          "Prepare technical documentation and reports",
          "Conduct product demonstrations and training sessions",
        ],
        benefits: [
          "Competitive salary package",
          "Health insurance for you and your family",
          "Annual bonus based on performance",
          "Professional development opportunities",
          "Transportation allowance",
          "Housing allowance",
        ],
      },
      ar: {
        title: "أخصائي معدات السلامة",
        description:
          "انضم إلى فريقنا كأخصائي معدات السلامة والعب دورًا حاسمًا في ضمان السلامة المهنية في جميع أنحاء المملكة العربية السعودية. ستكون مسؤولاً عن تقديم المشورة للعملاء بشأن اختيار معدات السلامة، وإجراء تقييمات المواقع، وتقديم الدعم الفني.",
        location: "الدمام، المملكة العربية السعودية",
        department: "الدعم الفني",
        requirements: [
          "درجة البكالوريوس في هندسة السلامة، الهندسة الصناعية، أو مجال ذي صلة",
          "خبرة 3+ سنوات في السلامة الصناعية أو مجال ذي صلة",
          "معرفة قوية بمعايير السلامة (OSHA, ANSI, EN)",
          "مهارات ممتازة في التواصل والعرض",
          "إجادة اللغتين العربية والإنجليزية",
          "رخصة قيادة سعودية سارية المفعول",
        ],
        responsibilities: [
          "إجراء تقييمات وتوصيات معدات السلامة",
          "تقديم الدعم الفني والتدريب للعملاء",
          "الحفاظ على معرفة محدثة بأنظمة ومعايير السلامة",
          "التعاون مع فريق المبيعات لتقديم الخبرة الفنية",
          "إعداد الوثائق والتقارير الفنية",
          "إجراء عروض توضيحية للمنتجات وجلسات تدريبية",
        ],
        benefits: [
          "حزمة راتب تنافسية",
          "تأمين صحي لك ولعائلتك",
          "مكافأة سنوية على أساس الأداء",
          "فرص التطوير المهني",
          "بدل مواصلات",
          "بدل سكن",
        ],
      },
    },
    type: "full-time",
    level: "mid",
    salary: {
      min: 15000,
      max: 20000,
      currency: "SAR",
    },
    postedDate: "2025-09-01",
    expiryDate: "2025-10-01",
    remote: false,
  },
  {
    id: 2,
    translations: {
      en: {
        title: "Sales Manager - Safety Equipment",
        description:
          "We are seeking an experienced Sales Manager to lead our safety equipment sales team. The ideal candidate will have a proven track record in B2B sales, preferably in the safety equipment or industrial supplies sector.",
        location: "Riyadh, Saudi Arabia",
        department: "Sales",
        requirements: [
          "Bachelor's degree in Business, Marketing, or related field",
          "5+ years of B2B sales experience",
          "Previous experience in safety equipment sales preferred",
          "Strong leadership and team management skills",
          "Excellent negotiation and relationship building skills",
          "Fluency in English and Arabic",
          "Valid Saudi driving license",
        ],
        responsibilities: [
          "Develop and implement sales strategies",
          "Lead and mentor the sales team",
          "Build and maintain relationships with key accounts",
          "Achieve monthly and annual sales targets",
          "Monitor market trends and competitor activities",
          "Prepare sales forecasts and reports",
        ],
        benefits: [
          "Competitive base salary plus commission",
          "Company car",
          "Comprehensive health insurance",
          "Performance bonuses",
          "Housing allowance",
          "Mobile phone allowance",
        ],
      },
      ar: {
        title: "مدير مبيعات - معدات السلامة",
        description:
          "نبحث عن مدير مبيعات ذو خبرة لقيادة فريق مبيعات معدات السلامة لدينا. المرشح المثالي سيكون لديه سجل حافل في مبيعات B2B، ويفضل أن يكون في قطاع معدات السلامة أو التوريدات الصناعية.",
        location: "الرياض، المملكة العربية السعودية",
        department: "المبيعات",
        requirements: [
          "درجة البكالوريوس في إدارة الأعمال، التسويق، أو مجال ذي صلة",
          "خبرة 5+ سنوات في مبيعات B2B",
          "يفضل خبرة سابقة في مبيعات معدات السلامة",
          "مهارات قوية في القيادة وإدارة الفريق",
          "مهارات ممتازة في التفاوض وبناء العلاقات",
          "إجادة اللغتين العربية والإنجليزية",
          "رخصة قيادة سعودية سارية المفعول",
        ],
        responsibilities: [
          "تطوير وتنفيذ استراتيجيات المبيعات",
          "قيادة وتوجيه فريق المبيعات",
          "بناء والحفاظ على العلاقات مع العملاء الرئيسيين",
          "تحقيق أهداف المبيعات الشهرية والسنوية",
          "مراقبة اتجاهات السوق وأنشطة المنافسين",
          "إعداد توقعات وتقارير المبيعات",
        ],
        benefits: [
          "راتب أساسي تنافسي بالإضافة إلى عمولة",
          "سيارة شركة",
          "تأمين صحي شامل",
          "مكافآت أداء",
          "بدل سكن",
          "بدل هاتف محمول",
        ],
      },
    },
    type: "full-time",
    level: "manager",
    salary: {
      min: 25000,
      max: 35000,
      currency: "SAR",
    },
    postedDate: "2025-09-05",
    expiryDate: "2025-10-05",
    remote: false,
  },
];

export function getJobPosting(id: number): JobPosting | undefined {
  return jobPostings.find((job) => job.id === id);
}

export function formatJobDate(date: string, locale: string) {
  return format(parseISO(date), "MMMM d, yyyy", {
    locale: locale === "ar" ? ar : enUS,
  });
}

export function isJobExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}

export type JobType = JobPosting["type"];
export type JobLevel = JobPosting["level"];

export const jobTypes: { [K in JobType]: { en: string; ar: string } } = {
  "full-time": {
    en: "Full Time",
    ar: "دوام كامل",
  },
  "part-time": {
    en: "Part Time",
    ar: "دوام جزئي",
  },
  contract: {
    en: "Contract",
    ar: "عقد",
  },
};

export const jobLevels: { [K in JobLevel]: { en: string; ar: string } } = {
  entry: {
    en: "Entry Level",
    ar: "مبتدئ",
  },
  mid: {
    en: "Mid Level",
    ar: "متوسط",
  },
  senior: {
    en: "Senior Level",
    ar: "خبير",
  },
  lead: {
    en: "Team Lead",
    ar: "قائد فريق",
  },
  manager: {
    en: "Manager",
    ar: "مدير",
  },
};
