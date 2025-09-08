import Swal from "sweetalert2";

const FavModel = async () => {
  const token = localStorage.getItem("user_token");
  const apiToken = import.meta.env.VITE_API_TOKEN;

  if (!token) {
    const currentUrl = window.location.href;
    sessionStorage.setItem("redirectAfterLogin", currentUrl);
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
            // window.location.href = "/login";
            window.location.href = window.location.origin + '/login';
          } else {
            // console.log("User chose not to log in.");
          }
        });
  
        return []; // Exit early since user is not logged in
      }

  try {
    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiUrl}/api/favourite-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        api_token: `${apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error in FavModel:", error.message);
    return [];
  }
};

export default FavModel;
