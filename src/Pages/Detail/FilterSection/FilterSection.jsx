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
  const navigate = useNavigate(); // Initialize useNavigate hook

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
  const initialBedCount = searchParams.get("bedCount") || "";
  const initialBathCount = searchParams.get("bathCount") || "";
  const initialBalconyCount = searchParams.get("balconyCount") || "";
  const initialHousing = searchParams.get("housingId") || "";

  // Handle housing ID change
  const handleHousingChange = (value) => {
    setSelectedHousingId(value); // Update selectedHousingId state
    if (value === "") {
      navigate("/detail"); // Reset to /detail if "সব" is selected
    } else {
      setSelectedHousingId(value);
      setSearchParams((prevParams) => {
        prevParams.set("housingId", value); // Set new housingId
        return prevParams;
      });
      setHousing(value);
    }
  };
  
  

  // Handle other filter changes (bedCount, bathCount, balconyCount)
  const handleBedChange = (value) => {
    setSearchParams((prevParams) => {
      prevParams.set("bedCount", value);
      return prevParams;
    });
    setBedCount(value);
  };

  const handleBathChange = (value) => {
    setSearchParams((prevParams) => {
      prevParams.set("bathCount", value);
      return prevParams;
    });
    setBathCount(value);
  };

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
    setHousing(initialHousing);
  }, [
    initialBedCount,
    initialBathCount,
    initialBalconyCount,
    initialHousing,
    setBedCount,
    setBathCount,
    setBalconyCount,
    setHousing,
  ]);

  return (
    <>
      <div className="w-full lg:w-1/4 h-full bg-white shadow-lg rounded-lg p-6 space-y-6 lg:sticky top-36 mb-10">
        <h2 className="text-3xl font-bold text-teal-600 mb-4">ফিল্টার</h2>

        {/* Housing Filter */}
        <div>
          <label className="text-teal-600 font-medium text-lg block mb-2">
            হাউজিং নির্বাচন করুন
          </label>

          <select
            value={selectedHousingId}
            onChange={(e) => handleHousingChange(e.target.value)}
            className="border rounded-lg p-3 bg-white text-teal-600 text-lg w-full"
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
          <label className="text-teal-600 font-medium text-lg block mb-2">
            বাছাই করুন
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-lg p-3 bg-white text-teal-600 text-lg w-full"
          >
            <option value="newest">নতুন</option>
            <option value="oldest">পুরাতুন</option>
            <option value="priceHighToLow">মূল্য: উচ্চ থেকে নিম্ন</option>
            <option value="priceLowToHigh">মূল্য: নিম্ন থেকে উচ্চ</option>
          </select>
        </div>

        {/* Bed Count */}
        <div>
          <label className="text-teal-600 font-medium text-lg block mb-2">
            বেডের সংখ্যা
          </label>
          <select
            value={initialBedCount}
            onChange={(e) => handleBedChange(e.target.value)}
            className="border rounded-lg p-3 bg-white text-teal-600 text-lg w-full"
          >
            <option value="">সব</option>
            <option value="1">১</option>
            <option value="2">২</option>
            <option value="3">৩</option>
            <option value="4">৪</option>
            <option value="5">৫</option>
          </select>
        </div>

        {/* Bath Count */}
        <div>
          <label className="text-teal-600 font-medium text-lg block mb-2">
            বাথরুমের সংখ্যা
          </label>
          <select
            value={initialBathCount}
            onChange={(e) => handleBathChange(e.target.value)}
            className="border rounded-lg p-3 bg-white text-teal-600 text-lg w-full"
          >
            <option value="">সব</option>
            <option value="1">১</option>
            <option value="2">২</option>
            <option value="3">৩</option>
            <option value="4">৪</option>
            <option value="5">৫</option>
          </select>
        </div>

        {/* Balcony Count */}
        <div>
          <label className="text-teal-600 font-medium text-lg block mb-2">
            ব্যালকনির সংখ্যা
          </label>
          <select
            value={initialBalconyCount}
            onChange={(e) => handleBalconyChange(e.target.value)}
            className="border rounded-lg p-3 bg-white text-teal-600 text-lg w-full"
          >
            <option value="">সব</option>
            <option value="1">১</option>
            <option value="2">২</option>
            <option value="3">৩</option>
            <option value="4">৪</option>
            <option value="5">৫</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
