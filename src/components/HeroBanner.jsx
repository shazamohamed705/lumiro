import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./HeroBanner.module.css";

const AUTO_PLAY_MS = 5000;

const SLIDE_IMAGES = [
  "/Desktop - 2.png",
  "/Desktop - 2.png",
  "/Desktop - 2.png",
  "/Desktop - 2.png",
  "/Desktop - 2.png",
];

const SLIDE_COUNT = SLIDE_IMAGES.length;

export default function HeroBanner({ showControls = true }) {
  const { t, isRTL } = useLang();
  const slides = t("hero.slides");
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setCurrent((index + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(current + 1), AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [current, paused, goTo]);

  return (
    <section
      className={styles.section}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "البنرات الرئيسية" : "Hero banners"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className={styles.slidesWrapper}>
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.slideVisible : styles.slideHidden}`}
            aria-hidden={i !== current}
          >
            {/* Background image */}
            <img
              src={SLIDE_IMAGES[i]}
              alt=""
              className={styles.bgImage}
              aria-hidden="true"
              draggable="false"
            />

            {/* Overlay */}
            <div className={styles.overlay} aria-hidden="true" />

            {/* Content */}
            <div className={styles.content}>

              {/* Title */}
              <h1 className={styles.title}>
                <span className={styles.titleLine1}>
                  {slides[i]?.titleStart}
                  <span className={styles.titleColored}>{slides[i]?.titleColored}</span>
                  {slides[i]?.titleEnd}
                </span>

                {slides[i]?.titleMiddle && (
                  <span className={styles.titleMiddle}>
                    {slides[i].titleMiddle}
                  </span>
                )}

                <span className={styles.titleBold}>
                  {slides[i]?.titleBold}
                  {slides[i]?.titleBoldColored && (
                    <span className={styles.titleColored}>{slides[i].titleBoldColored}</span>
                  )}
                </span>
              </h1>

              {/* Subtitle */}
              <p className={styles.subtitle}>{slides[i]?.subtitle}</p>

              {/* CTA */}
              <Link to="/products" className={styles.cta} dir="rtl">
                {t("hero.shopNow")}
                <span aria-hidden="true">{isRTL ? "←" : "→"}</span>
              </Link>

              {/* Social proof */}
              <div className={styles.socialProof}>
                <div className={styles.stars} aria-label="5 stars">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#c9a96e" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <div className={styles.proofText}>
                  <span className={styles.proofCount}>+15,000</span>
                  <span className={styles.proofLabel}>{t("hero.happyClients")}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Prev arrow */}
      {showControls && (
        <button
          className={`${styles.arrowBtn} ${styles.arrowPrev}`}
          onClick={prev}
          aria-label={isRTL ? "السابق" : "Previous"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {showControls && (
        <button
          className={`${styles.arrowBtn} ${styles.arrowNext}`}
          onClick={next}
          aria-label={isRTL ? "التالي" : "Next"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Dots */}
      {showControls && (
        <div
          className={styles.dots}
          role="tablist"
          aria-label={isRTL ? "اختر البنر" : "Select banner"}
        >
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`${isRTL ? "بنر" : "Banner"} ${i + 1}`}
              onClick={() => goTo(i)}
              className={`${styles.dot} ${i === current ? styles.dotActive : styles.dotInactive}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
