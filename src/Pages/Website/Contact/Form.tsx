import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Reusable Input Field Component
type ContactInputFieldProps = {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
};

const ContactInputField = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}: ContactInputFieldProps) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
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

  interface FormData {
    name: string;
    phone: string;
    email: string;
    message: string;
  }

  // Removed unnecessary empty interface

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: FormData) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const isValidPhone = /^[0-9]{10,13}$/.test(formData.phone);
    if (!isValidPhone) {
      toast.error("ফোন নাম্বার সঠিক নয়।");
      return false;
    }
    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Log form data to console
      console.log("Form submitted:", formData);

      // Show success toast
      toast.success("আপনার তথ্য সফলভাবে জমা হয়েছে।");

      // Reset the form
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। দয়া করে পরে চেষ্টা করুন।");
    }
  };

  return (
    <>
      <div className="container px-8 py-0 md:py-12 lg:bg-muted min-h-screen">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-5xl font-bold text-foreground">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-lg md:text-2xl mt-4 text-muted-foreground">
            ম্যানেজড বাই{" "}
            <span className="font-semibold text-primary">স্বপ্ননীড়</span>
          </p>
        </div>

        <div className="bg-card p-6 lg:p-8 lg:shadow-lg rounded-lg max-w-2xl mx-auto border border-border">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <ContactInputField
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="পূর্ণ নাম"
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
                rows={8}
                className="w-full p-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary bg-background text-foreground"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              আমাদের সাথে যোগাযোগ করুন
            </button>
          </form>

          <p className="text-muted-foreground text-sm mt-4 text-center">
            আপনি স্বপ্ননীড় এর{" "}
            <a href="#" className="text-primary hover:underline">
              শর্তাবলী
            </a>{" "}
            এবং{" "}
            <a href="#" className="text-primary hover:underline">
              গোপনীয়তা নীতিমালা গ্রহণ করছেন।
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Form;