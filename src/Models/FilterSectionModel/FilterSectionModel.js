import { useEffect, useState, useMemo } from "react";

const useProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project data on initial render
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

  // Initialize filters when projects data changes
  useEffect(() => {
    if (projects.length === 0) return;

    const initializeFilters = (projectData) => {
      const upazilas = [...new Set(projectData.map(project => project.upazila))];
      const housings = [...new Set(projectData.map(project => project.housing))];

      setFilters({
        upazila: upazilas,
        housing: housings,
      });
    };

    initializeFilters(projects);
  }, [projects]); // Only run when `projects` change

  // Memoize the filtered projects to avoid recalculating on every render
  const filteredProjects = useMemo(() => {
    if (!projects || projects.length === 0 || Object.keys(filters).length === 0) {
      return projects;
    }

    return projects.filter(project => {
      const { upazila = [], housing = [] } = filters;

      const matchesUpazila = upazila.length === 0 || upazila.includes(project.upazila);
      const matchesHousing = housing.length === 0 || housing.includes(project.housing);

      return matchesHousing && matchesUpazila;
    });
  }, [projects, filters]); // Only recompute when `projects` or `filters` change

  // Apply filters when necessary (this ensures filters are applied only once)
  const applyFilters = (selectedFilters) => {
    setFilters(selectedFilters);
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
