// // src/api/ResetPassword.js or similar path
// import axios from "axios";

// const ResetPassword = async (data) => {
//   console.log("Resetting password with data:", data);

//   try {
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const apiToken = import.meta.env.VITE_API_TOKEN;

//     const response = await axios.post(`${apiUrl}/api/reset-password`, data, {
//       headers: {
//         "Content-Type": "application/json",
//         api_token: `${apiToken}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error in ResetPassword:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// export default ResetPassword;


// src/api/ResetPassword.js
import axios from "axios";

const ResetPassword = async ({ email, verification_code, password, password_confirmation }) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    const payload = {
      email,
      verification_code,
      password,
      password_confirmation,
    };

    const response = await axios.post(`${apiUrl}/api/reset-password`, payload, {
      headers: {
        "Content-Type": "application/json",
        api_token: apiToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error in ResetPassword:", error.response?.data || error.message);
    throw error;
  }
};

export default ResetPassword;

