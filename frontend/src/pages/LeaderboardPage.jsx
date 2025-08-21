import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { ThumbsUp, Crown, TrendingUp, Medal } from "lucide-react";
import { initialLeaderboardData } from "@/constants";
import { ConfettiSideCannons } from "@/components/magicui/confettiCanon"; // Import the new confetti component

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData);
  const [votedItems, setVotedItems] = useState(new Set());

  const handleVote = (id) => {
    if (votedItems.has(id)) return; // Prevent multiple votes
    
    const updatedData = leaderboardData.map(item => {
      if (item.id === id) {
        return { ...item, votes: item.votes + 1 };
      }
      return item;
    });
    
    // Sort by votes in descending order
    updatedData.sort((a, b) => b.votes - a.votes);
    
    // Update ranks based on new order
    const rankedData = updatedData.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
    
    setLeaderboardData(rankedData);
    setVotedItems(prev => new Set(prev).add(id));
  };

  return (
    <Layout>
      <div className="px-6 pt-25 sm:px-10 lg:px-40 flex flex-1 justify-center py-10 bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
        <div className="w-full max-w-4xl bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#ffd768] rounded-2xl shadow-xl p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            {/* Use the ConfettiSideCannons component for the side cannons effect */}
            <ConfettiSideCannons /> {/* Add this line to trigger side cannons confetti */}
            {/* <Crown size={28} className="text-yellow-600" />  */}
            <p className="text-[#6b6606] mt-2 flex items-center justify-center gap-1">``
              <TrendingUp size={16} /> Vote for the most useless skill!
            </p>
          </div>

          {/* Top 3 Highlight Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {leaderboardData.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className={`rounded-2xl p-6 text-center shadow-lg transform transition-all hover:scale-105 ${
                  item.rank === 1 
                    ? "bg-gradient-to-b from-yellow-300 to-yellow-500 order-first" 
                    : item.rank === 2
                    ? "bg-gradient-to-b from-gray-200 to-gray-400 order-second"
                    : "bg-gradient-to-b from-amber-500 to-amber-700 order-third"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-20 h-20 rounded-full bg-center bg-no-repeat bg-cover border-4 border-white shadow-md"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  ></div>
                </div>
                
                <div className={`text-lg font-bold mb-2 ${
                  item.rank === 1 ? "text-yellow-900" : 
                  item.rank === 2 ? "text-gray-900" : "text-amber-100"
                }`}>
                  #{item.rank}
                </div>
                
                <h3 className={`font-bold text-lg mb-2 truncate ${
                  item.rank === 3 ? "text-white" : "text-gray-900"
                }`}>
                  {item.title}
                </h3>
                
                <div className={`text-sm font-semibold ${
                  item.rank === 3 ? "text-amber-100" : "text-gray-700"
                }`}>
                  {item.votes} votes
                </div>
                
                <button
                  onClick={() => handleVote(item.id)}
                  disabled={votedItems.has(item.id)}
                  className={`mt-4 px-4 py-2 rounded-full font-bold text-sm ${
                    votedItems.has(item.id)
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : item.rank === 1
                      ? "bg-yellow-700 text-white hover:bg-yellow-800"
                      : item.rank === 2
                      ? "bg-gray-600 text-white hover:bg-gray-700"
                      : "bg-amber-800 text-white hover:bg-amber-900"
                  } transition-colors`}
                >
                  {votedItems.has(item.id) ? "Voted ✓" : "Vote"}
                </button>
              </div>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <div className="space-y-4">
            {leaderboardData.slice(3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 bg-white rounded-xl shadow-sm px-6 py-4 min-h-[80px] 
                          hover:shadow-md hover:scale-[1.01] transition-all duration-200 ease-in-out"
              >
                {/* Left side: rank + image + details */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 text-center">
                    <span className="text-gray-800 text-lg font-semibold">
                      #{item.rank}
                    </span>
                  </div>
                  
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-14 shrink-0"
                    style={{ backgroundImage: `url("${item.image}")` }}
                  ></div>
                  
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="text-gray-900 text-base font-semibold truncate">
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
                      <Medal size={14} className="text-amber-500" /> 
                      {item.votes} votes
                    </p>
                  </div>
                </div>

                {/* Right side: vote button */}
                <div className="shrink-0">
                  <button
                    onClick={() => handleVote(item.id)}
                    disabled={votedItems.has(item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1 ${
                      votedItems.has(item.id)
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-[#fac638] text-[#1c1b0d] hover:bg-[#fbbf24]"
                    } transition-colors`}
                  >
                    <ThumbsUp size={16} />
                    {votedItems.has(item.id) ? "Voted" : "Vote"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
