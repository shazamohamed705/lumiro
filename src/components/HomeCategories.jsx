import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./HomeCategories.module.css";

const CATEGORIES = [
  { key: "body",    labelAr: "العناية بالجسم",  labelEn: "Body Care",  img: "/image 28.png",  path: "/categories/body"   },
  { key: "skin",    labelAr: "العناية بالبشرة", labelEn: "Skin Care",  img: "/image 27.png",  path: "/categories/skin"   },
  { key: "hair",    labelAr: "العناية بالشعر",  labelEn: "Hair Care",  img: "/Frame 7.png",   path: "/categories/hair"   },
  { key: "baby",    labelAr: "العناية بالطفل",  labelEn: "Baby Care",  img: "/Frame 9.png",   path: "/categories/baby"   },
  { key: "makeup",  labelAr: "المكياج",          labelEn: "Makeup",     img: "/Frame 11.png",  path: "/categories/makeup" },
  { key: "perfume", labelAr: "العطور",           labelEn: "Perfumes",   img: "/image 28.png",  path: "/categories/perfume"},
];

// نكرر 3 مرات عشان الـ loop يبان سلس
const ITEMS = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

const SPEED = 0.8;

export default function HomeCategories() {
  const { isRTL } = useLang();
  const trackRef = useRef(null);
  const rafRef   = useRef(null);
  const paused   = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // نبدأ من المنتصف عشان الـ loop يشتغل في الاتجاهين
    const half = el.scrollWidth / 3;
    el.scrollLeft = half;

    const step = () => {
      if (!paused.current) {
        el.scrollLeft += SPEED;

        // لما نوصل لـ 2/3 نرجع للـ 1/3 — مش هيبان
        if (el.scrollLeft >= (el.scrollWidth / 3) * 2) {
          el.scrollLeft = el.scrollWidth / 3;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    const pause  = () => { paused.current = true; };
    const resume = () => { paused.current = false; };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart",  pause,  { passive: true });
    el.addEventListener("touchend",    resume, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart",  pause);
      el.removeEventListener("touchend",    resume);
    };
  }, []);

  return (
    <section className={styles.section} dir={isRTL ? "rtl" : "ltr"}>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>{isRTL ? "الأقسام الرئيسية" : "Main Categories"}</h2>
        <p className={styles.subtitle}>{isRTL ? "تصنيفات متعددة ومنتجات تلبي احتياجك" : "Multiple categories to meet your needs"}</p>
      </div>

      {/* الـ track دايماً ltr عشان scrollLeft يشتغل صح */}
      <div className={styles.track} ref={trackRef} dir="ltr">
        {ITEMS.map((cat, i) => (
          <Link
            key={`${cat.key}-${i}`}
            to={cat.path}
            className={styles.card}
            draggable="false"
          >
            <div className={styles.imgWrapper}>
              <img
                src={cat.img}
                alt={isRTL ? cat.labelAr : cat.labelEn}
                className={styles.img}
                draggable="false"
              />
            </div>
            <span className={styles.label}>
              {isRTL ? cat.labelAr : cat.labelEn}
            </span>
          </Link>
        ))}
      </div>

      {/* View All button */}
      <div className={styles.footer}>
        <Link to="/categories" className={styles.viewAllBtn}>
          {isRTL ? "عرض جميع الأقسام" : "View All Categories"}
        </Link>
      </div>

    </section>
  );
}
