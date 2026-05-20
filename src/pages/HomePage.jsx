import HeroBanner from "../components/HeroBanner";
import HomeCategories from "../components/HomeCategories";
import WhyUs from "../components/WhyUs";
import HomeOffers from "../components/HomeOffers";
import PromoBanner from "../components/PromoBanner";
import SecondBanner from "../components/SecondBanner";
import BestSellers from "../components/BestSellers";
import HomeProducts from "../components/HomeProducts";
import ThirdBanner from "../components/ThirdBanner";
import NewArrivals from "../components/NewArrivals";
import FaqSection from "../components/FaqSection";
import PartnersStrip from "../components/PartnersStrip";
import HomeBlog from "../components/HomeBlog";
import HomeReviews from "../components/HomeReviews";

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <HomeCategories />
      <WhyUs />
      <HomeOffers />
      <PromoBanner />
     <HomeProducts />
      <SecondBanner />
      <BestSellers />
      <ThirdBanner />
      <NewArrivals />
      <FaqSection />
      <PartnersStrip />
      <HomeBlog />
      <HomeReviews />
    </main>
  );
}
