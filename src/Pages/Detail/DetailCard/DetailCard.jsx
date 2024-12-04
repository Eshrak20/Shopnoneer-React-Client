import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faBed, faBookmark, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DetailCard = ({ sortedProjects }) => {
  // if (isLoading) return <LoadingSpinner />;


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-6 my-4 mx-7 lg:mx-0">
      {sortedProjects.map((data, index) => (
        <div
        key={data.id || index}
        className="card bg-base-100 shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out transform rounded-lg w-full relative" // Added relative positioning for card
      >
        {/* Bookmark icon */}
        <div className="absolute top-2 right-2 z-10">
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-gray-50 text-2xl cursor-pointer hover:text-teal-400 transition duration-300"
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
            <h2 className="card-title text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {data.title}
            </h2>
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
  );
};

export default DetailCard;
