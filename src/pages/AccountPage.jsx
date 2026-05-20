import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import DashSidebar   from "../dashboard/DashSidebar";
import DashProfile   from "../dashboard/DashProfile";
import DashOrders    from "../dashboard/DashOrders";
import DashPoints    from "../dashboard/DashPoints";
import DashWishlist  from "../dashboard/DashWishlist";
import DashAddresses from "../dashboard/DashAddresses";
import styles from "./AccountPage.module.css";

const TAB_TITLES = {
  profile:   { ar: "حسابي",        en: "My Account" },
  orders:    { ar: "الطلبات",      en: "Orders" },
  points:    { ar: "نقاط الشراء",  en: "Points" },
  addresses: { ar: "العناوين",     en: "Addresses" },
  wishlist:  { ar: "المفضلة",      en: "Wishlist" },
};

export default function AccountPage() {
  const { isRTL } = useLang();
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "profile":   return <DashProfile />;
      case "orders":    return <DashOrders />;
      case "points":    return <DashPoints />;
      case "wishlist":  return <DashWishlist />;
      case "addresses": return <DashAddresses />;
      default:          return <DashProfile />;
    }
  };

  const title = isRTL ? TAB_TITLES[activeTab].ar : TAB_TITLES[activeTab].en;

  return (
    <main dir={isRTL ? "rtl" : "ltr"} className={styles["acc__page"]}>

      {/* ── Mini Banner ── */}
      <div className={styles["acc__banner"]}>
        <img src="/image 28.png" alt="" className={styles["acc__bannerImg"]} draggable="false" aria-hidden="true" />
        <div className={styles["acc__bannerOverlay"]} aria-hidden="true" />
        <div className={styles["acc__bannerContent"]} style={{ alignItems: "flex-start" }}>
          <h1 className={styles["acc__bannerTitle"]}>{title}</h1>
          <nav className={styles["acc__bannerBreadcrumb"]} aria-label="breadcrumb">
            <Link to="/">{isRTL ? "الرئيسية" : "Home"}</Link>
            <span>›</span>
            <span>{title}</span>
          </nav>
        </div>
      </div>

      {/* ── Content ── */}
      <div className={styles["acc__wrapper"]}>
        <DashSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className={styles["acc__main"]}>
          {renderTab()}
        </div>
      </div>

    </main>
  );
}
