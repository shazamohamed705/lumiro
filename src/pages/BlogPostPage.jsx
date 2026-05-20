import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useLang } from "../context/LanguageContext";
import styles from "./BlogPostPage.module.css";

const POSTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  catAr: ["المكياج","العناية بالبشرة","العناية بالشعر","العناية بالجسم","نصائح جمالية","العطور"][i % 6],
  catEn: ["Makeup","Skin Care","Hair Care","Body Care","Beauty Tips","Perfumes"][i % 6],
  titleAr: "أسرار المكياج الطبيعي للإطلالة اليومية",
  titleEn: "Natural Makeup Secrets for All-Day Wear",
  sections: [
    {
      headAr: "١. تحضير البشرة",
      headEn: "1. Skin Preparation",
      bodyAr: "أبدئي بمرطب خفيف وبرايمر لتنعيم البشرة وتثبيت المكياج. البشرة المرطبة جيداً تجعل المكياج يبدو طبيعياً أكثر.",
      bodyEn: "Start with a light moisturizer and primer to smooth skin and set makeup. Well-moisturized skin makes makeup look more natural.",
    },
    {
      headAr: "٢. كريم الأساس الخفيف",
      headEn: "2. Light Foundation",
      bodyAr: "استخدمي BB cream أو كريم أساس خفيف التغطية. طبقيه بإسفنجة رطبة للحصول على تغطية طبيعية ومتجانسة.",
      bodyEn: "Use BB cream or a light coverage foundation. Apply with a damp sponge for natural, even coverage.",
    },
    {
      headAr: "٣. إبراز ملامح الوجه بخفة",
      headEn: "3. Subtle Contouring",
      bodyAr: "استخدمي القليل من الكونسيلر تحت العينين، وبودرة شفافة لتثبيت المكياج. أضيفي لمسة من البلاشر الوردي على الخدود.",
      bodyEn: "Use a little concealer under the eyes and translucent powder to set makeup. Add a touch of pink blush to the cheeks.",
    },
  ],
  tipAr: "المكياج الطبيعي يعتمد على تقنية الطبقات الخفيفة. يمكنك إضافة المزيد تدريجياً حتى تصلي للتغطية المطلوبة دون مبالغة.",
  tipEn: "Natural makeup relies on light layering technique. You can gradually add more until you reach the desired coverage without overdoing it.",
  tagsAr: ["مكياج", "إطلالة يومية", "نصائح جمالية", "العطور"],
  tagsEn: ["Makeup", "Daily Look", "Beauty Tips", "Perfumes"],
  author: (isRTL) => isRTL ? "لي علي محمد" : "Ali Mohamed",
  date: `${10 + i} مايو 2025`,
  dateEn: `May ${10 + i}, 2025`,
  img: ["/image 28.png","/image 27.png","/Frame 7.png","/Frame 9.png","/Frame 11.png","/image 28.png"][i % 6],
}));

/* ── Related card ── */
function RelatedCard({ post, isRTL }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className={styles.relCard}>
      <div className={styles.relImgWrap}>
        <img src={post.img} alt={isRTL ? post.titleAr : post.titleEn} className={styles.relImg} draggable="false" />
        <span className={styles.relBadge}>{isRTL ? post.catAr : post.catEn}</span>
        <button className={styles.relHeart} onClick={e => { e.preventDefault(); setLiked(l => !l); }} aria-label="Save">
          <svg viewBox="0 0 24 24" fill={liked ? "#e53e3e" : "none"} stroke={liked ? "#e53e3e" : "#ccc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className={styles.relBody}>
        <p className={styles.relTitle}>{isRTL ? post.titleAr : post.titleEn}</p>
        <div className={styles.relMeta}>
          <span className={styles.relMetaItem}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {isRTL ? `التاريخ: ${post.date}` : post.dateEn}
          </span>
          <span className={styles.relMetaItem}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {post.author(isRTL)}
          </span>
        </div>
        <Link to={`/blog/${post.id}`} className={styles.relBtn}>
          {isRTL ? "إقرأ المقال" : "Read Article"}
        </Link>
      </div>
    </article>
  );
}

