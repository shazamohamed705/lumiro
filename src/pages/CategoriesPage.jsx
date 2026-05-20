import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./CategoriesPage.module.css";

/* ─────────────────────────────────────────
   Data — all main categories
───────────────────────────────────────── */
const CATEGORIES = [
  {
    key: "skin",
    nameAr: "1. العناية بالبشرة",
    nameEn: "1. Skin Care",
    descAr:
      "شريكتك هي مرآة صحتك. لذا خصصنا لكِ هذا القسم لنرافقكِ في رحلة العناية بالبشرة يومياً. نقدم لكِ هنا دليلاً شاملاً لأحدث صيحات العناية بالبشرة، أفضل المكونات الطبيعية والعلمية، وتوصيات مخصصة لكل نوع بشرة لتمنحي مظهراً طبيعياً ومشرقاً لا تنسى.",
    descEn:
      "Your skin is a mirror of your health. We created this section to accompany you on your daily skincare journey with the latest trends, best natural and scientific ingredients, and personalized recommendations for every skin type.",
    img: "/image 27.png",
    path: "/categories/skin",
  },
  {
    key: "body",
    nameAr: "2. العناية بالجسم",
    nameEn: "2. Body Care",
    descAr:
      "امنحي جسمكِ الاهتمام الذي يستحقه من خلال روتين عناية متكامل. ستجدين هنا أفضل زيوت وكريمات ومقشرات الجسم لتعطير الجسم تحول روتينكِ اليومي إلى سبا فاخرة في منزلكِ.",
    descEn:
      "Give your body the attention it deserves through a complete care routine. Find the best body oils, creams, and scrubs to transform your daily routine into a luxurious home spa.",
    img: "/image 28.png",
    path: "/categories/body",
  },
  {
    key: "hair",
    nameAr: "3. العناية بالشعر",
    nameEn: "3. Hair Care",
    descAr:
      "لأن الشعر الصحي يبدأ من الاهتمام بالتفاصيل، نجمع لكِ هنا كل ما تحتاجينه لأجل مشكلات الشعر واختيار المنتجات المناسبة من أسرار الكثافة والنعومة إلى طرق الحماية من التلف. تساعدكِ منتجاتنا لتجعلي من شعركِ علامة تجاريتكِ.",
    descEn:
      "Because healthy hair starts with attention to detail, we bring you everything you need to address hair problems and choose the right products — from secrets of thickness and softness to protection methods.",
    img: "/Frame 7.png",
    path: "/categories/hair",
  },
  {
    key: "baby",
    nameAr: "4. العناية بالطفل",
    nameEn: "4. Baby Care",
    descAr:
      "لأن طفلاتكِ تستحق رعاية فائقة الدقة، صممنا هذا القسم خصيصاً لتقدم لأمهات قائمة موثوقة من أفضل المنتجات المختارة بعناية للتعامل مع الرضع والأطفال الصغار باحتياجاتهم بحب وأمان.",
    descEn:
      "Because your little ones deserve the utmost care, we designed this section to provide mothers with a trusted list of the best products carefully selected for dealing with infants and young children with love and safety.",
    img: "/Frame 9.png",
    path: "/categories/baby",
  },
  {
    key: "makeup",
    nameAr: "5. المكياج",
    nameEn: "5. Makeup",
    descAr:
      "المكياج ليس لإخفاء الملامح، بل للاحتفال بجمالكِ الخاص. شاركتكِ في هذا القسم أحدث صيحات المكياج والتثبيت والتبييض وتوصيات لأفضل المنتجات التي تناسب كل الأوقات والمناسبات.",
    descEn:
      "Makeup is not to hide your features, but to celebrate your unique beauty. We share the latest makeup trends, setting and brightening tips, and recommendations for the best products for all occasions.",
    img: "/Frame 11.png",
    path: "/categories/makeup",
  },
  {
    key: "perfume",
    nameAr: "6. العطور",
    nameEn: "6. Perfumes",
    descAr:
      "العطر هو توقيعكِ الشخصي الذي يبقى في الذاكرة. اكتشفي مجموعتنا المختارة من أرقى العطور العالمية والعربية التي تناسب كل شخصية وكل مناسبة.",
    descEn:
      "Perfume is your personal signature that stays in memory. Discover our curated collection of the finest international and Arabic fragrances that suit every personality and occasion.",
    img: "/image 28.png",
    path: "/categories/perfume",
  },
];

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function CategoriesPage() {
  const { isRTL } = useLang();

  return (
    <main
      className={styles["cats__page"]}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "جميع الأقسام" : "All Categories"}
    >
      {/* ── Category list ── */}
      <div className={styles["cats__list"]}>
        {CATEGORIES.map((cat, index) => {
          const name = isRTL ? cat.nameAr : cat.nameEn;
          const desc = isRTL ? cat.descAr : cat.descEn;
          const isEven = index % 2 === 0;

          return (
            <article
              key={cat.key}
              className={`${styles["cats__item"]} ${isEven ? styles["cats__itemEven"] : styles["cats__itemOdd"]}`}
            >
              {/* Image */}
              <div className={styles["cats__imgWrapper"]}>
                <Link
                  to={cat.path}
                  className={styles["cats__imgLink"]}
                  aria-label={isRTL ? `فتح قسم ${name}` : `Open ${name} section`}
                  tabIndex={0}
                >
                  <img
                    src={cat.img}
                    alt={name}
                    className={styles["cats__img"]}
                    draggable="false"
                  />
                </Link>
              </div>

              {/* Text */}
              <div className={styles["cats__content"]}>
                <h2 className={styles["cats__catName"]}>{name}</h2>
                <p className={styles["cats__catDesc"]}>{desc}</p>
                <Link to={cat.path} className={styles["cats__cta"]}>
                  {isRTL ? "عرض المنتجات" : "View Products"}
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Show More ── */}
      <div className={styles["cats__footer"]}>
        <Link to="/products" className={styles["cats__showMore"]}>
          {isRTL ? "عرض المزيد" : "Show More"}
        </Link>
      </div>
    </main>
  );
}
