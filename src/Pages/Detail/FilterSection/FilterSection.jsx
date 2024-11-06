import { useEffect, useState } from "react";
import useProjectList from "../../../Models/FilterSectionModel/FilterSectionModel"; // Assuming this is your custom hook
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons for toggling

const FilterSection = ({ selectedFilters, setSelectedFilters }) => {
  const { filters, filteredProjects, applyFilters, isLoading, error } =
    useProjectList();
  const [expandedSections, setExpandedSections] = useState({}); // For toggling filter sections

  // Define the categories you want to display
  const filterCategories = ["upazila", "housing", "bed", "bath", "balcony"];

  // Toggle filter section visibility
  const toggleSection = (category) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  // Handle checkbox selection changes
  const handleCheckboxChange = (category, value) => {
    const currentCategoryFilters = selectedFilters[category] || []; // Default to empty array

    const newValues = currentCategoryFilters.includes(value)
      ? currentCategoryFilters.filter((item) => item !== value)
      : [...currentCategoryFilters, value];

    const updatedFilters = { ...selectedFilters, [category]: newValues };
    setSelectedFilters(updatedFilters);

    // Apply the updated filters to the project list
    applyFilters(updatedFilters);
  };

  // Effect to ensure filters are applied when the selectedFilters change
  useEffect(() => {
    if (Object.keys(selectedFilters).length > 0) {
      applyFilters(selectedFilters); // Reapply filters when selectedFilters change
    }
  }, [selectedFilters, applyFilters]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-1/3 p-6 border shadow-md bg-white rounded-lg space-y-4">
      <h3 className="text-xl font-semibold text-teal-600 border-b pb-3">
        Filters
      </h3>
      {filterCategories.map(
        (category) =>
          filters[category] && (
            <div key={category} className="mb-4">
              <h4
                onClick={() => toggleSection(category)}
                className="font-medium text-teal-600 mb-2 cursor-pointer flex items-center transition-all duration-300 ease-in-out hover:text-teal-700"
              >
                {expandedSections[category] ? (
                  <FaMinus className="mr-2 transform rotate-180 transition-transform duration-300 ease-in-out" />
                ) : (
                  <FaPlus className="mr-2 transform rotate-0 transition-transform duration-300 ease-in-out" />
                )}
                <span className="capitalize">
                  {category.replace(/([A-Z])/g, " $1")}
                </span>
              </h4>
              {expandedSections[category] && (
                <div className="transition-all duration-300 ease-in-out max-h-80 overflow-auto space-y-2">
                  {filters[category]?.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center p-2 cursor-pointer hover:bg-teal-100 rounded-lg transition duration-200 ease-in-out"
                    >
                      <input
                        type="checkbox"
                        className="mr-3 w-5 h-5 text-teal-600 focus:ring-teal-500 border-2 border-gray-300 rounded transition duration-200"
                        checked={selectedFilters[category]?.includes(item)} // Safely access with optional chaining
                        onChange={() => handleCheckboxChange(category, item)}
                      />
                      <span className="text-gray-800 text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default FilterSection;
