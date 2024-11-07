import { useEffect, useState } from "react";

const useProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
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
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("An error occurred while fetching project data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []); // Fetch projects only once on mount

  useEffect(() => {
    if (projects.length === 0) return; // Only initialize filters if projects exist

    const initializeFilters = (projectData) => {
      const upazilas = [...new Set(projectData.map(project => project.upazila))];
      const housings = [...new Set(projectData.map(project => project.housing))];

      setFilters({
        upazila: upazilas,
        housing: housings,
      });

      setFilteredProjects(projectData); // Set filtered projects only when necessary
    };

    initializeFilters(projects);
  }, [projects]); // Only run when `projects` change

  const applyFilters = (selectedFilters) => {
    const { upazila = [], housing = [] } = selectedFilters;

    const newFilteredProjects = projects.filter(project => {
      const matchesUpazila = upazila.length === 0 || upazila.includes(project.upazila);
      const matchesHousing = housing.length === 0 || housing.includes(project.housing);

      return matchesHousing && matchesUpazila;
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
