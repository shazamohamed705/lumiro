import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useLang } from "../context/LanguageContext";
import styles from "./NewArrivals.module.css";

const PRODUCTS = [
  { id: 1, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالجسم", catEn: "Body Care", price: 36, oldPrice: 50, img: "/image 28.png"  },
  { id: 2, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالبشرة", catEn: "Skin Care", price: 36, oldPrice: 50, img: "/image 27.png"  },
  { id: 3, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالشعر", catEn: "Hair Care", price: 36, oldPrice: 50, img: "/Frame 7.png"   },
  { id: 4, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالطفل", catEn: "Baby Care", price: 36, oldPrice: 50, img: "/Frame 9.png"   },
  { id: 5, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "المكياج",        catEn: "Makeup",   price: 36, oldPrice: 50, img: "/Frame 11.png"  },
  { id: 6, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالجسم", catEn: "Body Care", price: 36, oldPrice: 50, img: "/image 28.png"  },
];

const AUTO_MS = 3500;

function NarvCard({ product, isRTL }) {
  const [wished, setWished] = useState(false);
  return (
    <div className={styles["narv__card"]}>
      <div className={styles["narv__imgBox"]}>
        <Link to={`/products/${product.id}`} className={styles["narv__imgLink"]} tabIndex={-1} aria-hidden="true">
          <img
            src={product.img}
            alt={isRTL ? product.nameAr : product.nameEn}
            className={styles["narv__img"]}
            draggable="false"
          />
        </Link>
        <span className={styles["narv__badge"]}>
          {isRTL ? product.catAr : product.catEn}
        </span>
        <button
          className={styles["narv__wish"]}
          onClick={(e) => { e.preventDefault(); setWished(w => !w); }}
          aria-label={isRTL ? "أضف للمفضلة" : "Wishlist"}
        >
          <svg viewBox="0 0 24 24" fill={wished ? "#e53e3e" : "none"} stroke={wished ? "#e53e3e" : "#ccc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className={styles["narv__body"]}>
        <p className={styles["narv__name"]}>
          <Link to={`/products/${product.id}`} className={styles["narv__nameLink"]}>
            {isRTL ? product.nameAr : product.nameEn}
          </Link>
        </p>
        <div className={styles["narv__viewRow"]}>
          <Link to={`/products/${product.id}`} className={styles["narv__viewLink"]}>
            {isRTL ? "عرض المنتج" : "View product"}
          </Link>
        </div>
        <div className={styles["narv__priceRow"]}>
          <span className={styles["narv__priceLabel"]}>{isRTL ? "السعر :" : "Price:"}</span>
          <span className={styles["narv__price"]}>{product.price} {isRTL ? "ريال" : "SAR"}</span>
          <span className={styles["narv__priceOld"]}>{product.oldPrice} {isRTL ? "ريال" : "SAR"}</span>
        </div>
        <button className={styles["narv__addBtn"]}>
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

export default function NewArrivals() {
  const { isRTL } = useLang();
  const paused = useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: isRTL ? "rtl" : "ltr",
    align: "start",
    slidesToScroll: 1,
  });

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
      className={styles["narv__section"]}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "الأحدث وصولاً" : "New Arrivals"}
    >
      {/* Header */}
      <div className={styles["narv__header"]}>
        <div className={styles["narv__headingGroup"]}>
          <h2 className={styles["narv__title"]}>{isRTL ? "الأحدث وصولاً" : "New Arrivals"}</h2>
          <p className={styles["narv__subtitle"]}>{isRTL ? "أحدث الإضافات" : "Latest additions"}</p>
        </div>
      </div>

      {/* Slider row */}
      <div className={styles["narv__sliderRow"]}>

        {/* Prev arrow */}
        <button
          className={styles["narv__arrow"]}
          onClick={scrollPrev}
          aria-label={isRTL ? "السابق" : "Previous"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Embla viewport */}
        <div className={styles["narv__viewport"]} ref={emblaRef}>
          <div className={styles["narv__container"]}>
            {PRODUCTS.map((product) => (
              <div key={product.id} className={styles["narv__slideItem"]}>
                <NarvCard product={product} isRTL={isRTL} />
              </div>
            ))}
          </div>
        </div>

        {/* Next arrow */}
        <button
          className={styles["narv__arrow"]}
          onClick={scrollNext}
          aria-label={isRTL ? "التالي" : "Next"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>
    </section>
  );
}
