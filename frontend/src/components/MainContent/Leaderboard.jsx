import React from 'react';
import { leaderboardData } from '../../constants';

const Leaderboard = () => {
  return (
    <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-6">
      <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-4">
        {leaderboardData.map((item) => (
          <div
            key={item.rank}
            className="flex items-center justify-between gap-4 bg-white rounded-xl shadow-sm px-4 py-3 min-h-[72px] 
                      hover:shadow-md hover:scale-[1.01] transition-all duration-200 ease-in-out"
          >
            {/* Left side: image + details */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 shrink-0"
                style={{ backgroundImage: `url("${item.image}")` }}
              ></div>
              <div className="flex flex-col justify-center min-w-0">
                <p className="text-gray-900 text-base font-semibold truncate">
                  {item.title}
                </p>
                <p className="text-gray-500 text-sm font-medium">{item.votes} votes</p>
              </div>
            </div>

            {/* Right side: rank */}
            <div className="shrink-0 text-center">
              {item.rank <= 3 ? (
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    item.rank === 1
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                      : item.rank === 2
                      ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"
                      : "bg-gradient-to-r from-amber-600 to-amber-800 text-white"
                  }`}
                >
                  #{item.rank}
                </span>
              ) : (
                <p className="text-gray-800 text-base font-medium">#{item.rank}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
