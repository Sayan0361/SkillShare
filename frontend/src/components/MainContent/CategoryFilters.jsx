import React, { useState } from 'react'

const CategoryFilters = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = ['all', 'food', 'balance', 'weird', 'talents', 'speed'];
  return (
    <section className="mb-8">
          <h2 className="text-[#1c1b0d] text-2xl font-bold text-center mb-6">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-amber-500 text-white shadow-md' 
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
    </section>
  )
}

export default CategoryFilters