import { useEffect, useState } from "react";

const useProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // Fetch project data from API using POST
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const response = await fetch("https://sna.shopnoneer.com/api/projectlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ page: 1, size: 30 }), // Include the body as per your requirement
        });

        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        if (data.success) {
          setProjects(data.data);
          initializeFilters(data.data);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjects();
  }, []);

  const initializeFilters = (projectData) => {
    // Example: Initialize filters based on project data
    const divisions = [...new Set(projectData.map(project => project.division))];
    const districts = [...new Set(projectData.map(project => project.district))];

    setFilters({
      division: divisions,
      district: districts,
      // Add more filter categories as needed
    });

    setFilteredProjects(projectData); // Set initial filtered projects
  };

  const applyFilters = (selectedFilters) => {
    // Apply filtering logic based on selected filters
    const { division, district } = selectedFilters;

    const newFilteredProjects = projects.filter(project => {
      const matchesDivision = division.length === 0 || division.includes(project.division);
      const matchesDistrict = district.length === 0 || district.includes(project.district);
      return matchesDivision && matchesDistrict;
    });

    setFilteredProjects(newFilteredProjects);
  };

  return { filters, filteredProjects, applyFilters };
};

export default useProjectList;
