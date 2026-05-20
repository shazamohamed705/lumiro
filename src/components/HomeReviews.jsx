import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLang } from "../context/LanguageContext";
import styles from "./HomeReviews.module.css";

const REVIEWS = [
  { id: 1, nameAr: "شمس", nameEn: "Shams", rating: 5, avatar: "/image 27.png",
    textAr: "تجربة رائعة جداً، التوصيل سريع، المنتجات مطابقة للمنتجات اللي بالتطبيقات الأخرى، ولكن سعر خيالي خيالي وحطوا لي هدية مع الطلب يسلمو وراح أكرر التجربة للمرة الثانية والثالثة بإذن الله",
    textEn: "Amazing experience, fast delivery, products match what's shown in other apps. The price is fantastic and they included a gift with my order. Will definitely order again!" },
  { id: 2, nameAr: "شمس", nameEn: "Shams", rating: 5, avatar: "/image 27.png",
    textAr: "تجربة رائعة جداً، التوصيل سريع، المنتجات مطابقة للمنتجات اللي بالتطبيقات الأخرى، ولكن سعر خيالي خيالي وحطوا لي هدية مع الطلب يسلمو وراح أكرر التجربة للمرة الثانية والثالثة بإذن الله",
    textEn: "Amazing experience, fast delivery, products match what's shown in other apps. The price is fantastic and they included a gift with my order. Will definitely order again!" },
  { id: 3, nameAr: "شمس", nameEn: "Shams", rating: 5, avatar: "/image 27.png",
    textAr: "تجربة رائعة جداً، التوصيل سريع، المنتجات مطابقة للمنتجات اللي بالتطبيقات الأخرى، ولكن سعر خيالي خيالي وحطوا لي هدية مع الطلب يسلمو وراح أكرر التجربة للمرة الثانية والثالثة بإذن الله",
    textEn: "Amazing experience, fast delivery, products match what's shown in other apps. The price is fantastic and they included a gift with my order. Will definitely order again!" },
  { id: 4, nameAr: "شمس", nameEn: "Shams", rating: 5, avatar: "/image 27.png",
    textAr: "تجربة رائعة جداً، التوصيل سريع، المنتجات مطابقة للمنتجات اللي بالتطبيقات الأخرى، ولكن سعر خيالي خيالي وحطوا لي هدية مع الطلب يسلمو وراح أكرر التجربة للمرة الثانية والثالثة بإذن الله",
    textEn: "Amazing experience, fast delivery, products match what's shown in other apps. The price is fantastic and they included a gift with my order. Will definitely order again!" },
  { id: 5, nameAr: "شمس", nameEn: "Shams", rating: 5, avatar: "/image 27.png",
    textAr: "تجربة رائعة جداً، التوصيل سريع، المنتجات مطابقة للمنتجات اللي بالتطبيقات الأخرى، ولكن سعر خيالي خيالي وحطوا لي هدية مع الطلب يسلمو وراح أكرر التجربة للمرة الثانية والثالثة بإذن الله",
    textEn: "Amazing experience, fast delivery, products match what's shown in other apps. The price is fantastic and they included a gift with my order. Will definitely order again!" },
];

const AUTO_MS = 4000;

function HrevStars({ count }) {
  return (
    <div className={styles["hrev__stars"]} aria-label={`${count} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill={i < count ? "#f59e0b" : "none"}
          stroke={i < count ? "#f59e0b" : "#ccc"} strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function HrevCard({ review, isRTL }) {
  return (
    <div className={styles["hrev__card"]}>
      <span className={styles["hrev__quoteTop"]} aria-hidden="true">"</span>
      <div className={styles["hrev__avatarWrap"]}>
        <img src={review.avatar} alt={isRTL ? review.nameAr : review.nameEn}
          className={styles["hrev__avatar"]} draggable="false" />
      </div>
      <p className={styles["hrev__name"]}>{isRTL ? review.nameAr : review.nameEn}</p>
      <HrevStars count={review.rating} />
      <p className={styles["hrev__text"]}>{isRTL ? review.textAr : review.textEn}</p>
      <span className={styles["hrev__quoteBottom"]} aria-hidden="true">"</span>
    </div>
  );
}

export default function HomeReviews() {
  const { isRTL } = useLang();
  const paused = useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: isRTL ? "rtl" : "ltr",
    align: "start",
    slidesToScroll: 1,
  });

  // auto-play
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (!paused.current) emblaApi.scrollNext();
    }, AUTO_MS);
    const vp = emblaApi.rootNode();
    const pause  = () => { paused.current = true; };
    const resume = () => { paused.current = false; };
    vp.addEventListener("mouseenter", pause);
    vp.addEventListener("mouseleave", resume);
    vp.addEventListener("touchstart",  pause,  { passive: true });
    vp.addEventListener("touchend",    resume, { passive: true });
    return () => {
      clearInterval(interval);
      vp.removeEventListener("mouseenter", pause);
      vp.removeEventListener("mouseleave", resume);
      vp.removeEventListener("touchstart",  pause);
      vp.removeEventListener("touchend",    resume);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    paused.current = true;
    emblaApi?.scrollPrev();
    setTimeout(() => { paused.current = false; }, 6000);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    paused.current = true;
    emblaApi?.scrollNext();
    setTimeout(() => { paused.current = false; }, 6000);
  }, [emblaApi]);

  return (
    <section
      className={styles["hrev__section"]}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "آراء العملاء" : "Customer Reviews"}
    >
      {/* Header */}
      <div className={styles["hrev__header"]}>
        <h2 className={styles["hrev__title"]}>{isRTL ? "آراء عملائنا" : "Customer Reviews"}</h2>
        <p className={styles["hrev__subtitle"]}>{isRTL ? "ماذا يقول عملاؤنا عن تجربتهم معنا" : "What our customers say about their experience"}</p>
      </div>

      {/* Slider row */}
      <div className={styles["hrev__sliderRow"]}>

        <button className={styles["hrev__arrow"]} onClick={scrollPrev}
          aria-label={isRTL ? "السابق" : "Previous"}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles["hrev__viewport"]} ref={emblaRef}>
          <div className={styles["hrev__container"]}>
            {REVIEWS.map(review => (
              <div key={review.id} className={styles["hrev__slideItem"]}>
                <HrevCard review={review} isRTL={isRTL} />
              </div>
            ))}
          </div>
        </div>

        <button className={styles["hrev__arrow"]} onClick={scrollNext}
          aria-label={isRTL ? "التالي" : "Next"}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>

      {/* Share button */}
      <div className={styles["hrev__shareWrap"]}>
        <button className={styles["hrev__shareBtn"]}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {isRTL ? "شارك تقييمك" : "Share your review"}
        </button>
      </div>
    </section>
  );
}
