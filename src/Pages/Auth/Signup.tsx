/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateUserMutation } from "@/redux/api/authApi";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { handleApiError } from "@/utils/handleApiError";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "USER",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // BD phone regex check (starts with 01, total 11 digits)
    const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(form.phone)) {
      toast.error("Please enter a valid Bangladeshi phone number 📱");
      return;
    }

    try {
      await createUser(form).unwrap();
      toast.success("Account created successfully! ✅");
      navigate("/login");
    } catch (err: any) {
      handleApiError(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-full max-w-md bg-transparent shadow-2xl border-2 border-[#14B8A6] rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-[#14B8A6]">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <Input
              type="text"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white dark:text-white text-gray-900 border-2 border-gray-300 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]"
            />

            {/* Email */}
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white dark:text-white text-gray-900 border-2 border-gray-300 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]"
            />

            {/* Phone */}
            <Input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white dark:text-white text-gray-900 border-2 border-gray-300 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]"
            />

            {/* Role */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
            >
              <option value="USER">USER</option>
              <option value="MODERATOR">MODERATOR</option>
            </select>

            {/* Password */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-3 pr-12 rounded-lg bg-white dark:text-white text-gray-900 border-2 border-gray-300 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-[#14B8A6]"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full py-3 bg-[#14B8A6] text-white font-semibold text-lg rounded-lg hover:bg-white hover:text-[#14B8A6] transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#14B8A6] font-semibold underline hover:text-white">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
