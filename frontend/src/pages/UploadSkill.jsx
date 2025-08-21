import Layout from '@/components/Layout/Layout';
import React, { useState } from 'react';
import { Wand2, FileText, Video } from "lucide-react"; 
import { useAuth } from '@/lib/AuthContext';
import { insertSkill } from '../../config/skill.config.js';
import { useNavigate } from 'react-router-dom';

const UploadSkill = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);  // Manage loading state
    const [error, setError] = useState(null);  // Manage error state
    const [success, setSuccess] = useState(false);  // Manage success state

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.log('User not authenticated');
            return;
        }

        setLoading(true);
        setError(null);  // Reset error state

        try {
            const result = await insertSkill(user.id, title, description, videoUrl);
            
            if (result === false) {
                setError('Error inserting skill');
                setLoading(false);
                return;
            }

            setSuccess(true);  // Set success state
            setLoading(false);
            setTimeout(() => {
                navigate('/');  // Redirect to home page after 2 seconds
            }, 2000);  // Delay for 2 seconds to show success message
        } catch (err) {
            setError('An error occurred while inserting the skill.');
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="px-6 pt-25 sm:px-10 lg:px-40 flex flex-1 justify-center py-10 bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                            />
                        </label>
                    </div>

                    {/* Success/Error Messages */}
                    {success && (
                        <div className="text-center text-green-500 font-semibold mb-4">
                            🎉 Skill successfully uploaded! Redirecting...
                        </div>
                    )}
                    {error && (
                        <div className="text-center text-red-500 font-semibold mb-4">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            className="w-full sm:w-auto px-8 h-12 rounded-full bg-[#fac638] text-[#1c1b0d] font-bold text-base shadow-lg hover:bg-[#fbbf24] hover:scale-105 transition-all duration-300"
                            onClick={handleSubmit}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Submitting...' : '🚀 Submit Skill'}
                        </button>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default UploadSkill;
