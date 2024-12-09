import React, { useEffect, useState } from "react";
import LoadingLottie from "../../../assets/loadingLottie/loadingLottie";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import fetchFavCardData from "../../../Models/FavModel/FavModel";
import fetchFavDataDetails from "../../../Models/FavModel/FavData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faBookmark,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import FavRemove from "../../../Models/FavModel/FavRemove";
import Swal from "sweetalert2";

const FavCard = () => {
  const [loading, setLoading] = useState(true);
  const [favCard, setFavCard] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const projectIds = await fetchFavCardData();

      try {
        const projectDetails = await Promise.all(
          projectIds.map((id) => fetchFavDataDetails(id))
        );

        // Flatten the results or filter as needed
        const validDetails = projectDetails.flat();
        setFavCard(validDetails);
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
        title: "Bookmark Removed",
        text: "This property has been removed from your favorites.",
        confirmButtonColor: "#e53e3e",
      });
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
    <section className="my-7 px-10 sm:px-6 lg:px-8">
      <SectionTitle
        heading="Your Favourite Properties"
        subHeading="Discover and save the properties you love"
      />
      {loading ? (
        <LoadingLottie />
      ) : favCard.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have no favorite properties yet.
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
                  className="text-2xl text-teal-400 cursor-pointer transition duration-300"
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
                <p className="text-gray-500 text-sm sm:text-base my-2">
                  {data.description?.length > 135
                    ? `${data.description
                        .substring(0, 135)
                        .trim()
                        .replace(/[,;:.!?]$/, "")}...`
                    : data.description || "No description available."}
                </p>
                <div className="flex gap-3 my-3">
                  <FontAwesomeIcon icon={faBed} />
                  <span className="border-r-2 pr-2">
                    {data.no_of_beds || 0}
                  </span>
                  <FontAwesomeIcon icon={faBath} />
                  <span className="border-r-2 pr-2">
                    {data.no_of_baths || 0}
                  </span>
                  <FontAwesomeIcon icon={faHome} />
                  <span>{data.no_of_balcony || 0}</span>
                </div>
                <h2 className="flex justify-between text-base sm:text-lg font-semibold text-teal-600 my-2">
                  From ৳{" "}
                  {data.total_price
                    ? data.total_price.toLocaleString()
                    : "Price is upcoming"}
                  <div className="-mt-4">
                    <Link
                      to={`/detailsPropMain/${data.id}`}
                      className="btn bg-teal-500 hover:bg-teal-600 text-white px-4 sm:px-6 py-2"
                    >
                      Details
                    </Link>
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
  );
};

export default FavCard;
