import React from 'react';
import { leaderboardData } from '../../constants';

const Leaderboard = () => {
  return (
    <div className="px-4 py-6 w-full">
      <div className="overflow-x-auto rounded-xl border border-[#e9e2ce] bg-[#fcfbf8] shadow-sm">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-[#f9f7f2]">
              <th className="px-4 py-3 text-[#1c180d] text-sm font-semibold">Rank</th>
              <th className="px-4 py-3 text-[#1c180d] text-sm font-semibold">Skill</th>
              <th className="px-4 py-3 text-[#1c180d] text-sm font-semibold">Votes</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((item, index) => (
              <tr
                key={index}
                className="border-t border-[#e9e2ce] hover:bg-[#fefcf7] transition"
              >
                <td className="px-4 py-3 text-[#1c180d] text-sm">{item.rank}</td>
                <td className="px-4 py-3 text-[#9e8747] text-sm">{item.skill}</td>
                <td className="px-4 py-3 text-[#9e8747] text-sm">{item.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
