import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import updateUserProfile from "../../Models/ProfileModel/UpdateUserProfile";
import "./InputField.css";
import InputField from "../../Components/InputField/InputField";
import SweetAlert from "../../Components/SweetAlert/SweetAlert";

const Preference = ({ user, Data, setData, onUpdate, DivisionData = [] }) => {
  const {
    preferableDivision,
    preferableDistrict,
    preferableUpazilla,
    preferableCity,
    preferableFlatSize,
  } = Data;

  const [preferableDistricts, setPreferableDistricts] = useState([]);
  const [preferableUpazilas, setPreferableUpazilas] = useState([]);

  useEffect(() => {
    if (Array.isArray(DivisionData)) {
      const selectedDivision = DivisionData.find(
        (division) => division.name_bn === preferableDivision
      );
      if (selectedDivision) {
        setPreferableDistricts(selectedDivision.districts || []);
      }
    } else {
      console.error("DivisionData is not valid:", DivisionData);
    }
  }, [preferableDivision, DivisionData]);

  useEffect(() => {
    if (preferableDistricts && Array.isArray(preferableDistricts)) {
      const selectedDistrict = preferableDistricts.find(
        (district) => district.name_bn === preferableDistrict
      );
      if (selectedDistrict) {
        setPreferableUpazilas(selectedDistrict.upazilas || []);
      }
    }
  }, [preferableDistricts, preferableDistrict]);

  const handleInputChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUserProfile(Data);

      SweetAlert({
        icon: "success",
        title: "সাফল্য!",
        text: "আপনার পছন্দসমূহ সফলভাবে সংরক্ষিত হয়েছে।",
        confirmButtonText: "ওকে",
        confirmButtonColor: "#38b2ac",
        timer: 2000,
      });
      onUpdate(updatedUser);

      // Call some function like onUpdate
    } catch (error) {
      SweetAlert({
        icon: "error",
        title: "Error!",
        text: `There was an error submitting your preferences: ${error.message}`,
        confirmButtonText: "Try Again",
      });
      console.error("Error submitting preference data:", error.message);
    }
  };

  return (
    <div className="p-5 max-w-2xl bg-gradient-to-br from-gray-50 to-white md:shadow-md lg:shadow-xl rounded-2xl">
      <h2 className="label-design mt-10">পছন্দের তথ্য</h2> 
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 py-4 -mt-5"
      >
        {/* Left side */}
        <div className="space-y-6">
          <div>
            <label className="intLabel">পছন্দের বিভাগ:</label>
            <select
              value={preferableDivision || ""}
              onChange={(e) =>
                handleInputChange("preferableDivision", e.target.value)
              }
              className="block w-full rounded-lg input-field focus:ring-teal-500 focus:border-teal-500 p-3 text-gray-700"
            >
              <option value="">বিভাগ নির্বাচন করুন</option>
              {Array.isArray(DivisionData) &&
                DivisionData.map((division) => (
                  <option key={division.id} value={division.name_bn}>
                    {division.name_bn}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              পছন্দের জেলা:
            </label>
            <select
              value={preferableDistrict || ""}
              onChange={(e) =>
                handleInputChange("preferableDistrict", e.target.value)
              }
              className="block w-full rounded-lg input-field focus:ring-teal-500 focus:border-teal-500 p-3 text-gray-700"
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {preferableDistricts?.length > 0 &&
                preferableDistricts.map((district) => (
                  <option key={district.id} value={district.name_bn}>
                    {district.name_bn}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              পছন্দের উপজেলা:
            </label>
            <select
              value={preferableUpazilla || ""}
              onChange={(e) =>
                handleInputChange("preferableUpazilla", e.target.value)
              }
              className="block w-full rounded-lg input-field focus:ring-teal-500 focus:border-teal-500 p-3 text-gray-700"
            >
              <option value="">উপজেলা নির্বাচন করুন</option>
              {preferableUpazilas?.length > 0 &&
                preferableUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name_bn}>
                    {upazila.name_bn}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-6 md:mt-7">
          <div>
            <InputField
              placeholder="পছন্দের বাড়ির ধরন"
              type="text"
              value={preferableCity}
              onChange={(e) =>
                handleInputChange("preferableCity", e.target.value)
              }
              className="block w-full h-12 p-3 rounded-lg input-field focus:ring-teal-500 focus:border-teal-500 text-gray-700 text-lg"
            />
          </div>

          <div className="md:pt-5">
            <InputField
              placeholder="ফ্ল্যাটের আকার (বর্গফুট)"
              type="number"
              value={preferableFlatSize}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  handleInputChange("preferableFlatSize", value);
                }
              }}
              className="block w-full h-12 p-3 rounded-lg input-field focus:ring-teal-500 focus:border-teal-500 text-gray-700 text-lg"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="col-span-1 md:col-span-2 text-center">
          <button
            type="submit"
            className="btn-design"
          >
            পছন্দের তথ্য সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default Preference;
