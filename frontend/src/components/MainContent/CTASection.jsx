import React from 'react'

const CTASection = () => {

  return (
    <section className="my-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Share Your Useless Talent?</h2>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Join our community of absurdly talented individuals and showcase your most useless skills. 
            Get votes, win challenges, and maybe even earn a spot in our Hall of Fame!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-amber-700 rounded-full font-bold hover:bg-amber-50 transition">
              Upload Your Skill
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-amber-700 transition">
              Explore Challenges
            </button>
          </div>
    </section>
  )
}

export default CTASection