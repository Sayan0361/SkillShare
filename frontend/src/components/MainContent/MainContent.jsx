import React, { useState } from 'react';
import TrendingSkills from './TrendingSkills';
import Leaderboard from './Leaderboard';
import HeroSection from './HeroSection';
import { TrendingUp, Clock, Zap, Star, Calendar, ArrowRight, Eye, ThumbsUp, MessageSquare, Play } from "lucide-react";
import { featuredChallenges,recentVideos, } from '@/constants';
import CommunityStats from './CommunityStats';
import SkillOfTheDay from './SkillOfTheDay';
import CategoryFilters from './CategoryFilters';
import FeaturedChallenges from './FeaturedChallenges';
import RecentVideos from './RecentVideos';
import CTASection from './CTASection';

const MainContent = () => {

  return (
    <main className="flex flex-col pt-20 w-full min-h-screen bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6] relative overflow-hidden">
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,235,200,0.4),transparent_60%)] pointer-events-none"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Content Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col px-4 sm:px-8 md:px-12 py-12 relative z-10">

        {/* Community Stats */}
        <CommunityStats/>

        {/* Skill of the Day */}
        <SkillOfTheDay/>

        {/* Category Filters */}
        <CategoryFilters/>

        {/* Trending Skills */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#1c1b0d] text-2xl font-bold flex items-center gap-2">
              <TrendingUp size={24} /> Trending Skills
            </h2>
            <button className="text-amber-700 font-medium flex items-center gap-1 hover:text-amber-900 transition">
              View all <ArrowRight size={16} />
            </button>
          </div>
          <TrendingSkills />
        </section>

        {/* Featured Challenges */}
        <FeaturedChallenges/>

        {/* Recent Videos */}
        <RecentVideos/>

        {/* Leaderboard */}
        <section className="mt-16 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#1c1b0d] text-2xl font-bold">The Top Most Useless Skills</h2>
            <button className="text-amber-700 font-medium flex items-center gap-1 hover:text-amber-900 transition">
              View full leaderboard <ArrowRight size={16} />
            </button>
          </div>
          <Leaderboard />
        </section>

        {/* CTA Section */}
        <CTASection/>
      </div>
    </main>
  );
};

export default MainContent;