const FavModel = async () =>{
    const token = localStorage.getItem("user_token");
    const response = await fetch("https://sna.shopnoneer.com/api/favourite-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.data.map((item) => ({
      project_id: item.project_id,
    }));
  };

export default FavModel;