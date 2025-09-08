import { useState } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-teal-600">
          আপনার পাসওয়ার্ড পরিবর্তন করুন
        </h1>

        <ResetPasswordForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
    </div>
  );
};

export default ResetPass;
