import Layout from '@/components/Layout/Layout';
import React from 'react';
import { Mail, Lock, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; 
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate(); 
    return (
        <Layout>
        <div className="px-6 pt-25 sm:px-10 lg:px-40 flex flex-1 justify-center py-16 bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
            <div className="w-full max-w-md bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#ffd768] rounded-2xl shadow-xl p-8">
            
            {/* Heading */}
            <h2 className="text-[#1c1b0d] text-center text-3xl font-extrabold leading-tight pb-6">
                ✨ Create Account
            </h2>

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
                />
                </label>
            </div>

            {/* Sign Up Button */}
            <div className="flex flex-col gap-3">
                <button className="w-full px-8 h-12 rounded-full bg-[#fac638] text-[#1c1b0d] font-bold text-base shadow-lg hover:bg-[#fbbf24] hover:scale-105 transition-all duration-300">
                🎉 Sign Up
                </button>

                {/* Continue with Google */}
                <button className="w-full flex items-center justify-center gap-2 h-12 rounded-full border border-gray-300 bg-white shadow hover:bg-gray-100 transition duration-300">
                <FcGoogle className="text-xl" />
                <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>
            </div>

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
