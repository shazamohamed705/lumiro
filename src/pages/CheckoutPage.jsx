import { useLang } from "../context/LanguageContext";

export default function CheckoutPage() {
  const { t } = useLang();
  return (
    <main>
      <h1>{t("pages.checkout")}</h1>
    </main>
  );
}
