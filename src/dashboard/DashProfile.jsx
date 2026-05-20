import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./DashProfile.module.css";

export default function DashProfile() {
  const { isRTL } = useLang();
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const EyeIcon = ({ show }) => show ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );

  return (
    <div className={styles["dpr__wrap"]} dir={isRTL ? "rtl" : "ltr"}>

      {/* ── Account Info ── */}
      <div className={styles["dpr__card"]}>
        <p className={styles["dpr__sectionLabel"]}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          {isRTL ? "الحساب" : "Account"}
        </p>

        <div className={styles["dpr__fieldRow"]}>
          <span className={styles["dpr__fieldLabel"]}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            {isRTL ? "الاسم" : "Name"}
          </span>
          <span className={styles["dpr__fieldValue"]}>رؤى محمد</span>
          <button className={styles["dpr__editBtn"]} aria-label="edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>

        <div className={styles["dpr__fieldRow"]}>
          <span className={styles["dpr__fieldLabel"]}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            {isRTL ? "البريد الإلكتروني" : "Email"}
          </span>
          <span className={styles["dpr__fieldValue"]}>xxxxx@gmail.com</span>
          <button className={styles["dpr__editBtn"]} aria-label="edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Birthday ── */}
      <div className={styles["dpr__card"]}>
        <p className={styles["dpr__sectionLabel"]}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {isRTL ? "تاريخ الميلاد" : "Date of Birth"}
        </p>
        <div className={styles["dpr__birthdayRow"]}>
          <div className={styles["dpr__selectWrap"]}>
            <select className={styles["dpr__select"]}>
              <option value="">{isRTL ? "اليوم" : "Day"}</option>
              {Array.from({length:31},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
          </div>
          <div className={styles["dpr__selectWrap"]}>
            <select className={styles["dpr__select"]}>
              <option value="">{isRTL ? "الشهر" : "Month"}</option>
              {(isRTL
                ? ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]
                : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
              ).map((m,i)=><option key={i} value={i+1}>{m}</option>)}
            </select>
          </div>
          <div className={styles["dpr__selectWrap"]}>
            <select className={styles["dpr__select"]}>
              <option value="">{isRTL ? "السنة" : "Year"}</option>
              {Array.from({length:60},(_,i)=>{const y=2005-i; return <option key={y} value={y}>{y}</option>;})}
            </select>
          </div>
          <button className={styles["dpr__saveBtn"]}>{isRTL ? "حفظ" : "Save"}</button>
        </div>
      </div>

      {/* ── Address ── */}
      <div className={styles["dpr__card"]}>
        <p className={styles["dpr__sectionLabel"]}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {isRTL ? "العنوان" : "Address"}
        </p>
        <div className={styles["dpr__addressRow"]}>
          <span className={styles["dpr__addressEmpty"]}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {isRTL ? "لم تقم بإضافة أي عناوين" : "No addresses added yet"}
          </span>
          <button className={styles["dpr__addBtn"]}>{isRTL ? "إضافة" : "Add"}</button>
        </div>
      </div>

      {/* ── Change Password ── */}
      <div className={styles["dpr__card"]}>
        <p className={styles["dpr__sectionLabel"]}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          {isRTL ? "تغيير كلمة المرور" : "Change Password"}
        </p>

        {[
          { label: isRTL ? "كلمة المرور الحالية" : "Current Password", show: showCurrent, toggle: () => setShowCurrent(p=>!p) },
          { label: isRTL ? "كلمة المرور الجديدة" : "New Password",     show: showNew,     toggle: () => setShowNew(p=>!p) },
          { label: isRTL ? "تأكيد كلمة المرور الجديدة" : "Confirm New Password", show: showConfirm, toggle: () => setShowConfirm(p=>!p) },
        ].map((f, i) => (
          <div key={i} className={styles["dpr__passField"]}>
            <label className={styles["dpr__passLabel"]}>{f.label}</label>
            <div className={styles["dpr__passInputWrap"]}>
              <button type="button" className={styles["dpr__passEye"]} onClick={f.toggle} aria-label="toggle">
                <EyeIcon show={f.show} />
              </button>
              <input type={f.show ? "text" : "password"} className={styles["dpr__passInput"]} />
            </div>
          </div>
        ))}

        <div className={styles["dpr__bottomActions"]}>
          <button className={styles["dpr__saveBtn"]}>{isRTL ? "حفظ" : "Save"}</button>
        </div>
      </div>

      {/* ── Logout ── */}
      <div className={styles["dpr__bottomActions"]}>
        <button className={styles["dpr__logoutBtn"]} onClick={() => navigate("/login")}>
          {isRTL ? "تسجيل الخروج" : "Sign Out"}
        </button>
        <button className={styles["dpr__logoutAllBtn"]}>
          {isRTL ? "تسجيل الخروج من كل الأجهزة" : "Sign out from all devices"}
        </button>
      </div>

    </div>
  );
}
