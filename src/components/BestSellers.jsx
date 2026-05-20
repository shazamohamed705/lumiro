import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useLang } from "../context/LanguageContext";
import styles from "./BestSellers.module.css";

const PRODUCTS = [
  { id: 1, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالجسم", catEn: "Body Care", price: 36, oldPrice: 50, img: "/image 28.png" },
  { id: 2, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالبشرة", catEn: "Skin Care", price: 36, oldPrice: 50, img: "/image 27.png" },
  { id: 3, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالشعر", catEn: "Hair Care", price: 36, oldPrice: 50, img: "/Frame 7.png" },
  { id: 4, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالجسم", catEn: "Body Care", price: 36, oldPrice: 50, img: "/Frame 9.png" },
  { id: 5, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "المكياج",        catEn: "Makeup",    price: 36, oldPrice: 50, img: "/Frame 11.png" },
  { id: 6, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالبشرة", catEn: "Skin Care", price: 36, oldPrice: 50, img: "/image 28.png" },
];

const AUTO_MS = 4000;

function BestSellerCard({ product, isRTL }) {
  const [wished, setWished] = useState(false);
  return (
    <div className={styles["bsell__card"]}>
      <div className={styles["bsell__imgBox"]}>
        <Link to={`/products/${product.id}`} className={styles["bsell__imgLink"]} tabIndex={-1} aria-hidden="true">
          <img
            src={product.img}
            alt={isRTL ? product.nameAr : product.nameEn}
            className={styles["bsell__img"]}
            draggable="false"
          />
        </Link>
        <span className={styles["bsell__badge"]}>
          {isRTL ? product.catAr : product.catEn}
        </span>
        <button
          className={styles["bsell__wish"]}
          onClick={(e) => { e.preventDefault(); setWished(w => !w); }}
          aria-label={isRTL ? "أضف للمفضلة" : "Wishlist"}
        >
          <svg viewBox="0 0 24 24" fill={wished ? "#e53e3e" : "none"} stroke={wished ? "#e53e3e" : "#ccc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className={styles["bsell__body"]}>
        <p className={styles["bsell__name"]}>
          <Link to={`/products/${product.id}`} className={styles["bsell__nameLink"]}>
            {isRTL ? product.nameAr : product.nameEn}
          </Link>
        </p>

        <div className={styles["bsell__viewRow"]}>
          <Link to={`/products/${product.id}`} className={styles["bsell__viewLink"]}>
            {isRTL ? "عرض المنتج" : "View product"}
          </Link>
        </div>

        <div className={styles["bsell__priceRow"]}>
          <span className={styles["bsell__priceLabel"]}>{isRTL ? "السعر :" : "Price:"}</span>
          <span className={styles["bsell__price"]}>{product.price} {isRTL ? "ريال" : "SAR"}</span>
          <span className={styles["bsell__priceOld"]}>{product.oldPrice} {isRTL ? "ريال" : "SAR"}</span>
        </div>

        <button className={styles["bsell__addBtn"]}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {isRTL ? "أضف الى السلة" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default function BestSellers() {
  const { isRTL } = useLang();
  const paused = useRef(false);
  const [current, setCurrent] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: isRTL ? "rtl" : "ltr",
    slidesToScroll: 1,
    align: "start",
  });

  // sync dots
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (!paused.current) emblaApi.scrollNext();
    }, AUTO_MS);
    const vp = emblaApi.rootNode();
    const pause  = () => { paused.current = true; };
    const resume = () => { paused.current = false; };
    vp.addEventListener("mouseenter", pause);
    vp.addEventListener("mouseleave", resume);
    vp.addEventListener("touchstart",  pause,  { passive: true });
    vp.addEventListener("touchend",    resume, { passive: true });
    return () => {
      clearInterval(interval);
      vp.removeEventListener("mouseenter", pause);
      vp.removeEventListener("mouseleave", resume);
      vp.removeEventListener("touchstart",  pause);
      vp.removeEventListener("touchend",    resume);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    paused.current = true;
    emblaApi?.scrollPrev();
    setTimeout(() => { paused.current = false; }, 6000);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    paused.current = true;
    emblaApi?.scrollNext();
    setTimeout(() => { paused.current = false; }, 6000);
  }, [emblaApi]);

  return (
    <section
      className={styles["bsell__section"]}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "الأكثر مبيعاً" : "Best Sellers"}
    >
      {/* Header */}
      <div className={styles["bsell__header"]}>
        <div className={styles["bsell__headingGroup"]}>
          <h2 className={styles["bsell__title"]}>{isRTL ? "الأكثر مبيعاً" : "Best Sellers"}</h2>
          <p className={styles["bsell__subtitle"]}>{isRTL ? "مختارات نالت الإعجاب" : "Top-rated picks"}</p>
        </div>
      </div>

      {/* Slider row */}
      <div className={styles["bsell__sliderRow"]}>

        {/* Prev arrow */}
        <button
          className={styles["bsell__arrow"]}
          onClick={scrollPrev}
          aria-label={isRTL ? "السابق" : "Previous"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Embla viewport */}
        <div className={styles["bsell__viewport"]} ref={emblaRef}>
          <div className={styles["bsell__container"]}>
            {PRODUCTS.map((product) => (
              <div key={product.id} className={styles["bsell__slideItem"]}>
                <BestSellerCard product={product} isRTL={isRTL} />
              </div>
            ))}
          </div>
        </div>

        {/* Next arrow */}
        <button
          className={styles["bsell__arrow"]}
          onClick={scrollNext}
          aria-label={isRTL ? "التالي" : "Next"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>

      {/* Dots */}
      <div className={styles["bsell__dots"]} role="tablist">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`${isRTL ? "منتج" : "Product"} ${i + 1}`}
            className={`${styles["bsell__dot"]} ${i === current ? styles["bsell__dotActive"] : ""}`}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
