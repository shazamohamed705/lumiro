import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import HeroBanner from "../components/HeroBanner";
import styles from "./ProductsPage.module.css";
import hprod from "../components/HomeProducts.module.css";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const CATEGORIES_AR = ["الكل", "البشرة", "الجسم", "الشعر", "الطفل", "العطور", "الأسنان", "المكياج", "العدسات", "الأجهزة", "الباكدجات"];
const CATEGORIES_EN = ["All",  "Skin",   "Body",  "Hair",  "Baby",  "Perfumes","Dental",  "Makeup",  "Lenses",   "Devices",  "Packages"];

const ALL_PRODUCTS = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل-",
  nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml",
  catAr: ["الجسم", "البشرة", "الشعر", "الطفل", "المكياج", "العطور"][i % 6],
  catEn: ["Body",  "Skin",   "Hair",  "Baby",  "Makeup",  "Perfumes"][i % 6],
  price: 36,
  oldPrice: 50,
  img: ["/image 28.png", "/image 27.png", "/Frame 7.png", "/Frame 9.png", "/Frame 11.png"][i % 5],
}));

const RECENT_PRODUCTS = ALL_PRODUCTS.slice(0, 6);
const PAGE_SIZE = 9;

/* ─────────────────────────────────────────
   Product Card — reuses HomeProducts styles
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function ProductsPage() {
  const { isRTL } = useLang();
  const [activeFilter, setActiveFilter] = useState(0);
  const [sort, setSort]                 = useState("newest");
  const [visible, setVisible]           = useState(PAGE_SIZE);

  const categories = isRTL ? CATEGORIES_AR : CATEGORIES_EN;

  const filtered = activeFilter === 0
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => (isRTL ? p.catAr : p.catEn) === categories[activeFilter]);

  const sorted = [...filtered].sort((a, b) =>
    sort === "price-asc"  ? a.price - b.price :
    sort === "price-desc" ? b.price - a.price : 0
  );

  const shown   = sorted.slice(0, visible);
  const hasMore = visible < sorted.length;

  /* ── Auto-scroll + drag for recent track ── */
  const recentRef  = useRef(null);
  const rafRef     = useRef(null);
  const pausedRef  = useRef(false);
  const dragState  = useRef({ active: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const el = recentRef.current;
    if (!el) return;

    // start from middle for seamless loop feel
    el.scrollLeft = 0;

    const SPEED = 0.6;
    const step = () => {
      if (!pausedRef.current) {
        el.scrollLeft += SPEED;
        // reset when reached end
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    const pause  = () => { pausedRef.current = true; };
    const resume = () => { if (!dragState.current.active) pausedRef.current = false; };

    const onDown = (e) => {
      dragState.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
      pausedRef.current = true;
      el.style.cursor = "grabbing";
    };
    const onUp = () => {
      dragState.current.active = false;
      pausedRef.current = false;
      el.style.cursor = "grab";
    };
    const onMove = (e) => {
      if (!dragState.current.active) return;
      e.preventDefault();
      const x    = e.pageX - el.offsetLeft;
      const walk = (x - dragState.current.startX) * 1.2;
      el.scrollLeft = dragState.current.scrollLeft - walk;
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart",  pause,  { passive: true });
    el.addEventListener("touchend",    resume, { passive: true });
    el.addEventListener("mousedown",  onDown);
    el.addEventListener("mouseup",    onUp);
    el.addEventListener("mouseleave", onUp);
    el.addEventListener("mousemove",  onMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart",  pause);
      el.removeEventListener("touchend",    resume);
      el.removeEventListener("mousedown",  onDown);
      el.removeEventListener("mouseup",    onUp);
      el.removeEventListener("mouseleave", onUp);
      el.removeEventListener("mousemove",  onMove);
    };
  }, []);

  const scrollRecent = (dir) => {
    const el = recentRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <main dir={isRTL ? "rtl" : "ltr"}>

      {/* ── Hero Banner — pointer-events off so page overlay captures all touches ── */}
      <div className={styles.bannerWrap}>
        <HeroBanner showControls={false} />
      </div>

      <div className={styles.page}>

        {/* ── Filter bar ── */}
        <div
          className={hprod["hprod__filters"]}
          role="group"
          aria-label={isRTL ? "تصفية المنتجات" : "Filter products"}
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`${hprod["hprod__filterBtn"]} ${activeFilter === i ? hprod["hprod__filterBtnActive"] : ""}`}
              onClick={() => { setActiveFilter(i); setVisible(PAGE_SIZE); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Header row ── */}
        <div className={styles.header}>
          <div className={styles.headingGroup}>
            <h1 className={styles.title}>{isRTL ? "جميع المنتجات" : "All Products"}</h1>
            <p className={styles.subtitle}>{isRTL ? "اكتشفي أحدث الإضافات لعالم الجمال" : "Discover the latest additions to the beauty world"}</p>
          </div>
          <div className={styles.sortWrap}>
            <span className={styles.sortLabel}>{isRTL ? "ترتيب حسب :" : "Sort by:"}</span>
            <select
              className={styles.sortSelect}
              value={sort}
              onChange={e => { setSort(e.target.value); setVisible(PAGE_SIZE); }}
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
            ? `تعرض ${shown.length}-1 من ${sorted.length} منتج`
            : `Showing 1-${shown.length} of ${sorted.length} products`}
        </p>

        {/* ── Products Grid ── */}
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

        {/* ── Recently Viewed ── */}
        <section className={styles.recent} aria-label={isRTL ? "منتجات شاهدتها مؤخراً" : "Recently Viewed"}>
          <div className={styles.recentHeader}>
            <h2 className={styles.recentTitle}>{isRTL ? "منتجات شاهدتها مؤخراً" : "Recently Viewed"}</h2>
            <p className={styles.recentSub}>{isRTL ? "لا تزال في ذاكرتك" : "Still on your mind"}</p>
          </div>

          <div className={styles.recentSlider}>
            {/* Arrow prev */}
            <button
              className={`${styles.recentArrow} ${styles.recentArrowPrev}`}
              onClick={() => scrollRecent(isRTL ? 1 : -1)}
              aria-label={isRTL ? "التالي" : "Previous"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Scroll track */}
            <div className={styles.recentTrack} ref={recentRef} style={{ cursor: "grab" }}>
              {RECENT_PRODUCTS.map(p => (
                <div key={p.id} className={styles.recentItem}>
                  <ProductCard product={p} isRTL={isRTL} />
                </div>
              ))}
            </div>

            {/* Arrow next */}
            <button
              className={`${styles.recentArrow} ${styles.recentArrowNext}`}
              onClick={() => scrollRecent(isRTL ? -1 : 1)}
              aria-label={isRTL ? "السابق" : "Next"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}
