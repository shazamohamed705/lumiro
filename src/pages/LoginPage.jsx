import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./AuthPage.module.css";

export default function LoginPage() {
  const { isRTL } = useLang();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className={styles.page}>

      {/* Background */}
      <img src="/e331fa6f4193560d1922ebe6fb828555205165a5.png" alt="" className={styles.bg} aria-hidden="true" draggable="false" />
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

        <h1 className={styles.title}>{isRTL ? "تسجيل الدخول" : "Sign In"}</h1>
        <p className={styles.subtitle}>
          {isRTL ? "استمتع بتجربة تسوق مخصصة وعروض حصرية" : "Enjoy a personalized shopping experience"}
        </p>

        <form className={styles.form} onSubmit={e => { e.preventDefault(); navigate("/account"); }}>

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
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>{isRTL ? "كلمة المرور" : "Password"}</label>
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
                placeholder={isRTL ? "أدخل كلمة مرور قوية..." : "Enter your password..."}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isRTL ? "تسجيل الدخول" : "Sign In"}
          </button>
        </form>

        {/* Remember me + Forgot password */}
        <div className={styles.extraRow}>
          <Link to="/forgot-password" className={styles.forgotLink}>
            {isRTL ? "هل نسيت كلمة المرور؟" : "Forgot password?"}
          </Link>
          <label className={styles.rememberLabel}>
            <input
              type="checkbox"
              className={styles.rememberCheck}
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            {isRTL ? "تذكرني" : "Remember me"}
          </label>
        </div>

        {/* Divider */}
        <div className={styles.dividerRow}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>{isRTL ? "أو" : "or"}</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Social */}
        <div className={styles.socialRow}>
          <button className={styles.socialBtn} aria-label="Sign in with Apple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </button>
          <button className={styles.socialBtn} aria-label="Sign in with Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button className={styles.socialBtn} aria-label="Sign in with X">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#000">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button className={styles.socialBtn} aria-label="Sign in with Google">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
        </div>

        <p className={styles.footerText}>
          {isRTL ? "ليس لديك حساب؟" : "Don't have an account?"}
          <Link to="/register" className={styles.footerLink}>
            {isRTL ? " إنشاء حساب" : " Sign Up"}
          </Link>
        </p>
      </div>
    </main>
  );
}
