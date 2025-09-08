import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import fetchHousingWiseProjects from "../../../Models/HomeModel/HousingWiseProjectModel/HousingWiseProjectModel";

// Constants for filter options
const PRICE_RANGES = [
  { label: "২০ লাখ - ৩০ লাখ", min: 2000000, max: 3000000 },
  { label: "৩০ লাখ - ৪০ লাখ", min: 3000000, max: 4000000 },
  { label: "৪০ লাখ - ৫০ লাখ", min: 4000000, max: 5000000 },
  { label: "৫০ লাখ - ৬০ লাখ", min: 5000000, max: 6000000 },
  { label: "৬০ লাখ - ৭০ লাখ", min: 6000000, max: 7000000 },
  { label: "৭০ লাখ - ৮০ লাখ", min: 7000000, max: 8000000 },
  { label: "৮০ লাখ - ৯০ লাখ", min: 8000000, max: 9000000 },
  { label: "৯০ লাখ - ১ কোটি", min: 9000000, max: 10000000 },
  { label: "১ কোটি - ১.৫ কোটি", min: 10000000, max: 15000000 },
  { label: "১.৫ কোটি - ২ কোটি", min: 15000000, max: 20000000 },
  { label: "২ কোটি - ৩ কোটি", min: 20000000, max: 30000000 },
  { label: "৩ কোটি - ৪ কোটি", min: 30000000, max: 40000000 },
  { label: "৪ কোটি - ৫ কোটি", min: 40000000, max: 50000000 },
  { label: "৫ কোটি+", min: 50000000, max: null },
];

const SQR_RANGES = [
  { label: "২০০ - ৩০০ বর্গফুট", min: 200, max: 300 },
  { label: "৩০০ - ৪০০ বর্গফুট", min: 300, max: 400 },
  { label: "৪০০ - ৫০০ বর্গফুট", min: 400, max: 500 },
  { label: "৫০০ - ৬০০ বর্গফুট", min: 500, max: 600 },
  { label: "৬০০ - ৭০০ বর্গফুট", min: 600, max: 700 },
  { label: "৭০০ - ৮০০ বর্গফুট", min: 700, max: 800 },
  { label: "৮০০ - ৯০০ বর্গফুট", min: 800, max: 900 },
  { label: "৯০০ - ১০০০ বর্গফুট", min: 900, max: 1000 },
  { label: "১০০০ - ১২০০ বর্গফুট", min: 1000, max: 1200 },
  { label: "১২০০ - ১৫০০ বর্গফুট", min: 1200, max: 1500 },
  { label: "১৫০০ - ২০০০ বর্গফুট", min: 1500, max: 2000 },
  { label: "২০০০ - ৩০০০ বর্গফুট", min: 2000, max: 3000 },
  { label: "৩০০০ - ৫০০০ বর্গফুট", min: 3000, max: 5000 },
  { label: "৫০০০ - ১০০০০ বর্গফুট", min: 5000, max: 10000 },
  { label: "১০০০০+ বর্গফুট", min: 10000, max: null },
];

const SORT_OPTIONS = [
  { value: "", label: "সব" },
  { value: "priceHighToLow", label: "মূল্য: উচ্চ থেকে নিম্ন" },
  { value: "priceLowToHigh", label: "মূল্য: নিম্ন থেকে উচ্চ" },
];

const COUNT_OPTIONS = [1, 2, 3, 4, 5];
const BANGLA_NUMBERS = ["১", "২", "৩", "৪", "৫"];

