import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import updateUserProfile from "../../Models/ProfileModel/UpdateUserProfile";
import InputFieldWithWord from "../../Components/InputField/InputFiledWord";

const Planning = ({ Data, setData, onUpdate }) => {
  const {
    estimatedBudget,
    currentCapital,
    totalFamilyMembers,
    sourceOfIncome,
    monthlyIncome,
  } = Data;

  const handleInputChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUserProfile(Data);

      Swal.fire({
        icon: "success",
        title: "সফল!",
        text: "আপনার পরিকল্পনা সফলভাবে সংরক্ষণ করা হয়েছে।",
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#38b2ac",
      });
      onUpdate(updatedUser);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text: `আপনার পরিকল্পনা সংরক্ষণে সমস্যা হয়েছে: ${error.message}`,
        confirmButtonText: "পুনরায় চেষ্টা করুন",
      });
      console.error("পরিকল্পনা তথ্য জমা দিতে সমস্যা:", error.message);
    }
  };

  return (
    <div className="mx-auto p-10 lg:px-16 from-gray-50 to-white shadow-xl rounded-lg">
      <h2 className="label-design mb-14">পরিকল্পনার তথ্য</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 p-0 -mt-5 "
      >
        {/* Left Section */}
        <div className="space-y-7">
          <InputFieldWithWord
            placeholder="অনুমানিত বাজেট"
            type="number"
            value={estimatedBudget || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) {
                handleInputChange("estimatedBudget", value);
              }
            }}
          />

          <InputFieldWithWord
            placeholder="বর্তমান পুঁজি"
            type="number"
            value={currentCapital || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) {
                handleInputChange("currentCapital", value);
              }
            }}
          />

          <InputFieldWithWord
            placeholder="পারিবারিক সদস্য সংখ্যা"
            type="number"
            value={totalFamilyMembers || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) {
                handleInputChange("totalFamilyMembers", value);
              }
            }}
          />
        </div>

        {/* Right Section */}
        <div className="space-y-7 mt-2">
          <div>
            <select
              value={sourceOfIncome || ""}
              onChange={(e) =>
                handleInputChange("sourceOfIncome", e.target.value)
              }
              className="block w-full rounded-lg input-field focus:ring-teal-500 focus:border-teal-500 p-3 text-gray-700"
            >
              <option value="">আয়ের উৎস নির্বাচন করুন</option>
              <option value="চাকরি">চাকরি</option>
              <option value="ব্যবসা">ব্যবসা</option>
            </select>
          </div>
          <div className="pt-3">
            <InputFieldWithWord
              placeholder="মাসিক আয়"
              type="number"
              value={monthlyIncome || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  handleInputChange("monthlyIncome", value);
                }
              }}
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 text-center">
          <button type="submit" className="btn-design mt-3">
            পরিকল্পনার তথ্য সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default Planning;
