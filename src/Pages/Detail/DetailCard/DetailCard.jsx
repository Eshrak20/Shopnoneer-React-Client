import { useEffect, useState } from "react";
import useProjectList from "../../../Models/FilterSectionModel/FilterSectionModel";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";
import FilterSection from "../FilterSection/FilterSection";

const DetailCard = () => {
  const { filters, filteredProjects, applyFilters } = useProjectList();
  const [selectedFilters, setSelectedFilters] = useState({
    division: [],
    district: [],
    upazila: [],
    housing: [],
    bath: [],
    bed: [],
    balcony: [],
  });

  const [sortOption, setSortOption] = useState("newest");

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500"></div>
    </div>
  );

  useEffect(() => {
    applyFilters(selectedFilters);
  }, [selectedFilters, applyFilters]);

  useEffect(() => {
    if (sortOption === "newest") {
      filteredProjects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOption === "priceHighToLow") {
      filteredProjects.sort((a, b) => b.total_price - a.total_price);
    } else if (sortOption === "priceLowToHigh") {
      filteredProjects.sort((a, b) => a.total_price - b.total_price);
    }
  }, [sortOption, filteredProjects]);

  if (!filteredProjects.length) return <LoadingSpinner />;

  return (
    <>
      <div className="flex flex-col items-center mb-4 space-y-4">
        {/* Filter Section at the top */}
        <FilterSection
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          filters={filters}
        />

        {/* Sort Options */}
        <div className="flex justify-end mb-4 w-full max-w-screen-lg">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600"
          >
            <option value="newest">Newest</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col mb-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
            {filteredProjects.map((item) => (
              <div
              key={item.id}
              className="border rounded-lg shadow-md p-4 bg-white transition-transform duration-300 transform"
            >
              <div className="flex flex-col">
                <Link to={`/detailsPropMain/${item.id}`}>
                  <img
                    src={item.images[0] || "https://via.placeholder.com/350x200"}
                    alt="Project"
                    className="rounded-lg w-[350px] h-[200px] md:w-[700px] md:h-[450px]"
                  />
                </Link>

                <Link to={`/detailsPropMain/${item.id}`} className="text-xl md:text-2xl font-bold text-teal-600 mt-2">
                  {item.title}
                </Link>
                
                <h4 className="text-sm md:text-base font-medium text-gray-700 mt-1 mb-3">
                  Road {item.housing}, Block {item.block}, Plot {item.plot}
                </h4>
                <p className="hidden md:block text-gray-600 text-base my-2 line-clamp-5 overflow-hidden">
                  {item.description?.length > 135
                    ? `${item.description.substring(0, 135).trim().replace(/[,;:.!?]$/, "")}...`
                    : item.description || ""}
                </p>

                {/* Additional Property Details with Icons */}
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-teal-600">
                      BDT {item.total_price ? item.total_price.toLocaleString() : "0"}
                    </h1>
                    <div className="mt-4 flex space-x-2">
                      <a
                        href={`mailto:${item.owner_email}`}
                        className="bg-teal-500 text-white text-sm text-center px-4 py-2 md:text-lg hover:bg-teal-600 transition duration-300 shadow-lg rounded-md"
                      >
                        Email
                      </a>
                      <button
                        className="bg-teal-500 text-white text-sm text-center px-4 py-2 md:text-lg hover:bg-teal-600 transition duration-300 shadow-lg rounded-md"
                        onClick={() => alert("Call button clicked!")}
                      >
                        Call
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:flex gap-4">
                    <div className="flex-col text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FaBed className="text-teal-500" />
                        <span>{item.no_of_beds}</span>
                      </div>
                      <small>Bedrooms</small>
                    </div>
                    <div className="flex-col text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FaBath className="text-teal-500" />
                        <span>{item.no_of_baths}</span>
                      </div>
                      <small>Showers</small>
                    </div>
                    <div className="flex-col text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MdSquareFoot className="text-teal-500" />
                        <span>{item.floor_area} sqft</span>
                      </div>
                      <small>Floor Area</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default DetailCard;
