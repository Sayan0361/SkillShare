import Layout from '@/components/Layout/Layout';
import React from 'react';
import { Wand2, FileText, Video } from "lucide-react"; // playful icons

const UploadSkill = () => {
  return (
    <Layout>
      <div className="px-6 pt-25 sm:px-10 lg:px-40 flex flex-1 justify-center py-10  bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
        <div className="w-full max-w-2xl bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#ffd768] rounded-2xl shadow-xl p-8">
          
          {/* Heading */}
          <h2 className="text-[#1c1b0d] text-center text-3xl font-extrabold leading-tight pb-6">
            ✨ Share Your Useless Skill ✨
          </h2>

          {/* Skill Title */}
          <div className="mb-6">
            <label className="flex flex-col">
              <span className="flex items-center gap-2 text-[#1c1b0d] text-base font-semibold pb-2">
                <Wand2 size={18} /> Skill Title
              </span>
              <input
                placeholder="e.g., Can whistle with my nose"
                className="w-full h-14 px-4 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition"
              />
            </label>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="flex flex-col">
              <span className="flex items-center gap-2 text-[#1c1b0d] text-base font-semibold pb-2">
                <FileText size={18} /> Description
              </span>
              <textarea
                placeholder="Describe your skill in detail..."
                className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition resize-none"
              ></textarea>
            </label>
          </div>

          {/* Video URL */}
          <div className="mb-8">
            <label className="flex flex-col">
              <span className="flex items-center gap-2 text-[#1c1b0d] text-base font-semibold pb-2">
                <Video size={18} /> Video URL (Optional)
              </span>
              <input
                placeholder="Paste a video link of your skill"
                className="w-full h-14 px-4 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition"
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button className="w-full sm:w-auto px-8 h-12 rounded-full bg-[#fac638] text-[#1c1b0d] font-bold text-base shadow-lg hover:bg-[#fbbf24] hover:scale-105 transition-all duration-300">
              🚀 Submit Skill
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default UploadSkill;
