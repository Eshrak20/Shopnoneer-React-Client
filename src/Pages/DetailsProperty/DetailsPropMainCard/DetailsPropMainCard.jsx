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
        setBookmarked({
          [property.id]: FavItem.some((fav) => fav.id === property.id),
        });
      } catch (error) {
        console.error("Failed to fetch bookmark data:", error);
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

  const handleBookmarkClick = async (id) => {
    try {
      if (bookmarked[id]) {
        await FavRemove(id); // Remove from favorites
        setBookmarked((prev) => ({ ...prev, [id]: false }));
        Swal.fire({
          icon: "success",
          title: "বুকমার্ক মুছে ফেলা হয়েছে",
          text: "এই সম্পত্তিটি আপনার প্রিয় তালিকা থেকে মুছে ফেলা হয়েছে।",
          confirmButtonColor: "#e53e3e",
        });
      } else {
        await FavAdd(id); // Add to favorites
        setBookmarked((prev) => ({ ...prev, [id]: true }));
        Swal.fire({
          icon: "success",
          title: "বুকমার্ক করা হয়েছে!",
          text: "এই ফ্ল্যাটটি আপনার প্রিয় তালিকায় যোগ করা হয়েছে।",
          confirmButtonColor: "#38b2ac",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ক্রিয়া ব্যর্থ হয়েছে",
        text: "আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।",
        confirmButtonColor: "#e53e3e",
      });
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <>
      <div className="pb-4 mb-7">
        <section className="p-2 grid grid-cols-1 lg:grid-cols-3 gap-6 border-none lg:p-6 lg:bg-gray-50  rounded-xl lg:shadow-md">
          <div className="lg:col-span-2 space-y-6  rounded-xl lg:p-6 ">
            <div className="flex justify-between items-center">
              <div className="w-full lg:flex-1">
                <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl text-left">
                  {property.title}
                </h1>
              </div>
              <div className="mt-2 lg:mt-0 relative group">
                <button
                  className={`px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
                    bookmarked[property.id]
                      ? "bg-white border border-teal-500"
                      : "bg-teal-500 hover:bg-teal-600"
                  }`}
                  onClick={() => handleBookmarkClick(property.id)}
                >
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={`text-xl lg:text-2xl transition-all duration-300 ${
                      bookmarked[property.id] ? "text-teal-500" : "text-white"
                    }`}
                  />
                  <span className="absolute bottom-full mb-10 left-1/2 transform -translate-x-1/2 text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p
                      className={`${
                        bookmarked[property.id]
                          ? "text-orange-500"
                          : "text-teal-500"
                      } transition-colors duration-300`}
                    >
                      {bookmarked[property.id] ? "Remove" : "Save"}
                    </p>
                  </span>
                </button>
              </div>
            </div>

            <h4 className="text-xl text-teal-600 flex flex-col mb-4">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {capitalizeFirstChar(property.division)},{" "}
                {capitalizeFirstChar(property.district)},{" "}
                {capitalizeFirstChar(property.upazila)},{" "}
                {capitalizeFirstChar(property.housing)}
              </span>
            </h4>

            <div className="flex justify-center lg:justify-start items-center">
              <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mt-4 mb-4 mr-3 lg:mr-16">
                মূল্য: ৳{" "}
                {property.total_price
                  ? property.total_price.toLocaleString()
                  : "মূল্য শীঘ্রই প্রকাশিত হবে!"}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    window.open(
                      `tel:${property.phone || "+880 1521-498303"}`,
                      "_self"
                    )
                  }
                  className="px-4 py-2 rounded-md bg-teal-500 text-white  text-xs lg:text-base hover:bg-teal-600 transition duration-300 shadow-lg"
                >
                  কল
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `mailto:${property.email || "Shohag.cse3@gmail.com"}`,
                      "_self"
                    )
                  }
                  className="px-4 py-2  rounded-md bg-gray-500 text-white text-xs lg:text-base hover:bg-gray-600 transition duration-300 shadow-lg"
                >
                  ইমেইল
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 my-6 text-gray-600 text-sm sm:text-lg">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faBed}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span>{property.no_of_beds} বেড</span>
              </div>

              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faBath}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span>{property.no_of_baths} বাথরুম</span>
              </div>

              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faCity}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span>{property.no_of_balcony} ব্যালকনি</span>
              </div>

              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faHome}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <span>{property.rate_per_sqft} বর্গফুট</span>
              </div>
            </div>

            <div className="my-6">
              <h4 className="text-xl mb-2 font-semibold text-gray-900">
                সামগ্রিক ধারণা
              </h4>
              <p className="text-gray-600 text-lg">{property.description}</p>
            </div>

            <div className="my-6">
              <h4 className="text-lg font-semibold text-gray-900">
                অতিরিক্ত তথ্য
              </h4>
              <p className="text-gray-600 text-lg">
                ফ্লোর আয়তনঃ {property.floor_area} বর্গফুট (sqft)
              </p>
              <p className="text-gray-600 text-lg">
                তলার সংখ্যা: {property.floor_no}
              </p>
            </div>
          </div>
          <div className="relative  h-64 sm:h-96 md:h-[400px] lg:h-[500px]">
            <GoogleMap property={property} />
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailsPropMainCard;
