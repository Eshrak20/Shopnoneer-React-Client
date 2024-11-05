import React, { useState } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/outline'; // Ensure you have this icon imported

// Dummy data for facilities (JSON format)
const dummyFacilities = {
  School: [
    { name: "Greenwood High School", distance: "1.2 km" },
    { name: "Sunrise Public School", distance: "2.0 km" }
  ],
  College: [
    { name: "City College", distance: "3.5 km" },
    { name: "National College", distance: "4.2 km" }
  ],
  Hospital: [
    { name: "Health Care Hospital", distance: "1.5 km" },
    { name: "City Hospital", distance: "2.3 km" }
  ],
  "Shopping Mall": [
    { name: "Mega Mall", distance: "0.8 km" },
    { name: "Fashion Hub", distance: "1.3 km" }
  ],
  "Bus Stand": [
    { name: "Central Bus Station", distance: "0.5 km" },
    { name: "North End Bus Stop", distance: "1.0 km" }
  ],
  Restaurant: [
    { name: "The Food Plaza", distance: "0.9 km" },
    { name: "Downtown Diner", distance: "1.4 km" }
  ]
};

const NearestFacilities = () => {
  const [selectedFacility, setSelectedFacility] = useState("School");
  const nearestFacilities = dummyFacilities[selectedFacility] || [];

  return (
    <section >
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearest Facilities</h2>

      {/* Facility Type Selector */}
      <nav className="flex flex-wrap justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        {Object.keys(dummyFacilities).map((facility) => (
          <button
            key={facility}
            className={`px-4 py-2 rounded transition-all duration-200 text-lg ${
              selectedFacility === facility
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-teal-500 hover:text-white"
            }`}
            onClick={() => setSelectedFacility(facility)}
          >
            {facility}
          </button>
        ))}
      </nav>

      {/* Facilities List Card */}
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
        <h3 className="text-3xl font-semibold text-teal-600 mb-4">
          {selectedFacility} Facilities
        </h3>
        <ol className="space-y-4 list-decimal list-inside">
          {nearestFacilities.map((item, index) => (
            <li
              key={index}
              className="text-gray-900 flex items-center space-x-2"
            >
              <span className="font-semibold text-lg">{item.name}</span>
              <span className="flex items-center  text-sm"> {/* Change text color to red */}
                <LocationMarkerIcon className="text-red-600 w-4 h-4 mr-1" aria-hidden="true" />
                <span>Distance: {item.distance}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default NearestFacilities;
