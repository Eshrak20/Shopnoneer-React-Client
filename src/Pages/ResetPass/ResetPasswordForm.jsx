import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PasswordReset from "../../Models/PasswordReset/PasswordReset";
import PasswordToggle from "../../Components/PasswordToggole/PasswordToggle";

const ResetPasswordForm = ({ onToggle, showPassword, setShowPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handlePasswordReset = async (data) => {
    // if (data.newPass !== data.retypePass) {
    //   Swal.fire({
    //     title: "ত্রুটি!",
    //     text: "নতুন পাসওয়ার্ড এবং পুনরায় দেওয়া পাসওয়ার্ড মিলছে না।",
    //     icon: "error",
    //     confirmButtonText: "ঠিক আছে",
    //   });
    //   return;
    // }

    try {
      const response = await PasswordReset({
        password: data.newPass,
        confirm_password: data.retypePass,
      });
      reset();

      if (response.code === 200) {
        Swal.fire({
          title: "পাসওয়ার্ড রিসেট করা হয়েছে!",
          text: "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।",
          icon: "success",
          confirmButtonText: "ঠিক আছে",
        }).then(() => {
          window.location.href = window.location.origin + '/';
        });
      } else {
        Swal.fire({
          title: "ত্রুটি!",
          text: response?.error || "পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
          icon: "error",
          confirmButtonText: "ঠিক আছে",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "ত্রুটি!",
        text: error.response?.error || "পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        icon: "error",
        confirmButtonText: "ঠিক আছে",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handlePasswordReset)}>
      {/* <div className="form-control relative">
        <label className="block text-gray-700 font-semibold mb-2">
          বর্তমান পাসওয়ার্ড
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="আপনার বর্তমান পাসওয়ার্ড লিখুন"
          {...register("currentPass", { required: true })}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            errors.currentPass ? "border-red-500" : ""
          }`}
        />
        {errors.currentPass && (
          <p className="text-red-500">এই ক্ষেত্রটি প্রয়োজনীয়</p>
        )}
        <PasswordToggle 
          showPassword={showPassword} 
          setShowPassword={setShowPassword} 
          topPosition="top-14"
        />
      </div> */}

      <div className="form-control relative mb-6">
        {/* <label className="block text-gray-700 font-semibold mb-2 ">
          নতুন পাসওয়ার্ড
        </label> */}
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
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            errors.newPass ? "border-red-500" : ""
          }`}
        />
        {errors.newPass && (
          <p className="text-red-500">{errors.newPass.message}</p>
        )}
         <PasswordToggle 
          showPassword={showPassword} 
          setShowPassword={setShowPassword} 
          topPosition="top-2"
        />
      </div>

      <div className="form-control">
        {/* <label className="block text-gray-700 font-semibold mb-2">
          নতুন পাসওয়ার্ড পুনরায় লিখুন
        </label> */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="নতুন পাসওয়ার্ড পুনরায় লিখুন"
          {...register("retypePass", { required: true })}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            errors.retypePass ? "border-red-500" : ""
          }`}
        />
        {errors.retypePass && (
          <p className="text-red-500">{errors.retypePass.message}</p>
        )}
      </div>

      <div className="form-control mt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          পাসওয়ার্ড পরিবর্তন করুন
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="text-gray-600">আপনার পাসওয়ার্ড মনে আছে?</p>
        <a href="/login" className="text-teal-500 hover:underline">
          লগইনে ফিরে যান
        </a>
      </div>
    </form>
  );
};

export default ResetPasswordForm;