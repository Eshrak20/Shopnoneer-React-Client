import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Amenities = ({ amenities }) => {
  return (
    <>
      <hr />
      <div className="mb-20 mt-7">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center items-center">
          {amenities.map((amenity) => {
            return (
              <div
                key={amenity.id}
                className="p-4 bg-white shadow rounded-lg flex items-center"
              >
                <FontAwesomeIcon
                  icon={["fas", amenity.web_icon]} // Directly use the icon name
                  className="text-teal-600 text-2xl mr-4"
                />
                <span className="text-lg text-gray-800">
                  {amenity.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Amenities;






