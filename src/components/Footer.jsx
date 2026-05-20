import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./Footer.module.css";

export default function Footer() {
  const { isRTL } = useLang();

  /* ── column data ── */
  const departments = isRTL
    ? ["العناية بالبشرة", "العناية بالشعر", "المكياج", "العطور", "الأجهزة"]
    : ["Skin Care", "Hair Care", "Makeup", "Perfumes", "Devices"];

  const customerService = isRTL
    ? ["اتصل بنا", "سياسة الاسترجاع", "الشحن والتوصيل", "الأسئلة الشائعة"]
    : ["Contact Us", "Return Policy", "Shipping & Delivery", "FAQ"];

  const aboutUs = isRTL
    ? ["من نحن", "تواصل معنا", "الشروط والأحكام", "سياسة الخصوصية"]
    : ["About Us", "Contact Us", "Terms & Conditions", "Privacy Policy"];

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className={styles["ftr__root"]}
      aria-label={isRTL ? "تذييل الصفحة" : "Site footer"}
    >
      {/* ══ TOP ══ */}
      <div className={styles["ftr__top"]}>

        {/* Brand */}
        <div className={styles["ftr__brand"]}>
          <Link to="/" className={styles["ftr__logo"]} aria-label="Lumira">
            <img src="/ChatGPT Image May 11, 2026, 11_15_06 AM.png" alt="لوميرا كير" className={styles["ftr__logoImg"]} />
          </Link>

          <p className={styles["ftr__tagline"]}>
            {isRTL
              ? "وجهتك المثالية للحصول على أفضل منتجات التجميل والعناية الشخصية من علامات عالمية موثوقة."
              : "Your ultimate destination for the finest beauty and personal care products from trusted global brands."}
          </p>

          <div className={styles["ftr__socials"]}>
            {/* Twitter / X */}
            <a href="#" aria-label="Twitter" className={styles["ftr__socialBtn"]}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className={styles["ftr__socialBtn"]}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className={styles["ftr__socialBtn"]}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Departments */}
        <div className={`${styles["ftr__col"]} ${styles["ftr__colFirst"]}`}>
          <h3 className={styles["ftr__colTitle"]}>
            {isRTL ? "الأقسام" : "Departments"}
          </h3>
          <ul className={styles["ftr__list"]} role="list">
            {departments.map((item) => (
              <li key={item}>
                <Link to="/categories" className={styles["ftr__link"]}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div className={styles["ftr__col"]}>
          <h3 className={styles["ftr__colTitle"]}>
            {isRTL ? "خدمة العملاء" : "Customer Service"}
          </h3>
          <ul className={styles["ftr__list"]} role="list">
            {customerService.map((item, i) => (
              <li key={item}>
                <Link
                  to={i === 0 ? "/contact" : i === 1 ? "/privacy?section=returns" : "/"}
                  className={styles["ftr__link"]}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us */}
        <div className={styles["ftr__col"]}>
          <h3 className={styles["ftr__colTitle"]}>
            {isRTL ? "عن عنايتي" : "About Us"}
          </h3>
          <ul className={styles["ftr__list"]} role="list">
            {aboutUs.map((item, i) => (
              <li key={item}>
                <Link
                  to={
                    i === 0 ? "/about" :
                    i === 1 ? "/contact" :
                    i === 2 ? "/privacy?section=usage" :
                    "/privacy?section=privacy"
                  }
                  className={styles["ftr__link"]}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ══ MIDDLE STRIP ══ */}
      <div className={styles["ftr__mid"]}>
        <div className={styles["ftr__midInner"]}>

          {/* Phone */}
          <div className={styles["ftr__infoItem"]}>
            <span className={styles["ftr__infoIcon"]} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div className={styles["ftr__infoText"]}>
              <span className={styles["ftr__infoLabel"]}>{isRTL ? "اتصل بنا" : "Call Us"}</span>
              <a href="tel:+966501234567" className={styles["ftr__infoValue"]}>+966 50 123 4567</a>
            </div>
          </div>

          {/* Email */}
          <div className={styles["ftr__infoItem"]}>
            <span className={styles["ftr__infoIcon"]} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <div className={styles["ftr__infoText"]}>
              <span className={styles["ftr__infoLabel"]}>{isRTL ? "راسلنا" : "Email Us"}</span>
              <a href="mailto:info@enayty.com" className={styles["ftr__infoValue"]}>info@enayty.com</a>
            </div>
          </div>

          {/* Address */}
          <div className={styles["ftr__infoItem"]}>
            <span className={styles["ftr__infoIcon"]} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div className={styles["ftr__infoText"]}>
              <span className={styles["ftr__infoLabel"]}>{isRTL ? "عنواننا" : "Address"}</span>
              <span className={styles["ftr__infoValue"]}>
                {isRTL ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ══ BOTTOM BAR ══ */}
      <div className={styles["ftr__bottom"]}>
        <p className={styles["ftr__copy"]}>
          © {new Date().getFullYear()} Lumira.{" "}
          {isRTL ? "جميع الحقوق محفوظة" : "All rights reserved"}.
        </p>
        <nav className={styles["ftr__bottomLinks"]} aria-label={isRTL ? "روابط قانونية" : "Legal links"}>
          <Link to="/privacy?section=privacy" className={styles["ftr__bottomLink"]}>
            {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
          </Link>
          <Link to="/privacy?section=returns" className={styles["ftr__bottomLink"]}>
            {isRTL ? "الشروط والأحكام" : "Terms & Conditions"}
          </Link>
        </nav>
      </div>

    </footer>
  );
}
