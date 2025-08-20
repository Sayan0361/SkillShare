import React from 'react'
import { skillOfTheDay } from '@/constants'
import { Star } from 'lucide-react'

const SkillOfTheDay = () => {
  return (
    <section className="mb-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Star className="text-white" fill="white" size={20} />
                <span className="text-white font-semibold">Skill of the Day</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{skillOfTheDay.title}</h2>
              <p className="text-amber-100 mb-4">{skillOfTheDay.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">By {skillOfTheDay.user}</span>
                <span className="text-white font-bold">{skillOfTheDay.votes} votes</span>
              </div>
              <button className="mt-6 px-6 py-3 bg-white text-amber-700 rounded-full font-bold hover:bg-amber-50 transition">
                Vote for this Skill
              </button>
            </div>
            <div className="md:w-3/5">
              <div 
                className="h-64 md:h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${skillOfTheDay.image})` }}
              ></div>
            </div>
          </div>
    </section>
  )
}

export default SkillOfTheDay