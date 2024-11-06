import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterSection = ({ selectedFilters, setSelectedFilters, filters }) => {
  const handleDropdownChange = (category, value) => {
    const updatedFilters = { ...selectedFilters, [category]: [value] };
    setSelectedFilters(updatedFilters);
  };

  return (
    <div className="flex flex-col w-full max-w-screen-lg px-4 py-6 bg-white shadow-md rounded-lg space-y-4">
      <h3 className="text-xl font-semibold text-teal-600 border-b pb-3">
        Filter by
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(filters).map((category) => (
          <div key={category} className="flex flex-col space-y-2">
            <label className="text-teal-600 font-medium capitalize">
              {category.replace(/([A-Z])/g, " $1")}
            </label>
            <select
              className="border rounded-lg p-2 bg-white text-gray-700"
              value={selectedFilters[category]?.[0] || ""}
              onChange={(e) => handleDropdownChange(category, e.target.value)}
            >
              <option value="">Select {category}</option>
              {filters[category].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
