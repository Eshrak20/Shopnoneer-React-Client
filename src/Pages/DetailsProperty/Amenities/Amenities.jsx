import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faWifi, faTv, faShieldAlt, faFireAlt, faBus, faRecycle, faHandHoldingWater } from "@fortawesome/free-solid-svg-icons";
import AmenitiesModel from "../../../Models/DetailsPropertyModel/AmenitiesModel/AmenitiesModel"; // Adjust the import path

const amenitiesData = [
  new AmenitiesModel(1, "Electricity Backup", faBolt),
  new AmenitiesModel(2, "Electricity", faBolt),
  new AmenitiesModel(3, "Prayer Room", faHandHoldingWater),
  new AmenitiesModel(4, "Broadband Internet", faWifi),
  new AmenitiesModel(5, "Reception/Waiting Area", faShieldAlt),
  new AmenitiesModel(6, "Satellite/Cable TV", faTv),
  new AmenitiesModel(7, "CCTV Security", faShieldAlt),
  new AmenitiesModel(8, "Fire Exit", faFireAlt),
  new AmenitiesModel(9, "Maintenance Staff", faShieldAlt),
  new AmenitiesModel(10, "Cleaning Services", faRecycle),
  new AmenitiesModel(11, "Waste Disposal", faRecycle),
  new AmenitiesModel(12, "Nearby Public Transport", faBus),
  new AmenitiesModel(13, "Lobby in Building", faShieldAlt),
  new AmenitiesModel(14, "Elevators in Building", faShieldAlt),
  new AmenitiesModel(15, "Guard/ Security Staff", faShieldAlt),
];

const Amenities = () => {
  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Amenities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenitiesData.map((amenity) => (
          <div key={amenity.id} className="p-4 bg-white shadow rounded-lg flex items-center">
            <FontAwesomeIcon icon={amenity.icon} className="text-teal-600 text-2xl mr-4" />
            <span className="text-lg text-gray-800">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
