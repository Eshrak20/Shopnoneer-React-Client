import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ContactModel from "../../Models/ContactModel/ContactModel";

// Reusable Input Field Component
const ContactInputField = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
    required={required}
  />
);

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const isValidPhone = /^[0-9]{10,13}$/.test(formData.phone);
    if (!isValidPhone) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text: "ফোন নাম্বার সঠিক নয়।",
        confirmButtonColor: "#38b2ac",
        confirmButtonText: "ঠিক আছে",
        timer: 3000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await ContactModel(formData);
      Swal.fire({
        icon: "success",
        title: "সফল!",
        text: "আপনার তথ্য সফলভাবে জমা হয়েছে।",
        confirmButtonColor: "#38b2ac",
        confirmButtonText: "ঠিক আছে",
        timer: 3000,
      });

      // Reset the form
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text:
          error.response?.data?.message ||
          "কিছু সমস্যা হয়েছে। দয়া করে পরে চেষ্টা করুন।",
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#38b2ac",
        timer: 3000,
      });
    }
  };

  return (
    <>
      <div className="container px-8 py-0 md:py-12 lg:bg-gray-100 min-h-screen">
        <div className="text-center mb-10">
          <h2 className=" text-2xl md:text-5xl font-bold text-gray-800">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-lg md:text-2xl mt-4 text-gray-600">
            ম্যানেজড বাই{" "}
            <span className="font-semibold text-teal-600">স্বপ্ননীড়</span>
          </p>
        </div>

        <div className="bg-white lg:p-8 lg:shadow-lg rounded-lg max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <ContactInputField
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="পূর্ণ নাম "
                required
              />
            </div>
            <div className="mb-4 relative">
              <ContactInputField
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="ফোন নাম্বার"
                required
              />
            </div>
            <div className="mb-4">
              <ContactInputField
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ইমেইল"
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="মেসেজ"
                rows="8"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300"
            >
              আমাদের সাথে যোগাযোগ করুন
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-4 text-center">
            আপনি স্বপ্ননীড় এর{" "}
            <a href="#" className="text-teal-500 hover:underline">
              শর্তাবলী
            </a>{" "}
            এবং{" "}
            <a href="#" className="text-teal-500 hover:underline">
              গোপনীয়তা নীতিমালা গ্রহণ করছেন।
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Form;
