import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert
import "./Login.css"; // Import custom CSS for extra styling if needed

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await signIn(data.email, data.password);
      reset();
      Swal.fire({
        title: "Success!",
        text: "Login successful!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
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
    <div className="container">
    <div className="circle-container">
      {/* Animated circles */}
      <div className="circle" style={{ width: '100px', height: '100px', top: '20%', left: '25%' }}></div>
      <div className="circle" style={{ width: '150px', height: '150px', top: '50%', left: '60%' }}></div>
      <div className="circle" style={{ width: '200px', height: '200px', top: '70%', left: '40%' }}></div>
    </div>

    <div className="card">
      <div className="card-header">
        <h2>Login</h2>
      </div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <div className="small">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;
