import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./HomeBlog.module.css";

export default function HomeBlog() {
  const { isRTL } = useLang();

  return (
    <section
      className={styles["hblg__section"]}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "مدونتنا" : "Our Blog"}
    >
      {/* Text content */}
      <div className={styles["hblg__content"]}>
        <h2 className={styles["hblg__title"]}>
          {isRTL ? "مدونتنا" : "Our Blog"}
        </h2>
        <p className={styles["hblg__desc"]}>
          {isRTL
            ? "مقالات قصيرة، فوائد كبيرة، ورؤى متجددة. استكشف آخر الأخبار والنصائح التي نسطرها لك بأسلوب بسيط ومباشر."
            : "Short articles, big benefits, and fresh insights. Explore the latest news and tips written for you in a simple and direct style."}
        </p>
        <Link to="/blog" className={styles["hblg__btn"]}>
          {isRTL ? "استكشف المقالات" : "Explore Articles"}
        </Link>
      </div>

      {/* Images collage */}
      <div className={styles["hblg__collage"]}>
        <div className={styles["hblg__imgLarge"]}>
          <img src="/efa9d0d65d06312386f54cb3b381f35d637be5b8.png" alt="" className={styles["hblg__img"]} draggable="false" />
        </div>
        <div className={styles["hblg__imgStack"]}>
          <div className={styles["hblg__imgSmall"]}>
            <img src="/190c7cfc70e1343fce25b65317a9a28a87b63a81.png" alt="" className={styles["hblg__img"]} draggable="false" />
          </div>
          <div className={styles["hblg__imgSmall"]}>
            <img src="/ff45161734974f96190f2f1bd32cdc30fbf84dc4.png" alt="" className={styles["hblg__img"]} draggable="false" />
          </div>
        </div>
      </div>
    </section>
  );
}
