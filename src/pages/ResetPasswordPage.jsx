import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./AuthPage.module.css";

export default function ResetPasswordPage() {
  const { isRTL } = useLang();
  const navigate = useNavigate();
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => navigate("/login"), 2500);
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
            <ellipse cx="50" cy="88" rx="28" ry="5" fill="#c9a96e" opacity="0.2"/>
            {/* person */}
            <circle cx="50" cy="30" r="10" fill="#c9a96e" opacity="0.5"/>
            <path d="M35 70 Q40 50 50 48 Q60 50 65 70" fill="#a08069" opacity="0.4"/>
            {/* lock */}
            <rect x="38" y="55" width="24" height="18" rx="3" fill="#102544" opacity="0.7"/>
            <path d="M43 55 Q43 46 50 46 Q57 46 57 55" stroke="#102544" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <circle cx="50" cy="64" r="2.5" fill="#fff"/>
          </svg>
        </div>

        {!done ? (
          <>
            <h1 className={styles.title}>{isRTL ? "إعادة تعيين كلمة المرور" : "Reset Password"}</h1>
            <p className={styles.subtitle}>
              {isRTL
                ? "يرجى إدخال الرمز المكون من 6 أرقام، ثم قم بإنشاء وتأكيد كلمة المرور الجديدة"
                : "Enter the 6-digit code, then create and confirm your new password"}
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>

              {/* OTP Code */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{isRTL ? "أدخل الرمز" : "Enter Code"}</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className={styles.input}
                    placeholder="000000"
                    autoComplete="one-time-code"
                    required
                  />
                </div>
              </div>

              {/* New Password */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{isRTL ? "كلمة المرور" : "New Password"}</label>
                <div className={styles.inputWrap}>
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(p => !p)} aria-label="toggle password">
                    {showPass ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                  <input
                    type={showPass ? "text" : "password"}
                    className={styles.input}
                    placeholder={isRTL ? "أدخل كلمة مرور قوية..." : "Enter a strong password..."}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>{isRTL ? "تأكيد كلمة المرور" : "Confirm Password"}</label>
                <div className={styles.inputWrap}>
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirm(p => !p)} aria-label="toggle confirm">
                    {showConfirm ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                  <input
                    type={showConfirm ? "text" : "password"}
                    className={styles.input}
                    placeholder={isRTL ? "أدخل كلمة مرور قوية..." : "Confirm your password..."}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                {isRTL ? "إعادة تعيين" : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.sentMsg}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a08069" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p className={styles.sentTitle}>{isRTL ? "تم إعادة التعيين!" : "Password Reset!"}</p>
            <p className={styles.sentSub}>
              {isRTL ? "سيتم تحويلك لتسجيل الدخول..." : "Redirecting you to sign in..."}
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
