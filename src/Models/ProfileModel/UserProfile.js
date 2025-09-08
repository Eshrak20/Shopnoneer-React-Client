import axios from "axios";

const userProfile = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("user_token");
    const apiToken = import.meta.env.VITE_API_TOKEN;

    const response = await axios.post(
      `${apiUrl}/api/user-profile`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          api_token: `${apiToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error in userProfile:",
      error.response?.data || error.message
    );
  }
};

export default userProfile;
