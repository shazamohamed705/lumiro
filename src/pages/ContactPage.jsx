import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const { isRTL } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className={styles.page}>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <img src="/7e6c9db354e5bdef18d90e7a4cae00423fd53d2a.png" alt="" className={styles.heroImg} draggable="false" />
        <div className={styles.heroOverlay} />
      </div>

      {/* ── Tagline ── */}
      <div className={styles.taglineWrap}>
        <p className={styles.tagline}>
          {isRTL ? "تراسل معنا عبر النموذج أدناه،" : "Send us a message using the form below,"}
        </p>
        <p className={styles.tagline}>
          {isRTL ? "وسنعاود الاتصال بك في أقرب وقت ممكن" : "and we'll get back to you as soon as possible"}
        </p>
      </div>

      {/* ── Body: info right, form left ── */}
      <div className={styles.body}>

        {/* Info side — right */}
        <div className={styles.infoSide}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a08069" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <p className={styles.infoLabel}>{isRTL ? "راسلنا" : "Email Us"}</p>
              <a href="mailto:info@enayty.com" className={styles.infoValue}>info@enayty.com</a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a08069" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <p className={styles.infoLabel}>{isRTL ? "اتصل بنا" : "Call Us"}</p>
              <a href="tel:+966501234567" className={styles.infoValue}>+966 50 123 4567</a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a08069" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <p className={styles.infoLabel}>{isRTL ? "عنواننا" : "Address"}</p>
              <p className={styles.infoValue}>{isRTL ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}</p>
            </div>
          </div>

          <div className={styles.socials}>
            <a href="#" aria-label="Twitter" className={styles.socialBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className={styles.socialBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Form side — left */}
        <div className={styles.formSide}>
          <h2 className={styles.formTitle}>{isRTL ? "تواصل معنا" : "Contact Us"}</h2>
          <p className={styles.formSub}>
            {isRTL ? "تواصل معنا في حالة مواجهتك أي مشكلة" : "Reach out to us if you face any issue"}
          </p>

          <form className={styles.form} onSubmit={submit} noValidate>
            <div className={styles.field}>
              <label className={styles.label}>{isRTL ? "الاسم" : "Name"}</label>
              <div className={styles.inputWrap}>
                <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input className={styles.input} type="text" name="name" value={form.name} onChange={handle} placeholder={isRTL ? "من فضلك أدخل اسمك..." : "Enter your name..."} required />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{isRTL ? "البريد الإلكتروني" : "Email"}</label>
              <div className={styles.inputWrap}>
                <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input className={styles.input} type="email" name="email" value={form.email} onChange={handle} placeholder={isRTL ? "أدخل بريدك الإلكتروني..." : "Enter your email..."} required />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{isRTL ? "الرسالة" : "Message"}</label>
              <textarea className={styles.textarea} name="message" value={form.message} onChange={handle} placeholder={isRTL ? "اكتب رسالتك هنا..." : "Write your message here..."} rows={5} required />
            </div>

            <button type="submit" className={styles.submitBtn}>
              {sent ? (isRTL ? "✓ تم الإرسال" : "✓ Sent!") : (isRTL ? "إرسال" : "Send")}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
