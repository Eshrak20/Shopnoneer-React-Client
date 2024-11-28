import React, { useState } from "react";
import FilterSectionModel from "./FilterSectionModel";
import FilterSection from "../../Pages/Detail/FilterSection/FilterSection.jsx";

const ProjectFilterComponent = () => {
  const [filters, setFilters] = useState({
    no_of_beds: 4,
    no_of_baths: 3,
    no_of_balcony: 3,
    housing_id: 3,
    upazila_id: 3,
    district_id: 3,
    storied: 3,
    parking_available: 1,
    total_price: 554444,
    created_at: "2024-10-23T03:38:05.000000Z",
    updated_at: "2024-11-26T10:33:37.000000Z",
    is_active: 1,
    is_corner: 1,
    plot_size: 4,
    plot_face: "North",
  });

  const [sortOption, setSortOption] = useState("newest"); // State for sorting
  const { filteredProjects, isLoading, error } = FilterSectionModel(filters);

  // Function to handle sorting
  const getSortedProjects = (projects) => {
    if (!projects || projects.length === 0) return [];

    switch (sortOption) {
      case "newest":
        return projects.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "oldest":
        return projects.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      case "priceHighToLow":
        return projects.sort((a, b) => b.total_price - a.total_price);
      case "priceLowToHigh":
        return projects.sort((a, b) => a.total_price - b.total_price);
      default:
        return projects;
    }
  };

  const sortedProjects = getSortedProjects(filteredProjects);

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <FilterSection sortOption={sortOption} setSortOption={setSortOption} />
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-teal-600 mb-4">
          Filtered Projects
        </h1>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!isLoading && !error && sortedProjects.length === 0 && (
          <p>No projects match the filters.</p>
        )}
        {!isLoading && !error && sortedProjects.length > 0 && (
          <ul className="space-y-4">
            {sortedProjects.map((project) => (
              <li
                key={project.id}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <h2 className="text-lg font-medium text-teal-600">
                  {project.name}
                </h2>
                <p>Price: {project.total_price}</p>
                <p>Beds: {project.no_of_beds}, Baths: {project.no_of_baths}</p>
                <p>Created At: {new Date(project.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectFilterComponent;
