import { useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import BrowseRows from "./BrowseRows";
import AISearchPage from "../ai/AISearchPage";

const BrowsePage = () => {
  const showAiSearch = useSelector((store) => store.ai.showAiSearch);

  return (
    <div className="min-h-screen w-full bg-dark-950 text-white font-sans overflow-x-hidden selection:bg-brand selection:text-white">
      {showAiSearch ? (
        <AISearchPage />
      ) : (
        <main className="relative">
          <HeroBanner />
          <BrowseRows />
        </main>
      )}
    </div>
  );
};

export default BrowsePage;
