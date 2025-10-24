import CategorySection from "../components/CategorySection";
import FooterSection from "../components/FooterSection";
import LatestSection from "../components/LatestSection";
import NavBar from "../components/NavBar";
import ReadNext from "../components/ReadNext";
import TopSection from "../components/TopSection";

export default function HomePage() {
  return (
    <div className="font-sans text-gray-900">
      <NavBar />
      <TopSection />
      <LatestSection />
      <CategorySection />
      <ReadNext />
      <FooterSection />
    </div>
  );
}
