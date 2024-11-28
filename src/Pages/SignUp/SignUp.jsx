import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import "@lottiefiles/lottie-player";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/loadingLottie/loadingLottie.json";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
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

    try {
      const user = await createUser(
        data.name,
        data.email,
        data.phone_number,
        data.password,
        data.confirm_password
      );
      reset();

      Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text:
          err.message || "An error occurred during sign-up. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Head Section with Shopnoneer Branding */}
      <div className="hero min-h-screen bg-base-100 relative flex items-center justify-center overflow-hidden">
        <div className="text-center mb-8 absolute top-5 lg:mb-0 lg:w-1/2">
          <h1 className="text-4xl font-extrabold text-teal-500">Shopnoneer</h1>
          <p className="text-lg mt-2 text-gray-600">
            Your one-stop solution for everything!
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
                  <span role="img" aria-label="Go back" className="text-2xl">
                    ←
                  </span>
                </Link>
                <h2 className="text-2xl font-semibold text-center">
                  Create Your Account
                </h2>
              </div>

              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
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

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", {
                    required: "Email is required",
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="input input-bordered"
                  {...register("phone_number", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.phone_number && (
                  <p className="text-red-500">{errors.phone_number.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="input input-bordered"
                  {...register("confirm_password", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
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
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </div>

              <p className="text-center mt-2 text-teal-500">
                Already have an account?{" "}
                <Link to="/login" className="text-teal-600">
                  Log In
                </Link>
              </p>
            </form>
          </div>

          {/* Animation Section */}
          <div className="mt-0 lg:mt-0 lg:w-1/2">
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
