import { createContext, useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Swal from "sweetalert2";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from session storage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("user_name");
    const storedEmail = localStorage.getItem("user_email");
    const storedProfilePic = localStorage.getItem("user_profile_pic");

    if (storedName && storedEmail && storedProfilePic) {
      setUser({
        name: storedName,
        email: storedEmail,
        profilePicture: storedProfilePic,
      });
    }
    setLoading(false); // Stop loading after checking session storage
  }, []);
  // const navigate = useNavigate();
  // Function to create a new user (sign-up)
  const createUser = async (
    name,
    email,
    phone_number,
    password,
    confirm_password,
    role_id = 2
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://sna.shopnoneer.com/api/signupapi`,
        { name, email, phone_number, password, confirm_password, role_id } // Add role_id here
      );
      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        return userData;
      } else {
        throw new Error("Sign-up failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(
        "Sign-up error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to sign in a user (login)
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://sna.shopnoneer.com/api/loginapi`,
        { email, password }
      );

      if (response.data.success) {
        const userData = response.data.data; // Access user data from response
        const { name, email, profile_photo_url, token } = userData; // Destructure necessary fields

        // Save user data in session storage
        localStorage.setItem("user_name", name);
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_profile_pic", profile_photo_url);
        localStorage.setItem("user_token", token);

        setUser(userData); // Store user info in state
        console.log("User data after login:", userData);
        return userData;
      } else {
        throw new Error(
          response.data.message ||
            "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      throw error; // Handle error in the login component
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to log out the user
  const logOut = async () => {
    setLoading(true);
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("user_token"); // Assuming 'token' is the key used in local storage
      console.log("Token:", token); // Log the token to check if it's correct
      const response = await fetch("https://sna.shopnoneer.com/api/logoutapi", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        localStorage.clear(); // Clear all data from local storage on logout
        setUser(null); // Clear user data from state
      } else {
        throw new Error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Optional: Show error alert using Swal
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to log out. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false);
    }
  };

  // Providing the authentication state and functions
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
