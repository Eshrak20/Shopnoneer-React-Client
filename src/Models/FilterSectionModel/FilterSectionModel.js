import { useEffect, useState } from "react";

const useFilteredProjects = (filters) => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("user_token");
        const response = await fetch("https://sna.shopnoneer.com/get-project-by-filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ filters }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (data.success) {
          setFilteredProjects(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error("Error fetching filtered project data:", error);
        setError("An error occurred while fetching filtered project data.");
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function if filters are provided
    if (filters) {
      fetchFilteredProjects();
    }
  }, [filters]);

  return {
    filteredProjects,
    isLoading,
    error,
  };
};

export default useFilteredProjects;
