import axios from "axios";

const FaqModel = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    const response = await axios.post(
      `${apiUrl}/api/faq-list`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "api_token":`${apiToken}`
        },
      }
    );

    return response.data.data || []; // Adjust the data structure based on your API response

  } catch (error) {
    console.error("Error in FaqList:", error.response?.data || error.message);
  }
};

export default FaqModel;
