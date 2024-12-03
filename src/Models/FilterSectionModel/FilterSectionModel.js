import { useEffect, useState } from "react";

const useFilteredProjects = (filters) => {
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
          setFilteredProjects(data.data);
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
  }, []);
  return {
    filteredProjects,
    isLoading,
    error,
  };
};

export default useFilteredProjects;
