import { useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import styles from "./ProductDetailsPage.module.css";
import Lightbox from "../components/Lightbox";
import CartToast from "../components/CartToast";
import ShareReview from "../components/ShareReview";

/* ── Mock data ── */
const PRODUCTS = [
  { id: 1, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالجسم", catEn: "Body Care", price: 36, oldPrice: 50, rating: 4.8, reviewCount: 124, inStock: true, imgs: ["/image 28.png", "/image 27.png", "/Frame 7.png", "/Frame 9.png", "/Frame 11.png"], descAr: "أبعدي الخلايا الميتة مع مقشر دوف الكريمي. يضم توازناً مثالياً بين التقشير اللطيف والترطيب العميق، حيث يعمل على إزالة خلايا الجلد الميتة ليكشف عن طبقة ناعمة ومشرقة من بشرتك.", descEn: "Gently exfoliate with Dove's creamy scrub. A perfect balance of gentle exfoliation and deep moisturization, removing dead skin cells to reveal a soft and radiant layer.", volumes: ["250ml","100ml","80ml","60ml","30ml"] },
  { id: 2, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالبشرة", catEn: "Skin Care", price: 36, oldPrice: 50, rating: 4.8, reviewCount: 124, inStock: true, imgs: ["/image 27.png", "/image 28.png", "/Frame 7.png", "/Frame 9.png", "/Frame 11.png"], descAr: "تركيبة غنية بمستخلصات الطبيعة تمنح بشرتك نضارة دائمة وترطيباً عميقاً يدوم طوال اليوم، مثالية للبشرة الجافة والحساسة.", descEn: "A rich formula with natural extracts that gives your skin lasting freshness and deep hydration throughout the day, ideal for dry and sensitive skin.", volumes: ["250ml","100ml","50ml"] },
  { id: 3, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالشعر", catEn: "Hair Care", price: 36, oldPrice: 50, rating: 4.8, reviewCount: 124, inStock: true, imgs: ["/Frame 7.png", "/image 28.png", "/image 27.png", "/Frame 9.png", "/Frame 11.png"], descAr: "صيغة متطورة تغذي فروة الرأس وتقوي الشعر من الجذور حتى الأطراف، تمنحه لمعاناً استثنائياً وتحميه من التكسر والجفاف.", descEn: "An advanced formula that nourishes the scalp and strengthens hair from roots to tips, giving it exceptional shine and protecting it from breakage and dryness.", volumes: ["200ml","100ml"] },
  { id: 4, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالجسم", catEn: "Body Care", price: 36, oldPrice: 50, rating: 4.8, reviewCount: 124, inStock: false, imgs: ["/Frame 9.png", "/image 27.png", "/image 28.png", "/Frame 7.png", "/Frame 11.png"], descAr: "زيت جسم فاخر مستخلص من أجود المكونات الطبيعية، يُرطب البشرة بعمق ويمنحها نعومة حريرية تدوم طوال اليوم مع عطر خفيف لا يُقاوم.", descEn: "A luxurious body oil extracted from the finest natural ingredients, deeply moisturizing the skin and giving it silky smoothness that lasts all day with an irresistible light fragrance.", volumes: ["300ml","150ml"] },
  { id: 5, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "المكياج", catEn: "Makeup", price: 36, oldPrice: 50, rating: 4.8, reviewCount: 124, inStock: true, imgs: ["/Frame 11.png", "/image 28.png", "/Frame 7.png", "/image 27.png", "/Frame 9.png"], descAr: "أضيفي لمسة إشراق لإطلالتك مع هذا المنتج الاستثنائي الذي يمزج بين العناية والجمال، بتغطية خفيفة تُبرز ملامحك الطبيعية وتدوم طوال اليوم.", descEn: "Add a radiant touch to your look with this exceptional product that blends care and beauty, with light coverage that enhances your natural features and lasts all day.", volumes: ["50ml","30ml"] },
  { id: 6, nameAr: "مقشر دوف بدقيق الشوفان وزيت الكاليندولا 298مل", nameEn: "Dove Oatmeal & Calendula Body Scrub 298ml", catAr: "العناية بالجسم", catEn: "Body Care", price: 36, oldPrice: 50, rating: 4.8, reviewCount: 124, inStock: true, imgs: ["/image 28.png", "/Frame 9.png", "/image 27.png", "/Frame 7.png", "/Frame 11.png"], descAr: "كريم مرطب فائق الجودة يمتص بسرعة دون أي دهنية، مُعزَّز بفيتامين E وزبدة الشيا لتغذية البشرة وحمايتها من الجفاف في كل الأوقات.", descEn: "A premium moisturizing cream that absorbs quickly without greasiness, enriched with Vitamin E and shea butter to nourish and protect skin from dryness at all times.", volumes: ["250ml","100ml"] },
];

const ALL_REVIEWS = [
  { id: 1, nameAr: "شمس", nameEn: "Shams", avatar: "/image 27.png", rating: 5, dateAr: "منذ شهر", dateEn: "1 month ago", textAr: "تجربة رائعة جداً،\nالتوصيل سريع والمنتجات مطابقة.\nبسعر خيالي وحطوا لي هدية مع الطلب،\nراح أكرر التجربة بإذن الله.", textEn: "Amazing experience,\nfast delivery and products match.\nGreat price with a gift included,\nwill definitely order again!", imgs: ["/image 28.png", "/image 27.png", "/Frame 7.png"] },
  { id: 2, nameAr: "شمس", nameEn: "Shams", avatar: "/image 27.png", rating: 5, dateAr: "منذ شهر", dateEn: "1 month ago", textAr: "تجربة رائعة جداً،\nالتوصيل سريع والمنتجات مطابقة.\nبسعر خيالي وحطوا لي هدية مع الطلب،\nراح أكرر التجربة بإذن الله.", textEn: "Amazing experience,\nfast delivery and products match.\nGreat price with a gift included,\nwill definitely order again!", imgs: ["/image 28.png", "/image 27.png", "/Frame 9.png"] },
  { id: 3, nameAr: "نور", nameEn: "Nour", avatar: "/image 27.png", rating: 4, dateAr: "منذ أسبوعين", dateEn: "2 weeks ago", textAr: "منتج ممتاز جداً،\nالرائحة خفيفة ومنعشة.\nالبشرة بقت أنعم بشكل واضح،\nسأطلبه مرة أخرى.", textEn: "Excellent product,\nlight and refreshing scent.\nSkin noticeably softer,\nwill order again.", imgs: ["/Frame 7.png", "/image 28.png", "/Frame 11.png"] },
  { id: 4, nameAr: "سارة", nameEn: "Sara", avatar: "/image 27.png", rating: 5, dateAr: "منذ 3 أيام", dateEn: "3 days ago", textAr: "أفضل مقشر جربته،\nيترك البشرة ناعمة جداً.\nالتغليف أنيق والتوصيل سريع،\nشكراً لومير!", textEn: "Best scrub I've tried,\nleaves skin very soft.\nElegant packaging and fast delivery,\nthank you Lumira!", imgs: ["/Frame 9.png", "/image 27.png", "/image 28.png"] },
];

const RATING_BARS = [
  { label: "1", pct: 75 },
  { label: "2", pct: 55 },
  { label: "3", pct: 35 },
  { label: "4", pct: 20 },
  { label: "5", pct: 10 },
];

/* ── Star renderer ── */
function Stars({ rating, size = 16 }) {
  return (
    <span className={styles["pdp__stars"]}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? "#f5a623" : "#e0e0e0"}
          stroke={i <= Math.round(rating) ? "#f5a623" : "#e0e0e0"}
          strokeWidth="1.5" aria-hidden="true"
          style={{ display: "block", flexShrink: 0 }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

/* ── Share icons ── */
const SHARE_ICONS = [
  { label: "Telegram", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.56-.46.7-.93.43l-2.58-1.9-1.24 1.2c-.14.14-.26.26-.52.26l.18-2.62 4.74-4.28c.2-.18-.05-.28-.32-.1L7.46 14.5l-2.52-.79c-.55-.17-.56-.55.12-.81l9.86-3.8c.46-.17.86.11.72.7z" },
  { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Messenger", path: "M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.46 5.56 3.75 7.28V22l3.42-1.88c.91.25 1.88.39 2.83.39 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.02 12.44l-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82z" },
  { label: "Snapchat", path: "M12.166 3c-2.838 0-5.166 2.328-5.166 5.166v.668c0 .356-.04.71-.12 1.056l-.36 1.56c-.06.26-.28.44-.54.44H5.5c-.28 0-.5.22-.5.5s.22.5.5.5h.48c-.34.56-.84 1.02-1.48 1.28-.28.12-.42.44-.3.72.12.28.44.42.72.3.96-.4 1.72-1.12 2.18-2.02.14-.28.44-.44.74-.36l.96.26c.28.08.58-.08.66-.36.08-.28-.08-.58-.36-.66l-.96-.26c-.14-.04-.26-.14-.3-.28l.36-1.56c.1-.44.16-.9.16-1.36v-.668C8 6.552 9.552 5 11.5 5h1c1.948 0 3.5 1.552 3.5 3.5v.668c0 .46.06.92.16 1.36l.36 1.56c-.04.14-.16.24-.3.28l-.96.26c-.28.08-.44.38-.36.66.08.28.38.44.66.36l.96-.26c.3-.08.6.08.74.36.46.9 1.22 1.62 2.18 2.02.28.12.6-.02.72-.3.12-.28-.02-.6-.3-.72-.64-.26-1.14-.72-1.48-1.28h.48c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-.48c-.26 0-.48-.18-.54-.44l-.36-1.56c-.08-.346-.12-.7-.12-1.056v-.668C17.166 5.328 15.004 3 12.166 3z" },
  { label: "WhatsApp", path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.306A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" },
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { isRTL } = useLang();
  const { addToCart } = useCart();

  const product = PRODUCTS.find(p => p.id === Number(id)) || PRODUCTS[0];

  const [activeImg, setActiveImg]       = useState(0);
  const [activeVol, setActiveVol]       = useState(product.volumes.length - 1);
  const [qty, setQty]                   = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [toastItem, setToastItem]       = useState(null);
  const [addingAnim, setAddingAnim]     = useState(false);

  const REVIEWS_PER_PAGE = 2;
  const displayedReviews = ALL_REVIEWS.slice(0, visibleReviews);
  const hasMore = visibleReviews < ALL_REVIEWS.length;

  const handleAddToCart = useCallback(() => {
    const volume = product.volumes[activeVol];
    addToCart(product, volume, qty);
    setAddingAnim(true);
    setTimeout(() => setAddingAnim(false), 600);
    setToastItem({ product, volume, qty });
  }, [product, activeVol, qty, addToCart]);

  const prevImg = () => setActiveImg(i => (i - 1 + product.imgs.length) % product.imgs.length);
  const nextImg = () => setActiveImg(i => (i + 1) % product.imgs.length);

  return (
    <main
      className={styles["pdp__page"]}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "تفاصيل المنتج" : "Product details"}
    >
      {/* Breadcrumb */}
      <nav className={styles["pdp__breadcrumb"]} aria-label={isRTL ? "مسار التنقل" : "Breadcrumb"}>
        <Link to="/" className={styles["pdp__breadLink"]}>{isRTL ? "الرئيسية" : "Home"}</Link>
        <span className={styles["pdp__breadSep"]} aria-hidden="true">/</span>
        <Link to="/products" className={styles["pdp__breadLink"]}>{isRTL ? "المنتجات" : "Products"}</Link>
        <span className={styles["pdp__breadSep"]} aria-hidden="true">/</span>
        <span className={styles["pdp__breadCurrent"]}>
          {isRTL ? product.nameAr : product.nameEn}
        </span>
      </nav>

      {/* Main grid */}
      <div className={styles["pdp__main"]}>

        {/* ── Gallery ── */}
        <div className={styles["pdp__gallery"]}>
          <div className={styles["pdp__galleryRow"]}>
            {/* Prev arrow — outside image */}
            <button
              className={`${styles["pdp__galleryArrow"]} ${styles["pdp__galleryArrowPrev"]}`}
              onClick={prevImg}
              aria-label={isRTL ? "السابق" : "Previous"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className={styles["pdp__mainImgWrap"]}>
              <button
                className={styles["pdp__mainImgBtn"]}
                onClick={() => setLightboxOpen(true)}
                aria-label={isRTL ? "فتح معرض الصور" : "Open image gallery"}
              >
                <img
                  src={product.imgs[activeImg]}
                  alt={isRTL ? product.nameAr : product.nameEn}
                  className={styles["pdp__mainImg"]}
                  draggable="false"
                />
                <span className={styles["pdp__zoomHint"]} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </span>
              </button>
            </div>

            {/* Next arrow — outside image */}
            <button
              className={`${styles["pdp__galleryArrow"]} ${styles["pdp__galleryArrowNext"]}`}
              onClick={nextImg}
              aria-label={isRTL ? "التالي" : "Next"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className={styles["pdp__thumbs"]}>
            {product.imgs.slice(0, 4).map((src, i) => (
              <button
                key={i}
                className={`${styles["pdp__thumb"]} ${i === activeImg ? styles["pdp__thumbActive"] : ""}`}
                onClick={() => setActiveImg(i)}
                aria-label={`${isRTL ? "صورة" : "Image"} ${i + 1}`}
              >
                <img src={src} alt="" draggable="false" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Info panel ── */}
        <div className={styles["pdp__info"]}>

          <p className={styles["pdp__category"]}>
            {isRTL ? product.catAr : product.catEn}
          </p>

          <h1 className={styles["pdp__name"]}>
            {isRTL ? product.nameAr : product.nameEn}
          </h1>

          <div className={styles["pdp__nameStatusRow"]}>
            <span className={`${styles["pdp__statusBadge"]} ${product.inStock ? styles["pdp__statusIn"] : styles["pdp__statusOut"]}`}>
              {product.inStock
                ? (isRTL ? "متوفر" : "In Stock")
                : (isRTL ? "غير متوفر" : "Out of Stock")}
            </span>
          </div>

          <div className={styles["pdp__ratingRow"]}>
            <Stars rating={product.rating} />
            <span className={styles["pdp__ratingVal"]}>{product.rating}</span>
            <span className={styles["pdp__ratingCount"]}>({product.reviewCount})</span>
          </div>

          <div className={styles["pdp__priceRow"]}>
            <span className={styles["pdp__priceLabel"]}>{isRTL ? "السعر :" : "Price:"}</span>
            <span className={styles["pdp__price"]}>{product.price} {isRTL ? "ريال" : "SAR"}</span>
            <span className={styles["pdp__priceOld"]}>{product.oldPrice} {isRTL ? "ريال" : "SAR"}</span>
          </div>

          <hr className={styles["pdp__divider"]} />

          <div>
            <p className={styles["pdp__descTitle"]}>{isRTL ? "وصف المنتج:" : "Description:"}</p>
            <p className={styles["pdp__desc"]}>{isRTL ? product.descAr : product.descEn}</p>
          </div>

          <hr className={styles["pdp__divider"]} />

          <div>
            <p className={styles["pdp__optTitle"]}>{isRTL ? "الحجم :" : "Volume:"}</p>
            <div className={styles["pdp__optList"]}>
              {product.volumes.map((v, i) => (
                <button
                  key={v}
                  className={`${styles["pdp__optBtn"]} ${i === activeVol ? styles["pdp__optBtnActive"] : ""}`}
                  onClick={() => setActiveVol(i)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className={styles["pdp__ctaRow"]}>
            <div className={styles["pdp__qty"]}>
              <button className={styles["pdp__qtyBtn"]} onClick={() => setQty(q => Math.max(1, q - 1))} aria-label={isRTL ? "تقليل" : "Decrease"}>−</button>
              <span className={styles["pdp__qtyVal"]}>{qty}</span>
              <button className={styles["pdp__qtyBtn"]} onClick={() => setQty(q => q + 1)} aria-label={isRTL ? "زيادة" : "Increase"}>+</button>
            </div>
            <button
              className={`${styles["pdp__addBtn"]} ${addingAnim ? styles["pdp__addBtnAnim"] : ""}`}
              onClick={handleAddToCart}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {isRTL ? "أضف الى السلة" : "Add to Cart"}
            </button>
            <button className={styles["pdp__buyBtn"]}>
              {isRTL ? "اشتري الآن" : "Buy Now"}
            </button>
          </div>

          <div className={styles["pdp__shareRow"]}>
            <span className={styles["pdp__shareLabel"]}>{isRTL ? "مشاركة المنتج" : "Share:"}</span>
            {SHARE_ICONS.map(icon => (
              <a key={icon.label} href="#" className={styles["pdp__shareBtn"]} aria-label={icon.label}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={icon.path} />
                </svg>
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ══ Reviews ══ */}
      <section className={styles["pdp__reviews"]} aria-label={isRTL ? "التقييمات" : "Reviews"}>
        <h2 className={styles["pdp__reviewsTitle"]}>{isRTL ? "التقييمات" : "Reviews"}</h2>

        {/* Rating summary */}
        <div className={styles["pdp__ratingSummary"]}>
          <div className={styles["pdp__ratingBig"]}>
            <span className={styles["pdp__ratingBigNum"]}>{product.rating}</span>
            <div className={styles["pdp__ratingBigStars"]}><Stars rating={product.rating} size={18} /></div>
            <span className={styles["pdp__ratingBigCount"]}>{product.reviewCount} {isRTL ? "تقييم" : "reviews"}</span>
          </div>
          <div className={styles["pdp__ratingBars"]}>
            {RATING_BARS.map(bar => (
              <div key={bar.label} className={styles["pdp__barRow"]}>
                <span className={styles["pdp__barLabel"]}>{bar.label}</span>
                <div className={styles["pdp__barTrack"]}>
                  <div className={styles["pdp__barFill"]} style={{ width: `${bar.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className={styles["pdp__reviewsToolbar"]}>
          <p className={styles["pdp__reviewsSubtitle"]}>
            {isRTL ? `تعرض 1-4 من ${product.reviewCount} تقييم` : `Showing 1-4 of ${product.reviewCount} reviews`}
          </p>
          <div className={styles["pdp__sortWrap"]}>
            <span className={styles["pdp__sortLabel"]}>{isRTL ? "ترتيب حسب :" : "Sort by:"}</span>
            <select className={styles["pdp__sortSelect"]}>
              <option>{isRTL ? "الأحدث" : "Newest"}</option>
              <option>{isRTL ? "الأعلى تقييماً" : "Highest rated"}</option>
            </select>
          </div>
        </div>

        {/* Review cards */}
        {displayedReviews.map(review => (
          <article key={review.id} className={styles["pdp__reviewCard"]}>
            {/* Right side: avatar + name + stars + text */}
            <div className={styles["pdp__reviewRight"]}>
              <div className={styles["pdp__reviewTop"]}>
                <div className={styles["pdp__reviewerInfo"]}>
                  <img src={review.avatar} alt={isRTL ? review.nameAr : review.nameEn} className={styles["pdp__reviewerAvatar"]} />
                  <div>
                    <span className={styles["pdp__reviewerName"]}>{isRTL ? review.nameAr : review.nameEn}</span>
                    <div className={styles["pdp__reviewStars"]}><Stars rating={review.rating} size={14} /></div>
                  </div>
                </div>
                <span className={styles["pdp__reviewDate"]}>{isRTL ? review.dateAr : review.dateEn}</span>
              </div>
              <p className={styles["pdp__reviewText"]}>
                {isRTL ? `" ${review.textAr} "` : `" ${review.textEn} "`}
              </p>
            </div>
            {/* Left side: images */}
            {review.imgs && (
              <div className={styles["pdp__reviewImgs"]}>
                {review.imgs.map((src, i) => (
                  <img key={i} src={src} alt="" className={styles["pdp__reviewImg"]} draggable="false" />
                ))}
              </div>
            )}
          </article>
        ))}

        {/* Load more */}
        {hasMore && (
          <div className={styles["pdp__loadMoreWrap"]}>
            <button
              className={styles["pdp__loadMoreBtn"]}
              onClick={() => setVisibleReviews(v => v + REVIEWS_PER_PAGE)}
            >
              {isRTL ? "عرض المزيد" : "Show More"}
            </button>
          </div>
        )}
      </section>

      {lightboxOpen && (
        <Lightbox
          imgs={product.imgs}
          active={activeImg}
          onClose={() => setLightboxOpen(false)}
          onChange={setActiveImg}
          isRTL={isRTL}
        />
      )}

      {toastItem && (
        <CartToast
          item={toastItem}
          isRTL={isRTL}
          onClose={() => setToastItem(null)}
        />
      )}

      {/* Share Review Section */}
      <ShareReview productId={product.id} isRTL={isRTL} />
    </main>
  );
}
