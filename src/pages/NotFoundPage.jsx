import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function NotFoundPage() {
  const { t, isRTL } = useLang();
  return (
    <main dir={isRTL ? "rtl" : "ltr"}>
      <h1>404 — {t("pages.notFound")}</h1>
      <Link to="/">{t("pages.home")}</Link>
    </main>
  );
}
