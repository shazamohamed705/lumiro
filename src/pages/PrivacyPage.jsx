import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./PrivacyPage.module.css";

const SECTIONS = {
  privacy: {
    titleAr: "سياسة الخصوصية",
    titleEn: "Privacy Policy",
    blocks: [
      {
        headAr: null,
        headEn: null,
        bodyAr: 'في "لوميرا"، نحن لا نهتم فقط بتقديم أفضل منتجات العناية لكِ، بل نضع حماية خصوصيتكِ في مقدمة أولوياتنا. هذه السياسة توضح كيف نجمع بياناتكِ ونحكمها، لنضمن لكِ رحلة تسوق آمنة تماماً.',
        bodyEn: 'At "Lumira", we not only care about providing you with the best care products, but we also place the protection of your privacy at the top of our priorities. This policy explains how we collect and manage your data to ensure a completely safe shopping journey.',
      },
      {
        headAr: "ما هي المعلومات التي نجمعها؟",
        headEn: "What information do we collect?",
        bodyAr: "نحن نجمع البيانات التي تساعدنا في تقديم تجربة مخصصة لكِ، مثل الاسم، البريد الإلكتروني، وعنوان الشحن. كما نستخدم ملفات تعريف الارتباط (Cookies) لتحسين سرعة تصفحكِ للموقع وتذكر منتجاتكِ المفضلة.",
        bodyEn: "We collect data that helps us provide a personalized experience for you, such as your name, email address, and shipping address. We also use Cookies to improve your browsing speed and remember your favorite products.",
      },
      {
        headAr: "مشاركة المعلومات:",
        headEn: "Information Sharing:",
        bodyAr: 'نحن في "لوميرا" نلتزم بعدم بيع أو تأجير بياناتكِ لأي طرف ثالث. يتم مشاركة معلومات الشحن فقط مع شركات التوصيل الموثوقة لضمان وصول طلباتكِ لباب منزلكِ.',
        bodyEn: 'At "Lumira" we are committed to not selling or renting your data to any third party. Shipping information is shared only with trusted delivery companies to ensure your orders reach your door.',
      },
      {
        headAr: "حقوقكِ:",
        headEn: "Your Rights:",
        bodyAr: "يحق لكِ في أي وقت طلب الاطلاع على بياناتكِ الشخصية أو تعديلها أو حذفها. يمكنكِ التواصل معنا عبر البريد الإلكتروني أو صفحة التواصل وسنرد عليكِ خلال 48 ساعة.",
        bodyEn: "You have the right at any time to request access to, modification of, or deletion of your personal data. You can contact us via email or the contact page and we will respond within 48 hours.",
      },
    ],
  },
  usage: {
    titleAr: "سياسة الاستخدام",
    titleEn: "Usage Policy",
    blocks: [
      {
        headAr: null,
        headEn: null,
        bodyAr: 'باستخدامكِ لموقع "لوميرا"، فإنكِ توافقين على الالتزام بهذه السياسة. نحرص على توفير بيئة تسوق آمنة ومريحة لجميع عملائنا.',
        bodyEn: 'By using the "Lumira" website, you agree to comply with this policy. We strive to provide a safe and comfortable shopping environment for all our customers.',
      },
      {
        headAr: "الاستخدام المقبول:",
        headEn: "Acceptable Use:",
        bodyAr: "يُسمح باستخدام الموقع للأغراض الشخصية وغير التجارية فقط. يُحظر نسخ أو توزيع أي محتوى من الموقع دون إذن مسبق كتابي منا.",
        bodyEn: "The site may be used for personal and non-commercial purposes only. Copying or distributing any content from the site without prior written permission from us is prohibited.",
      },
      {
        headAr: "الملكية الفكرية:",
        headEn: "Intellectual Property:",
        bodyAr: "جميع المحتويات المنشورة على الموقع من صور ونصوص وشعارات هي ملك حصري للوميرا ومحمية بموجب قوانين حقوق الملكية الفكرية.",
        bodyEn: "All content published on the site including images, texts, and logos are the exclusive property of Lumira and are protected under intellectual property laws.",
      },
    ],
  },
  returns: {
    titleAr: "سياسة الاسترجاع",
    titleEn: "Return Policy",
    blocks: [
      {
        headAr: null,
        headEn: null,
        bodyAr: "نؤمن بأن رضاكِ هو أولويتنا القصوى. لذلك نوفر سياسة استرجاع مرنة وشفافة تضمن حقوقكِ كاملة.",
        bodyEn: "We believe your satisfaction is our top priority. Therefore we provide a flexible and transparent return policy that guarantees your full rights.",
      },
      {
        headAr: "شروط الاسترجاع:",
        headEn: "Return Conditions:",
        bodyAr: "يمكن استرجاع المنتجات خلال 14 يوماً من تاريخ الاستلام، بشرط أن تكون في حالتها الأصلية وغير مستخدمة وبعبوتها الأصلية. لا يُقبل استرجاع منتجات العناية الشخصية بعد فتحها لأسباب صحية.",
        bodyEn: "Products can be returned within 14 days of receipt, provided they are in their original condition, unused, and in their original packaging. Personal care products cannot be returned after opening for health reasons.",
      },
      {
        headAr: "كيفية الاسترجاع:",
        headEn: "How to Return:",
        bodyAr: "تواصلي معنا عبر البريد الإلكتروني أو الواتساب مع ذكر رقم الطلب وسبب الإرجاع. سيتواصل معكِ فريقنا خلال 24 ساعة لترتيب عملية الاستلام.",
        bodyEn: "Contact us via email or WhatsApp mentioning your order number and reason for return. Our team will contact you within 24 hours to arrange the pickup process.",
      },
    ],
  },
};

