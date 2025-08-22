import React, { useState } from "react";
import { skills } from "../../constants";
import { Marquee } from "@/components/magicui/marquee";

const ITEMS_PER_PAGE_MOBILE = 2;
const ITEMS_PER_PAGE_TABLET = 3;
const ITEMS_PER_PAGE_DESKTOP = 4;

const TrendingSkills = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Responsive items per page
  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return ITEMS_PER_PAGE_DESKTOP;
    
    const width = window.innerWidth;
    if (width < 640) return ITEMS_PER_PAGE_MOBILE;
    if (width < 1024) return ITEMS_PER_PAGE_TABLET;
    return ITEMS_PER_PAGE_DESKTOP;
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(skills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSkills = skills.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-1 justify-center py-6 sm:py-8 md:py-10">
      <div className="w-full max-w-7xl flex flex-col flex-1 gap-6 md:gap-8">
        
        {/* Marquee Showcase */}
        <div className="rounded-xl border border-[#f4f3e6] bg-amber-100 shadow-sm py-2 md:py-3 overflow-hidden">
          <Marquee className="gap-8 md:gap-12 text-sm sm:text-base md:text-lg font-semibold text-[#1c1b0d]">
            {skills.map((skill, index) => (
              <span key={index} className="flex items-center gap-1 md:gap-2 px-2">
                <img
                  src={skill.image}
                  alt={skill.title}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md shadow-sm"
                />
                <span className="truncate max-w-[120px] sm:max-w-[140px] md:max-w-none">
                  {skill.title}
                </span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* Grid of skills - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 p-2 sm:p-3 md:p-4">
          {currentSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 sm:gap-3 pb-2 sm:pb-3 rounded-lg md:rounded-xl bg-[#fffefb] shadow hover:shadow-md transition-transform hover:scale-[1.02] duration-200"
            >
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg md:rounded-xl"
                style={{ backgroundImage: `url("${skill.image}")` }}
              ></div>
              <div className="px-2 sm:px-3">
                <p className="text-[#1c1b0d] text-sm sm:text-base font-medium leading-tight sm:leading-normal line-clamp-2">
                  {skill.title}
                </p>
                <p className="text-[#9e9747] text-xs sm:text-sm font-normal leading-tight sm:leading-normal line-clamp-2 mt-1">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Responsive */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  // Show limited page numbers on mobile
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    if (currentPage <= 3) {
      // Show first 4 pages and last page
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Show first page and last 4 pages
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Show pages around current page
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center p-2 sm:p-4 gap-1">
      {/* Prev button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-8 sm:size-10 items-center justify-center rounded-full hover:bg-[#f4f3e6] disabled:opacity-40 transition-colors"
        aria-label="Previous page"
      >
        <CaretLeftIcon />
      </button>

      {/* Page numbers - Responsive */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-[#1c1b0d]">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`text-xs sm:text-sm flex size-8 sm:size-10 items-center justify-center rounded-full transition 
                ${
                  page === currentPage
                    ? "font-bold bg-[#f4f3e6] text-[#1c1b0d] shadow-sm"
                    : "font-normal text-[#1c1b0d] hover:bg-[#f4f3e6]"
                }`}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-8 sm:size-10 items-center justify-center rounded-full hover:bg-[#f4f3e6] disabled:opacity-40 transition-colors"
        aria-label="Next page"
      >
        <CaretRightIcon />
      </button>
    </div>
  );
};

const CaretLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    fill="currentColor"
    viewBox="0 0 256 256"
    className="text-[#1c1b0d]"
  >
    <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
  </svg>
);

const CaretRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    fill="currentColor"
    viewBox="0 0 256 256"
    className="text-[#1c1b0d]"
  >
    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
  </svg>
);

export default TrendingSkills;