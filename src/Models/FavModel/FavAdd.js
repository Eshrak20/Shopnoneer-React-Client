import Swal from "sweetalert2";

const FavAdd = async (id) => {
  try {
    const token = localStorage.getItem("user_token");

    if (!token) {
      // Save the current URL for redirection after login
      const currentUrl = window.location.href;
      sessionStorage.setItem("redirectAfterLogin", currentUrl);

      // Show SweetAlert and redirect to login
      Swal.fire({
        title: "অনুগ্রহ করে লগইন করুন",
        text: "আপনার প্রিয় তালিকা দেখার জন্য আপনাকে লগইন করতে হবে।",
        icon: "warning",
        confirmButtonColor: "#38b2ac",
        confirmButtonText: "লগ ইন",
        showCancelButton: true,
        cancelButtonText: "পরে করব",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = window.location.origin + '/login';
        } else {
          console.log("User chose not to log in.");
        }
      });

      return; // Exit early since user is not logged in
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;

    const response = await fetch(`${apiUrl}/api/add-favourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        api_token: `${apiToken}`,
      },
      body: JSON.stringify({ project_id: id }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to favorites");
    }
    return true;
  } catch (error) {
    console.error("Error in FavAdd:", error.message);
    return false;
  }
};

export default FavAdd;
