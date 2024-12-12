import { useEffect, useState } from "react";

const useProjectList = (
  housing,
  housingId,
  bedCount,
  bathCount,
  balconyCount
) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log(housingId);

        const token = localStorage.getItem("user_token");
        const response = await fetch(
          "https://sna.shopnoneer.com/api/get-project-by-filter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              filters: {
                no_of_beds: bedCount || "", // Use bed count filter
                no_of_baths: bathCount || "", // Use bed count filter
                no_of_balcony: balconyCount || "", // Use bed count filter
                housing_id:  housing || housingId || "",
              },
            }),
          }
        );

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
  }, [housing, housingId, bedCount, bathCount, balconyCount]); // Re-fetch when bed count changes

  return {
    projects,
    isLoading,
    error,
  };
};

export default useProjectList;
