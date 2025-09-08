import React, { useEffect, useState, forwardRef } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
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
import MinCard from "../MinCard/MinCard";
import { Link } from "react-router-dom";
import LoadingLottie from "../../../../public/assets/loadingLottie/loadingLottie";
import FavAdd from "../../../Models/FavModel/FavAdd.js";
import FavRemove from "../../../Models/FavModel/FavRemove";
import Swal from "sweetalert2";
import FavModel from "../../../Models/FavModel/FavModel.js";
import fetchHomeCardData from "../../../Models/HomeModel/HomeCardModel/HomeCardModel.js";

const HomeCard = forwardRef((props, ref) => {
  const [homeCard, setHomeCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        // const FavItem = await FavModel();
        const data = await fetchHomeCardData();
        setHomeCard(data);
        // Prepare initial bookmarked state
        // const initialBookmarks = {};
        // data.forEach((item) => {
        //   if (FavItem.some((fav) => fav.id === item.id)) {
        //     initialBookmarks[item.id] = true;
        //   }
        // });
        // setBookmarked(initialBookmarks);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleBookmarkClick = async (id) => {
    try {
      if (bookmarked[id]) {
        await FavRemove(id);
        setBookmarked((prev) => ({ ...prev, [id]: false }));
        Swal.fire({
          icon: "success",
          title: "বুকমার্ক সরানো হয়েছে",
          text: "এই ফ্ল্যাটটি আপনার পছন্দের তালিকা থেকে অপসারিত হয়েছে।",
          confirmButtonColor: "#e53e3e",
          confirmButtonText: "ঠিক আছে",
          timer: 1000,
        });
      } else {
        const success = await FavAdd(id); // Check success status
        if (success) {
          setBookmarked((prev) => ({ ...prev, [id]: true }));
          Swal.fire({
            icon: "success",
            title: "বুকমার্ক করা হয়েছে!",
            text: "এই ফ্ল্যাটটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে।",
            confirmButtonColor: "#38b2ac",
            confirmButtonText: "ঠিক আছে",
            timer: 1000,
          });
        }
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <MinCard />
      </div>
      <section ref={ref} className="px-6 mb-10 lg:px-0">
        <SectionTitle
          heading="ফ্ল্যাট/প্রপার্টি সমূহ"
          subHeading="আমাদের প্রপার্টি গুলো দেখে নিন"
        />
        {loading ? (
          <LoadingLottie />
        ) : (
          <div className="p-0 md:px-32 2xl:px-5  max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 ">
            {homeCard.map((data, index) => (
              <div
                key={data.id || index}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform rounded-lg w-full relative"
              >
                <div className="absolute top-2 right-2 z-10">
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={`md:text-lg 2xl:text-2xl cursor-pointer transition duration-300 ${
                        bookmarked[data.id]
                          ? "text-teal-400 group-hover:text-orange-500"
                          : "text-gray-100 group-hover:text-teal-500"
                      }`}
                      onClick={() => handleBookmarkClick(data.id)}
                    />
                    {/* Tooltip */}
                    <span className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p
                        className={`${
                          bookmarked[data.id]
                            ? "text-orange-500"
                            : "text-teal-500"
                        } transition-colors duration-300`}
                      >
                        {bookmarked[data.id] ? "মুছুন" : "সংরক্ষণ"}
                      </p>
                    </span>
                  </div>
                </div>

                <Link
                  to={`/detailsPropMain/${data.id}`}
                  className="relative group"
                >
                  <div className="overflow-hidden rounded-t-lg">
                    <img
                      src={data.images[0]}
                      alt={data.title}
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                  </div>
                </Link>

                <div className="card-body p-4 sm:p-6">
                  <Link to={`/detailsPropMain/${data.id}`}>
                    <h2 className="card-title md:text-lg 2xl:text-xl font-semibold text-gray-800 hover:text-teal-500">
                      {data.title}
                    </h2>
                  </Link>
                  <div className="md:text-sm 2xl:text-base text-teal-600 flex flex-col mb-3">
                    <span className="flex lg:items-center">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="mt-1 lg:mt-0 mr-2"
                      />
                       {data.housing},{data.upazila},{data.district}
                    </span>
                  </div>

                  <p className="text-gray-500  my-2 text-xs md:text-xs 2xl:text-sm">
                    {data.description?.length > 35
                      ? `${data.description
                          .substring(0, 135)
                          .trim()
                          .replace(/[,;:.!?]$/, "")}...`
                      : data.description || ""}
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
        <div className="text-center">
          <Link
            to="/detail"
            className="btn my-16 bg-teal-500 text-white px-4 py-2 sm:px-6 sm:py-2 hover:bg-teal-600 transition duration-300 shadow-lg"
          >
            আরো অ্যাপার্টমেন্ট দেখুন
          </Link>
        </div>
      </section>
    </>
  );
});

export default HomeCard;
