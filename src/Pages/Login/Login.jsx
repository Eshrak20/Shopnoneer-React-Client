import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import "./Login.css";
import "./BubblesAnimation.css";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      reset();

      Swal.fire({
        title: "Success!",
        text: "Login successful!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/", { replace: true }), 1500);
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message || "An error occurred during login. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper flex justify-center items-center min-h-screen">
      {/* Animated Bubbles */}
      <div className="bubble"><div className="dot"></div></div>
      <div className="bubble"><div className="dot"></div></div>
      <div className="bubble"><div className="dot"></div></div>
      <div className="bubble"><div className="dot"></div></div>
      <div className="bubble"><div className="dot"></div></div>
      <div className="bubble"><div className="dot"></div></div>

      <div className="card w-full max-w-md mx-auto shadow-2xl bg-gray-100">
        <div className="bg-teal-500 text-white p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold text-center">Shopnoneer</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-6 rounded-b-lg" noValidate>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              aria-invalid={errors.email ? "true" : "false"}
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <span role="img" aria-label="Hide password">🙈</span>
                ) : (
                  <span role="img" aria-label="Show password">👁️</span>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div className="form-control mt-6">
            <button
              disabled={loading}
              className="btn bg-teal-500 text-white hover:bg-teal-600 transition duration-300 shadow-lg w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <label className="label mt-4">
            <Link to="/resetPass" className="label-text-alt link link-hover">
              Forgot password?
            </Link>
          </label>

          <p className="text-center mt-2 text-teal-500">
            New here? Create a new account
          </p>
          <p className="text-center font-semibold text-teal-600 cursor-pointer">
            <Link to="/signUp">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;