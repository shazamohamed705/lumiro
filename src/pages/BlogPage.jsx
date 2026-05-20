import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import HeroBanner from "../components/HeroBanner";
import styles from "./BlogPage.module.css";

/* ── Data ── */
const CATS_AR = ["الكل", "العناية بالبشرة", "العناية بالجسم", "العناية بالشعر", "العناية بالطفل", "العطور", "العناية بالأسنان", "المكياج", "نصائح جمالية"];
const CATS_EN = ["All",  "Skin Care",       "Body Care",       "Hair Care",       "Baby Care",       "Perfumes", "Dental Care",       "Makeup",  "Beauty Tips"];

const POSTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  catAr: ["المكياج","العناية بالبشرة","العناية بالشعر","العناية بالجسم","نصائح جمالية","العطور"][i % 6],
  catEn: ["Makeup","Skin Care","Hair Care","Body Care","Beauty Tips","Perfumes"][i % 6],
  titleAr: "أسرار المكياج الطبيعي للإطالة اليومية",
  titleEn: "Natural Makeup Secrets for All-Day Wear",
  excerptAr: "المكياج الطبيعي هو اختيار الأمثل للإطالة. المكياج الطبيعي يبرز جمالك الطبيعي دون مبالغة.",
  excerptEn: "Natural makeup is the best choice for long-lasting looks that enhance your natural beauty without overdoing it.",
  author: isRTL => isRTL ? "لي علي محمد" : "Ali Mohamed",
  date: `${10 + i} مايو 2025`,
  dateEn: `May ${10 + i}, 2025`,
  img: ["/image 28.png","/image 27.png","/Frame 7.png","/Frame 9.png","/Frame 11.png","/image 28.png"][i % 6],
}));

const PER_PAGE = 6;

/* ── Wishlist heart ── */
function HeartBtn() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      className={styles.cardHeart}
      onClick={e => { e.preventDefault(); setLiked(l => !l); }}
      aria-label="Save"
    >
      <svg viewBox="0 0 24 24" fill={liked ? "#e53e3e" : "none"} stroke={liked ? "#e53e3e" : "#ccc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  );
}

/* ── Single card ── */
function BlogCard({ post, isRTL }) {
  return (
    <article className={styles.card}>
      {/* Image */}
      <div className={styles.cardImgWrap}>
        <img src={post.img} alt={isRTL ? post.titleAr : post.titleEn} className={styles.cardImg} draggable="false" />
        <span className={styles.cardBadge}>{isRTL ? post.catAr : post.catEn}</span>
        <HeartBtn />
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{isRTL ? post.titleAr : post.titleEn}</h2>
        <p className={styles.cardExcerpt}>{isRTL ? post.excerptAr : post.excerptEn}</p>

        <div className={styles.cardMeta}>
          <span className={styles.cardMetaItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {isRTL ? `التاريخ: ${post.date}` : post.dateEn}
          </span>
          <span className={styles.cardMetaItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            {post.author(isRTL)}
          </span>
        </div>

        <Link to={`/blog/${post.id}`} className={styles.cardBtn}>
          {isRTL ? "إقرأ المقال" : "Read Article"}
        </Link>
      </div>
    </article>
  );
}

/* ── Pagination ── */
function Pagination({ current, total, onChange, isRTL }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className={styles.pagination} aria-label={isRTL ? "التنقل بين الصفحات" : "Pagination"}>
      <button
        className={styles.pageArrow}
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        aria-label={isRTL ? "السابق" : "Previous"}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {pages.map(p => (
        <button
          key={p}
          className={`${styles.pageBtn} ${p === current ? styles.pageBtnActive : ""}`}
          onClick={() => onChange(p)}
          aria-current={p === current ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className={styles.pageArrow}
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        aria-label={isRTL ? "التالي" : "Next"}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
    </nav>
  );
}

/* ── Page ── */
export default function BlogPage() {
  const { isRTL } = useLang();
  const [activeCat, setActiveCat] = useState(0);
  const [page, setPage] = useState(1);

  const cats = isRTL ? CATS_AR : CATS_EN;

  const filtered = activeCat === 0
    ? POSTS
    : POSTS.filter(p => (isRTL ? p.catAr : p.catEn) === cats[activeCat]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleCat = (i) => { setActiveCat(i); setPage(1); };
  const handlePage = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <main dir={isRTL ? "rtl" : "ltr"}>

      {/* ── Banner ── */}
      <HeroBanner showControls={false} />

      <div className={styles.page}>

        {/* ── Filter bar ── */}
        <div className={styles.filters} role="group" aria-label={isRTL ? "تصفية المقالات" : "Filter articles"}>
          {cats.map((cat, i) => (
            <button
              key={i}
              className={`${styles.filterBtn} ${activeCat === i ? styles.filterBtnActive : ""}`}
              onClick={() => handleCat(i)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className={styles.grid}>
          {shown.map(post => (
            <BlogCard key={post.id} post={post} isRTL={isRTL} />
          ))}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <Pagination current={page} total={totalPages} onChange={handlePage} isRTL={isRTL} />
        )}

      </div>
    </main>
  );
}
