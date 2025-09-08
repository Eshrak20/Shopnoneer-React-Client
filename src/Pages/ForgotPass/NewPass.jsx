import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ResetPassword from "../../Models/ResetPassword/ResetPassword";
import { useNavigate } from "react-router-dom";

const NewPass = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlePasswordReset = async (data) => {
    if (data.newPass !== data.retypePass) {
      Swal.fire({
        title: "ত্রুটি!",
        text: "নতুন পাসওয়ার্ড এবং পুনরায় দেওয়া পাসওয়ার্ড মিলছে না।",
        icon: "error",
        confirmButtonText: "ঠিক আছে",
      });
      return;
    }

    try {
      const response = await ResetPassword({
        email: data.email,
        verification_code: data.code,
        password: data.newPass,
        password_confirmation: data.retypePass,
      });
      console.log(response);

      reset();

      if (response.error === true) {
        Swal.fire({
          title: "পাসওয়ার্ড রিসেট করা হয়েছে!",
          text: "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।",
          icon: "success",
          confirmButtonText: "ঠিক আছে",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "ত্রুটি!",
          text:
            response?.error ||
            "পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
          icon: "error",
          confirmButtonText: "ঠিক আছে",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "ত্রুটি!",
        text:
          error.response?.data?.error ||
          "পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        icon: "error",
        confirmButtonText: "ঠিক আছে",
      });
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full rounded-2xl">
        <div className="p-8 pt-2 space-y-6">
          <form
            onSubmit={handleSubmit(handlePasswordReset)}
            className="space-y-5"
          >
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ইমেইল
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল লিখুন"
                  {...register("email", { required: "ইমেইল প্রয়োজন" })}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <span className="text-gray-400">✉️</span>
                </div>
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Verification Code Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ভেরিফিকেশন কোড
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ভেরিফিকেশন কোড লিখুন"
                  {...register("code", { required: "কোড প্রয়োজন" })}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition ${
                    errors.code
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <span className="text-gray-400">🔢</span>
                </div>
              </div>
              {errors.code && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.code.message}
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                নতুন পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="নতুন পাসওয়ার্ড লিখুন"
                  {...register("newPass", {
                    required: "নতুন পাসওয়ার্ড প্রয়োজন",
                    minLength: {
                      value: 6,
                      message: "পাসওয়ার্ড কমপক্ষে ৬টি অক্ষরের হওয়া উচিত",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition ${
                    errors.newPass
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  title={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showPassword ? (
                    <span className="text-lg">👁️</span>
                  ) : (
                    <span className="text-lg">👁️‍🗨️</span>
                  )}
                </button>
              </div>
              {errors.newPass && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPass.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                নতুন পাসওয়ার্ড পুনরায় লিখুন
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="নতুন পাসওয়ার্ড পুনরায় লিখুন"
                  {...register("retypePass", {
                    required: "পুনরায় পাসওয়ার্ড প্রয়োজন",
                  })}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition ${
                    errors.retypePass
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300"
                  }`}
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <span className="text-gray-400">🔒</span>
                </div>
              </div>
              {errors.retypePass && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.retypePass.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-md"
            >
              পাসওয়ার্ড পরিবর্তন করুন
            </button>
          </form>

          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              মনে পড়ে গেছে?{" "}
              <a
                href="/login"
                className="text-teal-600 hover:text-teal-800 font-medium"
              >
                লগইন করুন
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPass;
