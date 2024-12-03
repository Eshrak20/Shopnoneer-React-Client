import React, { useState } from "react";
import { LocationMarkerIcon } from "@heroicons/react/outline";

const NearestFacilities = ({ facilities }) => {
  // Dynamically generate categories from facilities
  const categories = Array.from(
    new Set(facilities.map((facility) => facility.category_id))
  );

  // Set the first category as the default selected category
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <>
     <div className="pb-4 mb-7 px-4 lg:px-0">
  <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {/* Main Content */}
    <div className="lg:col-span-2 space-y-6 bg-white rounded-lg p-4 sm:p-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Facilities Nearby
      </h1>

      {/* Facility Type Selector */}
      <nav className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded transition-all duration-200 text-sm sm:text-lg ${
              selectedCategory === category
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-teal-500 hover:text-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            Category {category}
          </button>
        ))}
      </nav>

      {/* Filtered Facility Lists */}
      <div className="my-4">
        {categories.map((category, index) =>
          selectedCategory === category ? (
            <div key={index}>
              <ul className="text-gray-600 text-sm sm:text-lg">
                {facilities
                  .filter((facility) => facility.category_id === category)
                  .map((facility, i) => (
                    <li
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2"
                    >
                      <span className="font-semibold">{facility.name || "No facilities"}</span>
                      <span className="flex items-center text-xs sm:text-sm">
                        <LocationMarkerIcon
                          className="text-red-600 w-4 h-4 mr-1"
                          aria-hidden="true"
                        />
                        <span>Distance: 10</span>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  </section>
</div>

    </>
  );
};

export default NearestFacilities;
