import React from "react";
import FeaturedImage from "./FeaturedImage";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center max-w-6xl mx-auto relative z-10">
        
        {/* Title */}
        <h1 className="text-[#1c1b0d] font-extrabold leading-tight max-w-3xl text-3xl sm:text-5xl md:text-6xl tracking-tight">
          Show Off Your{" "}
          <span className="text-[#f59e0b] relative">
            Most Useless Skill!
            <span className="absolute -top-6 -right-8 animate-bounce text-2xl">🪄</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-[#3d3c2a] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl opacity-90">
          Got a talent that’s utterly pointless but hilariously entertaining? 🎭  
          Share it with the world! Upload a short description or video of your
          <span className="font-semibold text-[#f59e0b]"> useless masterpiece</span>, 
          and let the internet roast—or crown—you 👑.
        </p>

        {/* Featured Image */}
        <div className="mt-12 w-full max-w-3xl">
          <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
            <FeaturedImage />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-5 mt-12 flex-wrap">
          <button className="min-w-[160px] h-12 px-6 rounded-full bg-[#fac638] text-[#1c180d] text-base font-semibold shadow-lg hover:bg-[#fbbf24] hover:scale-105 hover:shadow-xl transition-all duration-300">
            🚀 Explore Skills
          </button>
          <button className="min-w-[160px] h-12 px-6 rounded-full bg-white border border-[#e5e5e5] text-[#1c180d] text-base font-semibold shadow-md hover:bg-[#fff8e1] hover:scale-105 transition-all duration-300">
            🎥 Upload Yours
          </button>
        </div>
      </div>

      {/* Fun floating emojis */}
      <span className="absolute top-24 left-[12%] text-3xl animate-bounce">🤹</span>
      <span className="absolute top-40 right-[15%] text-4xl animate-spin">🪙</span>
      <span className="absolute bottom-28 left-[20%] text-3xl animate-pulse">🦆</span>
    </section>
  );
};

export default HeroSection;
