import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SendOTP from "../../Models/SendOTP/SendOTP";
import { useState } from "react";
import NewPass from "./NewPass";

const ForgotPasswordForm = ({ onToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [newPassPage, setNewPassPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (data) => {
    setLoading(true);               // ✅ correct usage
    try {
      await SendOTP({ email: data.email });

      await Swal.fire({
        title: "OTP পাঠানো হয়েছে!",
        text: "আপনার ইমেইলে একটি OTP পাঠানো হয়েছে। দয়া করে আপনার ইনবক্স চেক করুন।",
        icon: "success",
        confirmButtonText: "ঠিক আছে",
      });

      setNewPassPage(true);
    } catch (error) {
      await Swal.fire({
        title: "ত্রুটি!",
        text: "OTP পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        icon: "error",
        confirmButtonText: "ঠিক আছে",
      });
    } finally {
      setLoading(false);            // ✅ always turn loading off
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {!newPassPage ? (
          <form onSubmit={handleSubmit(handleSendOTP)} className="space-y-6">
            {/* -------- Email field -------- */}
            <div className="form-control">
              <label className="block text-gray-800 font-semibold mb-1 text-sm">
                ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                placeholder="আপনার ইমেইল লিখুন"
                {...register("email", { required: true })}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">ইমেইল প্রয়োজনীয়</p>
              )}
            </div>

            {/* -------- Submit / Loading button -------- */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 018 8h-4l3.5 3.5L20 12h-4a8 8 0 01-8 8v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8h4l-3.5-3.5L4 12z"
                    />
                  </svg>
                  লোড হচ্ছে...
                </>
              ) : (
                "OTP পাঠান"
              )}
            </button>

            {/* -------- Toggle link -------- */}
            <div className="text-center pt-2">
              <p className="text-gray-600 text-sm">পাসওয়ার্ড রিসেট করতে চান?</p>
              <button
                type="button"
                onClick={onToggle}
                className="text-teal-500 hover:underline text-sm font-medium"
              >
                পাসওয়ার্ড পরিবর্তন করুন
              </button>
            </div>
          </form>
        ) : (
          <NewPass />
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
