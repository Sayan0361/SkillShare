import React from 'react'; 
import TrendingSkills from './TrendingSkills';
import Leaderboard from './Leaderboard';
import HeroSection from './HeroSection';
const MainContent = () => {
  return (
    <main className="flex flex-col pt-15 w-full min-h-screen bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6] relative overflow-hidden">
      
      {/* Decorative gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,235,200,0.4),transparent_60%)] pointer-events-none"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Content Container */}
      <div className="w-full max-w-5xl mx-auto flex flex-col px-4 sm:px-8 md:px-12 py-12 relative z-10">

        {/* Trending Skills */}
        <section className="mt-10">
          <h2 className="text-[#1c1b0d] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
            Discover the Most Hilariously Useless Skills
          </h2>
            <p className="text-[#1c1b0d] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Explore a collection of the most amusingly pointless talents shared by our community. Vote for your favorites and see who tops the leaderboard!
            </p>
          <TrendingSkills />
        </section>

        {/* Leaderboard */}
        <section className="mt-10 mb-16">
          <h2 className="text-[#1c1b0d] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
            The Top Most Useless Skills
          </h2>
          <p className="text-[#1c1b0d] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Explore a collection of the most amusingly pointless talents shared by our community. Vote for your favorites and see who tops the leaderboard!
          </p>
          <Leaderboard />
        </section>
      </div>
    </main>
  );
};

export default MainContent;
