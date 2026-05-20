import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import styles from "./CartToast.module.css";

/**
 * CartToast
 * Props:
 *   item    – { product, volume, qty }
 *   isRTL   – boolean
 *   onClose – () => void
 */
export default function CartToast({ item, isRTL, onClose }) {
  const [closing, setClosing] = useState(false);

  /* auto-close after 4s */
  useEffect(() => {
    const t = setTimeout(() => handleClose(), 4000);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 240);
  };

  if (!item) return null;

  const { product, volume, qty } = item;
  const name = isRTL ? product.nameAr : product.nameEn;

  return createPortal(
    <>
      {/* invisible overlay to close on outside click */}
      <div className={styles["ctst__overlay"]} onClick={handleClose} />

      <div
        className={styles["ctst__toast"]}
        data-closing={closing}
        dir={isRTL ? "rtl" : "ltr"}
        role="status"
        aria-live="polite"
      >
        {/* Header */}
        <div className={styles["ctst__header"]}>
          <div className={styles["ctst__headerLeft"]}>
            <span className={styles["ctst__checkIcon"]} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className={styles["ctst__title"]}>
              {isRTL ? "تمت الإضافة للسلة" : "Added to Cart"}
            </span>
          </div>
          <button
            className={styles["ctst__closeBtn"]}
            onClick={handleClose}
            aria-label={isRTL ? "إغلاق" : "Close"}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Product */}
        <div className={styles["ctst__product"]}>
          <img
            src={product.imgs[0]}
            alt={name}
            className={styles["ctst__productImg"]}
            draggable="false"
          />
          <div className={styles["ctst__productInfo"]}>
            <span className={styles["ctst__productName"]}>{name}</span>
            <span className={styles["ctst__productMeta"]}>
              {volume} · {isRTL ? `الكمية: ${qty}` : `Qty: ${qty}`}
            </span>
            <span className={styles["ctst__productPrice"]}>
              {product.price} {isRTL ? "ريال" : "SAR"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className={styles["ctst__actions"]}>
          <Link to="/cart" className={styles["ctst__btnCart"]} onClick={handleClose}>
            {isRTL ? "عرض السلة" : "View Cart"}
          </Link>
          <button className={styles["ctst__btnContinue"]} onClick={handleClose}>
            {isRTL ? "متابعة التسوق" : "Continue"}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
