import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import HeroBanner from "../components/HeroBanner";
import styles from "./CategoryProductsPage.module.css";
import hprod from "../components/HomeProducts.module.css";

/* ── Mock products (24 items) ── */
const ALL_PRODUCTS = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل-",
  nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml",
  catAr: ["العناية بالجسم", "العناية بالبشرة", "العناية بالشعر", "العناية بالطفل", "المكياج", "العطور"][i % 6],
  catEn: ["Body Care", "Skin Care", "Hair Care", "Baby Care", "Makeup", "Perfumes"][i % 6],
  price: 36,
  oldPrice: 50,
  img: ["/image 28.png", "/image 27.png", "/Frame 7.png", "/Frame 9.png", "/Frame 11.png"][i % 5],
}));

const CATEGORY_META = {
  skin:    { nameAr: "العناية بالبشرة",  nameEn: "Skin Care",  subtitleAr: "اكتشفي أحدث الإضافات لعالم الجمال", subtitleEn: "Discover the latest beauty additions" },
  body:    { nameAr: "العناية بالجسم",   nameEn: "Body Care",  subtitleAr: "اكتشفي أحدث الإضافات لعالم الجمال", subtitleEn: "Discover the latest beauty additions" },
  hair:    { nameAr: "العناية بالشعر",   nameEn: "Hair Care",  subtitleAr: "اكتشفي أحدث الإضافات لعالم الجمال", subtitleEn: "Discover the latest beauty additions" },
  baby:    { nameAr: "العناية بالطفل",   nameEn: "Baby Care",  subtitleAr: "اكتشفي أحدث الإضافات لعالم الجمال", subtitleEn: "Discover the latest beauty additions" },
  makeup:  { nameAr: "المكياج",           nameEn: "Makeup",     subtitleAr: "اكتشفي أحدث الإضافات لعالم الجمال", subtitleEn: "Discover the latest beauty additions" },
  perfume: { nameAr: "العطور",            nameEn: "Perfumes",   subtitleAr: "اكتشفي أحدث الإضافات لعالم الجمال", subtitleEn: "Discover the latest beauty additions" },
};

const PAGE_SIZE = 9;

/* ── Wishlist heart card — same as HomeProducts ── */
function ProductCard({ product, isRTL }) {
  const [wished, setWished] = useState(false);
  return (
    <div className={hprod["hprod__card"]}>
      <div className={hprod["hprod__imgBox"]}>
        <Link to={`/products/${product.id}`} className={hprod["hprod__imgLink"]} tabIndex={-1} aria-hidden="true">
          <img src={product.img} alt={isRTL ? product.nameAr : product.nameEn} className={hprod["hprod__img"]} draggable="false" />
        </Link>
        <span className={hprod["hprod__badge"]}>{isRTL ? product.catAr : product.catEn}</span>
        <button
          className={hprod["hprod__wish"]}
          onClick={(e) => { e.preventDefault(); setWished(w => !w); }}
          aria-label={isRTL ? "أضف للمفضلة" : "Wishlist"}
        >
          <svg viewBox="0 0 24 24" fill={wished ? "#e53e3e" : "none"} stroke={wished ? "#e53e3e" : "#ccc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className={hprod["hprod__body"]}>
        <p className={hprod["hprod__name"]}>
          <Link to={`/products/${product.id}`} className={hprod["hprod__nameLink"]}>
            {isRTL ? product.nameAr : product.nameEn}
          </Link>
        </p>
        <div className={hprod["hprod__viewRow"]}>
          <Link to={`/products/${product.id}`} className={hprod["hprod__viewLink"]}>
            {isRTL ? "عرض المنتج" : "View product"}
          </Link>
        </div>
        <div className={hprod["hprod__priceRow"]}>
          <span className={hprod["hprod__priceLabel"]}>{isRTL ? "السعر :" : "Price:"}</span>
          <span className={hprod["hprod__price"]}>{product.price} {isRTL ? "ريال" : "SAR"}</span>
          <span className={hprod["hprod__priceOld"]}>{product.oldPrice} {isRTL ? "ريال" : "SAR"}</span>
        </div>
        <button className={hprod["hprod__addBtn"]}>
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

export default function CategoryProductsPage() {
  const { category } = useParams();
  const { isRTL } = useLang();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [sort, setSort] = useState("newest");

  const meta = CATEGORY_META[category] || CATEGORY_META["skin"];
  const title    = isRTL ? meta.nameAr    : meta.nameEn;
  const subtitle = isRTL ? meta.subtitleAr : meta.subtitleEn;

  const sorted = [...ALL_PRODUCTS].sort((a, b) =>
    sort === "price-asc"  ? a.price - b.price :
    sort === "price-desc" ? b.price - a.price : 0
  );

  const shown   = sorted.slice(0, visible);
  const hasMore = visible < ALL_PRODUCTS.length;

  return (
    <main dir={isRTL ? "rtl" : "ltr"}>
      <div style={{ pointerEvents: "none" }}>
        <HeroBanner showControls={false} />
      </div>

      <div className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headingGroup}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.sortWrap}>
          <span className={styles.sortLabel}>{isRTL ? "ترتيب حسب :" : "Sort by:"}</span>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={e => setSort(e.target.value)}
            aria-label={isRTL ? "ترتيب" : "Sort"}
          >
            <option value="newest">{isRTL ? "الأحدث" : "Newest"}</option>
            <option value="price-asc">{isRTL ? "السعر: الأقل" : "Price: Low"}</option>
            <option value="price-desc">{isRTL ? "السعر: الأعلى" : "Price: High"}</option>
          </select>
        </div>
      </div>

      {/* ── Count ── */}
      <p className={styles.count}>
        {isRTL
          ? `تعرض ${shown.length}-1 من ${ALL_PRODUCTS.length} منتج`
          : `Showing 1-${shown.length} of ${ALL_PRODUCTS.length} products`}
      </p>

      {/* ── Grid ── */}
      <div className={styles.grid}>
        {shown.map(p => (
          <ProductCard key={p.id} product={p} isRTL={isRTL} />
        ))}
      </div>

      {/* ── Show More ── */}
      {hasMore && (
        <div className={styles.moreWrap}>
          <button
            className={styles.moreBtn}
            onClick={() => setVisible(v => v + PAGE_SIZE)}
          >
            {isRTL ? "عرض المزيد" : "Show More"}
          </button>
        </div>
      )}

      </div>
    </main>
  );
}
