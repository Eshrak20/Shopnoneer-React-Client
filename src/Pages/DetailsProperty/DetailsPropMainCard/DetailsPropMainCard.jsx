import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
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
import FavAdd from "../../../Models/FavModel/FavAdd.js"; 
import FavRemove from "../../../Models/FavModel/FavRemove.js";
import Swal from "sweetalert2"; 
import FavModel from "../../../Models/FavModel/FavModel.js";

const DetailsPropMainCard = ({ property }) => {
  const [bookmarked, setBookmarked] = useState({}); 
  useEffect(() => {
    const loadData = async () => {
      try {
        const FavItem = await FavModel(); 
        const initialBookmarks = FavItem.reduce((acc, item) => {
          acc[item.project_id] = true; 
          return acc;
        }, {});
        setBookmarked(initialBookmarks);
      } catch (error) {
        console.error("Failed to fetch home card data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);
  

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

  const handleBookmarkClick = async (id) => {
    try {
      if (bookmarked[id]) {
        await FavRemove(id); // Remove from favorites
        setBookmarked((prev) => ({ ...prev, [id]: false }));
        Swal.fire({
          icon: "success",
          title: "Bookmark Removed",
          text: "This property has been removed from your favorites.",
          confirmButtonColor: "#e53e3e",
        });
      } else {
        await FavAdd(id); // Add to favorites
        setBookmarked((prev) => ({ ...prev, [id]: true }));
        Swal.fire({
          icon: "success",
          title: "Bookmarked!",
          text: "This property has been added to your favorites.",
          confirmButtonColor: "#38b2ac",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        text: "An error occurred while processing your request.",
        confirmButtonColor: "#e53e3e",
      });
      console.error("Failed to toggle bookmark:", error);
    }
  };
  return (
    <>
      <div className="pb-4 mb-7">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="lg:col-span-2 space-y-6 bg-white rounded-lg">
            <div className="flex items-center z-10 py-2 lg:py-0">
              <h1 className="text-3xl mr-4 font-bold text-gray-900 lg:text-5xl text-left">
                {property.title}
              </h1>
              <button
                className={`px-4 py-2 rounded group ${
                  bookmarked[property.id] ? "bg-white" : " bg-teal-500"
                }`}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  className={`text-lg lg:text-2xl ${
                    bookmarked[property.id]
                      ? "text-teal-500 "
                      : " text-gray-100"
                  }`}
                  onClick={() => handleBookmarkClick(property.id)}
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

            <div className="flex justify-start items-center">
              <h3 className="text-3xl font-semibold text-gray-900 mt-4 mb-4 mr-3 lg:mr-16">
                Price: ৳{" "}
                {property.total_price
                  ? property.total_price.toLocaleString()
                  : "Upcoming"}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    window.open(
                      `tel:${property.phone || "+880 1521-498303"}`,
                      "_self"
                    )
                  }
                  className="px-4 py-2 rounded-md bg-teal-500 text-white text-xs lg:text-base hover:bg-teal-600 transition duration-300 shadow-lg"
                >
                  Call
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `mailto:${property.email || "Shohag.cse3@gmail.com"}`,
                      "_self"
                    )
                  }
                  className="px-4 py-2 rounded-md bg-gray-500 text-white text-xs lg:text-base hover:bg-gray-600 transition duration-300 shadow-lg"
                >
                  Email
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 my-4 items-center text-gray-600 text-sm sm:text-lg">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faBed}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span>{property.no_of_beds} Beds</span>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faBath}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span>{property.no_of_baths} Baths</span>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCity}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span>{property.no_of_balcony} Balcony</span>
              </div>

              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faHome}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span>{property.rate_per_sqft} sqft</span>
              </div>
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
          <div className="relative -mt-16 h-64 sm:h-96 md:h-[400px] lg:h-[500px]">
            <GoogleMap property={property} />
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailsPropMainCard;
