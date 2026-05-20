import { useLang } from "../context/LanguageContext";
import styles from "./PartnersStrip.module.css";

// استبدل الـ src بصور اللوجوهات الحقيقية
const LOGOS = [
  { id: 1, name: "Garnier",     src: "/42dc01e6bd391e85e41fe9231bf4732432f2d9e8.png" },
  { id: 2, name: "The Ordinary",src: "/10b6d9283bac657fad0258aa59d00aacffbe62f2.png" },
  { id: 3, name: "Johnson's",   src: "/6d30dfa46cdc9dc3fe0b1ebaa15360a546a9333d.png"  },
  { id: 4, name: "Dove",        src: "/e7b8c7fcf5d158dee63daadaeceea3740535eebd.png"  },
  { id: 5, name: "La Roche",    src: "/42dc01e6bd391e85e41fe9231bf4732432f2d9e8.png" },
  { id: 6, name: "Nivea",       src: "/42dc01e6bd391e85e41fe9231bf4732432f2d9e8.png" },
  { id: 7, name: "Cetaphil",    src: "/42dc01e6bd391e85e41fe9231bf4732432f2d9e8.png" },
];

export default function PartnersStrip() {
  const { isRTL } = useLang();

  // نكرر اللوجوهات مرتين عشان الـ infinite loop يبان سلس
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section
      className={styles["pstr__section"]}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "شركاء النجاح" : "Partners"}
    >
      {/* Header */}
      <div className={styles["pstr__header"]}>
        <h2 className={styles["pstr__title"]}>
          {isRTL ? "شركاء النجاح" : "Our Partners"}
        </h2>
        <p className={styles["pstr__subtitle"]}>
          {isRTL
            ? "رحلة نجاحنا تكتمل بشركائنا الذين يشاركوننا نفس الرؤية والاهتمام بجمالك"
            : "Our success journey is completed by partners who share our vision and care for your beauty"}
        </p>
      </div>

      {/* Marquee track */}
      <div className={styles["pstr__track"]} aria-hidden="true">
        <div className={`${styles["pstr__rail"]} ${isRTL ? styles["pstr__railRtl"] : styles["pstr__railLtr"]}`}>
          {doubled.map((logo, i) => (
            <div key={i} className={styles["pstr__logoWrap"]}>
              <img
                src={logo.src}
                alt={logo.name}
                className={styles["pstr__logo"]}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
