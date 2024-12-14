import React, { useState } from "react";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import GoogleMap from "../../../Components/GoogleMap/GoogleMap";

const NearestFacilities = ({ facilities }) => {
  // Dynamically generate categories from facilities
  const categories = Array.from(
    new Set(facilities.map((facility) => facility.category_name))
  );

  // Set the first category as the default selected category
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="pb-6">
      <section className="grid grid-cols-1 lg:grid-cols-3  p-0 ">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-gray-50 rounded-lg shadow-md p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-6 text-center lg:text-left">
            কাছাকাছি সুবিধাসমূহ
          </h1>

          {/* Facility Type Selector */}
          <nav className="flex flex-wrap  gap-2 sm:gap-3 md:gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold text-center shadow-sm border-2 ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white border-teal-600 shadow-lg scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* Filtered Facility Lists */}
          <div className="space-y-6">
            {categories.map((category, index) =>
              selectedCategory === category ? (
                <div key={index}>
                  <ul className="space-y-6">
                    {facilities
                      .filter((facility) => facility.category_name === category)
                      .map((facility, i) => (
                        <li
                          key={i}
                          className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-gray-100 rounded-lg p-2 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                              {facility.name || "No facilities"}
                            </h3>
                            <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                              <LocationMarkerIcon
                                className="text-red-600 w-4 h-4 sm:w-5 sm:h-5 mr-2"
                                aria-hidden="true"
                              />
                              <span>দূরত্ব: ১০ কিলোমিটার</span>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </div>

        {/* Sidebar or Extra Content */}
        <div className="hidden lg:block bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-teal-600 mb-6">
            অতিরিক্ত তথ্য
          </h2>
          <p className="text-gray-700 text-sm">
            কাছাকাছি সুবিধাগুলো অনুসন্ধান করুন, শ্রেণী অনুযায়ী ফিল্টার করুন এবং
            আপনার এলাকায় সেরা বিকল্পগুলো খুঁজে বের করুন। সচেতন থাকুন এবং আপনার
            আশেপাশের সুযোগ-সুবিধা সর্বোচ্চভাবে কাজে লাগান।
          </p>
        </div>
      </section>
    </div>
  );
};

export default NearestFacilities;