const FilterSection = ({ filters, setFilters }) => {
  const [housings, setHousings] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load housing data on mount
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

  // Handle simple filter changes (single value)
  const handleSimpleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    updateSearchParams(newFilters);
  };

  // Handle range filter changes (min/max values)
  const handleRangeFilterChange = (type, value) => {
    let newFilters = { ...filters };
    
    if (value === "") {
      // Clear the range filter
      newFilters = {
        ...newFilters,
        [type]: "",
        [`min${type.charAt(0).toUpperCase() + type.slice(1).replace("Range", "")}`]: "",
        [`max${type.charAt(0).toUpperCase() + type.slice(1).replace("Range", "")}`]: "",
      };
    } else {
      const [min, max] = value.split("-").map(Number);
      newFilters = {
        ...newFilters,
        [type]: value,
        [`min${type.charAt(0).toUpperCase() + type.slice(1).replace("Range", "")}`]: min,
        [`max${type.charAt(0).toUpperCase() + type.slice(1).replace("Range", "")}`]: max,
      };
    }
    
    setFilters(newFilters);
    updateSearchParams(newFilters);
  };

  // Update URL search params based on current filters
  const updateSearchParams = (currentFilters) => {
    const params = new URLSearchParams();
    
    // Add all simple filters to params
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value && !key.includes("min") && !key.includes("max") && key !== "priceRange" && key !== "sqrRange") {
        params.set(key, value);
      }
    });
    
    // Add price range if exists
    if (currentFilters.minPrice && currentFilters.maxPrice) {
      params.set("minPrice", currentFilters.minPrice);
      params.set("maxPrice", currentFilters.maxPrice);
    }
    
    // Add sqr range if exists
    if (currentFilters.minSqr && currentFilters.maxSqr) {
      params.set("minSqr", currentFilters.minSqr);
      params.set("maxSqr", currentFilters.maxSqr);
    }
    
    navigate({ search: params.toString() });
  };

  // Sync filters with URL params on initial load
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const updatedFilters = { ...filters };
    
    // Sync simple filters
    Object.keys(filters).forEach(key => {
      if (params[key] !== undefined && !key.includes("min") && !key.includes("max")) {
        updatedFilters[key] = params[key];
      }
    });
    
    // Sync price range
    if (params.minPrice && params.maxPrice) {
      updatedFilters.priceRange = `${params.minPrice}-${params.maxPrice}`;
      updatedFilters.minPrice = params.minPrice;
      updatedFilters.maxPrice = params.maxPrice;
    }
    
    // Sync sqr range
    if (params.minSqr && params.maxSqr) {
      updatedFilters.sqrRange = `${params.minSqr}-${params.maxSqr}`;
      updatedFilters.minSqr = params.minSqr;
      updatedFilters.maxSqr = params.maxSqr;
    }
    
    setFilters(updatedFilters);
  }, [searchParams]);

  // Reusable filter select component
  const FilterSelect = ({ label, value, onChange, options, isRange = false }) => (
    <div className="mb-4">
      <label className="text-gray-700 font-medium text-sm block mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => isRange 
          ? handleRangeFilterChange(onChange, e.target.value)
          : handleSimpleFilterChange(onChange, e.target.value)
        }
        className="border rounded p-2 bg-white text-gray-700 focus:outline-none w-full"
      >
        <option value="">সব</option>
        {options.map((option, index) => (
          <option 
            key={index} 
            value={isRange ? `${option.min}-${option.max}` : option.value || option}
          >
            {option.label || (typeof option === 'number' ? BANGLA_NUMBERS[option - 1] : option)}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full lg:w-1/4 h-full bg-white lg:shadow rounded-b-md p-4 md:space-y-1 2xl:space-y-4 lg:sticky top-20 mb-8">
      <h2 className="text-xl font-semibold text-teal-700 md:-mb-2 2xl:mb-4">ফিল্টার</h2>
      
      {/* Housing Filter */}
      <FilterSelect
        label="হাউজিং নির্বাচন করুন"
        value={filters.housing}
        onChange="housing"
        options={housings.map(h => ({ value: h.id, label: h.name }))}
      />
      
      {/* Price Range Filter */}
      <FilterSelect
        label="মূল্য সীমা নির্ধারণ"
        value={filters.priceRange}
        onChange="priceRange"
        options={PRICE_RANGES}
        isRange
      />
      
      {/* Sqr Range Filter */}
      <FilterSelect
        label="স্কয়ার সীমা নির্ধারণ"
        value={filters.sqrRange}
        onChange="sqrRange"
        options={SQR_RANGES}
        isRange
      />
      
      {/* Sort Option */}
      <FilterSelect
        label="বাছাই করুন"
        value={filters.sortOption}
        onChange="sortOption"
        options={SORT_OPTIONS}
      />
      
      {/* Bed Count */}
      <FilterSelect
        label="বেডের সংখ্যা"
        value={filters.bedCount}
        onChange="bedCount"
        options={COUNT_OPTIONS}
      />
      
      {/* Bath Count */}
      <FilterSelect
        label="বাথরুমের সংখ্যা"
        value={filters.bathCount}
        onChange="bathCount"
        options={COUNT_OPTIONS}
      />
      
      {/* Balcony Count */}
      <FilterSelect
        label="ব্যালকনির সংখ্যা"
        value={filters.balconyCount}
        onChange="balconyCount"
        options={COUNT_OPTIONS}
      />
    </div>
  );
};

export default FilterSection;