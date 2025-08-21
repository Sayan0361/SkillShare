import Layout from '@/components/Layout/Layout';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext.jsx';
import { Mail, Lock, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; 
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';

const SignUp = () => {
    console.log('SignUp component rendering...');
    const navigate = useNavigate();
    const { session, loading } = useAuth();
    
    useEffect(() => {
        console.log('SignUp auth state:', { session, loading });
    }, [session, loading]);
    
    if (loading) {
        console.log('SignUp: Auth is loading...');
        return <div>Loading auth...</div>;
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!email || !password || !username) {
            setError('All fields are required.');
            return;
        }

        setIsSubmitting(true);

        // Sign up the user
        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            setError(signUpError.message);
            setIsSubmitting(false);
            return;
        }

        // Get the user ID from signup response
        const userId = data.user?.id;

        if (userId) {
            // Insert username with user ID into 'profiles' table
            const { error: dbError } = await supabase
                .from('profiles')
                .insert([{ id: userId, username }]);

            if (dbError) {
                setError(dbError.message);
                setIsSubmitting(false);
                return;
            }
        } else {
            setError('User ID not found after signup.');
            setIsSubmitting(false);
            return;
        }

        setSuccess('Signup successful! Please check your email to confirm your account.');
        setIsSubmitting(false);
        setTimeout(() => navigate('/'), 2000);
    };

    // Google signup handler
    const handleGoogleSignup = async () => {
        setError(null);
        setIsSubmitting(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) setError(error.message);
        setIsSubmitting(false);
    };

    return (
        <Layout>
        <div className="px-6 pt-25 sm:px-10 lg:px-40 flex flex-1 justify-center py-16 bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
            <div className="w-full max-w-md bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#ffd768] rounded-2xl shadow-xl p-8">
            
            {/* Heading */}
            <h2 className="text-[#1c1b0d] text-center text-3xl font-extrabold leading-tight pb-6">
                ✨ Create Account
            </h2>

            <form onSubmit={handleSignup}>
                {/* Username */}
                <div className="mb-6">
                    <label className="flex flex-col">
                    <span className="flex items-center gap-2 text-[#1c1b0d] text-base font-semibold pb-2">
                        <User size={18} /> Username
                    </span>
                    <input
                        placeholder="Choose a username"
                        type="text"
                        className="w-full h-14 px-4 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </label>
                </div>

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
                        placeholder="Create a password"
                        type="password"
                        className="w-full h-14 px-4 rounded-xl border border-[#e9e7ce] bg-[#fcfcf8] text-[#1c1b0d] placeholder:text-[#9e9747] focus:outline-none focus:border-[#f59e0b] transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </label>
                </div>

                {/* Error or Success Message */}
                {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center text-sm mb-4">{success}</p>}

                {/* Sign Up Button */}
                <div className="flex flex-col gap-3">
                    <button
                        type="submit"
                        className="w-full px-8 h-12 rounded-full bg-[#fac638] text-[#1c1b0d] font-bold text-base shadow-lg hover:bg-[#fbbf24] hover:scale-105 transition-all duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Signing Up...' : '🎉 Sign Up'}
                    </button>

                    {/* Continue with Google */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 h-12 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 transition duration-300"
                        onClick={handleGoogleSignup}
                        disabled={isSubmitting}
                    >
                        <FcGoogle className="text-xl" />
                        <span className="text-gray-700 font-medium">Continue with Google</span>
                    </button>
                </div>
            </form>

            {/* Footer Link */}
            <p className="mt-6 text-center text-sm text-[#3d3c2a]">
                Already have an account?{" "}
                <button
                onClick={() => navigate("/sign-in")} 
                className="text-[#f59e0b] font-semibold hover:underline"
                >
                Sign In
                </button>
            </p>
            </div>
        </div>
        </Layout>
    );
};

export default SignUp;
