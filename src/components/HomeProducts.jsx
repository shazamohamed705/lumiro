import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./HomeProducts.module.css";

const CATEGORIES_AR = ["الكل", "البشرة", "الجسم", "الشعر", "الطفل", "العطور", "الأسنان", "المكياج", "العدسات", "الأجهزة", "الباكدجات"];
const CATEGORIES_EN = ["All",  "Skin",   "Body",  "Hair",  "Baby",  "Perfumes","Dental",  "Makeup",  "Lenses",   "Devices",  "Packages"];

const PRODUCTS = [
  { id: 1, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "الجسم",   catEn: "Body",   price: 36, oldPrice: 50, img: "/image 28.png"  },
  { id: 2, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "البشرة",  catEn: "Skin",   price: 36, oldPrice: 50, img: "/image 27.png"  },
  { id: 3, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "الشعر",   catEn: "Hair",   price: 36, oldPrice: 50, img: "/Frame 7.png"   },
  { id: 4, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "الطفل",   catEn: "Baby",   price: 36, oldPrice: 50, img: "/Frame 9.png"   },
  { id: 5, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "المكياج", catEn: "Makeup", price: 36, oldPrice: 50, img: "/Frame 11.png"  },
  { id: 6, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "الجسم",   catEn: "Body",   price: 36, oldPrice: 50, img: "/image 28.png"  },
];

function ProductCard({ product, isRTL }) {
  const [wished, setWished] = useState(false);
  return (
    <div className={styles["hprod__card"]}>
      <div className={styles["hprod__imgBox"]}>
        <Link to={`/products/${product.id}`} className={styles["hprod__imgLink"]} tabIndex={-1} aria-hidden="true">
          <img src={product.img} alt={isRTL ? product.nameAr : product.nameEn} className={styles["hprod__img"]} draggable="false" />
        </Link>
        <span className={styles["hprod__badge"]}>{isRTL ? product.catAr : product.catEn}</span>
        <button
          className={styles["hprod__wish"]}
          onClick={(e) => { e.preventDefault(); setWished(w => !w); }}
          aria-label={isRTL ? "أضف للمفضلة" : "Wishlist"}
        >
          <svg viewBox="0 0 24 24" fill={wished ? "#e53e3e" : "none"} stroke={wished ? "#e53e3e" : "#ccc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className={styles["hprod__body"]}>
        <p className={styles["hprod__name"]} style={{ color: "#8D6F5B" }}>
          <Link to={`/products/${product.id}`} className={styles["hprod__nameLink"]}>
            {isRTL ? product.nameAr : product.nameEn}
          </Link>
        </p>
        <div className={styles["hprod__viewRow"]}>
          <Link to={`/products/${product.id}`} className={styles["hprod__viewLink"]}>
            {isRTL ? "عرض المنتج" : "View product"}
          </Link>
        </div>
        <div className={styles["hprod__priceRow"]}>
          <span className={styles["hprod__priceLabel"]}>{isRTL ? "السعر :" : "Price:"}</span>
          <span className={styles["hprod__price"]}>{product.price} {isRTL ? "ريال" : "SAR"}</span>
          <span className={styles["hprod__priceOld"]}>{product.oldPrice} {isRTL ? "ريال" : "SAR"}</span>
        </div>
        <button className={styles["hprod__addBtn"]}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {isRTL ? "أضف الى السلة" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default function HomeProducts() {
  const { isRTL } = useLang();
  const [activeFilter, setActiveFilter] = useState(0);

  const categories = isRTL ? CATEGORIES_AR : CATEGORIES_EN;
  const filtered = activeFilter === 0
    ? PRODUCTS
    : PRODUCTS.filter(p => (isRTL ? p.catAr : p.catEn) === categories[activeFilter]);

  return (
    <section className={styles["hprod__section"]} dir={isRTL ? "rtl" : "ltr"}>

      <div className={styles["hprod__header"]}>
        <div className={styles["hprod__headingGroup"]}>
          <h2 className={styles["hprod__title"]}>{isRTL ? "جميع المنتجات" : "All Products"}</h2>
          <p className={styles["hprod__subtitle"]}>{isRTL ? "اكتشفي أحدث الإضافات لعالم الجمال" : "Discover the latest additions to the beauty world"}</p>
        </div>
      </div>

      <div className={styles["hprod__filters"]} role="group" aria-label={isRTL ? "تصفية المنتجات" : "Filter products"}>
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`${styles["hprod__filterBtn"]} ${activeFilter === i ? styles["hprod__filterBtnActive"] : ""}`}
            onClick={() => setActiveFilter(i)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* واحد grid بيتحول لـ scroll على الموبايل بـ CSS بس */}
      <div className={styles["hprod__grid"]}>
        {filtered.slice(0, 6).map(p => (
          <div key={p.id} className={styles["hprod__gridItem"]}>
            <ProductCard product={p} isRTL={isRTL} />
          </div>
        ))}
      </div>

      <div className={styles["hprod__moreWrap"]}>
        <Link to="/products" className={styles["hprod__moreBtn"]}>
          {isRTL ? "عرض جميع المنتجات" : "View All Products"}
          <span aria-hidden="true">{isRTL ? " ←" : " →"}</span>
        </Link>
      </div>

    </section>
  );
}
