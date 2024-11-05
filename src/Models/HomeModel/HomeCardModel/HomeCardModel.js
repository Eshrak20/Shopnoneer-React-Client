// src/Models/HomeModel/HomeCardModel/HomeCardModel.js

const fetchHomeCardData = async () => {
    const token = localStorage.getItem("user_token");
    const response = await fetch("https://sna.shopnoneer.com/api/projectlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ page: 1, size: 20 }),
    });
  
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.data;
  };
  
  export default fetchHomeCardData;
  