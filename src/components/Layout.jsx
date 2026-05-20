import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  const { isRTL } = useLang();
  const { pathname } = useLocation();
  const isAuth = AUTH_ROUTES.includes(pathname);

  return (
    <div dir="ltr" lang={isRTL ? "ar" : "en"} className="w-full">
      <ScrollToTop />
      {!isAuth && <Navbar />}
      <Outlet />
      {!isAuth && <Footer />}
    </div>
  );
}
