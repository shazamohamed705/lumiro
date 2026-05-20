import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLang } from "../context/LanguageContext";
import styles from "./PromoBanner.module.css";

const SLIDES = [
  { id: 1, img: "/972f6cc87ea501b7be2e52e4ebefefd83b15c03c.png", alt: "بانر 1" },
  { id: 2, img: "/972f6cc87ea501b7be2e52e4ebefefd83b15c03c.png", alt: "بانر 2" },
  { id: 3, img: "/972f6cc87ea501b7be2e52e4ebefefd83b15c03c.png", alt: "بانر 3" },
  { id: 4, img: "/972f6cc87ea501b7be2e52e4ebefefd83b15c03c.png", alt: "بانر 4" },
  { id: 5, img: "/972f6cc87ea501b7be2e52e4ebefefd83b15c03c.png", alt: "بانر 5" },
];

const AUTO_MS = 4000;

export default function PromoBanner() {
  const { isRTL } = useLang();
  const paused   = useRef(false);
  const [current, setCurrent] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: isRTL ? "rtl" : "ltr",
    dragFree: false,
  });

  // ── sync dot indicator ──
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // ── auto scroll ──
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      if (!paused.current) emblaApi.scrollNext();
    }, AUTO_MS);

    const viewport = emblaApi.rootNode();
    const pause  = () => { paused.current = true; };
    const resume = () => { paused.current = false; };

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
      className={styles["promo__section"]}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "بانر ترويجي" : "Promotional banner"}
    >
      <div className={styles["promo__wrap"]}>

        {/* Prev arrow */}
        <button
          className={styles["promo__arrow"]}
          onClick={scrollPrev}
          aria-label={isRTL ? "السابق" : "Previous"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Embla viewport */}
        <div className={styles["promo__viewport"]} ref={emblaRef}>
          <div className={styles["promo__container"]}>
            {SLIDES.map((slide) => (
              <div key={slide.id} className={styles["promo__slide"]}>
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className={styles["promo__img"]}
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next arrow */}
        <button
          className={styles["promo__arrow"]}
          onClick={scrollNext}
          aria-label={isRTL ? "التالي" : "Next"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

      </div>

      {/* Dots */}
      <div className={styles["promo__dots"]} role="tablist">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`${isRTL ? "بانر" : "Banner"} ${i + 1}`}
            className={`${styles["promo__dot"]} ${i === current ? styles["promo__dotActive"] : ""}`}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
