const FavModel = async () => {
  const token = localStorage.getItem("user_token");
  const response = await fetch(
    "https://sna.shopnoneer.com/api/favourite-list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error("Network response was not ok");

  const data = await response.json();

  // Filter active items
  const activeData = data.data.filter(item => item.is_active === 1);
  return activeData;
};

export default FavModel;
