import React, { useEffect, useState, forwardRef } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faHome,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import MinCard from "../MinCard/MinCard";
import { Link } from "react-router-dom";
import fetchHomeCardData from "../../../Models/HomeModel/HomeCardModel/HomeCardModel";
import LoadingLottie from "../../../assets/loadingLottie/loadingLottie";
import FavAdd from "../../../Models/FavModel/FavAdd.js";
import FavRemove from "../../../Models/FavModel/FavRemove";
import Swal from "sweetalert2";
import FavModel from "../../../Models/FavModel/FavModel.js";

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
  const displayedCards = homeCard.slice().reverse().slice(0, 6);

  const handleBookmarkClick = async (id) => {
    try {
      if (bookmarked[id]) {
        await FavRemove(id); // Remove from favorites
        setBookmarked((prev) => ({ ...prev, [id]: false }));
        Swal.fire({
          icon: "success",
          title: "বুকমার্ক সরানো হয়েছে",
          text: "এই ফ্ল্যাটটি আপনার পছন্দের তালিকা থেকে অপসারিত হয়েছে।",
          confirmButtonColor: "#e53e3e",
        });
      } else {
        await FavAdd(id); // Add to favorites
        setBookmarked((prev) => ({ ...prev, [id]: true }));
        Swal.fire({
          icon: "success",
          title: "বুকমার্ক করা হয়েছে!",
          text: "এই ফ্ল্যাটটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে।",
          confirmButtonColor: "#38b2ac",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "কার্যক্রম ব্যর্থ হয়েছে",
        text: "আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে।",
        confirmButtonColor: "#e53e3e",
      });
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <MinCard />
      </div>
      <section ref={ref} className="px-6 lg:px-0">
        <SectionTitle
          heading="সর্বশেষ প্রপার্টি "
          subHeading="আমাদের নতুন প্রপার্টি গুলি দেখে নিন"
        />
        {loading ? (
          <LoadingLottie />
        ) : (
          <div className="p-0 lg:p-10  max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 ">
            {displayedCards.map((data, index) => (
              <div
                key={data.id || index}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform rounded-lg w-full relative "
              >
                <div className="absolute top-2 right-2 z-10">
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faBookmark}
                      className={`text-2xl cursor-pointer transition duration-300 ${
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
                        {bookmarked[data.id] ? "Remove" : "Save"}
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
                    <h2 className="card-title text-xl font-semibold text-gray-800 mb-3 hover:text-teal-500">
                      {data.title}
                    </h2>
                  </Link>

                  <p className="text-gray-500 text-sm sm:text-base my-2">
                    {data.description?.length > 35
                      ? `${data.description
                          .substring(0, 135)
                          .trim()
                          .replace(/[,;:.!?]$/, "")}...`
                      : data.description || ""}
                  </p>
                  <div className="flex gap-3 my-3">
                    <FontAwesomeIcon icon={faBed} />
                    <span className="border-r-2 pr-2">{data.no_of_beds}</span>
                    <FontAwesomeIcon icon={faBath} />
                    <span className="border-r-2 pr-2">{data.no_of_baths}</span>
                    <FontAwesomeIcon icon={faHome} />
                    <span>{data.no_of_balcony}</span>
                  </div>
                  <h2 className="flex items-center justify-between lg:text-lg font-semibold text-teal-600 my-2">
                    <div>
                      {data.total_price ? (
                        <>
                          শুরু মাত্র ৳ {data.total_price.toLocaleString()}
                          <p>থেকে</p>
                        </>
                      ) : (
                        <>মূল্য শীঘ্রই প্রকাশিত হবে!</>
                      )}
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        onClick={() =>
                          window.open(
                            `tel:${data.phone || "+880 1521-498303"}`,
                            "_self"
                          )
                        }
                        className="px-4 py-2  text-xs lg:text-base  rounded-md bg-teal-500 text-white hover:bg-teal-600 transition duration-300 shadow-lg"
                      >
                        কল
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            `mailto:${data.email || "Shohag.cse3@gmail.com"}`,
                            "_self"
                          )
                        }
                        className="px-4 py-2  text-xs lg:text-base   rounded-md bg-gray-500 text-white hover:bg-gray-600 transition duration-300 shadow-lg ml-2"
                      >
                        ইমেইল
                      </button>
                    </div>
                  </h2>
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
            সব অ্যাপার্টমেন্ট দেখুন
          </Link>
        </div>
      </section>
      <hr />
    </>
  );
});

export default HomeCard;
