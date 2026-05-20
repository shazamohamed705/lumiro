import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import styles from "./DashSidebar.module.css";

const NAV_ITEMS = [
  {
    keyAr: "حسابي",       keyEn: "My Account",
    tab: "profile",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    keyAr: "الطلبات",     keyEn: "Orders",
    tab: "orders",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    keyAr: "نقاط الشراء", keyEn: "Points",
    tab: "points",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    keyAr: "العناوين",    keyEn: "Addresses",
    tab: "addresses",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    keyAr: "المفضلة",     keyEn: "Wishlist",
    tab: "wishlist",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
];

export default function DashSidebar({ activeTab, onTabChange }) {
  const { isRTL } = useLang();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className={styles["dsb__sidebar"]} dir={isRTL ? "rtl" : "ltr"}>
      <p className={styles["dsb__title"]}>{isRTL ? "حسابي" : "My Account"}</p>

      <ul className={styles["dsb__nav"]}>
        {NAV_ITEMS.map(item => (
          <li key={item.tab} className={styles["dsb__item"]}>
            <button
              className={`${styles["dsb__link"]} ${activeTab === item.tab ? styles["dsb__linkActive"] : ""}`}
              onClick={() => onTabChange(item.tab)}
            >
              {item.icon}
              {isRTL ? item.keyAr : item.keyEn}
            </button>
          </li>
        ))}

        {/* Logout */}
        <li className={styles["dsb__item"]}>
          <button
            className={`${styles["dsb__link"]} ${styles["dsb__linkLogout"]}`}
            onClick={handleLogout}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            {isRTL ? "تسجيل الخروج" : "Sign Out"}
          </button>
        </li>
      </ul>
    </aside>
  );
}
