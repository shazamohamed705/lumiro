import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import NavDropdown from "./NavDropdown";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { t, isRTL } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { label: t("nav.home"),       path: "/" },
    { label: t("nav.categories"), path: "/categories" },
    { label: t("nav.offers"),     path: "/offers" },
    { label: isRTL ? "المقالات" : "Blog", path: "/blog" },
  ];

  return (
    <header className={styles.header}>

      <nav className={styles.nav} dir={isRTL ? "rtl" : "ltr"}>
        <div className={styles.inner}>

          {/* ── Logo ── */}
          <Link to="/" aria-label="Lumira" className={styles.logoLink}>
            <img
              src="/ChatGPT Image May 11, 2026, 11_15_06 AM.png"
              alt="لوميرا كير"
              className={styles.logoImg}
            />
          </Link>

          {/* ── Links ── */}
          <ul className={styles.links}>
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`${styles.link} ${pathname === path ? styles.linkActive : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            {/* Products dropdown */}
            <li>
              <NavDropdown />
            </li>
          </ul>

          {/* ── Icons ── */}
          <div className={styles.icons}>

            {/* Search */}
            <button aria-label={t("nav.search")} className={styles.iconBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {/* Cart */}
            <Link to="/cart" aria-label={t("nav.cart")} className={styles.iconBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </Link>

            {/* Account */}
            <Link to="/login" aria-label={t("nav.account")} className={styles.iconBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className={`${styles.iconBtn} ${styles.hamburger}`}
              onClick={() => setOpen(p => !p)}
              aria-label="Menu"
              aria-expanded={open}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className={styles.dropdown} dir={isRTL ? "rtl" : "ltr"}>
          <ul className={styles.dropdownList}>
            {links.map(({ label, path }) => (
              <li key={path} className={styles.dropdownItem}>
                <Link
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`${styles.dropdownLink} ${pathname === path ? styles.dropdownLinkActive : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className={styles.dropdownItem}>
              <Link to="/products" onClick={() => setOpen(false)} className={styles.dropdownLink}>
                {isRTL ? "المنتجات" : "Products"}
              </Link>
            </li>
          </ul>
        </div>
      )}

    </header>
  );
}
