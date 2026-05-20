import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import styles from "./CartPage.module.css";

const FREE_SHIPPING_THRESHOLD = 200;

/* Fallback demo items when cart is empty */
const DEMO = [
  { key: "1-default", product: { id: 1, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", price: 36, img: "/image 28.png" }, qty: 1 },
  { key: "2-default", product: { id: 2, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", price: 36, img: "/image 27.png" }, qty: 1 },
];

export default function CartPage() {
  const { isRTL } = useLang();
  const { items: ctxItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [localItems, setLocalItems] = useState(
    ctxItems.length > 0 ? ctxItems : DEMO
  );
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQty = (key, delta) => {
    setLocalItems(prev =>
      prev.map(i => i.key === key
        ? { ...i, qty: Math.max(1, i.qty + delta) }
        : i
      )
    );
  };

  const removeItem = (key) => {
    setLocalItems(prev => prev.filter(i => i.key !== key));
    removeFromCart(key);
  };

  const subtotal = localItems.reduce((s, i) => s + (i.product.price * i.qty), 0);
  const total = subtotal - discount;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "LUMIRA10") setDiscount(subtotal * 0.1);
  };

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className={styles["cart__page"]}>
      <div className={styles["cart__container"]}>

        {/* Header */}
        <div className={styles["cart__header"]}>
          <h1 className={styles["cart__title"]}>{isRTL ? "سلة المشتريات" : "Shopping Cart"}</h1>
          {remaining > 0 ? (
            <p className={styles["cart__subtitle"]}>
              {isRTL
                ? `أضيفي منتجات بقيمة ${remaining} ريال أخرى للحصول على شحن مجاني!`
                : `Add ${remaining} SAR more to get free shipping!`}
            </p>
          ) : (
            <p className={styles["cart__subtitle"]}>
              {isRTL ? "🎉 تهانينا! حصلتِ على شحن مجاني" : "🎉 Congrats! You got free shipping"}
            </p>
          )}

        {/* Shipping progress */}
        <div className={styles["cart__progressWrap"]}>
          <div className={styles["cart__progressIcon"]}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <div className={styles["cart__progressBar"]}>
            <div className={styles["cart__progressFill"]} style={{ width: `${progress}%` }} />
          </div>
        </div>
        </div>

        {localItems.length === 0 ? (
          <div className={styles["cart__empty"]}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p>{isRTL ? "سلة المشتريات فارغة" : "Your cart is empty"}</p>
            <Link to="/products" className={styles["cart__emptyBtn"]}>
              {isRTL ? "تسوقي الآن" : "Shop Now"}
            </Link>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className={styles["cart__table"]}>
              <div className={styles["cart__tableHead"]}>
                <span className={`${styles["cart__th"]} ${styles["cart__thFirst"]}`}>{isRTL ? "المنتج" : "Product"}</span>
                <span className={styles["cart__th"]}>{isRTL ? "الكمية" : "Qty"}</span>
                <span className={styles["cart__th"]}>{isRTL ? "السعر" : "Price"}</span>
                <span className={styles["cart__th"]}>{isRTL ? "المجموع" : "Total"}</span>
                <span />
              </div>

              {localItems.map(item => (
                <div key={item.key} className={styles["cart__row"]}>
                  {/* Product */}
                  <div className={styles["cart__productCell"]}>
                    <img
                      src={item.product.img || "/image 28.png"}
                      alt={isRTL ? item.product.nameAr : item.product.nameEn}
                      className={styles["cart__productImg"]}
                      draggable="false"
                    />
                    <span className={styles["cart__productName"]}>
                      {isRTL ? item.product.nameAr : item.product.nameEn}
                    </span>
                  </div>

                  {/* Qty */}
                  <div className={styles["cart__qty"]}>
                    <button className={styles["cart__qtyBtn"]} onClick={() => updateQty(item.key, -1)}>−</button>
                    <span className={styles["cart__qtyNum"]}>{item.qty}</span>
                    <button className={styles["cart__qtyBtn"]} onClick={() => updateQty(item.key, +1)}>+</button>
                  </div>

                  {/* Price */}
                  <span className={styles["cart__cell"]}>
                    {isRTL ? `${item.product.price} ريال` : `${item.product.price} SAR`}
                  </span>

                  {/* Total */}
                  <span className={styles["cart__cell"]}>
                    {isRTL ? `${item.product.price * item.qty} ريال` : `${item.product.price * item.qty} SAR`}
                  </span>

                  {/* Delete */}
                  <button className={styles["cart__deleteBtn"]} onClick={() => removeItem(item.key)} aria-label="Remove">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom */}
            <div className={styles["cart__bottom"]}>

              {/* Coupon */}
              <div className={styles["cart__couponBox"]}>
                <p className={styles["cart__couponTitle"]}>{isRTL ? "هل لديك كوبون خصم ؟" : "Have a coupon?"}</p>
                <div className={styles["cart__couponRow"]}>
                  <button className={styles["cart__couponBtn"]} onClick={applyCoupon}>
                    {isRTL ? "تطبيق" : "Apply"}
                  </button>
                  <input
                    className={styles["cart__couponInput"]}
                    placeholder={isRTL ? "أدخل كود الخصم" : "Enter coupon code"}
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className={styles["cart__summary"]}>
                <p className={styles["cart__summaryTitle"]}>{isRTL ? "ملخص الطلب" : "Order Summary"}</p>

                <div className={styles["cart__summaryRow"]}>
                  <span className={styles["cart__summaryVal"]}>{isRTL ? `${subtotal} ريال` : `${subtotal} SAR`}</span>
                  <span className={styles["cart__summaryLabel"]}>{isRTL ? "المجموع الفرعي" : "Subtotal"}</span>
                </div>

                <div className={styles["cart__summaryRow"]}>
                  <span className={styles["cart__summaryVal"]}>{isRTL ? `${discount} ريال` : `${discount} SAR`}</span>
                  <span className={styles["cart__summaryLabel"]}>{isRTL ? "الخصم" : "Discount"}</span>
                </div>

                <hr className={styles["cart__summaryDivider"]} />

                <div className={styles["cart__summaryTotal"]}>
                  <span>{isRTL ? `${total} ريال` : `${total} SAR`}</span>
                  <span>{isRTL ? "المجموع الكلي" : "Total"}</span>
                </div>

                <button className={styles["cart__checkoutBtn"]} onClick={() => navigate("/checkout")}>
                  {isRTL ? "إتمام الدفع الآن" : "Proceed to Checkout"}
                </button>
              </div>

            </div>
          </>
        )}

      </div>
    </main>
  );
}
