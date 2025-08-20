import React from 'react'
import { featuredChallenges } from '@/constants'
import { ArrowRight, Zap } from 'lucide-react'

const FeaturedChallenges = () => {
  return (
    <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#1c1b0d] text-2xl font-bold flex items-center gap-2">
              <Zap size={24} /> Featured Challenges
            </h2>
            <button className="text-amber-700 font-medium flex items-center gap-1 hover:text-amber-900 transition">
              View all <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredChallenges.map(challenge => (
              <div key={challenge.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div 
                  className="h-40 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${challenge.thumbnail})` }}
                >
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {challenge.duration}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700 font-medium">{challenge.participants} participants</span>
                    <button className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600 transition">
                      Join Challenge
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
    </section>
  )
}

export default FeaturedChallenges