import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./AuthPage.module.css";

export default function ForgotPasswordPage() {
  const { isRTL } = useLang();
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => navigate("/reset-password"), 1800);
  };

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className={styles.page}>

      {/* Background */}
      <img src="/Desktop - 2.png" alt="" className={styles.bg} aria-hidden="true" draggable="false" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      {/* Glass card */}
      <div className={styles.card}>

        {/* Logo */}
        <div className={styles.logoWrap}>
          <Link to="/">
            <img
              src="/ChatGPT Image May 11, 2026, 11_15_06 AM.png"
              alt="لوميرا كير"
              className={styles.logoImg}
            />
          </Link>
        </div>

        {/* Illustration */}
        <div className={styles.illustration} aria-hidden="true">
          <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="45" width="60" height="40" rx="4" fill="#c9a96e" opacity="0.3"/>
            <rect x="20" y="45" width="60" height="40" rx="4" stroke="#102544" strokeWidth="2"/>
            <path d="M20 50 L50 68 L80 50" stroke="#102544" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 20 L50 40" stroke="#102544" strokeWidth="2" strokeLinecap="round"/>
            <path d="M38 28 L50 20 L62 28" stroke="#102544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="50" cy="18" r="4" fill="#a08069"/>
          </svg>
        </div>

        {!sent ? (
          <>
            <h1 className={styles.title}>{isRTL ? "هل نسيت كلمة المرور؟" : "Forgot Password?"}</h1>
            <p className={styles.subtitle}>
              {isRTL
                ? "أدخل بريدك الإلكتروني لنتمكن من إرسال رابط لإعادة تعيين كلمة المرور"
                : "Enter your email so we can send you a password reset link"}
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>

              {/* Email */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{isRTL ? "البريد الإلكتروني" : "Email"}</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder={isRTL ? "أدخل بريدك الإلكتروني..." : "Enter your email..."}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                {isRTL ? "إرسال" : "Send"}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.sentMsg}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a08069" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p className={styles.sentTitle}>{isRTL ? "تم الإرسال!" : "Email Sent!"}</p>
            <p className={styles.sentSub}>
              {isRTL
                ? "تحقق من بريدك الإلكتروني واتبع التعليمات لإعادة تعيين كلمة المرور"
                : "Check your email and follow the instructions to reset your password"}
            </p>
          </div>
        )}

        <p className={styles.footerText}>
          <Link to="/login" className={styles.footerLink}>
            {isRTL ? "العودة لتسجيل الدخول" : "Back to Sign In"}
          </Link>
        </p>

      </div>
    </main>
  );
}
