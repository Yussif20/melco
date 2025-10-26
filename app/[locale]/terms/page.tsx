import { useTranslations } from "next-intl";
import ComingSoon from "@/components/ComingSoon";

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <ComingSoon
      title={t("title")}
      description={t("description")}
      icon="document"
    />
  );
}
