import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./Lightbox.module.css";

/**
 * Lightbox Gallery
 * Props:
 *   imgs      – string[]   list of image URLs
 *   active    – number     index of currently shown image
 *   onClose   – () => void
 *   onChange  – (index: number) => void
 *   isRTL     – boolean
 */
export default function Lightbox({ imgs, active, onClose, onChange, isRTL }) {
  const total = imgs.length;

  const prev = useCallback(() => onChange((active - 1 + total) % total), [active, total, onChange]);
  const next = useCallback(() => onChange((active + 1) % total), [active, total, onChange]);

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  isRTL ? next() : prev();
      if (e.key === "ArrowRight") isRTL ? prev() : next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next, isRTL]);

  /* lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return createPortal(
    <div
      className={styles["lgbx__overlay"]}
      role="dialog"
      aria-modal="true"
      aria-label={isRTL ? "معرض الصور" : "Image gallery"}
      onClick={onClose}
    >
      <div
        className={styles["lgbx__inner"]}
        dir={isRTL ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className={styles["lgbx__close"]}
          onClick={onClose}
          aria-label={isRTL ? "إغلاق" : "Close"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Main image + arrows */}
        <div className={styles["lgbx__mainWrap"]}>
          {/* Prev */}
          <button
            className={`${styles["lgbx__arrow"]} ${styles["lgbx__arrowPrev"]}`}
            onClick={prev}
            aria-label={isRTL ? "السابق" : "Previous"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <img
            key={active}
            src={imgs[active]}
            alt={`${isRTL ? "صورة" : "Image"} ${active + 1}`}
            className={styles["lgbx__mainImg"]}
            draggable="false"
          />

          {/* Next */}
          <button
            className={`${styles["lgbx__arrow"]} ${styles["lgbx__arrowNext"]}`}
            onClick={next}
            aria-label={isRTL ? "التالي" : "Next"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <span className={styles["lgbx__counter"]}>
          {active + 1} / {total}
        </span>

        {/* Thumbnails */}
        <div className={styles["lgbx__thumbs"]}>
          {imgs.map((src, i) => (
            <button
              key={i}
              className={`${styles["lgbx__thumb"]} ${i === active ? styles["lgbx__thumbActive"] : ""}`}
              onClick={() => onChange(i)}
              aria-label={`${isRTL ? "صورة" : "Image"} ${i + 1}`}
            >
              <img src={src} alt="" draggable="false" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
