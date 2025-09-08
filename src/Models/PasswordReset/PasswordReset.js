import axios from "axios";

const PasswordReset = async (data) => {
  console.log(data);
  
  try {
    const token = localStorage.getItem("user_token");
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    const response = await axios.post(`${apiUrl}/api/change-password`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        api_token: `${apiToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in ContactList:",
      error.response?.data || error.message
    );
    throw error; // Ensure error is propagated for better handling
  }
};

export default PasswordReset;
