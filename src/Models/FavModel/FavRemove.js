
const FavRemove = async (id) => {
    const token = localStorage.getItem("user_token");
    console.log(id);
    
    const response = await fetch("https://sna.shopnoneer.com/api/remove-favourite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project_id: id }),

    });
  };

export default FavRemove;