/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { handleApiError } from "@/utils/handleApiError";
import { Eye, EyeOff, ArrowLeft, User, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await loginUser(form).unwrap();
      console.log("Login API Response:", result?.data?.user?.is_active);

      if (result.token) {
        sessionStorage.setItem("authToken", result.token);
      }

      if (
        result?.data?.user?.is_active === "BLOCKED" ||
        result?.data?.user?.is_active === "SUSPEND"
      ) {
        navigate("/login");
        toast.error(`User is ${result?.data?.user?.is_active}`);
      } else {
        toast.success("Logged in successfully!");
        navigate("/");
      }
    } catch (err: any) {
      handleApiError(err);
    }
  };

  // Function to fill demo user credentials
  const fillDemoUserCredentials = () => {
    setForm({
      email: "user@demo.com",
      password: "demopassword123"
    });
    toast.info("Demo user credentials filled");
  };

  // Function to fill demo admin credentials
  const fillDemoAdminCredentials = () => {
    setForm({
      email: "admin@demo.com",
      password: "adminpassword123"
    });
    toast.info("Demo admin credentials filled");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background relative">
        {/* Back Button */}
        <Button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="w-full max-w-md bg-card shadow-2xl border-2 border-primary rounded-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold text-primary">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Demo Credentials Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={fillDemoUserCredentials}
                className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 text-sm"
                size="sm"
                type="button"
              >
                <User className="mr-2 h-4 w-4" />
                Demo User
              </Button>
              <Button
                onClick={fillDemoAdminCredentials}
                className="flex-1 bg-muted text-muted-foreground hover:bg-muted/90 transition-all duration-300 text-sm"
                size="sm"
                type="button"
              >
                <Shield className="mr-2 h-4 w-4" />
                Demo Admin
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-background text-foreground border-2 border-input focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring text-base placeholder-muted-foreground"
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pr-12 rounded-lg bg-background text-foreground border-2 border-input focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring text-base placeholder-muted-foreground"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                </button>
              </div>
              <Button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground font-semibold text-lg rounded-lg hover:bg-primary/90 transition-all duration-300 transform shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-semibold underline hover:text-foreground transition-colors duration-300"
              >
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;