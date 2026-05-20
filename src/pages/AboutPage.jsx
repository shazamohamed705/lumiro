import { useLang } from "../context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import styles from "./AboutPage.module.css";

const STATS = [
  { target: 15000, suffix: "+", labelAr: "عميلة سعيدة",    labelEn: "Happy Clients" },
  { target: 500,   suffix: "+", labelAr: "منتج أصيل",       labelEn: "Authentic Products" },
  { target: 50,    suffix: "+", labelAr: "براند عالمي",     labelEn: "Global Brands" },
  { target: 100,   suffix: "%", labelAr: "ضمان الجودة",     labelEn: "Quality Guarantee" },
];

/* ── Count-up hook — resets every time element enters viewport ── */
function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) { setCount(0); return; }
    let current = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

/* ── Single stat item ── */
function StatItem({ stat, isRTL, started }) {
  const count = useCountUp(stat.target, 1800, started);
  const display = stat.target >= 1000
    ? (count >= 1000 ? `${Math.floor(count / 1000)}K` : count)
    : count;
  return (
    <div className={styles.statItem}>
      <span className={styles.statNum}>{stat.suffix === "+" ? `+${display}` : `${display}${stat.suffix}`}</span>
      <span className={styles.statLabel}>{isRTL ? stat.labelAr : stat.labelEn}</span>
    </div>
  );
}

const VALUES = [
  {
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z",
    titleAr: "الأصالة",
    titleEn: "Authenticity",
    descAr: "نضمن لكِ منتجات أصلية 100% من مصادر موثوقة ومعتمدة.",
    descEn: "We guarantee 100% authentic products from trusted and certified sources.",
  },
  {
    iconPath: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
    titleAr: "الاهتمام",
    titleEn: "Care",
    descAr: "كل منتج نختاره بعناية فائقة ليناسب احتياجاتكِ ويعكس اهتمامنا بكِ.",
    descEn: "Every product is carefully selected to suit your needs and reflect our care for you.",
  },
  {
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    titleAr: "الثقة",
    titleEn: "Trust",
    descAr: "نبني علاقة طويلة الأمد معكِ مبنية على الشفافية والصدق في كل تعامل.",
    descEn: "We build a long-term relationship with you based on transparency and honesty.",
  },
];

export default function AboutPage() {
  const { isRTL } = useLang();
  const statsRef  = useRef(null);
  const storyRef  = useRef(null);
  const [started, setStarted]       = useState(false);
  const [storyVisible, setStoryVisible] = useState(false);

  /* stats — re-trigger every time it enters viewport */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); }
        else { setStarted(false); }          // reset when leaves
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* story — trigger once when enters viewport */
  useEffect(() => {
    const el = storyRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStoryVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <img src="/7e6c9db354e5bdef18d90e7a4cae00423fd53d2a.png" alt="" className={styles.heroImg} draggable="false" aria-hidden="true" />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1 className={styles.heroQ}>{isRTL ? "من نحن؟" : "Who Are We?"}</h1>
          <p className={styles.heroTagline}>
            {isRTL ? "وجهتكم الموثوقة لكل ما يخص العناية." : "Your trusted destination for everything care."}
          </p>
          <p className={styles.heroDesc}>
            {isRTL
              ? "نحن نؤمن أن الجمال الحقيقي يبدأ من الاختيار الصحيح. في متجرنا، نجمع لكم أرقى البراندات العالمية للعناية بالبشرة والشعر ومستلزمات الأطفال في مكان واحد، لنضمن لكم الجودة والأصالة التي تليق بعائلتكم."
              : "We believe true beauty starts with the right choice. Our store brings together the finest global brands for skincare, hair care, and baby essentials in one place, ensuring the quality and authenticity your family deserves."}
          </p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className={styles.stats} ref={statsRef}>
        {STATS.map((s, i) => (
          <StatItem key={i} stat={s} isRTL={isRTL} started={started} />
        ))}
      </div>

      {/* ── Story ── */}
      <section className={styles.story} ref={storyRef}>
        <div className={`${styles.storyImg} ${storyVisible ? styles.storyImgVisible : ""}`}>
          <img src="/efa9d0d65d06312386f54cb3b381f35d637be5b8.png" alt="" draggable="false" />
        </div>
        <div className={`${styles.storyText} ${storyVisible ? styles.storyTextVisible : ""}`}>
          <h2 className={styles.storyTitle}>{isRTL ? "قصتنا" : "Our Story"}</h2>
          <p className={styles.storyBody}>
            {isRTL
              ? "بدأت لوميرا من شغف حقيقي بعالم العناية والجمال. أردنا أن نخلق مساحة تجمع كل ما تحتاجه المرأة العصرية من منتجات عناية موثوقة وأصيلة، بأسعار تناسب الجميع وتجربة تسوق لا تُنسى."
              : "Lumira started from a genuine passion for the world of beauty and care. We wanted to create a space that brings together everything the modern woman needs — trusted and authentic care products, at prices that suit everyone, with an unforgettable shopping experience."}
          </p>
          <p className={styles.storyBody}>
            {isRTL
              ? "اليوم، نفخر بخدمة أكثر من 15,000 عميلة سعيدة، ونواصل رحلتنا في تقديم الأفضل دائماً."
              : "Today, we are proud to serve more than 15,000 happy clients, and we continue our journey to always deliver the best."}
          </p>
        </div>
      </section>

  

    </main>
  );
}
