import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import "./Login.css";
import "./BubblesAnimation.css";
import GoogleLogin from "../../Components/SocialLogin/GoogleLogin";
import FacebookLogin from "../../Components/SocialLogin/FacebookLogin";

const Login = () => {
  const { signIn, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {

    try {
      await signIn(data.email, data.password);
      reset();
      Swal.fire({
        title: "সাফল্য!",
        text: "লগইন সফল হয়েছে! আপনি যেখানে চান সেখানে চালিয়ে যেতে পারেন।",
        icon: "success",
        confirmButtonColor: "#38b2ac",
        confirmButtonText: "চালিয়ে যান",
      }).then(() => {
        navigate(from, { replace: true }); // Redirect only when user confirms
      });
    } catch (err) {
      Swal.fire({
        title: "ত্রুটি!",
        text:
          err.message ||
          "লগইন করার সময় একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।",
        icon: "error",
        confirmButtonColor: "#e53e3e",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper flex justify-center items-center min-h-screen">
      {/* Animated Bubbles (hidden on small screens) */}
      <div className="bubble sm:hidden">
        <div className="dot"></div>
      </div>
      <div className="bubble hidden lg:block">
        <div className="dot"></div>
      </div>
      <div className="bubble hidden lg:block">
        <div className="dot"></div>
      </div>
      <div className="bubble hidden lg:block">
        <div className="dot"></div>
      </div>
      <div className="bubble hidden lg:block">
        <div className="dot"></div>
      </div>
      <div className="bubble hidden lg:block">
        <div className="dot"></div>
      </div>

      <div className="card w-full max-w-md mx-auto lg:shadow-2xl bg-transparent lg:bg-gray-100 relative">
        {/* Back Arrow */}
        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-100 lg:text-gray-500 hover:text-gray-800 transition duration-200"
        >
          <span role="img" aria-label="Go back" className="text-4xl">
            ←
          </span>
        </Link>
        <Link
          to="/signUp"
          className="absolute top-4 right-4 text-gray-100 lg:text-gray-500 hover:text-gray-800 transition duration-200"
        >
          <span role="img" aria-label="Go back" className="text-4xl">
            →
          </span>
        </Link>

        <div className="lg:bg-teal-500 text-white p-4 rounded-t-lg lg:bg-transparent sm:text-black">
          <h1 className="text-2xl font-bold text-center sm:text-lg">
            স্বপ্ননীড়{" "}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body p-6 rounded-b-lg sm:p-4"
          noValidate
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white lg:text-black">ইমেইল</span>
            </label>
            <input
              type="email"
              placeholder={
                errors.email && window.innerWidth <= 640 // Target small devices
                  ? errors.email.message
                  : "ইমেইল"
              }
              className={`input input-bordered w-full sm:text-sm ${
                errors.email ? "placeholder-red-500" : ""
              }`}
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "ইমেইল প্রয়োজন",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {/* Error message only for larger devices */}
            {errors.email && window.innerWidth > 640 && (
              <p className="text-red-400 sm:text-xs bg-slate-100 rounded-md p-1 mt-2 lg:bg-none">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white lg:text-black">
                পাসওয়ার্ড
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={
                  errors.password && window.innerWidth <= 640 // Target small devices
                    ? errors.password.message
                    : "পাসওয়ার্ড"
                }
                className={`input input-bordered w-full sm:text-sm ${
                  errors.password ? "placeholder-red-400" : ""
                }`}
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "পাসওয়ার্ড প্রয়োজন",
                  minLength: {
                    value: 1,
                    message: "পাসওয়ার্ড কমপক্ষে ৬টি অক্ষরের হওয়া উচিত",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <span role="img" aria-label="Hide password">
                    👁️
                  </span>
                ) : (
                  <span role="img" aria-label="Show password">
                    👁️‍🗨️
                  </span>
                )}
              </button>
            </div>
            {/* Error message only for larger devices */}
            {errors.password && window.innerWidth > 640 && (
              <p className="text-red-500 sm:text-xs bg-slate-100 rounded-md p-1 mt-2 lg:bg-none">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              disabled={loading}
              className={`btn bg-teal-500 text-white hover:bg-teal-600 transition duration-300 shadow-lg w-full sm:text-sm`}
            >
              {loading ? (
                <span className="text-gray-100">লগইন হচ্ছে...</span>
              ) : (
                "লগ ইন"
              )}
            </button>
          </div>

          <label className="label mt-4">
            <Link
              to="/forgotPassForm"
              className="label-text-alt link link-hover text-white lg:text-black"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </label>

          <p className="text-center mt-2  text-white lg:text-teal-500 ">
            নতুন এখানে? একটি নতুন অ্যাকাউন্ট তৈরি করুন।
          </p>
          <p className="text-center font-semibold  cursor-pointer text-white lg:text-teal-600">
            <Link to="/signUp">সাইন আপ</Link>
          </p>
        </form>
        <GoogleLogin />
        {/* <FacebookLogin/> */}
      </div>
    </div>
  );
};

export default Login;
