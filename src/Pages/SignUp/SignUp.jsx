import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert
import img from "../../../src/assets/Auth/authentication1.png"; // Import the image

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
        text: err.message || "An error occurred during sign-up. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 pb-11">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" noValidate>
            <h2 className="text-2xl font-semibold text-center mb-4">Create Your Account</h2>
            
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
              {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}
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
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
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
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
            </div>

            <div className="form-control mt-6">
              <button disabled={loading} className="btn bg-teal-500 text-white hover:bg-teal-600">
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

        <div className="hidden lg:flex lg:w-1/2 justify-center items-center">
          <img src={img} alt="Authentication" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
