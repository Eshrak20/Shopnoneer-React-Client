// src/Models/DetailModel/DetailCardModel/DetailCardModel.js

import { useEffect, useState } from "react";

const useDetailCardModel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const response = await fetch("https://sna.shopnoneer.com/api/projectlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ page: 1, size: 100 }),
        });

        if (!response.ok) throw new Error("Network response was not ok");
        const jsonData = await response.json();

        if (jsonData.success) {
          setData(jsonData.data);
        } else {
          console.error("Failed to fetch data:", jsonData.message);
        }
      } catch (error) {
        console.error("Error fetching the data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedData = () => {
    const dataCopy = [...data];
    switch (sortOption) {
      case "priceHighToLow":
        return dataCopy.sort((a, b) => b.total_price - a.total_price);
      case "priceLowToHigh":
        return dataCopy.sort((a, b) => a.total_price - b.total_price);
      case "newest":
        return dataCopy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      case "popularity":
        return dataCopy.sort((a, b) => b.popularity - a.popularity);
      default:
        return dataCopy;
    }
  };

  return { data, loading, sortOption, setSortOption, sortedData };
};

export default useDetailCardModel;
