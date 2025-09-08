// src/api/ForgotPassword.js or similar location
import axios from "axios";

const SendOTP = async (data) => {
  console.log("Sending OTP with data:", data);

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    const response = await axios.post(`${apiUrl}/api/send-reset-code`, data, {
      headers: {
        "Content-Type": "application/json",
        api_token: `${apiToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error in SendOTP:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default SendOTP;
