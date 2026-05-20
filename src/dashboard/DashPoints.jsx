import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./DashPoints.module.css";

export default function DashPoints() {
  const { isRTL } = useLang();
  const navigate = useNavigate();
  const balance = 0.00;

  return (
    <div className={styles["dpts__wrap"]} dir={isRTL ? "rtl" : "ltr"}>

      {/* Page title */}
      <p className={styles["dpts__pageTitle"]}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        {isRTL ? "نقاط الشراء" : "Purchase Points"}
      </p>

      {/* Balance card */}
      <div className={styles["dpts__card"]}>
        <p className={styles["dpts__desc"]}>
          {isRTL
            ? "يمكنك استخدام نقاط الشراء لشراء منتجاتك المفضلة."
            : "You can use your purchase points to buy your favorite products."}
        </p>
        <p className={styles["dpts__balanceLabel"]}>
          {isRTL ? "رصيدك الحالي في المتجر هو" : "Your current store balance is"}
        </p>
        <p className={styles["dpts__balanceValue"]}>
          {balance.toFixed(2)}
        </p>
      </div>

      {/* CTA */}
      <div className={styles["dpts__ctaWrap"]}>
        <button
          className={styles["dpts__ctaBtn"]}
          onClick={() => navigate("/products")}
        >
          {isRTL ? "متابعة التسوق" : "Continue Shopping"}
        </button>
      </div>

    </div>
  );
}
