import React, { useEffect, useState } from "react";
import LoadingLottie from "../../../../public/assets/loadingLottie/loadingLottie";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import fetchFavCardData from "../../../Models/FavModel/FavModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faBookmark,
  faBuilding,
  faEnvelope,
  faHome,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import FavRemove from "../../../Models/FavModel/FavRemove";
import Swal from "sweetalert2";
import Spinner from "../../../../public/assets/loadingSpinner/Spinner";

const FavCard = () => {
  const [loading, setLoading] = useState(true);
  const [favCard, setFavCard] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const projectDetails = await fetchFavCardData();
        setFavCard(projectDetails);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleBookmarkClick = async (id) => {
    try {
      await FavRemove(id);
      setFavCard((prev) => prev.filter((item) => item.id !== id)); // Remove from the list
      Swal.fire({
        icon: "success",
        title: "বুকমার্ক সরানো হয়েছে",
        text: "এই প্রপার্টি আপনার প্রিয় তালিকা থেকে সরানো হয়েছে।",
        confirmButtonColor: "#e53e3e",
        confirmButtonText: "ঠিক আছে",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "কর্ম ব্যর্থ হয়েছে",
        text: "আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।",
        confirmButtonColor: "#e53e3e",
        confirmButtonText: "ঠিক আছে",
      });
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <section className="my-7 lg:px-8">
      <SectionTitle
        heading="আপনার পছন্দের ফ্ল্যাট  "
        subHeading="যে ফ্ল্যাটগুলো আপনার হৃদয়ে স্থান পেয়েছে, সেগুলো আবিষ্কার করুন এবং সহজেই সংরক্ষণ করুন"
      />

      {loading ? (
        <>
          <LoadingLottie />
        </>
      ) : favCard.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          আপনার এখনো কোনো পছন্দের ফ্ল্যাট নেই।
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 my-4">
          {favCard.map((data, index) => (
            <div
              key={data.id || index}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform rounded-lg w-full relative"
            >
              <div className="absolute top-2 right-2 z-10">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-2xl text-orange-600 cursor-pointer transition duration-300"
                  onClick={() => handleBookmarkClick(data.id)}
                />
              </div>
              <Link to={`/detailsPropMain/${data.id}`}>
                <img
                  src={data.images?.[0] || "/placeholder.jpg"}
                  alt={data.title || "Property"}
                  className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
                />
              </Link>
              <div className="card-body p-4 sm:p-6">
                <h2 className="card-title text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {data.title || "Untitled Property"}
                </h2>
                <div className="md:text-sm 2xl:text-base text-teal-600 flex flex-col mb-3">
                  <span className="flex lg:items-center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="mt-1 lg:mt-0 mr-2"
                    />
                    {data.housing},{data.upazila},{data.district}
                  </span>
                </div>
                <p className="text-gray-500 text-sm sm:text-base my-2">
                  {data.description?.length > 135
                    ? `${data.description
                        .substring(0, 135)
                        .trim()
                        .replace(/[,;:.!?]$/, "")}...`
                    : data.description || "No description available."}
                </p>
                <div className="flex gap-4 my-4 md:text-xs 2xl:text-base">
                  {/* Bed with animated tooltip */}
                  <div className="relative group">
                    <div className="transition-all duration-200 group-hover:scale-110">
                      <FontAwesomeIcon
                        icon={faBed}
                        className="text-gray-600 group-hover:text-teal-600"
                      />
                      <span className="border-r-2 border-gray-200 pr-3 ml-1">
                        {data.no_of_beds}
                      </span>
                    </div>
                    <div className="absolute z-10 hidden group-hover:flex animate-fadeIn -top-20 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-1.5 px-3 shadow-lg">
                        বিছানার সংখ্যা {data.no_of_beds}
                      </div>
                    </div>
                  </div>

                  {/* Bath with animated tooltip */}
                  <div className="relative group">
                    <div className="transition-all duration-200 group-hover:scale-110">
                      <FontAwesomeIcon
                        icon={faBath}
                        className="text-gray-600 group-hover:text-teal-600"
                      />
                      <span className="border-r-2 border-gray-200 pr-3 ml-1">
                        {data.no_of_baths}
                      </span>
                    </div>
                    <div className="absolute z-10 hidden group-hover:flex animate-fadeIn -top-20 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-1.5 px-3 shadow-lg">
                        গোসলখানার সংখ্যা {data.no_of_baths}
                      </div>
                    </div>
                  </div>

                  {/* Building with animated tooltip */}
                  <div className="relative group">
                    <div className="transition-all duration-200 group-hover:scale-110">
                      <FontAwesomeIcon
                        icon={faBuilding}
                        className="text-gray-600 group-hover:text-teal-600"
                      />
                      <span className="lg:border-r-2 border-gray-200 pr-3 ml-1">
                        {data.no_of_balcony}
                      </span>
                    </div>
                    <div className="absolute z-10 hidden group-hover:flex animate-fadeIn -top-20 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-1.5 px-3 shadow-lg">
                        বারান্দার সংখ্যা {data.no_of_balcony}
                      </div>
                    </div>
                  </div>

                  {/* Home with animated tooltip (hidden on mobile) */}
                  <div className="hidden lg:block relative group">
                    <div className="transition-all duration-200 group-hover:scale-110">
                      <FontAwesomeIcon
                        icon={faHome}
                        className="text-gray-600 group-hover:text-teal-600"
                      />
                      <span className="ml-2 text-sm">
                        {data.floor_area} বর্গফুট
                      </span>
                    </div>
                    <div className="absolute z-10 hidden group-hover:flex animate-fadeIn -top-20 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-3 px-3 shadow-lg">
                        জায়গা {data.floor_area}বর্গফুট
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between  md:sm 2xl:lg font-semibold text-teal-600 my-2">
                  <div className="text-xs md:text-sm 2xl:text-lg">
                    {data.total_price ? (
                      <>৳{data.total_price.toLocaleString()} টাকা</>
                    ) : (
                      <>মূল্য শীঘ্রই প্রকাশিত হবে!</>
                    )}
                  </div>
                  <div className="flex justify-end items-center space-x-2">
                    <div className="space-x-1 flex">
                      {/* Call Button */}
                      <button
                        onClick={() =>
                          window.open(
                            `tel:${data.phone || "+880 1521-498303"}`,
                            "_self"
                          )
                        }
                        className="flex items-center justify-center text-xs 2xl:text-sm px-2 py-1 2xl:px-3 2xl:py-2 rounded-sm 2xl:rounded-md bg-teal-500 text-white hover:bg-teal-700 transition duration-300"
                      >
                        <FontAwesomeIcon icon={faPhone} />
                      </button>

                      {/* Email Button */}
                      <button
                        onClick={() =>
                          window.open(
                            `mailto:${data.email || "Shohag.cse3@gmail.com"}`,
                            "_self"
                          )
                        }
                        className="flex items-center justify-center text-xs 2xl:text-sm px-2 py-1 2xl:px-3 2xl:py-2 rounded-sm 2xl:rounded-md bg-red-500 text-white  hover:bg-red-700 transition duration-300"
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </button>
                    </div>

                    {/* বিস্তারিত Button */}
                    <Link
                      to={`/detailsPropMain/${data.id}`}
                      className="px-3 py-1 2xl:px-2 2xl:py-1 text-xs 2xl:text-base rounded-sm 2xl:rounded-md bg-gray-900 text-white  hover:bg-gray-700 hover:text-gray-100 transition duration-300"
                    >
                      বিস্তারিত
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center my-14">
        <Link
          to="/detail"
          className="btn mb-14 bg-teal-500 text-white px-4 py-2 sm:px-6 sm:py-2 hover:bg-teal-600 transition duration-300 shadow-lg"
        >
          সব অ্যাপার্টমেন্ট দেখুন
        </Link>
      </div>
    </section>
  );
};

export default FavCard;
