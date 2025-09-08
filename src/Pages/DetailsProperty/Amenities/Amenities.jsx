import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Amenities = ({ amenities }) => {
  return (
    <>
      <hr />
      <div className="mb-20 mt-16">
        <h2 className="text-4xl font-semibold text-gray-900 mb-10 text-center">
          ভবনের সুবিধাসমূহ
        </h2>
        <div className="p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.id || index} // Use index as fallback if id is undefined
              className="transform transition-all duration-300 bg-white p-6 shadow-sm rounded-xl flex items-start space-x-4 hover:bg-gray-50 hover:shadow-md"
            >
              <FontAwesomeIcon
                icon={["fas", amenity.web_icon]} // Directly use the icon name
                className="text-teal-600 text-3xl"
              />
              <span className="text-xl text-gray-800 font-medium">
                {amenity.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Amenities;
