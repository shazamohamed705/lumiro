import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./DashWishlist.module.css";

const INITIAL = [
  { id: 1, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالجسم", catEn: "Body Care", price: 36, oldPrice: 50, img: "/image 28.png" },
  { id: 2, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالجسم", catEn: "Body Care", price: 36, oldPrice: 50, img: "/image 27.png" },
  { id: 3, nameAr: "كريم العناية بالبشرة 150مل",                      nameEn: "Skin Care Cream 150ml",                      catAr: "العناية بالبشرة", catEn: "Skin Care",  price: 55, oldPrice: 70, img: "/Frame 7.png" },
];

export default function DashWishlist() {
  const { isRTL } = useLang();
  const [items, setItems] = useState(INITIAL);

  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <div className={styles["dwsh__wrap"]} dir={isRTL ? "rtl" : "ltr"}>

      {/* Title */}
      <p className={styles["dwsh__pageTitle"]}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        {isRTL ? "المفضلة" : "Wishlist"}
      </p>

      {items.length === 0 ? (
        <div className={styles["dwsh__empty"]}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {isRTL ? "قائمة المفضلة فارغة" : "Your wishlist is empty"}
        </div>
      ) : (
        <div className={styles["dwsh__grid"]}>
          {items.map(item => (
            <div key={item.id} className={styles["dwsh__card"]}>

              {/* Image */}
              <div className={styles["dwsh__imgWrap"]}>
                <img src={item.img} alt={isRTL ? item.nameAr : item.nameEn} className={styles["dwsh__img"]} draggable="false" />

                {/* Badge */}
                <span className={styles["dwsh__badge"]}>
                  {isRTL ? item.catAr : item.catEn}
                </span>

                {/* Remove */}
                <button
                  className={styles["dwsh__removeBtn"]}
                  onClick={() => remove(item.id)}
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className={styles["dwsh__body"]}>
                <p className={styles["dwsh__name"]}>{isRTL ? item.nameAr : item.nameEn}</p>

                <button className={styles["dwsh__viewLink"]}>
                  {isRTL ? "عرض المنتج" : "View product"}
                </button>

                <div className={styles["dwsh__priceRow"]}>
                  <span className={styles["dwsh__priceLabel"]}>{isRTL ? "السعر :" : "Price:"}</span>
                  <span className={styles["dwsh__price"]}>{isRTL ? `${item.price} ريال` : `${item.price} SAR`}</span>
                  <span className={styles["dwsh__priceOld"]}>{isRTL ? `${item.oldPrice} ريال` : `${item.oldPrice} SAR`}</span>
                </div>

                <button className={styles["dwsh__addBtn"]}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  {isRTL ? "أضف الى السلة" : "Add to Cart"}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
