import React from "react";
import useProjectList from "../../../Models/FilterSectionModel/FilterSectionModel";

const FilterSection = ({ selectedFilters, setSelectedFilters }) => {
  const { filters, applyFilters } = useProjectList(); // Use the hook

  const handleCheckboxChange = (category, value) => {
    const newValues = selectedFilters[category].includes(value)
      ? selectedFilters[category].filter(item => item !== value) // Remove the filter if already selected
      : [...selectedFilters[category], value]; // Add the filter if not selected

    const updatedFilters = { ...selectedFilters, [category]: newValues }; // Update selected filters
    setSelectedFilters(updatedFilters); // Set new filters
    applyFilters(updatedFilters); // Apply the updated filters
  };

  return (
    <div className="w-1/3 p-4 border shadow-md bg-white rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-teal-600">Filters</h3>
      {/* Filter Sections */}
      {Object.entries(filters).map(([category, items]) => (
        <div key={category} className="mb-4">
          <h4 className="font-semibold text-teal-500 mb-2">{category.replace(/([A-Z])/g, ' $1')}</h4>
          <div>
            {items?.map((item, index) => (
              <label key={index} className="flex items-center mb-2 cursor-pointer hover:bg-teal-100 rounded p-2 transition duration-150 ease-in-out">
                <input
                  type="checkbox"
                  className="mr-2 w-5 h-5 text-teal-600 focus:ring-teal-500 border-2 border-gray-300 rounded"
                  checked={selectedFilters[category].includes(item)}
                  onChange={() => handleCheckboxChange(category, item)}
                />
                <span className="text-gray-800">{item}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
