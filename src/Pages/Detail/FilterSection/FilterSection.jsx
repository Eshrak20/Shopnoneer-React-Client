import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSection = ({
  sortOption,
  setSortOption,
  setBedCount,
  setBathCount,
  setBalconyCount,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Retrieve initial values from query parameters
  const initialBedCount = searchParams.get("bedCount") || "";
  const initialBathCount = searchParams.get("bathCount") || "";
  const initialBalconyCount = searchParams.get("balconyCount") || "";

  // Update query parameters and parent state for bed count
  const handleBedChange = (value) => {
    setSearchParams((prevParams) => {
      prevParams.set("bedCount", value);
      return prevParams;
    });
    setBedCount(value);
  };

  // Update query parameters and parent state for bath count
  const handleBathChange = (value) => {
    setSearchParams((prevParams) => {
      prevParams.set("bathCount", value);
      return prevParams;
    });
    setBathCount(value);
  };

  // Update query parameters and parent state for balcony count
  const handleBalconyChange = (value) => {
    setSearchParams((prevParams) => {
      prevParams.set("balconyCount", value);
      return prevParams;
    });
    setBalconyCount(value);
  };

  // Synchronize query parameters with parent state on initial load
  useEffect(() => {
    setBedCount(initialBedCount);
    setBathCount(initialBathCount);
    setBalconyCount(initialBalconyCount);
  }, [
    initialBedCount,
    initialBathCount,
    initialBalconyCount,
    setBedCount,
    setBathCount,
    setBalconyCount,
  ]);

  return (
    <>
      <div className="w-full lg:w-1/4 h-full bg-white shadow-lg rounded-lg p-6 space-y-6 lg:sticky top-36 mb-10">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Filters</h2>

        {/* Sort Option */}
        <div>
          <label className="text-teal-600 font-medium block mb-2">
            Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600 w-full"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="priceLowToHigh">Price: Low to High</option>
          </select>
        </div>

        {/* Bed Count */}
        <div>
          <label className="text-teal-600 font-medium block mb-2">
            Number of Beds
          </label>
          <select
            value={initialBedCount}
            onChange={(e) => handleBedChange(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600 w-full"
          >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Bath Count */}
        <div>
          <label className="text-teal-600 font-medium block mb-2">
            Number of Baths
          </label>
          <select
            value={initialBathCount}
            onChange={(e) => handleBathChange(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600 w-full"
          >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {/* Balcony Count */}
        <div>
          <label className="text-teal-600 font-medium block mb-2">
            Number of Balconies
          </label>
          <select
            value={initialBalconyCount}
            onChange={(e) => handleBalconyChange(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600 w-full"
          >
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
