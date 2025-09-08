import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  signOut,
} from "../../src/firebase/firebase.config";

export const AuthContext = createContext(null);

// Helper functions
const storeUserData = (userData) => {
  const {
    token,
    profile_photo_url,
    profile_photo_path,
    profile = {},
  } = userData;
  const profilePhoto =
    profile_photo_url || profile_photo_path || profile?.profilePhoto || "";

  localStorage.setItem("user_token", token);
  localStorage.setItem("user_profile_pic", profilePhoto);
};
const storeFirebaseData = (firebaseData) => {
  const { photoURL } = firebaseData;
  const fireBasePhoto = photoURL;
  localStorage.setItem("user_google_pic", fireBasePhoto);
};

const clearUserData = () => {
  localStorage.clear();
  sessionStorage.clear();
};

const handleAuthError = (error) => {
  console.error(
    "Auth error:",
    error.response ? error.response.data : error.message
  );
  throw error;
};

const AuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Initialize user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      setUser({
        profilePicture: localStorage.getItem("user_profile_pic"),
        token,
      });
    }
    setLoading(false);
  }, []);

  //! Common auth handler
  const handleAuthResponse = useCallback((response) => {
    if (response.data.success) {
      const userData = response.data.data || response.data.user;

      storeUserData(userData);
      setUser(userData);

      // Redirect if needed
      const redirectUrl = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin");
      window.location.href = redirectUrl;

      return userData;
    }
    throw new Error(response.data.message || "Authentication failed");
  }, []);

  //! Normal Auth methods
  const createUser = async (name, email, password, confirm_password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/signupapi`, {
        name,
        email,
        password,
        confirm_password,
      });
      return handleAuthResponse(response);
    } catch (error) {
      return handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/loginapi`, {
        email,
        password,
      });
      return handleAuthResponse(response);
    } catch (error) {
      return handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("user_token");

      if (token) {
        await axios.delete(`${apiUrl}/api/logoutapi`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      await signOut(auth);
      clearUserData();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire({
        title: "ত্রুটি!",
        text: "লগ আউট করতে ব্যর্থ হয়েছেন। অনুগ্রহ করে আবার চেষ্টা করুন।",
        icon: "error",
        timer: 1000,
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#38b2ac",
      });
    } finally {
      setLoading(false);
    }
  };

  //! Google auth handler
  const googleAuth = useCallback(async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      storeFirebaseData(result.user);
      const { displayName: name, email, uid } = result.user;
      // 2. Send to backend
      const response = await axios.post(`${apiUrl}/api/google-auth`, {
        name,
        email,
        google_token: uid,
      });
      return handleAuthResponse(response);
    } catch (error) {
      setGoogleLoading(false);
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("User closed the Google sign-in popup.");
        return null;
      } else {
        console.error("Google auth error:", error);
      }
    } finally {
      setGoogleLoading(false);
    }
  }, [apiUrl, handleAuthResponse]);

  //! Facebook auth handler
  const facebookAuth = useCallback(async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider); //Import from firebase_config
      console.log(result);
      const { displayName: name, email, uid } = result.user;
      const response = await axios.post(`${apiUrl}/api/google-auth`, {
        name,
        email,
        facebook_token: uid,
      });

      // 4. Handle your backend response
      return handleAuthResponse(response);
    } catch (error) {
      console.error("Facebook auth error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [apiUrl, handleAuthResponse]);

  const authInfo = useMemo(
    () => ({
      user,
      loading,
      googleLoading,
      createUser,
      signIn,
      logOut,
      googleAuth,
      facebookAuth,
    }),
    [
      user,
      loading,
      googleLoading,
      createUser,
      signIn,
      logOut,
      googleAuth,
      facebookAuth,
    ]
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
