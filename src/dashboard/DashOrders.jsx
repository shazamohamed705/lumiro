import { useLang } from "../context/LanguageContext";
import styles from "./DashOrders.module.css";

const ORDERS = [
  {
    id: "24589",
    status: "delivered",
    statusAr: "مكتمل الان",
    statusEn: "Completed",
    products: [
      {
        nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل",
        nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml",
        price: 36, shipping: 10, total: 46,
      },
    ],
    paymentAr: "عند الاستلام",
    paymentEn: "Cash on Delivery",
    addressAr: "الرياض المملكة العربية السعودية",
    addressEn: "Riyadh, Saudi Arabia",
  },
  {
    id: "24321",
    status: "pending",
    statusAr: "قيد التنفيذ",
    statusEn: "Pending",
    products: [
      {
        nameAr: "كريم العناية بالبشرة 150مل",
        nameEn: "Skin Care Cream 150ml",
        price: 55, shipping: 10, total: 65,
      },
    ],
    paymentAr: "بطاقة ائتمانية",
    paymentEn: "Credit Card",
    addressAr: "جدة المملكة العربية السعودية",
    addressEn: "Jeddah, Saudi Arabia",
  },
];

export default function DashOrders() {
  const { isRTL } = useLang();

  if (ORDERS.length === 0) {
    return (
      <div className={styles["dord__empty"]}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {isRTL ? "لا توجد طلبات بعد" : "No orders yet"}
      </div>
    );
  }

  return (
    <div className={styles["dord__wrap"]} dir={isRTL ? "rtl" : "ltr"}>

      {/* Page title */}
      <p className={styles["dord__pageTitle"]}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {isRTL ? "طلباتي" : "My Orders"}
      </p>

      {/* Order cards */}
      {ORDERS.map(order => (
        <div key={order.id} className={styles["dord__card"]}>

          {/* Header */}
          <div className={styles["dord__cardHeader"]}>
            <p className={styles["dord__cardHeaderTitle"]}>
              {isRTL
                ? `الطلب #${order.id} ${order.statusAr}`
                : `Order #${order.id} — ${order.statusEn}`}
            </p>
          </div>

          {/* Body */}
          <div className={styles["dord__cardBody"]}>

            {/* Details title */}
            <p className={styles["dord__detailsTitle"]}>
              {isRTL ? "تفاصيل الطلب" : "Order Details"}
              <span className={styles["dord__detailsId"]}>#{order.id}</span>
            </p>

            {/* Table head */}
            <div className={styles["dord__tableHead"]}>
              <span className={`${styles["dord__colLabel"]} ${styles["dord__colLabelFirst"]}`}>
                {isRTL ? "المنتج" : "Product"}
              </span>
              <span className={styles["dord__colLabel"]}>{isRTL ? "السعر" : "Price"}</span>
              <span className={styles["dord__colLabel"]}>{isRTL ? "الشحن" : "Shipping"}</span>
              <span className={styles["dord__colLabel"]}>{isRTL ? "المجموع" : "Total"}</span>
            </div>

            {/* Products */}
            {order.products.map((p, i) => (
              <div key={i} className={styles["dord__tableRow"]}>
                <span className={styles["dord__colValFirst"]}>
                  {isRTL ? p.nameAr : p.nameEn}
                </span>
                <span className={styles["dord__colVal"]}>
                  {isRTL ? `${p.price} ريال` : `${p.price} SAR`}
                </span>
                <span className={styles["dord__colVal"]}>
                  {isRTL ? `${p.shipping} ريال` : `${p.shipping} SAR`}
                </span>
                <span className={styles["dord__colVal"]}>
                  {isRTL ? `${p.total} ريال` : `${p.total} SAR`}
                </span>
              </div>
            ))}

            {/* Footer info */}
            <div className={styles["dord__footerRow"]}>
              <div className={styles["dord__footerItem"]}>
                <span className={styles["dord__footerLabel"]}>
                  {isRTL ? "طريقة الدفع" : "Payment"}
                </span>
                <span className={styles["dord__footerVal"]}>
                  {isRTL ? order.paymentAr : order.paymentEn}
                </span>
              </div>
              <div className={styles["dord__footerItem"]}>
                <span className={styles["dord__footerLabel"]}>
                  {isRTL ? "عنوان الشحن" : "Shipping Address"}
                </span>
                <span className={styles["dord__footerVal"]}>
                  {isRTL ? order.addressAr : order.addressEn}
                </span>
              </div>
            </div>

            {/* Reorder button */}
            <button className={styles["dord__reorderBtn"]}>
              {isRTL ? "الطلب مجدداً" : "Reorder"}
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}