export default function BlogPostPage() {
  const { id } = useParams();
  const { isRTL } = useLang();
  const post = POSTS.find(p => p.id === Number(id)) || POSTS[0];
  const related = POSTS.filter(p => p.id !== post.id).slice(0, 6);

  const [liked, setLiked] = useState(false);

  /* Embla carousel */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    direction: isRTL ? "rtl" : "ltr",
    loop: true,
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  /* auto-scroll */
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => {
      if (!emblaApi.canScrollNext()) emblaApi.scrollTo(0);
      else emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(id);
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <img src={post.img} alt={isRTL ? post.titleAr : post.titleEn} className={styles.heroImg} draggable="false" />
        <div className={styles.heroOverlay} aria-hidden="true" />

        {/* Top actions */}
        <div className={styles.heroActions}>
          <button className={styles.heroActionBtn} onClick={() => setLiked(l => !l)} aria-label="Save">
            <svg viewBox="0 0 24 24" fill={liked ? "#e53e3e" : "none"} stroke={liked ? "#e53e3e" : "#555"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className={styles.heroActionBtn} aria-label="Share">
            <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>

        {/* Next arrow */}
        <Link to="/blog" className={styles.heroNext} aria-label={isRTL ? "العودة للمقالات" : "Back to Blog"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </Link>

        {/* Badge */}
        <span className={styles.heroBadge}>{isRTL ? post.catAr : post.catEn}</span>
      </div>

      {/* ── Article ── */}
      <div className={styles.container}>
        <h1 className={styles.title}>{isRTL ? post.titleAr : post.titleEn}</h1>

        {/* Meta */}
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {isRTL ? `التاريخ: ${post.date}` : post.dateEn}
          </span>
          <span className={styles.metaItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {post.author(isRTL)}
          </span>
        </div>

        <div className={styles.divider} />

        {/* Intro */}
        <p className={styles.intro}>
          {isRTL
            ? "المكياج الطبيعي هو الخيار الأمثل للإطلالة اليومية التي تبرز جمالك الطبيعي دون مبالغة. تعلمي كيفية تطبيق مكياج بسيط وسريع في دقائق معدودة."
            : "Natural makeup is the ideal choice for a daily look that highlights your natural beauty without overdoing it. Learn how to apply simple and quick makeup in just minutes."}
        </p>

        {/* Sections */}
        {post.sections.map((sec, i) => (
          <div key={i} className={styles.section}>
            <h2 className={styles.secHead}>{isRTL ? sec.headAr : sec.headEn}</h2>
            <p className={styles.secBody}>{isRTL ? sec.bodyAr : sec.bodyEn}</p>
          </div>
        ))}

        {/* Tip box */}
        <div className={styles.tipBox}>
          <p className={styles.tipLabel}>{isRTL ? "نصيحة إضافية" : "Extra Tip"}</p>
          <p className={styles.tipText}>{isRTL ? post.tipAr : post.tipEn}</p>
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a08069" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          {(isRTL ? post.tagsAr : post.tagsEn).map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        {/* ── Related ── */}
        <section className={styles.related} aria-label={isRTL ? "مقالات ذات صلة" : "Related Articles"}>
          <h2 className={styles.relTitle}>{isRTL ? "مقالات ذات صلة" : "Related Articles"}</h2>

          <div className={styles.relSlider}>
            <button className={styles.relArrow} onClick={scrollPrev} aria-label="prev">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            {/* Embla viewport */}
            <div className={styles.relViewport} ref={emblaRef}>
              <div className={styles.relTrack}>
                {related.map(r => (
                  <div key={r.id} className={styles.relItem}>
                    <RelatedCard post={r} isRTL={isRTL} />
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.relArrow} onClick={scrollNext} aria-label="next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {/* Dots */}
          <div className={styles.relDots}>
            {related.map((_, i) => (
              <button
                key={i}
                className={`${styles.relDot} ${i === selectedIndex ? styles.relDotActive : ""}`}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`slide ${i + 1}`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
