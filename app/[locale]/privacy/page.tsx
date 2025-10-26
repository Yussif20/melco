import { useTranslations } from "next-intl";
import ComingSoon from "@/components/ComingSoon";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <ComingSoon
      title={t("title")}
      description={t("description")}
      icon="shield"
    />
  );
}
