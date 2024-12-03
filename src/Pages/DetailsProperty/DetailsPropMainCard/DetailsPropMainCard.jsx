import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import {
  faBath,
  faBed,
  faHome,
  faCity,
  faMapMarkerAlt,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import GoogleMap from "../../../Components/GoogleMap/GoogleMap";
import "./DetailsPropMainCard.css";

const DetailsPropMainCard = ({ property }) => {
  const capitalizeFirstChar = (str) => {
    if (!str || str.trim() === "") {
      return "Input string is empty.";
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="pb-4 mb-7">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="lg:col-span-2 space-y-6 bg-white rounded-lg">
            {/* Bookmark button */}

            <div className="flex items-center z-10 px-4 py-2 lg:px-0 lg:py-0">
              <h1 className="text-3xl mr-4 font-bold text-gray-900 lg:text-5xl">
                {property.title}
              </h1>
              <button className="bg-teal-500 px-4 py-2 rounded group hover:bg-white">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-lg text-gray-100 group-hover:text-teal-600 lg:text-2xl"
                />
              </button>
            </div>

            <h4 className="text-xl text-teal-600 flex flex-col mb-4">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {capitalizeFirstChar(property.division)},{" "}
                {capitalizeFirstChar(property.district)},{" "}
                {capitalizeFirstChar(property.upazila)},{" "}
                {capitalizeFirstChar(property.housing)},{" "}
              </span>
            </h4>

            <h3 className="text-3xl font-semibold text-gray-900 mt-4 mb-4">
              Price: ৳{" "}
              {property.total_price
                ? property.total_price.toLocaleString()
                : "Upcoming"}
            </h3>

            <div className="flex gap-4 my-4 items-center text-gray-600 text-lg">
              <FontAwesomeIcon icon={faBed} />
              <span>{property.no_of_beds} Beds</span>
              <FontAwesomeIcon icon={faBath} />
              <span>{property.no_of_baths} Baths</span>
              <FontAwesomeIcon icon={faCity} />
              <span>{property.no_of_balcony} Balcony</span>
              <FontAwesomeIcon icon={faHome} />
              <span>{property.rate_per_sqft} sqft</span>
            </div>

            <div className="my-4">
              <h4 className="text-xl mb-2 font-semibold text-gray-900">
                Overview
              </h4>
              <p className="text-gray-600 text-lg">{property.description}</p>
            </div>

            <div className="my-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Additional Information
              </h4>
              <p className="text-gray-600 text-lg">
                Plot: {property.plot}, Road: {property.road}
              </p>
              <p className="text-gray-600 text-lg">
                Block: {property.block}, Plot Size: {property.plot_size} sqft
              </p>
              <p className="text-gray-600 text-lg">
                Floor Area: {property.floor_area} sqft, Floor Number:{" "}
                {property.floor_no}
              </p>
            </div>
          </div>
          <div className="-mt-16">
            <GoogleMap></GoogleMap>
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailsPropMainCard;
