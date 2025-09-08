import { useEffect, useState } from "react";

const useProjectList = (
  housing,
  housingId,
  bedCount,
  bathCount,
  balconyCount,
  page,
  minPrice,
  maxPrice,
  minSqr,
  maxSqr
) => {
  const [projects, setProjects] = useState([]);
  const [totalProject, setTotalProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiToken = import.meta.env.VITE_API_TOKEN;

        const response = await fetch(`${apiUrl}/api/get-project-by-filter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            api_token: `${apiToken}`,
          },
          body: JSON.stringify({
            page: page,
            size: 10,
            filters: {
              no_of_beds: bedCount || "",
              no_of_baths: bathCount || "",
              no_of_balcony: balconyCount || "",
              housing_id: housing || housingId || "",
              price_range: {
                min: minPrice || "",
                max: maxPrice || "",
              },
              sqr_range: {
                min: minSqr || "",
                max: maxSqr || "",
              },
            },
          }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        if (data.success) {
          setProjects(data.data.projects);
          setTotalProject(data.data.total_projects);
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
  }, [
    housing,
    housingId,
    bedCount,
    bathCount,
    balconyCount,
    page,
    minPrice,
    maxPrice,
    minSqr,
    maxSqr,
  ]);

  return {
    projects,
    totalProject,
    isLoading,
    error,
  };
};

export default useProjectList;
