import { useState } from "react";
import { useLang } from "../context/LanguageContext";
import styles from "./DashAddresses.module.css";

const PenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

export default function DashAddresses() {
  const { isRTL } = useLang();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", city: "", details: "" });

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name && !form.city) return;
    const label = isRTL
      ? `${form.name} — ${form.city}، ${form.details}`
      : `${form.name} — ${form.city}, ${form.details}`;
    setAddresses(prev => [...prev, label]);
    setForm({ name: "", phone: "", city: "", details: "" });
  };

  const remove = (i) => setAddresses(prev => prev.filter((_, idx) => idx !== i));

  return (
    <div className={styles["dadr__wrap"]} dir={isRTL ? "rtl" : "ltr"}>

      {/* Title */}
      <p className={styles["dadr__pageTitle"]}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        {isRTL ? "العناوين" : "Addresses"}
      </p>

      {/* Form card */}
      <div className={styles["dadr__card"]}>
        <form className={styles["dadr__form"]} onSubmit={handleSave}>

          {/* Name */}
          <div className={styles["dadr__fieldRow"]}>
            <span className={styles["dadr__fieldIcon"]}><PenIcon /></span>
            <input
              className={styles["dadr__input"]}
              placeholder={isRTL ? "الاسم الكامل" : "Full Name"}
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            />
          </div>

          {/* Phone */}
          <div className={styles["dadr__fieldRow"]}>
            <span className={styles["dadr__fieldIcon"]}><PenIcon /></span>
            <input
              className={styles["dadr__input"]}
              placeholder={isRTL ? "رقم الجوال" : "Phone Number"}
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            />
          </div>

          {/* City */}
          <div className={styles["dadr__fieldRow"]}>
            <span className={styles["dadr__fieldIcon"]}><PenIcon /></span>
            <input
              className={styles["dadr__input"]}
              placeholder={isRTL ? "المدينة" : "City"}
              value={form.city}
              onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
            />
          </div>

          {/* Details */}
          <div className={styles["dadr__fieldRow"]}>
            <span className={styles["dadr__fieldIcon"]}><PenIcon /></span>
            <input
              className={styles["dadr__input"]}
              placeholder={isRTL ? "تفاصيل العنوان" : "Address Details"}
              value={form.details}
              onChange={e => setForm(p => ({ ...p, details: e.target.value }))}
            />
          </div>

          <div className={styles["dadr__btnWrap"]}>
            <button type="submit" className={styles["dadr__saveBtn"]}>
              {isRTL ? "حفظ العنوان" : "Save Address"}
            </button>
          </div>

        </form>
      </div>

      {/* Saved addresses */}
      {addresses.length > 0 && (
        <div className={styles["dadr__list"]}>
          {addresses.map((addr, i) => (
            <div key={i} className={styles["dadr__addressItem"]}>
              <span className={styles["dadr__addressText"]}>{addr}</span>
              <button className={styles["dadr__deleteBtn"]} onClick={() => remove(i)} aria-label="delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
