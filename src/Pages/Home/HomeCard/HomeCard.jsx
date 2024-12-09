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
        const FavItem = await FavModel(); 
        const data = await fetchHomeCardData(); 
        setHomeCard(data);
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
  

  const displayedCards = homeCard.slice(0, 6);

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
      <div className="hidden lg:block">
        <MinCard />
      </div>

      <section ref={ref} className="px-6 lg:px-0">
        <SectionTitle
          heading="Most Recent Properties"
          subHeading="Check out some of our latest properties"
        />
        {loading ? (
          <LoadingLottie />
        ) : (
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 my-4">
            {displayedCards.map((data, index) => (
              <div
                key={data.id || index}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform rounded-lg w-full relative"
              >
                <div className="absolute top-2 right-2 z-10">
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={`text-2xl cursor-pointer transition duration-300 ${
                      bookmarked[data.id] ? "text-teal-400" : "text-gray-50"
                    }`}
                    onClick={() => handleBookmarkClick(data.id)}
                  />
                </div>
                <Link to={`/detailsPropMain/${data.id}`}>
                  <img
                    src={data.images[0]}
                    alt={data.title}
                    className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
                  />
                </Link>
                <div className="card-body p-4 sm:p-6">
                  <Link to={`/detailsPropMain/${data.id}`}>
                    <h2 className="card-title text-lg sm:text-xl font-semibold text-gray-900 mb-2">
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
                  <h2 className="flex justify-between text-base sm:text-lg font-semibold text-teal-600 my-2">
                    From ৳{" "}
                    {data.total_price
                      ? data.total_price.toLocaleString()
                      : "Price is upcoming"}
                    <div className="flex justify-end items-center -mr-3">
                      <button
                        onClick={() =>
                          window.open(
                            `tel:${data.phone || "+880 1521-498303"}`,
                            "_self"
                          )
                        }
                        className="px-4 py-2 rounded-md bg-teal-500 text-white text-xs lg:text-base hover:bg-teal-600 transition duration-300 shadow-lg mr-1"
                      >
                        Call
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            `mailto:${data.email || "Shohag.cse3@gmail.com"}`,
                            "_self"
                          )
                        }
                        className="px-4 py-2 rounded-md bg-gray-500 text-white text-xs lg:text-base hover:bg-gray-600 transition duration-300 shadow-lg"
                      >
                        Email
                      </button>
                    </div>
                  </h2>
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
            View All Properties
          </Link>
        </div>
      </section>
      <hr />
    </>
  );
});

export default HomeCard;
