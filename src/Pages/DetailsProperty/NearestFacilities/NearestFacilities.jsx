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
    <div className="pb-6 px-4 lg:px-0">
      <section className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white rounded-lg ">
          <h1 className="text-3xl font-bold text-teal-600 mb-6">
            Facilities Nearby
          </h1>

          {/* Facility Type Selector */}
          <nav className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md transition-all duration-300 text-sm sm:text-lg font-medium ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-teal-500 hover:text-white"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                Category {category}
              </button>
            ))}
          </nav>

          {/* Filtered Facility Lists */}
          <div className="space-y-4">
            {categories.map((category, index) =>
              selectedCategory === category ? (
                <div key={index}>
                  <ul className="space-y-4">
                    {facilities
                      .filter((facility) => facility.category_id === category)
                      .map((facility, i) => (
                        <li
                          key={i}
                          className="flex items-start lg:items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm"
                        >
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {facility.name || "No facilities"}
                            </h3>
                            <div className="flex items-center text-gray-600 text-sm mt-1">
                              <LocationMarkerIcon
                                className="text-red-600 w-5 h-5 mr-1"
                                aria-hidden="true"
                              />
                              <span>Distance: 10</span>
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
      </section>
    </div>
  );
};

export default NearestFacilities;
