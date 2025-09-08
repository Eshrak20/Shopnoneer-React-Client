import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import "@lottiefiles/lottie-player";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../../public/assets/loadingLottie/loadingLottie.json";
import { useForm } from "react-hook-form";
import GoogleLogin from "../../Components/SocialLogin/GoogleLogin";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const user = await createUser(
        data.name,
        data.email,
        data.password,
        data.confirm_password
        // data.phone_number
      );
      reset();

      Swal.fire({
        title: "সাফল্য!",
        text: "একাউন্ট সফলভাবে তৈরি হয়েছে!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      // Wait for 0.5 seconds before navigating to login
      await delay(500);
      navigate("/login", { replace: true });
    } catch (err) {
      Swal.fire({
        title: "ত্রুটি!",
        text:
          err.message ||
          "সাইন-আপের সময় একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        icon: "error",
        confirmButtonText: "ঠিক আছে",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Head Section with স্বপ্ননীড়  Branding */}
      <div className="hero min-h-screen bg-base-100 relative flex items-center justify-center overflow-hidden">
        <div className="text-center mb-8 absolute top-5 lg:mb-0 lg:w-1/2">
          <h1 className="text-4xl font-extrabold text-teal-500">স্বপ্ননীড় </h1>
          <p className="text-lg mt-2 text-gray-600">
            আপনার সবকিছুর জন্য একক সমাধান!
          </p>
        </div>
        <div className="hero-content flex flex-col lg:flex-row justify-between w-full max-w-7xl p-0 ">
          {/* Form Section */}
          <div className="card flex-shrink-0 w-full max-w-sm sm:max-w-md bg-base-100 lg:mr-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body"
              noValidate
            >
              {/* Header Section */}
              <div className="flex items-center mb-4">
                <Link
                  to="/login"
                  className="text-teal-500 hover:text-teal-600 transition duration-200 mr-4"
                >
                  <span role="img" aria-label="Go back" className="text-4xl">
                    ←
                  </span>
                </Link>
                <h2 className="text-2xl font-semibold text-center">
                  আপনার অ্যাকাউন্ট তৈরি করুন।
                </h2>
              </div>

              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">আপনার নাম</span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  className="input input-bordered "
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* ইমেইল Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ইমেইল</span>
                </label>
                <input
                  type="email"
                  placeholder="ইমেইল"
                  className="input input-bordered"
                  {...register("email", {
                    required: "ইমেইল is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number Field */}
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">ফোন নম্বর</span>
                </label>
                <input
                  type="text"
                  placeholder="ফোন নম্বর"
                  className="input input-bordered"
                  {...register("phone_number", {
                    required: "ফোন নম্বর প্রয়োজন।",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "ইনভ্যালিড ফোন নম্বর।",
                    },
                  })}
                />
                {errors.phone_number && (
                  <p className="text-red-500">{errors.phone_number.message}</p>
                )}
              </div> */}

              {/* Password Field */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">পাসওয়ার্ড</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="পাসওয়ার্ড"
                    className="input input-bordered w-full"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "পাসওয়ার্ডটি কমপক্ষে ৬ অক্ষরের হতে হবে।",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-5 right-3 flex items-center text-gray-500 hover:text-gray-700"
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
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">পাসওয়ার্ড নিশ্চিত করুন</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  className="input input-bordered"
                  {...register("confirm_password", {
                    required: "পাসওয়ার্ড নিশ্চিত করুন ",
                    validate: (value) =>
                      value === password || "পাসওয়ার্ডগুলো মিলছে না।",
                  })}
                />
                {errors.confirm_password && (
                  <p className="text-red-500">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  disabled={loading}
                  className="btn bg-teal-500 text-white hover:bg-teal-600"
                >
                  {loading ? "অ্যাকাউন্ট তৈরি করা হচ্ছে..." : "সাইন আপ"}
                </button>
              </div>

              <p className="text-center mt-2 text-teal-500">
                আপনার কি ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link to="/login" className="text-teal-600">
                  লগ ইন করুন
                </Link>
              </p>
            </form>
            <GoogleLogin />
          </div>

          {/* Animation Section */}
          <div className="mt-0 hidden lg:block lg:mt-0 lg:w-1/2">
            <Player
              autoplay
              loop
              src={loadingAnimation}
              background="transparent"
              style={{ width: "100%", height: "100%" }}
              speed="1"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
