import React, { useState } from "react";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import ShortContact from "../../Contact/ShortContact";

const NearestFacilities = ({ facilities }) => {
  // Convert meters to kilometers
  const convertMetersToKilometers = (meters) => {
    if (!meters || isNaN(meters)) return "দূরত্ব: তথ্য নেই";
    return `${(meters / 1000).toFixed(1)} কিমি`;
  };

  // Dynamically generate categories from facilities
  const categories = Array.from(
    new Set(facilities.map((facility) => facility.category_name))
  );

  // Set the first category as the default selected category
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="pb-6 ">
      <section className="grid grid-cols-1 lg:grid-cols-2  p-0 ">
        {/* Main Content */}
        <div className="relative lg:col-span-2 bg-gray-50 rounded-lg shadow-md p-3 lg:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-6 text-center lg:text-left">
            কাছাকাছি সুবিধাসমূহ
          </h1>

          {/* Facility Type Selector */}
          <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md transition-all duration-300 text-base font-semibold text-center shadow-sm border-2 ${
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
                  <ul className="grid lg:grid-cols-3 gap-2 p-2 lg:gap-8 lg:p-4">
                    {facilities
                      .filter((facility) => facility.category_name === category)
                      .map((facility, i) => (
                        <li
                          key={i}
                          className="bg-gray-100 rounded-md lg:rounded-xl p-3 lg:p-6 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-100"
                        >
                          <div>
                            <h3 className="text-base lg:text-xl font-semibold text-gray-900 mb-3">
                              {facility.name || "No facilities"}
                            </h3>
                            <div className="flex items-center text-gray-600 text-xs mb-3">
                              <LocationMarkerIcon
                                className="text-red-600 w-3 h-3 lg:w-5 lg:h-5 mr-3"
                                aria-hidden="true"
                              />
                              <span>
                                {convertMetersToKilometers(facility.distance)}
                              </span>
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
        {/* <div className="hidden lg:block bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-teal-600 mb-6">
            অতিরিক্ত তথ্য
          </h2>
          <p className="text-gray-700 text-sm">
            কাছাকাছি সুবিধাগুলো অনুসন্ধান করুন, শ্রেণী অনুযায়ী ফিল্টার করুন এবং
            আপনার এলাকায় সেরা বিকল্পগুলো খুঁজে বের করুন। সচেতন থাকুন এবং আপনার
            আশেপাশের সুযোগ-সুবিধা সর্বোচ্চভাবে কাজে লাগান।
          </p>
        </div> */}

        {/* <div className=" lg:block bg-white  rounded-lg shadow-md">
         <ShortContact/>
        </div> */}
      </section>
    </div>
  );
};

export default NearestFacilities;
