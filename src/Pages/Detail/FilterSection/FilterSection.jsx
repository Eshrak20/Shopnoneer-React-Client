import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import fetchHousingWiseProjects from "../../../Models/HomeModel/HousingWiseProjectModel/HousingWiseProjectModel";

const FilterSection = ({
  sortOption,
  setSortOption,
  setBedCount,
  setBathCount,
  setBalconyCount,
  setHousing,
  housingId,
}) => {
  const [housings, setHousings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedHousingId, setSelectedHousingId] = useState(housingId || "");
  const navigate = useNavigate();

  // Fetch the housing data
  useEffect(() => {
    const loadHousings = async () => {
      try {
        const { housing } = await fetchHousingWiseProjects();
        setHousings(housing);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };
    loadHousings();
  }, []);

  // Retrieve initial values from query parameters
  const initialValues = {
    bedCount: searchParams.get("bedCount") || "",
    bathCount: searchParams.get("bathCount") || "",
    balconyCount: searchParams.get("balconyCount") || "",
    housing: searchParams.get("housingId") || "",
  };

  // Handle changes in filter
  const handleFilterChange = (type, value) => {
    setSearchParams((prevParams) => {
      if (value) prevParams.set(type, value);
      else prevParams.delete(type);
      return prevParams;
    });
    switch (type) {
      case "housingId":
        setSelectedHousingId(value);
        setHousing(value);
        if (value === "") navigate("/detail");
        break;
      case "bedCount":
        setBedCount(value);
        break;
      case "bathCount":
        setBathCount(value);
        break;
      case "balconyCount":
        setBalconyCount(value);
        break;
      default:
        break;
    }
  };

  // Synchronize query parameters with parent state on initial load
  useEffect(() => {
    setBedCount(initialValues.bedCount);
    setBathCount(initialValues.bathCount);
    setBalconyCount(initialValues.balconyCount);
    setHousing(initialValues.housing);
  }, [initialValues, setBedCount, setBathCount, setBalconyCount, setHousing]);

  return (
    <div className="w-full lg:w-1/4 h-full bg-white lg:shadow rounded-lg p-4 space-y-5 lg:sticky top-24 mb-8">
      <h2 className="text-xl font-semibold text-teal-700 -mb-3">ফিল্টার</h2>
      {/* Housing Filter */}
      <div>
        <label className="text-gray-700 font-medium text-sm block mb-1">
          হাউজিং নির্বাচন করুন
        </label>
        <select
          value={selectedHousingId}
          onChange={(e) => handleFilterChange("housingId", e.target.value)}
          className="border rounded p-2 bg-white text-gray-700 focus:outline-none w-full"
        >
          <option value="">সব</option>
          {housings.map((housing) => (
            <option key={housing.id} value={housing.id}>
              {housing.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Option */}
      <div>
        <label className="text-gray-700 font-medium text-sm block mb-1">
          বাছাই করুন
        </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded p-2 bg-white text-gray-700 focus:outline-none w-full"
        >
          <option value="newest">নতুন</option>
          <option value="oldest">পুরাতুন</option>
          <option value="priceHighToLow">মূল্য: উচ্চ থেকে নিম্ন</option>
          <option value="priceLowToHigh">মূল্য: নিম্ন থেকে উচ্চ</option>
        </select>
      </div>

      {/* Bed Count */}
      <div>
        <label className="text-gray-700 font-medium text-sm block mb-1">
          বেডের সংখ্যা
        </label>
        <select
          value={initialValues.bedCount}
          onChange={(e) => handleFilterChange("bedCount", e.target.value)}
          className="border rounded p-2 bg-white text-gray-700 focus:outline-none w-full"
        >
          <option value="">সব</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{`${num}`}</option>
          ))}
        </select>
      </div>

      {/* Bath Count */}
      <div>
        <label className="text-gray-700 font-medium text-sm block mb-1">
          বাথরুমের সংখ্যা
        </label>
        <select
          value={initialValues.bathCount}
          onChange={(e) => handleFilterChange("bathCount", e.target.value)}
          className="border rounded p-2 bg-white text-gray-700 focus:outline-none w-full"
        >
          <option value="">সব</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{`${num}`}</option>
          ))}
        </select>
      </div>

      {/* Balcony Count */}
      <div>
        <label className="text-gray-700 font-medium text-sm block mb-1">
          ব্যালকনির সংখ্যা
        </label>
        <select
          value={initialValues.balconyCount}
          onChange={(e) => handleFilterChange("balconyCount", e.target.value)}
          className="border rounded p-2 bg-white text-gray-700 focus:outline-none w-full"
        >
          <option value="">সব</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{`${num}`}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
