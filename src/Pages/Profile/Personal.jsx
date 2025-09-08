import Swal from "sweetalert2";
import updateUserProfile from "../../Models/ProfileModel/UpdateUserProfile";
import InputField from "../../Components/InputField/InputField";
import ProfilePic from "./ProfilePic";
import { useEffect, useState } from "react";
import CategoryModel from "../../Models/CategoryModel/CategoryModel";

const Personal = ({ Data, setData, onUpdate }) => {
  const {
    fullName,
    age,
    religion,
    occupation,
    education,
    phoneNumber,
    profilePhoto,
  } = Data;
  const [religionOptions, setReligionOptions] = useState([]);
  const [occupationOptions, setOccupationOptions] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await CategoryModel();
        // Filter options based on parent category
        setReligionOptions(data.filter((item) => item.parent === "Religion"));
        setOccupationOptions(
          data.filter((item) => item.parent === "Occupation")
        );
        setEducationOptions(data.filter((item) => item.parent === "Education"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  const handleInputChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  // Helper function to get initials from the full name
  const getInitials = (name) => {
    if (!name || name.trim().length === 0) {
      return ""; // Return an empty string if name is empty or contains only spaces
    } else {
      const nameArray = name.split(" ");
      const initials1 = nameArray[0].charAt(0).toUpperCase();
      const initials2 = nameArray[1]
        ? nameArray[1].charAt(0).toUpperCase()
        : ""; // Check if the second name part exists
      const join = initials1 + initials2;
      return join;
    }
  };

  const phoneNumberRegex = /^[0-9]{11}$/; // Regex for validating 10-digit phone numbers

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone number validation
    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "ইনভ্যালিড ফোন নম্বর!",
        text: "অনুগ্রহ করে সঠিক ১১ ডিজিটের ফোন নম্বর প্রদান করুন।",
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#38b2ac",
      });
      return;
    }

    try {
      const updatedUser = await updateUserProfile(Data);

      Swal.fire({
        icon: "success",
        title: "সফল!",
        text: "আপনার ব্যক্তিগত তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।",
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#38b2ac",
        timer: 2000,
      });
      onUpdate(updatedUser);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text: `আপনার ব্যক্তিগত তথ্য সংরক্ষণে সমস্যা হয়েছে: ${error.message}`,
        confirmButtonText: "পুনরায় চেষ্টা করুন",
      });
    }
  };

  return (
    <div className="mx-auto px-10 md:px-24 pb-10 2xl:px-16 max-w-3xl bg-gradient-to-br from-gray-50 to-white md:shadow-md lg:shadow-xl rounded-2xl">
      <h2 className="label-design text-center">ব্যক্তিগত তথ্য</h2>

      {/* Profile Picture Section */}
      <div className="flex justify-center lg:mb-5">
        <ProfilePic
          fullName={fullName}
          getInitials={getInitials}
          handleInputChange={handleInputChange}
          profilePhoto={profilePhoto}
        />
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1  md:grid-cols-2 p-0 gap-6">
          {/* Left Column */}
          <div className="space-y-7 mt-7">
            <InputField
              value={fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="পূর্ণ নাম"
            />
            <InputField
              value={age}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0 && value <= 100) {
                  handleInputChange("age", value);
                }
              }}
              placeholder="বয়স"
            />
            <InputField
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  handleInputChange("phoneNumber", value);
                }
              }}
              placeholder="১১ ডিজিটের ফোন নম্বর"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="intLabel">ধর্ম</label>
              <select
                value={religion}
                onChange={(e) => handleInputChange("religion", e.target.value)}
                className="input-field w-full"
              >
                <option value="">ধর্ম নির্বাচন করুন</option>

                {religionOptions.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="intLabel">পেশা</label>
              <select
                value={occupation}
                onChange={(e) =>
                  handleInputChange("occupation", e.target.value)
                }
                className="input-field w-full"
              >
                <option value="">পেশা নির্বাচন করুন</option>

                {occupationOptions.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="intLabel">শিক্ষাগত যোগ্যতা</label>
              <select
                value={education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                className="input-field w-full"
              >
                <option value="">শিক্ষাগত যোগ্যতা নির্বাচন করুন</option>

                {educationOptions.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button type="submit" className="btn-design">
            ব্যক্তিগত তথ্য সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default Personal;
