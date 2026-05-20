import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useLang } from "../context/LanguageContext";
import styles from "./HomeOffers.module.css";

const PRODUCTS = [
  { id: 1, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", categoryAr: "العناية بالجسم", categoryEn: "Body Care", price: 36, oldPrice: 50, img: "/image 28.png",  path: "/products/1" },
  { id: 2, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", categoryAr: "العناية بالجسم", categoryEn: "Body Care", price: 36, oldPrice: 50, img: "/image 27.png",  path: "/products/2" },
  { id: 3, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", categoryAr: "العناية بالشعر",  categoryEn: "Hair Care",  price: 36, oldPrice: 50, img: "/Frame 7.png",   path: "/products/3" },
  { id: 4, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", categoryAr: "العناية بالطفل", categoryEn: "Baby Care",  price: 36, oldPrice: 50, img: "/Frame 9.png",   path: "/products/4" },
  { id: 5, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", categoryAr: "المكياج",         categoryEn: "Makeup",     price: 36, oldPrice: 50, img: "/Frame 9.png",  path: "/products/5" },
];

function ProductCard({ product, isRTL }) {
  const [wished, setWished] = useState(false);
  return (
    <div className={styles["offers__card"]}>
      <div className={styles["offers__imgBox"]}>
        <Link to={`/products/${product.id}`} className={styles["offers__imgLink"]} tabIndex={-1} aria-hidden="true">
          <img src={product.img} alt={isRTL ? product.nameAr : product.nameEn} className={styles["offers__img"]} draggable="false" />
        </Link>
        <span className={styles["offers__badge"]}>{isRTL ? product.categoryAr : product.categoryEn}</span>
        <button className={styles["offers__wish"]} onClick={(e) => { e.preventDefault(); setWished(w => !w); }} aria-label={isRTL ? "أضف للمفضلة" : "Add to wishlist"}>
          <svg viewBox="0 0 24 24" fill={wished ? "#e53e3e" : "none"} stroke={wished ? "#e53e3e" : "#ccc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className={styles["offers__body"]}>
        {/* اسم المنتج — يمين */}
        <p className={styles["offers__name"]} style={{ color: "#8D6F5B", fontWeight: 600 }}>
          <Link to={`/products/${product.id}`} className={styles["offers__nameLink"]}>
            {isRTL ? product.nameAr : product.nameEn}
          </Link>
        </p>

        {/* عرض المنتج — يسار */}
        <div className={styles["offers__viewRow"]}>
          <Link to={product.path} className={styles["offers__viewLink"]}>
            {isRTL ? "عرض المنتج" : "View product"}
          </Link>
        </div>

        {/* السعر — يمين */}
        <div className={styles["offers__priceRow"]}>
          <span className={styles["offers__priceLabel"]}>{isRTL ? "السعر :" : "Price:"}</span>
          <span className={styles["offers__price"]}>{isRTL ? `${product.price} ريال` : `${product.price} SAR`}</span>
          <span className={styles["offers__priceOld"]}>{isRTL ? `${product.oldPrice} ريال` : `${product.oldPrice} SAR`}</span>
        </div>

        {/* زرار — في النص */}
        <button className={styles["offers__addBtn"]}>
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

export default function HomeOffers() {
  const { isRTL } = useLang();
  const paused = useRef(false);
  const rafRef = useRef(null);
  const SPEED  = 0.6;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    direction: isRTL ? "rtl" : "ltr",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    paused.current = true;
    emblaApi?.scrollPrev();
    setTimeout(() => { paused.current = false; }, 5000);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    paused.current = true;
    emblaApi?.scrollNext();
    setTimeout(() => { paused.current = false; }, 5000);
  }, [emblaApi]);

  // ── Auto scroll ──
  useEffect(() => {
    if (!emblaApi) return;

    const step = () => {
      if (!paused.current && emblaApi) {
        emblaApi.scrollNext();
      }
    };

    // كل 3 ثواني ننتقل للكارت التالي
    const interval = setInterval(step, 3000);

    const pause  = () => { paused.current = true; };
    const resume = () => { paused.current = false; };

    const viewport = emblaApi.rootNode();
    viewport.addEventListener("mouseenter", pause);
    viewport.addEventListener("mouseleave", resume);
    viewport.addEventListener("touchstart",  pause,  { passive: true });
    viewport.addEventListener("touchend",    resume, { passive: true });

    return () => {
      clearInterval(interval);
      viewport.removeEventListener("mouseenter", pause);
      viewport.removeEventListener("mouseleave", resume);
      viewport.removeEventListener("touchstart",  pause);
      viewport.removeEventListener("touchend",    resume);
    };
  }, [emblaApi]);

  return (
    <section className={styles["offers__section"]} dir={isRTL ? "rtl" : "ltr"}>

      {/* Header */}
      <div className={styles["offers__header"]}>
        <div className={styles["offers__headingGroup"]}>
          <h2 className={styles["offers__title"]}>{isRTL ? "العروض" : "Offers"}</h2>
          <p className={styles["offers__subtitle"]}>{isRTL ? "خصومات مختارة تمنحك عناية أجمل بسعر أقل" : "Selected discounts for better care at a lower price"}</p>
        </div>
        <Link to="/offers" className={styles["offers__viewAll"]}>
          {isRTL ? "عرض جميع المنتجات ◄" : "◄ View all"}
        </Link>
      </div>

      {/* Carousel wrapper */}
      <div className={styles["offers__carouselWrap"]}>

        {/* Prev arrow */}
        <button className={`${styles["offers__arrow"]} ${styles["offers__arrowPrev"]}`} onClick={scrollPrev} aria-label={isRTL ? "السابق" : "Previous"}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Embla viewport */}
        <div className={styles["offers__embla"]} ref={emblaRef}>
          <div className={styles["offers__emblaContainer"]}>
            {PRODUCTS.map(p => (
              <div key={p.id} className={styles["offers__slide"]}>
                <ProductCard product={p} isRTL={isRTL} />
              </div>
            ))}
          </div>
        </div>

        {/* Next arrow */}
        <button className={`${styles["offers__arrow"]} ${styles["offers__arrowNext"]}`} onClick={scrollNext} aria-label={isRTL ? "التالي" : "Next"}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

      </div>
    </section>
  );
}
