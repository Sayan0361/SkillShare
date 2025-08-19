import React from "react";
import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-[#fffaf0] via-[#fff8e7] to-[#fff4d6]">
      <div className="max-w-[960px] mx-auto px-5 py-10 flex flex-col gap-8 text-center @container">
        
        {/* Logo / Title */}
        <div>
          <h2 className="text-xl font-semibold tracking-wide">
            SkillShare
          </h2>
          <p className="text-sm mt-1 opacity-80">
            Because every skill deserves the spotlight ✨
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#9e8747] to-transparent" />

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
          <a
            className="min-w-40 text-base font-normal hover:text-amber-400 transition-colors duration-200"
            href="#"
          >
            About
          </a>
          <a
            className="min-w-40 text-base font-normal hover:text-amber-400 transition-colors duration-200"
            href="#"
          >
            Contact
          </a>
          <a
            className="min-w-40 text-base font-normal hover:text-amber-400 transition-colors duration-200"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="min-w-40 text-base font-normal hover:text-amber-400 transition-colors duration-200"
            href="#"
          >
            Privacy Policy
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-5">
          <SocialIcon icon="TwitterLogo" className="hover:scale-110 transition-transform duration-200" />
          <SocialIcon icon="InstagramLogo" className="hover:scale-110 transition-transform duration-200" />
          <SocialIcon icon="FacebookLogo" className="hover:scale-110 transition-transform duration-200" />
        </div>

        {/* Copyright */}
        <div className="text-sm opacity-70">
          © 2024 Useless Skill Showcase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
