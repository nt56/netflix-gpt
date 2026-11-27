import AISearchBar from "./AISearchBar";
import AISuggestions from "./AISuggestions";
import { BG_URL } from "../../config/constants";

const AISearchPage = () => {
  return (
    <div className="min-h-screen w-full relative bg-dark-950 text-white overflow-x-hidden">
      {/* Ambient AI Background Backdrop */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          className="h-full w-full object-cover scale-105 filter brightness-[0.22] blur-sm"
          src={BG_URL}
          alt=""
        />
        {/* Layered Cyberpunk / AI Radial Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-purple-700/20 via-brand/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-gradient-radial from-indigo-700/15 via-blue-900/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-dark-950/80" />
      </div>

      <div className="relative z-10 pt-24 sm:pt-28 pb-16">
        <AISearchBar />
        <AISuggestions />
      </div>
    </div>
  );
};

export default AISearchPage;
