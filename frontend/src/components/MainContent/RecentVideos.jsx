import { ArrowRight, Eye, MessageSquare, Play, ThumbsUp } from 'lucide-react'
import React from 'react'
import { recentVideos } from '@/constants'
const RecentVideos = () => {
  return (
    <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#1c1b0d] text-2xl font-bold flex items-center gap-2">
              <Play size={24} /> Recently Added Videos
            </h2>
            <button className="text-amber-700 font-medium flex items-center gap-1 hover:text-amber-900 transition">
              View all <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentVideos.map(video => (
              <div key={video.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div 
                  className="h-40 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${video.thumbnail})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <button className="bg-white rounded-full p-3">
                      <Play size={20} fill="#000" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">by {video.user}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye size={16} /> {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp size={16} /> {video.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={16} /> {video.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
    </section>
  )
}

export default RecentVideos