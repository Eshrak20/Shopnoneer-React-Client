import { useEffect, useState } from "react";

const useProjectList = () => {
  const [projects, setProjects] = useState([]); // Store the project data
  const [filters, setFilters] = useState({}); // Store the filters data
  const [filteredProjects, setFilteredProjects] = useState([]); // Store filtered projects
  const [isFiltersInitialized, setIsFiltersInitialized] = useState(false); // Flag to prevent unnecessary updates
  const [isLoading, setIsLoading] = useState(true); // Loading state while fetching data
  const [error, setError] = useState(null); // Error state for handling API errors

  // Fetch projects only once when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const token = localStorage.getItem("user_token");
        const response = await fetch("https://sna.shopnoneer.com/api/projectlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ page: 1, size: 30 }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        
        if (data.success) {
          setProjects(data.data);
          initializeFilters(data.data); // Initialize filters after successful data fetch
        } else {
          setError(data.message); // Handle case when API response indicates failure
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("An error occurred while fetching project data.");
      } finally {
        setIsLoading(false); // Set loading state to false when the API call is complete
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Initialize filters after projects are fetched
  const initializeFilters = (projectData) => {
    const divisions = [...new Set(projectData.map(project => project.division))];
    const districts = [...new Set(projectData.map(project => project.district))];
    const upazilas = [...new Set(projectData.map(project => project.upazila))];
    const housings = [...new Set(projectData.map(project => project.housing))];
    const baths = [...new Set(projectData.map(project => project.no_of_baths))];
    const beds = [...new Set(projectData.map(project => project.no_of_beds))];
    const balconies = [...new Set(projectData.map(project => project.no_of_balconies))];

    setFilters({
      division: divisions,
      district: districts,
      upazila: upazilas,
      housing: housings,
      bath: baths,
      bed: beds,
      balcony: balconies,
    });

    // Set filtered projects only once after filters are initialized and avoid updates on rerender
    if (!isFiltersInitialized) {
      setFilteredProjects(projectData); // Set initial filtered projects
      setIsFiltersInitialized(true); // Mark filters as initialized
    }
  };

  // Apply filters
  const applyFilters = (selectedFilters) => {
    const { division, district, upazila, housing, bath, bed, balcony } = selectedFilters;

    const newFilteredProjects = projects.filter(project => {
      const matchesDivision = division.length === 0 || division.includes(project.division);
      const matchesDistrict = district.length === 0 || district.includes(project.district);
      const matchesUpazila = upazila.length === 0 || upazila.includes(project.upazila);
      const matchesHousing = housing.length === 0 || housing.includes(project.housing);
      const matchesBath = bath.length === 0 || bath.includes(project.no_of_baths);
      const matchesBed = bed.length === 0 || bed.includes(project.no_of_beds);
      const matchesBalcony = balcony.length === 0 || balcony.includes(project.no_of_balconies);

      return matchesDivision && matchesDistrict && matchesUpazila && matchesHousing && matchesBath && matchesBed && matchesBalcony;
    });

    setFilteredProjects(newFilteredProjects);
  };

  return {
    filters,
    filteredProjects,
    applyFilters,
    isLoading,
    error,
  };
};

export default useProjectList;
