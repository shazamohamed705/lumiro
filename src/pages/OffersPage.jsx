import { useLang } from "../context/LanguageContext";

export default function OffersPage() {
  const { t } = useLang();
  return (
    <main>
      <h1>{t("pages.offers")}</h1>
    </main>
  );
}
