import React, { useState } from "react";
import { skills } from "../../constants";

const ITEMS_PER_PAGE = 4; // adjust how many skills per page

const TrendingSkills = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(skills.length / ITEMS_PER_PAGE);

  // figure out which items to show
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSkills = skills.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-12 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Grid of skills */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4 p-4">
          {currentSkills.map((skill, index) => (
            <div key={index} className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl shadow-sm"
                style={{ backgroundImage: `url("${skill.image}")` }}
              ></div>
              <div>
                <p className="text-[#1c1b0d] text-base font-medium leading-normal">
                  {skill.title}
                </p>
                <p className="text-[#9e9747] text-sm font-normal leading-normal">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
  return (
    <div className="flex items-center justify-center p-4 gap-1">
      {/* Prev button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-10 items-center justify-center disabled:opacity-40"
      >
        <CaretLeftIcon />
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`text-sm flex size-10 items-center justify-center rounded-full transition 
            ${
              page === currentPage
                ? "font-bold bg-[#f4f3e6] text-[#1c1b0d]"
                : "font-normal text-[#1c1b0d] hover:bg-[#f4f3e6]"
            }`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-10 items-center justify-center disabled:opacity-40"
      >
        <CaretRightIcon />
      </button>
    </div>
  );
};

const CaretLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18px"
    height="18px"
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
    width="18px"
    height="18px"
    fill="currentColor"
    viewBox="0 0 256 256"
    className="text-[#1c1b0d]"
  >
    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
  </svg>
);

export default TrendingSkills;
