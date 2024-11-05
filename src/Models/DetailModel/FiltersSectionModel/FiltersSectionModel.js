import { useEffect, useState } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState({});
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("filters.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonFilters = await response.json();
        setFilters(jsonFilters);

        // Set all sections to open by default
        const initialOpenSections = Object.keys(jsonFilters).reduce((acc, category) => {
          acc[category] = true;
          return acc;
        }, {});
        setOpenSections(initialOpenSections);
      } catch (error) {
        console.error("Error fetching the filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const toggleSection = (category) => {
    setOpenSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return { filters, openSections, toggleSection };
};

export default useFilters;
