import React from "react";
import FeaturedImage from "./FeaturedImage";
import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import "@/App.css";
import { SmoothCursor } from "../ui/smooth-cursor";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden w-full">
      <div className="px-4 sm:px-6 lg:px-12 py-20 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SmoothCursor/>
          {/* Left Side: Text Content */}
          <div className="text-left">
            {/* Title */}
            <h1 className="wiggle text-[#1c1b0d] font-extrabold leading-tight text-3xl sm:text-5xl md:text-6xl tracking-tight">
              Show Off Your{" "}
              <span className="text-[#f59e0b] relative">
                Most Useless Skill!
                <span className="absolute -top-6 -right-8 animate-bounce text-2xl">🪄</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-[#3d3c2a] text-base sm:text-lg md:text-xl leading-relaxed opacity-90 max-w-xl">
              Got a talent that’s utterly pointless but hilariously entertaining? 🎭  
              Share it with the world! Upload a short description or video of your
              <span className="font-semibold text-[#f59e0b]"> useless masterpiece</span>, 
              and let the internet roast—or crown—you 👑.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button className="min-w-[160px] h-12 px-6 rounded-full bg-[#fac638] text-[#1c180d] text-base font-semibold shadow-lg hover:bg-[#fbbf24] hover:scale-105 hover:shadow-xl transition-all duration-300">
                🚀 Explore Skills
              </button>
              <button className="min-w-[160px] h-12 px-6 rounded-full bg-white border border-[#e5e5e5] text-[#1c180d] text-base font-semibold shadow-md hover:bg-[#fff8e1] hover:scale-105 transition-all duration-300">
                🎥 Upload Yours
              </button>
            </div>
          </div>

          {/* Right Side: Featured Image */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 relative">
              
              {/* ScratchToReveal */}
              <ScratchToReveal
                width={450}
                height={300}
                minScratchPercentage={50}
                gradientColors={["#fef3c7", "#fde68a", "#fcd34d"]}
              >
                <FeaturedImage />
              </ScratchToReveal>

              {/* Overlay Instruction */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-[#1c180d] text-xl sm:text-2xl font-semibold bg-white/70 px-4 py-2 rounded-full shadow-md animate-pulse">
                  Scratch here!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Fun floating emojis */}
      <span className="absolute top-24 left-[8%] text-3xl animate-bounce">🤹</span>
      <span className="absolute top-40 right-[12%] text-4xl animate-spin">🪙</span>
      <span className="absolute bottom-28 left-[18%] text-3xl animate-pulse">🦆</span>
    </section>
  );
};

export default HeroSection;
