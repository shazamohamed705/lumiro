import { useLang } from "../context/LanguageContext";
import styles from "./WhyUs.module.css";

const FEATURES = [
  {
    key: "shipping",
    titleAr: "شحن مجاني",
    titleEn: "Free Shipping",
    descAr: "على جميع الطلبات فوق 200 ر.س",
    descEn: "On all orders above 200 SAR",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    key: "discounts",
    titleAr: "خصومات حصرية",
    titleEn: "Exclusive Deals",
    descAr: "خصم يصل إلى %50 على منتجات مختارة",
    descEn: "Up to 50% off on selected products",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19"/>
        <circle cx="6.5" cy="6.5" r="2.5"/>
        <circle cx="17.5" cy="17.5" r="2.5"/>
      </svg>
    ),
  },
  {
    key: "delivery",
    titleAr: "توصيل سريع",
    titleEn: "Fast Delivery",
    descAr: "توصيل خلال 24–48 ساعة",
    descEn: "Delivery within 24–48 hours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    key: "returns",
    titleAr: "استرجاع مجاني",
    titleEn: "Free Returns",
    descAr: "استرجع مجاناً خلال 14 يوم",
    descEn: "Free returns within 14 days",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
        <path d="M3 3v5h5"/>
      </svg>
    ),
  },
];

export default function WhyUs() {
  const { isRTL } = useLang();

  return (
    <section className={styles["whyus__section"]} dir={isRTL ? "rtl" : "ltr"}>

      {/* Background */}
      <img
        src="/4f3814711bdda6f14d4016944b5d4f2bf94dedb0.png"
        alt=""
        className={styles["whyus__bg"]}
        aria-hidden="true"
        draggable="false"
      />
      <div className={styles["whyus__overlay"]} aria-hidden="true" />

      {/* Content */}
      <div className={styles["whyus__content"]}>

        <h2 className={styles["whyus__title"]}>
          {isRTL ? "لماذا عنايتي؟" : "Why Lumira?"}
        </h2>
        <p className={styles["whyus__subtitle"]}>
          {isRTL ? "تجربة تسوق متكاملة مع مزايا حصرية" : "A complete shopping experience with exclusive benefits"}
        </p>

        <div className={styles["whyus__grid"]}>
          {FEATURES.map((f) => (
            <div key={f.key} className={styles["whyus__card"]}>
              <div className={styles["whyus__iconWrap"]}>{f.icon}</div>
              <p className={styles["whyus__cardTitle"]}>
                {isRTL ? f.titleAr : f.titleEn}
              </p>
              <p className={styles["whyus__cardDesc"]}>
                {isRTL ? f.descAr : f.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
