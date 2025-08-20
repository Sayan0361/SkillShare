import React from 'react'
import { communityStats } from '@/constants'
const CommunityStats = () => {
  return (
    <section className="mb-12 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-[#1c1b0d] text-2xl font-bold text-center mb-6">Our Amazing Community</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-2xl font-bold text-amber-700">{communityStats.totalSkills.toLocaleString()}</div>
                  <div className="text-amber-900">Useless Skills</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-2xl font-bold text-amber-700">{communityStats.totalVotes.toLocaleString()}</div>
                  <div className="text-amber-900">Votes Cast</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-2xl font-bold text-amber-700">{communityStats.activeUsers.toLocaleString()}</div>
                  <div className="text-amber-900">Active Users</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-2xl font-bold text-amber-700">{communityStats.challengesCompleted.toLocaleString()}</div>
                  <div className="text-amber-900">Challenges Completed</div>
                </div>
              </div>
    </section>
  )
}

export default CommunityStats