const TAB_KEYS = ["privacy", "usage", "returns"];

export default function PrivacyPage() {
  const { isRTL } = useLang();
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(() => searchParams.get("section") || "privacy");

  // scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // sync when URL changes (e.g. navigating from footer)
  useEffect(() => {
    const section = searchParams.get("section");
    if (section && SECTIONS[section]) setActive(section);
  }, [searchParams]);

  const section = SECTIONS[active];

  const tabLabel = (key) => {
    const labels = {
      privacy: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
      usage:   { ar: "سياسة الاستخدام", en: "Usage Policy" },
      returns: { ar: "سياسة الاسترجاع", en: "Return Policy" },
    };
    return isRTL ? labels[key].ar : labels[key].en;
  };

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <img src="/def879efdf3991117a54c494f7267d03a5a601a3.png" alt="" className={styles.heroImg} draggable="false" aria-hidden="true" />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {isRTL ? "سياسات الخصوصية والاستخدام" : "Privacy & Usage Policies"}
          </h1>
          <p className={styles.heroSub}>
            {isRTL
              ? "نحن نقدر ثقتكِ بنا، لذا نلتزم بحماية بياناتكِ وتوفير تجربة تسوق آمنة ومريحة"
              : "We value your trust, so we are committed to protecting your data and providing a safe shopping experience"}
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Content */}
        <div className={styles.content} dir={isRTL ? "rtl" : "ltr"}>
          {section.blocks.map((block, i) => (
            <div key={i} className={styles.card}>
              {block.headAr && (
                <h2 className={styles.cardHead}>
                  {isRTL ? block.headAr : block.headEn}
                </h2>
              )}
              <p className={styles.cardBody}>
                {isRTL ? block.bodyAr : block.bodyEn}
              </p>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar} dir={isRTL ? "rtl" : "ltr"} style={{ alignSelf: "flex-start", marginTop: 0 }}>
          {TAB_KEYS.map(key => (
            <button
              key={key}
              className={`${styles.sideBtn} ${active === key ? styles.sideBtnActive : ""}`}
              onClick={() => setActive(key)}
            >
              {tabLabel(key)}
            </button>
          ))}
        </aside>

      </div>
    </main>
  );
}
