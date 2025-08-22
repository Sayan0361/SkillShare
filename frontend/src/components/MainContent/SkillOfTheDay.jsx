import React from 'react'
import { skillOfTheDay } from '@/constants'
import { Star, Heart, ChevronRight } from 'lucide-react'

const SkillOfTheDay = () => {
  return (
    <section className="mb-8 sm:mb-10 md:mb-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl md:rounded-2xl shadow-lg overflow-hidden mx-3 sm:mx-4 md:mx-0">
      <div className="flex flex-col md:flex-row">
        {/* Content Section */}
        <div className="md:w-2/5 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Star className="text-white" fill="white" size={18} sm:size={20} />
            <span className="text-white font-semibold text-sm sm:text-base">Skill of the Day</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight">
            {skillOfTheDay.title}
          </h2>
          
          <p className="text-amber-100 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
            {skillOfTheDay.description}
          </p>
          
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <span className="text-white font-medium text-xs sm:text-sm">
              By {skillOfTheDay.user}
            </span>
            <div className="flex items-center gap-1 bg-amber-500/20 px-2 sm:px-3 py-1 rounded-full">
              <Heart className="text-white" size={14} sm:size={16} fill="white" />
              <span className="text-white font-bold text-xs sm:text-sm">
                {skillOfTheDay.votes} votes
              </span>
            </div>
          </div>
          
          <button className="group mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-white text-amber-700 rounded-full font-bold hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Vote for this Skill
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-3/5 relative">
          <div 
            className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${skillOfTheDay.image})` }}
          >
            {/* Gradient overlay for better text readability on small screens */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-t from-amber-500/70 via-transparent to-transparent"></div>
            
            {/* Badge for mobile view */}
            <div className="md:hidden absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
              <span className="text-amber-700 font-bold text-xs">Featured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only quick stats */}
      <div className="md:hidden bg-amber-500/20 p-3">
        <div className="flex items-center justify-around text-xs text-white">
          <div className="text-center">
            <div className="font-bold">{skillOfTheDay.votes}</div>
            <div>Votes</div>
          </div>
          <div className="h-4 w-px bg-amber-300/50"></div>
          <div className="text-center">
            <div className="font-bold">{skillOfTheDay.views || '1.2k'}</div>
            <div>Views</div>
          </div>
          <div className="h-4 w-px bg-amber-300/50"></div>
          <div className="text-center">
            <div className="font-bold">{skillOfTheDay.comments || '24'}</div>
            <div>Comments</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillOfTheDay