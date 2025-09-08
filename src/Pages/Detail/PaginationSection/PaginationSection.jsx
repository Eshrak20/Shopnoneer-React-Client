import React, { useState } from "react";

const Pagination = ({ onPageChange, totalProjects }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalProjects / 10);

  const handleNext = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      onPageChange(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      onPageChange(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== page) {
      setPage(pageNumber);
      onPageChange(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  // Helper function to generate the range of pages to display
  const getPaginationRange = () => {
    const range = [];
    const maxVisiblePages = 5; // Total number of pages to show around the current page
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - (maxVisiblePages - 1));
      }
    }

    if (startPage > 1) {
      range.push(1);
      if (startPage > 2) range.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) range.push("...");
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <button
          onClick={handlePrev}
          className={`md:px-4 px-3 md:py-2 py-1 md:rounded-lg rounded-full text-white ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600 transition duration-300 shadow-md"
          }`}
          disabled={page === 1}
        >
          <span className="hidden md:inline">আগের পৃষ্ঠা</span>
          <span className="md:hidden text-xl font-bold">&lt;</span>
        </button>

        {/* Page Number Buttons */}
        <div className="flex space-x-2 mt-2 sm:mt-0">
          {getPaginationRange().map((item, index) =>
            typeof item === "number" ? (
              <button
                key={item}
                onClick={() => handlePageClick(item)}
                className={`px-2 py-1 text-sm sm:px-3 sm:py-2 rounded-lg text-white ${
                  page === item
                    ? "bg-teal-500"
                    : "bg-gray-300 hover:bg-teal-400 transition duration-300"
                }`}
              >
                {item}
              </button>
            ) : (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 sm:px-3 sm:py-2 text-teal-100 text-sm"
              >
                ...
              </span>
            )
          )}
        </div>

        <button
          onClick={handleNext}
          className={`md:px-4 px-3 md:py-2 py-1 md:rounded-lg rounded-full text-white ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600 transition duration-300 shadow-md"
          }`}
          disabled={page === totalPages}
        >
          <span className="hidden md:inline">পরের পৃষ্ঠা</span>
          <span className="md:hidden text-xl font-bold">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
