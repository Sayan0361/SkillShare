import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Crown, Award, Star, Trophy, Zap, Calendar, Filter, Search, Heart, Share, MessageSquare, X, ChevronDown, ChevronUp, Play, Eye, Clock } from "lucide-react";
import { initialHallOfFameData } from '@/constants';

const HallOfFame = () => {
  const [fameData, setFameData] = useState(initialHallOfFameData);
  const [filterYear, setFilterYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedItems, setLikedItems] = useState(new Set([1, 3]));
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedAchievement, setExpandedAchievement] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('rank');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [filterYear, searchQuery, activeFilter, sortBy]);

  const handleLike = (id) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(id)) {
      newLikedItems.delete(id);
      setFameData(prev => prev.map(item => 
        item.id === id ? { ...item, likes: item.likes - 1 } : item
      ));
    } else {
      newLikedItems.add(id);
      setFameData(prev => prev.map(item => 
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      ));
    }
    setLikedItems(newLikedItems);
  };

  const handleShare = async (id) => {
    if (navigator.share) {
      try {
        const item = fameData.find(item => item.id === id);
        await navigator.share({
          title: item.title,
          text: item.description,
          url: `${window.location.origin}/hall-of-fame/${id}`,
        });
        setFameData(prev => prev.map(item => 
          item.id === id ? { ...item, shares: item.shares + 1 } : item
        ));
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${window.location.origin}/hall-of-fame/${id}`);
      alert('Link copied to clipboard!');
      setFameData(prev => prev.map(item => 
        item.id === id ? { ...item, shares: item.shares + 1 } : item
      ));
    }
  };

  const toggleAchievementExpansion = (id) => {
    setExpandedAchievement(expandedAchievement === id ? null : id);
  };

  const clearFilters = () => {
    setFilterYear('all');
    setSearchQuery('');
    setActiveFilter('all');
    setSortBy('rank');
  };

  const filteredData = fameData.filter(item => {
    // Year filter
    if (filterYear !== 'all' && item.year !== parseInt(filterYear)) {
      return false;
    }
    
    // Search query filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !item.achievements.some(achievement => achievement.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Additional category filters
    if (activeFilter !== 'all') {
      if (activeFilter === 'records' && !item.tags.includes('world record')) return false;
      if (activeFilter === 'food' && !item.tags.some(tag => ['food', 'culinary'].includes(tag))) return false;
      if (activeFilter === 'skills' && !item.tags.some(tag => ['skill', 'precision', 'balance'].includes(tag))) return false;
    }
    
    return true;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'votes') return b.votes - a.votes;
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'year') return b.year - a.year;
    return a.rank - b.rank; // Default sort by rank
  });

  // Get unique years for filter
  const years = [...new Set(fameData.map(item => item.year))].sort((a, b) => b - a);

  // Check if any filters are active
  const areFiltersActive = filterYear !== 'all' || searchQuery || activeFilter !== 'all' || sortBy !== 'rank';

  return (
    <Layout>
      <div className="px-4 pt-25 sm:px-6 lg:px-8 xl:px-10 flex flex-1 justify-center py-6 sm:py-8 md:py-10 bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
        <div className="w-full max-w-6xl bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#ffd768] rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 md:mb-4">
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                <Trophy size={24} className="text-yellow-600" fill="currentColor" />
              </div>
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                <Crown size={24} className="text-yellow-600" fill="currentColor" />
              </div>
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                <Award size={24} className="text-yellow-600" fill="currentColor" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1b0d] leading-tight">
              Hall of Fame
            </h2>
            <p className="text-[#6b6606] mt-1 sm:mt-2 text-sm sm:text-base">Celebrating the most legendary useless skills achievements</p>
          </div>

          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-[#e9e7ce]"
            >
              <span className="font-medium text-[#1c1b0d]">Filters & Search</span>
              {isFiltersOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {/* Filters and Search */}
          <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block mb-6 md:mb-8 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md`}>
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9e9747]" size={18} />
                <input
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition text-sm sm:text-base"
                  >
                    <option value="all">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition text-sm sm:text-base"
                  >
                    <option value="rank">Sort by Rank</option>
                    <option value="votes">Sort by Votes</option>
                    <option value="likes">Sort by Likes</option>
                    <option value="year">Sort by Year</option>
                  </select>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 sm:px-4 py-2 rounded-xl border transition text-sm sm:text-base ${activeFilter === 'all' ? 'bg-[#fac638] border-[#f59e0b] text-[#1c1b0d]' : 'border-[#e9e7ce] bg-[#fcfcf8] text-[#6b6606] hover:bg-amber-50'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('records')}
                    className={`px-3 sm:px-4 py-2 rounded-xl border transition text-sm sm:text-base ${activeFilter === 'records' ? 'bg-[#fac638] border-[#f59e0b] text-[#1c1b0d]' : 'border-[#e9e7ce] bg-[#fcfcf8] text-[#6b6606] hover:bg-amber-50'}`}
                  >
                    Records
                  </button>
                  <button
                    onClick={() => setActiveFilter('food')}
                    className={`px-3 sm:px-4 py-2 rounded-xl border transition text-sm sm:text-base ${activeFilter === 'food' ? 'bg-[#fac638] border-[#f59e0b] text-[#1c1b0d]' : 'border-[#e9e7ce] bg-[#fcfcf8] text-[#6b6606] hover:bg-amber-50'}`}
                  >
                    Food
                  </button>
                  <button
                    onClick={() => setActiveFilter('skills')}
                    className={`px-3 sm:px-4 py-2 rounded-xl border transition text-sm sm:text-base ${activeFilter === 'skills' ? 'bg-[#fac638] border-[#f59e0b] text-[#1c1b0d]' : 'border-[#e9e7ce] bg-[#fcfcf8] text-[#6b6606] hover:bg-amber-50'}`}
                  >
                    Skills
                  </button>
                </div>
              </div>
            </div>
            
            {/* Active filters indicator */}
            {areFiltersActive && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e9e7ce]">
                <div className="flex items-center gap-2 text-sm text-[#6b6606]">
                  <Filter size={16} />
                  <span>Filters active</span>
                </div>
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 transition"
                >
                  <X size={16} />
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-[#6b6606]">
              {sortedData.length} {sortedData.length === 1 ? 'achievement' : 'achievements'} found
            </p>
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-[#6b6606]">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
                Loading...
              </div>
            )}
          </div>

          {/* Hall of Fame Entries */}
          <div className="space-y-4 sm:space-y-6">
            {sortedData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                {/* Header with Crown for top entry */}
                {item.rank === 1 && (
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 sm:py-3 px-4 sm:px-6 flex items-center justify-center gap-2">
                    <Crown size={16} fill="white" />
                    <span className="font-bold text-sm sm:text-base">CURRENT CHAMPION</span>
                    <Crown size={16} fill="white" />
                  </div>
                )}
                
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    {/* Media section */}
                    <div className="lg:w-2/5">
                      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-200 aspect-video">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-black bg-opacity-20 rounded-full p-3 sm:p-4 hover:bg-opacity-30 transition">
                            <Play size={24} className="text-yellow-400" fill="currentColor" />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star size={12} fill="white" /> #{item.rank}
                        </div>
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          <Eye size={12} /> 12.4K
                        </div>
                      </div>
                      
                      {/* Quick stats */}
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="text-center p-2 bg-amber-50 rounded-lg">
                          <div className="font-bold text-amber-700">{item.votes.toLocaleString()}</div>
                          <div className="text-xs text-amber-900">Votes</div>
                        </div>
                        <div className="text-center p-2 bg-amber-50 rounded-lg">
                          <div className="font-bold text-amber-700">{item.likes.toLocaleString()}</div>
                          <div className="text-xs text-amber-900">Likes</div>
                        </div>
                        <div className="text-center p-2 bg-amber-50 rounded-lg">
                          <div className="font-bold text-amber-700">{item.shares.toLocaleString()}</div>
                          <div className="text-xs text-amber-900">Shares</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="lg:w-3/5">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-center bg-no-repeat bg-cover border-2 border-yellow-400 flex-shrink-0"
                            style={{ backgroundImage: `url("${item.user.avatar}")` }}
                          ></div>
                          <div>
                            <h3 className="font-bold text-[#1c1b0d] text-sm sm:text-base">{item.user.name}</h3>
                            <p className="text-[#6b6606] text-xs sm:text-sm flex items-center gap-1">
                              <Calendar size={12} /> {item.year}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <h2 
                        className="text-lg sm:text-xl font-bold text-[#1c1b0d] mb-2 cursor-pointer"
                        onClick={() => toggleAchievementExpansion(item.id)}
                      >
                        {item.title}
                      </h2>
                      
                      <p className={`text-[#1c1b0d] mb-3 sm:mb-4 ${expandedAchievement !== item.id ? 'line-clamp-2' : ''}`}>
                        {item.description}
                      </p>
                      
                      {expandedAchievement === item.id && (
                        <>
                          {/* Achievements */}
                          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                            {item.achievements.map((achievement, index) => (
                              <span key={index} className="px-2 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-full text-xs font-medium flex items-center gap-1">
                                <Award size={12} /> {achievement}
                              </span>
                            ))}
                          </div>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                            {item.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-yellow-50 text-yellow-800 rounded-full text-xs font-medium">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#e9e7ce]">
                        <button 
                          onClick={() => handleLike(item.id)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition text-sm ${likedItems.has(item.id) ? 'text-red-600 bg-red-50' : 'text-[#6b6606] hover:bg-amber-50'}`}
                        >
                          <Heart size={16} fill={likedItems.has(item.id) ? "currentColor" : "none"} />
                          <span className="hidden sm:inline">Like</span>
                        </button>
                        
                        <button 
                          onClick={() => handleShare(item.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#6b6606] hover:bg-amber-50 transition text-sm"
                        >
                          <Share size={16} />
                          <span className="hidden sm:inline">Share</span>
                        </button>
                        
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#6b6606] hover:bg-amber-50 transition text-sm">
                          <MessageSquare size={16} />
                          <span className="hidden sm:inline">Comment</span>
                        </button>
                        
                        <button 
                          onClick={() => toggleAchievementExpansion(item.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#6b6606] hover:bg-amber-50 transition text-sm ml-auto"
                        >
                          {expandedAchievement === item.id ? (
                            <>
                              <ChevronUp size={16} />
                              <span className="hidden sm:inline">Show less</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown size={16} />
                              <span className="hidden sm:inline">Show more</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {sortedData.length === 0 && !isLoading && (
              <div className="text-center py-8 sm:py-12 bg-white rounded-2xl shadow-lg">
                <Trophy size={40} className="mx-auto text-amber-300 mb-3" />
                <h3 className="text-lg sm:text-xl font-bold text-[#1c1b0d] mb-2">No achievements found</h3>
                <p className="text-[#6b6606] mb-4">Try adjusting your filters or search terms</p>
                <button 
                  onClick={clearFilters}
                  className="px-4 py-2 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Load More Button (for pagination) */}
          {sortedData.length > 0 && (
            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition inline-flex items-center gap-2">
                <span>Load more achievements</span>
                <ChevronDown size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HallOfFame;