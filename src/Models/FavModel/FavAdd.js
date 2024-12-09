import FavModel from "./FavModel";

const FavAdd = async (id) => {
  try {
    // Get the token from local storage
    const token = localStorage.getItem("user_token");

    // Fetch current favorite IDs using FavModel
    const existingFavorites = await FavModel();

    // Check if the ID is already in the list of favorites
    const isAlreadyFavorite = existingFavorites.some(
      (favorite) => favorite.project_id === id
    );

    if (isAlreadyFavorite) {
      console.log("This property is already in your favorites.");
      return; // Exit the function if the ID is already a favorite
    }

    // If not a favorite, proceed to add it
    const response = await fetch(
      "https://sna.shopnoneer.com/api/add-favourite",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ project_id: id }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add to favorites");
    }

    console.log("Property added to favorites successfully.");
  } catch (error) {
    console.error("Error in FavAdd:", error.message);
  }
};

export default FavAdd;
