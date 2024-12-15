import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faBookmark,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FavAdd from "../../../Models/FavModel/FavAdd";
import FavRemove from "../../../Models/FavModel/FavRemove";
import LoadingLottie from "../../../assets/loadingLottie/loadingLottie";
import Swal from "sweetalert2";
import FavModel from "../../../Models/FavModel/FavModel";

const DetailCard = ({ sortedProjects, isLoading }) => {
  const [bookmarked, setBookmarked] = useState({});
  const data = sortedProjects;

  useEffect(() => {
    const loadData = async () => {
      try {
        // const FavItem = await FavModel();
        // const initialBookmarks = {};
        // data.forEach((item) => {
        //   if (FavItem.some((fav) => fav.id === item.id)) {
        //     initialBookmarks[item.id] = true;
        //   }
        // });
        // setBookmarked(initialBookmarks);
      } catch (error) {
        console.error("Failed to fetch home card data:", error);
      }
    };

    loadData();
  }, [data]);

  const handleBookmarkClick = async (id) => {
    try {
      if (bookmarked[id]) {
        await FavRemove(id);
        setBookmarked((prev) => ({ ...prev, [id]: false }));
        Swal.fire({
          icon: "success",
          title: "বুকমার্ক মুছে ফেলা হয়েছে",
          text: "এই সম্পত্তিটি আপনার প্রিয় তালিকা থেকে মুছে ফেলা হয়েছে।",
          confirmButtonColor: "#e53e3e",
        });
      } else {
        await FavAdd(id);
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

  const LoadingSpinner = () => <LoadingLottie />;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="lg:px-7 p-0 grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-6 my-4 mx-2 lg:mx-0">
      {sortedProjects.map((data, index) => (
        <div
          key={data.id || index}
          className="card bg-base-100 shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform rounded-lg w-full relative"
        >
          <div className="absolute top-2 right-2 z-10">
            <div className="relative group">
              <FontAwesomeIcon
                icon={faBookmark}
                className={`text-2xl cursor-pointer transition duration-300 ${
                  bookmarked[data.id]
                    ? "text-teal-500 group-hover:text-orange-500"
                    : "text-gray-100 group-hover:text-teal-500"
                }`}
                onClick={() => handleBookmarkClick(data.id)}
              />

              {/* Tooltip */}
              <span className="absolute bottom-full mb-6 left-1/2 transform -translate-x-1/2 text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p
                  className={`${
                    bookmarked[data.id] ? "text-orange-500" : "text-teal-500"
                  } transition-colors duration-300`}
                >
                  {bookmarked[data.id] ? "Remove" : "Save"}
                </p>
              </span>
            </div>
          </div>
          <Link to={`/detailsPropMain/${data.id}`} className="relative group">
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={data.images[0]}
                alt={data.title}
                className="w-full h-48 sm:h-56 object-cover  transition-all duration-300 ease-out"
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
                    &nbsp;থেকে
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
  );
};

export default DetailCard;
