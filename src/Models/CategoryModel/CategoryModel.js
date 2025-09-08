import axios from "axios";

const CategoryModel = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    const response = await axios.post(
      `${apiUrl}/api/category-list`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          api_token: `${apiToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error in divisionList:",
      error.response?.data || error.message
    );
  }
};

export default CategoryModel;
