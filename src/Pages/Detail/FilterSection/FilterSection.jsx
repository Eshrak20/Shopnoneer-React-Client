import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const FilterSection = ({
  sortOption,
  setSortOption,
  setBedCount,
  setBathCount,
  setBalconyCount,
}) => {

// working on going .... here 
  // const [housings, setHousings] = useState([]);
  // useEffect(() => {
  //   const loadhousings = async () => {
  //     try {
  //       const { housing } = await fetchHousingWiseProjects();
  //       setHousings(housing);
  //     } catch (error) {
  //       console.error("Failed to fetch project data:", error);
  //     }
  //   };
  //   loadhousings();
  // }, []);



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
        <h2 className="text-2xl font-bold text-teal-600 mb-4">ফিল্টার</h2>

        {/* Sort Option */}
        <div>
          <label className="text-teal-600 font-medium block mb-2">
          বাছাই করুন
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600 w-full"
          >
            <option value="newest">নতুন</option>
            <option value="oldest">পুরাতুন</option>
            <option value="priceHighToLow">মূল্য: উচ্চ থেকে নিম্ন</option>
            <option value="priceLowToHigh">মূল্য: নিম্ন থেকে উচ্চ </option>
          </select>
        </div>

        {/* Bed Count */}
        <div>
          <label className="text-teal-600 font-medium block mb-2">
          বেডের সংখ্যা
          </label>
          <select
            value={initialBedCount}
            onChange={(e) => handleBedChange(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600 w-full"
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
          <label className="text-teal-600 font-medium block mb-2">
          বাথরুমের সংখ্যা
          </label>
          <select
            value={initialBathCount}
            onChange={(e) => handleBathChange(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600 w-full"
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
          <label className="text-teal-600 font-medium block mb-2">
          ব্যালকনির সংখ্যা
          </label>
          <select
            value={initialBalconyCount}
            onChange={(e) => handleBalconyChange(e.target.value)}
            className="border rounded-lg p-2 bg-white text-teal-600 w-full"
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
