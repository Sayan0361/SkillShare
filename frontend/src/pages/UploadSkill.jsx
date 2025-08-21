import Layout from '@/components/Layout/Layout';
import React, { useState, useEffect } from 'react';
import { Wand2, FileText, Video, ExternalLink, Sparkles, Trophy, Users, Clock } from "lucide-react"; 
import { useAuth } from '@/lib/AuthContext';
import { insertSkill, fetchSkills } from '../../config/skill.config.js';
import { useNavigate } from 'react-router-dom';

const UploadSkill = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [skills, setSkills] = useState([]);
    const [fetchingSkills, setFetchingSkills] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadSkills = async () => {
            try {
                const skillsData = await fetchSkills();
                if (skillsData) {
                    setSkills(skillsData);
                }
            } catch (err) {
                console.error('Error loading skills:', err);
            } finally {
                setFetchingSkills(false);
            }
        };

        loadSkills();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.log('User not authenticated');
            return;
        }

        setLoading(true);
        setError(null);  

        try {
            const result = await insertSkill(user.id, title, description, videoUrl);
            
            if (result === false) {
                setError('Error inserting skill');
                setLoading(false);
                return;
            }

            setSuccess(true); 
            setLoading(false);
            setTimeout(() => {
                navigate('/');  // Redirect to home page after 2 seconds
            }, 2000);  // Delay for 2 seconds to show success message
        } catch (err) {
            setError('An error occurred while inserting the skill.');
            setLoading(false);
        }
    };

    // Filter skills based on active tab
    const filteredSkills = activeTab === 'all' 
        ? skills 
        : skills.filter(skill => skill.video_url && activeTab === 'withVideo');

    return (
        <Layout>
            <div className="px-6 pt-25 sm:px-10 lg:px-40 flex flex-1 flex-col py-10 bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
                {/* Upload Section */}
                <div className="w-full max-w-4xl mx-auto mb-12 bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#ffd768] rounded-2xl shadow-xl p-8 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 opacity-20">
                        <Sparkles size={80} className="text-yellow-500" />
                    </div>
                    
                    {/* Heading */}
                    <h2 className="text-[#1c1b0d] text-center text-3xl font-extrabold leading-tight pb-6 relative">
                        <span className="relative z-10">✨ Share Your Useless Skill ✨</span>
                        <div className="absolute h-1 w-24 bg-yellow-400 bottom-4 left-1/2 transform -translate-x-1/2"></div>
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {/* Skill Title */}
                        <div className="mb-6 relative">
                            <label className="flex flex-col">
                                <span className="flex items-center gap-2 text-[#1c1b0d] text-base font-semibold pb-2">
                                    <Wand2 size={18} /> Skill Title
                                </span>
                                <input
                                    placeholder="e.g., Can whistle with my nose"
                                    className="w-full h-14 px-4 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-all duration-300"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        {/* Description */}
                        <div className="mb-6 relative">
                            <label className="flex flex-col">
                                <span className="flex items-center gap-2 text-[#1c1b0d] text-base font-semibold pb-2">
                                    <FileText size={18} /> Description
                                </span>
                                <textarea
                                    placeholder="Describe your skill in detail..."
                                    className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-all duration-300 resize-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </label>
                            <div className="text-xs text-[#9e9747] mt-1 flex justify-between">
                                <span>Make it interesting!</span>
                                <span>{description.length}/500 characters</span>
                            </div>
                        </div>

                        {/* Video URL */}
                        <div className="mb-8 relative">
                            <label className="flex flex-col">
                                <span className="flex items-center gap-2 text-[#1c1b0d] text-base font-semibold pb-2">
                                    <Video size={18} /> Video URL (Optional)
                                </span>
                                <input
                                    placeholder="Paste a video link of your skill"
                                    className="w-full h-14 px-4 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-all duration-300"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                />
                            </label>
                            <div className="text-xs text-[#9e9747] mt-1">
                                YouTube, Vimeo, or other video links work best
                            </div>
                        </div>

                        {/* Success/Error Messages */}
                        {success && (
                            <div className="mb-4 p-4 bg-green-100 border border-green-200 text-green-700 rounded-xl flex items-center">
                                <div className="animate-pulse mr-2">🎉</div>
                                <div>
                                    <p className="font-semibold">Skill successfully uploaded!</p>
                                    <p className="text-sm">Redirecting to home page...</p>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="mb-4 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl flex items-center">
                                <div className="mr-2">⚠️</div>
                                <div>
                                    <p className="font-semibold">Upload failed</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 h-12 rounded-full bg-gradient-to-r from-[#fac638] to-[#fbbf24] text-[#1c1b0d] font-bold text-base shadow-lg hover:shadow-xl hover:from-[#fbbf24] hover:to-[#fac638] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={loading} 
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1c1b0d]"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={16} />
                                        Submit Skill
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Skills Display Section */}
                <div className="w-full max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <h2 className="text-[#1c1b0d] text-2xl font-bold flex items-center gap-2">
                            <Trophy size={24} className="text-yellow-500" />
                            Shared Skills
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium ml-2 px-2.5 py-0.5 rounded-full">
                                {skills.length} total
                            </span>
                        </h2>
                        
                        <div className="flex mt-4 sm:mt-0 bg-yellow-100 p-1 rounded-xl">
                            <button 
                                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${activeTab === 'all' ? 'bg-white text-yellow-800 shadow-sm' : 'text-yellow-600 hover:text-yellow-800'}`}
                                onClick={() => setActiveTab('all')}
                            >
                                All Skills
                            </button>
                            <button 
                                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${activeTab === 'withVideo' ? 'bg-white text-yellow-800 shadow-sm' : 'text-yellow-600 hover:text-yellow-800'}`}
                                onClick={() => setActiveTab('withVideo')}
                            >
                                With Videos
                            </button>
                        </div>
                    </div>
                    
                    {fetchingSkills ? (
                        <div className="text-center py-12 bg-white/50 rounded-2xl shadow-sm">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fac638] mx-auto"></div>
                            <p className="mt-4 text-[#1c1b0d]">Loading amazing skills...</p>
                        </div>
                    ) : filteredSkills.length === 0 ? (
                        <div className="text-center py-12 bg-white/50 rounded-2xl shadow-sm">
                            <Users size={48} className="mx-auto text-yellow-400 mb-4" />
                            <h3 className="text-xl font-semibold text-[#1c1b0d] mb-2">No skills yet</h3>
                            <p className="text-[#6b7280] max-w-md mx-auto">
                                {activeTab === 'withVideo' 
                                    ? 'No skills with videos yet. Be the first to share a video!'
                                    : 'No skills shared yet. Be the first one!'
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSkills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:transform hover:scale-105 transition-all duration-300 border border-white relative group overflow-hidden"
                                >
                                    {/* Decorative corner */}
                                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                        <div className="absolute transform rotate-45 bg-yellow-100 text-center text-white w-24 h-10 right-0 top-0 -mr-7 mt-3 flex items-center justify-center">
                                            <span className="text-xs text-yellow-600 font-bold">{skill.profiles?.username?.charAt(0) || 'A'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold text-[#1c1b0d] group-hover:text-yellow-600 transition-colors line-clamp-1">{skill.title}</h3>
                                    </div>
                                    <div className="flex items-center text-xs text-[#6b7280] mb-3">
                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                            @{skill.profiles?.username || 'Anonymous'}
                                        </span>
                                        <span className="mx-2">•</span>
                                        <Clock size={12} className="mr-1" />
                                        <span>Recently added</span>
                                    </div>
                                    <p className="text-[#4b4b4b] mb-4 line-clamp-3">{skill.description}</p>
                                    {skill.video_url && (
                                        <a
                                            href={skill.video_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-[#f59e0b] hover:text-[#fbbf24] transition-colors font-medium text-sm group/video"
                                        >
                                            <ExternalLink size={16} className="mr-1 group-hover/video:translate-x-1 transition-transform" />
                                            Watch Video
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default UploadSkill;