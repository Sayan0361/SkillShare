import React, { useState } from "react";
import Logo from "./Logo";
import { navItems } from "../../constants";
import { Menu, X, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { supabase } from "../../../config/supabase.js";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const navigate = useNavigate();
  const { user, session } = useAuth();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setDropdownOpen(false); // Close dropdown after logout
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav
      className="fixed w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2 
      rounded-full top-5 z-50 backdrop-blur-4xl 
      bg-[#fcfbf8]/80 border border-[#f4f0e6] 
      left-1/2 transform -translate-x-1/2 transition-colors shadow-md"
    >
      <div className="flex items-center justify-between">
        {/* Logo + Title */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
        >
          <Logo />
          <h2 className="text-base sm:text-lg font-bold tracking-[-0.015em] text-[#1c180d]">
            SkillShare
          </h2>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-600 hover:text-black transition-colors"
            >
              {item.label}
            </a>
          ))}
          {/* Auth Buttons */}
          {session ? (
            <div className="relative">
              {/* Username dropdown */}
              <button
                onClick={handleDropdownToggle}
                className="flex items-center gap-2 rounded-full text-sm 
                bg-gradient-to-r from-amber-400 to-yellow-500 
                text-black px-5 py-2 font-semibold 
                hover:from-amber-500 hover:to-yellow-600 
                transition-all shadow-lg hover:shadow-yellow-400/30"
              >
                <User size={16} />
                {user?.username || "Username"}
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10 
                  border border-[#f4f0e6]"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm font-medium 
                    hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/sign-in")}
              className="flex items-center gap-2 rounded-full text-sm 
              bg-gradient-to-r from-amber-400 to-yellow-500 
              text-black px-5 py-2 font-semibold 
              hover:from-amber-500 hover:to-yellow-600 
              transition-all shadow-lg hover:shadow-yellow-400/30"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#1c180d] focus:outline-none"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute top-[60px] right-0 left-0 
          bg-[#fcfbf8]/95 backdrop-blur-lg 
          border-t border-[#f4f0e6] 
          flex flex-col items-center gap-4 py-6 
          shadow-md md:hidden rounded-2xl mt-2"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-600 hover:text-black transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {session ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-2 rounded-full text-sm 
              bg-gradient-to-r from-red-400 to-red-500 
              text-white px-5 py-2 font-semibold 
              hover:from-red-500 hover:to-red-600 
              transition-all shadow-lg hover:shadow-red-400/30"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/sign-in");
              }}
              className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 
              px-5 py-2 text-sm font-semibold text-black 
              shadow-lg hover:scale-105 transition-transform"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;