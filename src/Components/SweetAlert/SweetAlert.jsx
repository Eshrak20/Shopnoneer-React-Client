import Swal from "sweetalert2";

const SweetAlert = ({ icon, title, text, confirmButtonText, confirmButtonColor, timer }) => {
  Swal.fire({
    icon: icon || "info",
    title: title || "Notice",
    text: text || "",
    confirmButtonText: confirmButtonText || "OK",
    confirmButtonColor: confirmButtonColor || "#38b2ac", // Default teal color
    timer: timer || undefined, // Optional, won't set if not provided
  });
};

export default SweetAlert;
