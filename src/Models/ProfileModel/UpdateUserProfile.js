import axios from "axios";

const updateUserProfile = async (data) => {
  let stringifyData = JSON.stringify(data);

  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;
    const token = localStorage.getItem("user_token");

    if (!token) {
      console.error("Token not found!");
      return;
    }

    const formData = new FormData();

    if (data.profilePhoto && data.profilePhoto instanceof File) {
      formData.append("profilePhoto", data.profilePhoto);
    } else if (data.profilePhoto) {
      formData.append("profilePhoto", data.profilePhoto);
    }

    formData.append("data", stringifyData);

    const response = await axios.post(
      `${apiUrl}/api/update-user-profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", //! This is important for sending ... data
          Authorization: `Bearer ${token}`,
          api_token: `${apiToken}`,
        },
      }
    );
    localStorage.setItem("updated_profile_photo", response.data.data.profile.profilePhoto);

    return response.data;
  } catch (error) {
    console.error(
      "Error in updateUserProfile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default updateUserProfile;
