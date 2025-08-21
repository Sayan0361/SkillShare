import Layout from '@/components/Layout/Layout';
import React, { useState, useEffect } from 'react';
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; 
import { useNavigate } from "react-router-dom"; 
import { fetchUser, signIn, signOut } from '../../config/auth.config.js'
import { supabase } from '../../config/supabase.js';

const SignIn = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Set up initial session
    checkSession();
    
    // Set up session listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (event === 'SIGNED_IN') {
        setSession(currentSession);
        const { username } = await fetchUser(currentSession.user.id);
        setUsername(username);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUsername('');
      }
    });

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (currentSession) {
        setSession(currentSession);
        const { username } = await fetchUser(currentSession.user.id);
        setUsername(username);
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { user, username: newUsername } = await signIn(email, password);
      
      if (!user) {
        setError('Error in login. Please check your credentials.');
      } else {
        setUsername(newUsername);
        // No need to manually set session here as the onAuthStateChange listener will handle it
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      // No need to manually clear session here as the onAuthStateChange listener will handle it
      navigate('/sign-in');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="px-6 pt-25 sm:px-10 lg:px-40 flex flex-1 justify-center py-16 bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
        <div className="w-full max-w-md bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#ffd768] rounded-2xl shadow-xl p-8">
          
          {/* Heading */}
          <h2 className="text-[#1c1b0d] text-center text-3xl font-extrabold leading-tight pb-6">
            🔑 Sign In
          </h2>

          {/* Conditional Render: If user is logged in, show username and logout button */}
          {session ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-lg font-semibold text-[#1c1b0d]">Welcome back, {username}!</p>
              <button
                className="w-full px-8 h-12 rounded-full bg-[#f59e0b] text-white font-bold text-base shadow-lg hover:bg-[#fbbf24] hover:scale-105 transition-all duration-300"
                onClick={handleLogout}
              >
                🚪 Log Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-6">
                <label className="flex flex-col">
                  <span className="flex items-center gap-2 text-[#1c1b0d] text-base font-semibold pb-2">
                    <Mail size={18} /> Email
                  </span>
                  <input
                    placeholder="Enter your email"
                    type="email"
                    className="w-full h-14 px-4 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="flex flex-col">
                  <span className="flex items-center gap-2 text-[#1c1b0d] text-base font-semibold pb-2">
                    <Lock size={18} /> Password
                  </span>
                  <input
                    placeholder="Enter your password"
                    type="password"
                    className="w-full h-14 px-4 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}

              {/* Sign In Button */}
              <div className="flex flex-col gap-3">
                <button
                  className="w-full px-8 h-12 rounded-full bg-[#fac638] text-[#1c1b0d] font-bold text-base shadow-lg hover:bg-[#fbbf24] hover:scale-105 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : '🚀 Sign In'}
                </button>

                {/* Continue with Google */}
                <button
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 transition duration-300"
                  onClick={handleGoogleSignIn}
                >
                  <FcGoogle className="text-xl" />
                  <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>
              </div>
            </form>
          )}

          {/* Footer Link */}
          {!session && (
            <p className="mt-6 text-center text-sm text-[#3d3c2a]">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/sign-up")} 
                className="text-[#f59e0b] font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
