import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import styles from "./FaqSection.module.css";

const FAQS_AR = [
  {
    id: 1,
    q: "ما هي أنواع المنتجات التي يوفرها متجر عنايتي؟",
    a: "نحن متخصصون في تقديم مجموعة مختارة من أفضل العلامات التجارية العالمية للعناية بالبشرة، الشعر، ومنتجات العناية بالأطفال.",
  },
  {
    id: 2,
    q: "كيف يمكنني تتبع طلبي؟",
    a: "بعد تأكيد طلبك ستصلك رسالة نصية أو بريد إلكتروني يحتوي على رابط تتبع الشحنة يمكنك من خلاله متابعة حالة طلبك لحظة بلحظة.",
  },
  {
    id: 3,
    q: "ما هي مدة التوصيل المتوقعة؟",
    a: "يتم التوصيل خلال 2-5 أيام عمل داخل المملكة العربية السعودية. قد تختلف المدة حسب المنطقة الجغرافية.",
  },
  {
    id: 4,
    q: "هل جميع المنتجات أصلية؟",
    a: "نعم، جميع منتجاتنا أصلية 100% ومستوردة مباشرة من الموزعين المعتمدين والعلامات التجارية الرسمية.",
  },
  {
    id: 5,
    q: "هل يمكنني الدفع عند الاستلام؟",
    a: "نعم، نوفر خيار الدفع عند الاستلام في معظم مناطق المملكة العربية السعودية، بالإضافة إلى الدفع الإلكتروني.",
  },
  {
    id: 6,
    q: "ما هي سياسة الإرجاع والاستبدال؟",
    a: "يمكنك إرجاع أو استبدال المنتج خلال 7 أيام من تاريخ الاستلام بشرط أن يكون المنتج في حالته الأصلية وغير مستخدم.",
  },
];

const FAQS_EN = [
  {
    id: 1,
    q: "What types of products does Inayati store offer?",
    a: "We specialize in offering a curated selection of the best international brands for skincare, haircare, and baby care products.",
  },
  {
    id: 2,
    q: "How can I track my order?",
    a: "After your order is confirmed, you will receive an SMS or email with a tracking link so you can follow your shipment in real time.",
  },
  {
    id: 3,
    q: "What is the expected delivery time?",
    a: "Delivery takes 2-5 business days within Saudi Arabia. The timeframe may vary depending on your region.",
  },
  {
    id: 4,
    q: "Are all products authentic?",
    a: "Yes, all our products are 100% authentic and sourced directly from authorized distributors and official brands.",
  },
  {
    id: 5,
    q: "Can I pay on delivery?",
    a: "Yes, we offer cash on delivery in most areas of Saudi Arabia, in addition to electronic payment options.",
  },
  {
    id: 6,
    q: "What is the return and exchange policy?",
    a: "You can return or exchange a product within 7 days of receipt, provided the product is in its original condition and unused.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`${styles["faq__item"]} ${isOpen ? styles["faq__itemOpen"] : ""}`}>
      <button
        className={styles["faq__question"]}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles["faq__questionText"]}>{item.q}</span>
        <span className={styles["faq__icon"]} aria-hidden="true">
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </span>
      </button>
      <div className={styles["faq__answerWrap"]} style={{ maxHeight: isOpen ? "400px" : "0" }}>
        <p className={styles["faq__answer"]}>{item.a}</p>
      </div>
    </div>
  );
}

// ── Overlay modal ──
function FaqModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className={styles["faq__overlay"]} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles["faq__modal"]} onClick={e => e.stopPropagation()}>
        <button className={styles["faq__modalClose"]} onClick={onClose} aria-label="إغلاق">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h3 className={styles["faq__modalQ"]}>{item.q}</h3>
        <p className={styles["faq__modalA"]}>{item.a}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const { isRTL } = useLang();
  const faqs = isRTL ? FAQS_AR : FAQS_EN;
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  // split into two independent columns
  const colA = faqs.filter((_, i) => i % 2 === 0);
  const colB = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section
      className={styles["faq__section"]}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "الأسئلة الشائعة" : "FAQ"}
    >
      {/* Header */}
      <div className={styles["faq__header"]}>
        <h2 className={styles["faq__title"]}>{isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}</h2>
        <p className={styles["faq__subtitle"]}>
          {isRTL
            ? "جمال تجربتك يبدأ بوضوح الرؤية؛ إليك إجابات لأكثر الأسئلة تكراراً حول خدماتنا ومنتجاتنا"
            : "Your beauty experience starts with clarity — here are answers to the most common questions about our services and products"}
        </p>
      </div>

      {/* Two independent columns */}
      <div className={styles["faq__columns"]}>
        <div className={styles["faq__col"]}>
          {colA.map(item => (
            <FaqItem key={item.id} item={item} isOpen={openId === item.id} onToggle={() => toggle(item.id)} />
          ))}
        </div>
        <div className={styles["faq__col"]}>
          {colB.map(item => (
            <FaqItem key={item.id} item={item} isOpen={openId === item.id} onToggle={() => toggle(item.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
