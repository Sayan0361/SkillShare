import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { ThumbsUp, MessageSquare, Share, Play, Plus, Flame, Clock, Trophy, Send } from "lucide-react";
import { initialChallenges,initialComments } from '@/constants';

const ChallengeMode = () => {
  const [challenges, setChallenges] = useState(initialChallenges);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState({});
  const [likedChallenges, setLikedChallenges] = useState(new Set());
  const [showCommentSections, setShowCommentSections] = useState(new Set());
  const [showNewChallengeForm, setShowNewChallengeForm] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    videoUrl: "",
    tags: ""
  });

  const handleLike = (id) => {
    if (likedChallenges.has(id)) return;
    
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === id) {
        return { ...challenge, likes: challenge.likes + 1 };
      }
      return challenge;
    });
    
    setChallenges(updatedChallenges);
    setLikedChallenges(prev => new Set(prev).add(id));
  };

  const toggleComments = (id) => {
    const newShowCommentSections = new Set(showCommentSections);
    if (newShowCommentSections.has(id)) {
      newShowCommentSections.delete(id);
    } else {
      newShowCommentSections.add(id);
    }
    setShowCommentSections(newShowCommentSections);
  };

  const handleCommentChange = (id, value) => {
    setNewComment(prev => ({ ...prev, [id]: value }));
  };

  const submitComment = (challengeId) => {
    if (!newComment[challengeId] || !newComment[challengeId].trim()) return;
    
    const newCommentObj = {
      id: comments[challengeId] ? comments[challengeId].length + 1 : 1,
      user: "CurrentUser", // This would normally come from authentication
      text: newComment[challengeId],
      timestamp: "Just now"
    };
    
    setComments(prev => ({
      ...prev,
      [challengeId]: [...(prev[challengeId] || []), newCommentObj]
    }));
    
    setNewComment(prev => ({ ...prev, [challengeId]: "" }));
  };

  const handleNewChallengeChange = (field, value) => {
    setNewChallenge(prev => ({ ...prev, [field]: value }));
  };

  const submitNewChallenge = (e) => {
    e.preventDefault();
    const challengeId = challenges.length + 1;
    
    const challenge = {
      id: challengeId,
      title: newChallenge.title,
      description: newChallenge.description,
      videoUrl: newChallenge.videoUrl,
      likes: 0,
      comments: 0,
      shares: 0,
      user: {
        name: "CurrentUser",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
      },
      timestamp: "Just now",
      tags: newChallenge.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    setChallenges(prev => [challenge, ...prev]);
    setNewChallenge({ title: "", description: "", videoUrl: "", tags: "" });
    setShowNewChallengeForm(false);
  };

  return (
    <Layout>
      <div className="px-6 pt-25 sm:px-10 lg:px-40 flex flex-1 justify-center py-10 bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
        <div className="w-full max-w-4xl bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#ffd768] rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-[#1c1b0d] text-3xl font-extrabold leading-tight flex items-center justify-center gap-2">
              <Flame size={28} className="text-orange-600" /> 
              Challenge Mode
              <Trophy size={28} className="text-yellow-600" />
            </h2>
            <p className="text-[#6b6606] mt-2">Accept ridiculous challenges and show off your useless skills!</p>
          </div>

          {/* New Challenge Button */}
          <div className="mb-8 text-center">
            <button 
              onClick={() => setShowNewChallengeForm(!showNewChallengeForm)}
              className="px-6 py-3 rounded-full bg-[#fac638] text-[#1c1b0d] font-bold text-base shadow-lg hover:bg-[#fbbf24] hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Plus size={20} /> Create New Challenge
            </button>
          </div>

          {/* New Challenge Form */}
          {showNewChallengeForm && (
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#1c1b0d] mb-4">Create a New Challenge</h3>
              <form onSubmit={submitNewChallenge}>
                <div className="mb-4">
                  <label className="block text-[#1c1b0d] text-sm font-semibold mb-2">Challenge Title</label>
                  <input
                    type="text"
                    value={newChallenge.title}
                    onChange={(e) => handleNewChallengeChange('title', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition"
                    placeholder="e.g., Eat a lemon without making a face"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#1c1b0d] text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={newChallenge.description}
                    onChange={(e) => handleNewChallengeChange('description', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition min-h-[100px]"
                    placeholder="Describe the challenge in detail..."
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#1c1b0d] text-sm font-semibold mb-2">Video URL (Optional)</label>
                  <input
                    type="url"
                    value={newChallenge.videoUrl}
                    onChange={(e) => handleNewChallengeChange('videoUrl', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition"
                    placeholder="https://example.com/your-video"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[#1c1b0d] text-sm font-semibold mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newChallenge.tags}
                    onChange={(e) => handleNewChallengeChange('tags', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition"
                    placeholder="funny, difficult, food"
                  />
                </div>
                
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowNewChallengeForm(false)}
                    className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-[#fac638] text-[#1c1b0d] font-bold hover:bg-[#fbbf24] transition"
                  >
                    Post Challenge
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Challenges List */}
          <div className="space-y-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Challenge Header */}
                <div className="p-6 border-b border-[#e9e7ce]">
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-full bg-center bg-no-repeat bg-cover"
                      style={{ backgroundImage: `url("${challenge.user.avatar}")` }}
                    ></div>
                    <div>
                      <h3 className="font-bold text-[#1c1b0d]">{challenge.user.name}</h3>
                      <p className="text-sm text-[#6b6606] flex items-center gap-1">
                        <Clock size={14} /> {challenge.timestamp}
                      </p>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-[#1c1b0d] mb-2">{challenge.title}</h2>
                  <p className="text-[#1c1b0d] mb-4">{challenge.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {challenge.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-[#fef3c7] text-[#92400e] rounded-full text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {challenge.videoUrl && (
                    <div className="relative rounded-xl overflow-hidden bg-gray-200 h-64 mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition">
                          <Play size={32} className="text-white" fill="white" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Engagement Stats */}
                <div className="px-6 py-3 flex justify-between text-sm text-[#6b6606] border-b border-[#e9e7ce]">
                  <span>{challenge.likes} likes</span>
                  <span>{challenge.comments} comments • {challenge.shares} shares</span>
                </div>
                
                {/* Action Buttons */}
                <div className="px-6 py-3 flex justify-between">
                  <button 
                    onClick={() => handleLike(challenge.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${likedChallenges.has(challenge.id) ? 'text-blue-600 bg-blue-50' : 'text-[#6b6606] hover:bg-[#fef3c7]'}`}
                  >
                    <ThumbsUp size={18} />
                    Like
                  </button>
                  
                  <button 
                    onClick={() => toggleComments(challenge.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#6b6606] hover:bg-[#fef3c7] transition"
                  >
                    <MessageSquare size={18} />
                    Comment
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#6b6606] hover:bg-[#fef3c7] transition">
                    <Share size={18} />
                    Share
                  </button>
                </div>
                
                {/* Comments Section */}
                {showCommentSections.has(challenge.id) && (
                  <div className="px-6 py-4 bg-[#fcfaf0]">
                    <div className="space-y-4 mb-4">
                      {comments[challenge.id]?.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                          <div className="bg-white rounded-2xl p-3 flex-1">
                            <div className="font-medium text-[#1c1b0d]">{comment.user}</div>
                            <p className="text-[#1c1b0d]">{comment.text}</p>
                            <div className="text-xs text-[#6b6606] mt-1">{comment.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment[challenge.id] || ''}
                        onChange={(e) => handleCommentChange(challenge.id, e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-2 rounded-full border border-[#e9e7ce] bg-white focus:outline-none focus:border-[#f59e0b] transition"
                      />
                      <button 
                        onClick={() => submitComment(challenge.id)}
                        className="p-2 rounded-full bg-[#fac638] text-[#1c1b0d] hover:bg-[#fbbf24] transition"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChallengeMode;