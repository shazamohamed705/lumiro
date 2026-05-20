import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./NavDropdown.module.css";

const CATEGORIES = [
  { slug: "skin-care",   ar: "العناية بالبشرة",  en: "Skin Care"   },
  { slug: "body-care",   ar: "العناية بالجسم",   en: "Body Care"   },
  { slug: "hair-care",   ar: "العناية بالشعر",   en: "Hair Care"   },
  { slug: "baby-care",   ar: "العناية بالطفل",   en: "Baby Care"   },
  { slug: "perfumes",    ar: "العطور",            en: "Perfumes"    },
  { slug: "dental-care", ar: "العناية بالأسنان", en: "Dental Care" },
  { slug: "makeup",      ar: "المكياج",           en: "Makeup"      },
  { slug: "beauty-tips", ar: "نصائح جمالية",     en: "Beauty Tips" },
];

export default function NavDropdown() {
  const { isRTL } = useLang();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = pathname.startsWith("/products") || pathname.startsWith("/categories");

  return (
    <div className={styles["ndp__wrap"]} ref={wrapRef}>

      {/* Trigger button */}
      <button
        className={`${styles["ndp__trigger"]} ${isActive ? styles["ndp__triggerActive"] : ""}`}
        onClick={() => setOpen(p => !p)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {isRTL ? "المنتجات" : "Products"}
        <svg
          className={`${styles["ndp__chevron"]} ${open ? styles["ndp__chevronOpen"] : ""}`}
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className={styles["ndp__panel"]} dir={isRTL ? "rtl" : "ltr"}>
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              to={`/categories/${cat.slug}`}
              className={styles["ndp__item"]}
              onClick={() => setOpen(false)}
            >
              {isRTL ? cat.ar : cat.en}
            </Link>
          ))}

          <Link
            to="/products"
            className={styles["ndp__viewAll"]}
            onClick={() => setOpen(false)}
          >
            {isRTL ? "عرض كل المنتجات ←" : "View All Products →"}
          </Link>
        </div>
      )}
    </div>
  );
}
