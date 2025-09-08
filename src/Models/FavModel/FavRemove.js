import Swal from "sweetalert2";

const FavRemove = async (id) => {
  const token = localStorage.getItem("user_token");

  if (!token) {
    Swal.fire({
      title: "অনুগ্রহ করে লগইন করুন",
      text: "এটি আপনার প্রিয় তালিকা থেকে মুছে দিতে লগইন করতে হবে।",
      icon: "warning",
      confirmButtonText: "লগইন",
      confirmButtonColor: "#38b2ac",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = window.location.origin + '/login';
      }
    });
    return;
  }
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiToken = import.meta.env.VITE_API_TOKEN;
    const token = localStorage.getItem("user_token");

    const response = await fetch(`${apiUrl}/api/remove-favourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        api_token: `${apiToken}`,
      },
      body: JSON.stringify({ project_id: id }),
    });

    if (!response.ok) {
      throw new Error("Failed to remove from favorites");
    }
  } catch (error) {
    console.error("Error in FavRemove:", error.message);
  }
};

export default FavRemove;
