import React, { useState } from "react";
import useFilteredProjects from "./hooks/useFilteredProjects";

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

  const { filteredProjects, isLoading, error } = useFilteredProjects(filters);

  return (
    <div>
      <h1>Filtered Projects</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <ul>
          {filteredProjects.map((project) => (
            <li key={project.id}>{project.name}</li> // Adjust according to the project structure
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectFilterComponent;
