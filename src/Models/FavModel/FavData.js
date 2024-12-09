
const FavData = async (projectId) => {
    // console.log(projectId);
    
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
              id: projectId,
            },

          }),
        }
      );
  
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    // console.log(data.data[0].is_active);
    return data.data;
  };

export default FavData;