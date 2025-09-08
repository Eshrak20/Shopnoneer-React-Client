import React, { useState, useEffect } from "react";
import updateUserProfile from "../../Models/ProfileModel/UpdateUserProfile";
import Swal from "sweetalert2";
import InputField from "../../Components/InputField/InputField";

const Address = ({ Data, setData, onUpdate, DivisionData = [] }) => {
  const {
    presentDivision,
    presentDistrict,
    presentUpazilla,
    presentCity,
    permanentDivision,
    permanentDistrict,
    permanentUpazilla,
    permanentCity,
  } = Data;

  const [presentDistricts, setPresentDistricts] = useState([]);
  const [presentUpazilas, setPresentUpazilas] = useState([]);
  const [permanentDistricts, setPermanentDistricts] = useState([]);
  const [permanentUpazilas, setPermanentUpazilas] = useState([]);

  // Handling presentDivision change
  useEffect(() => {
    if (presentDivision && Array.isArray(DivisionData)) {
      const selectedDivision = DivisionData.find(
        (division) => division.name_bn === presentDivision
      );
      setPresentDistricts(selectedDivision ? selectedDivision.districts : []);
    }
  }, [presentDivision, DivisionData]);

  // Handling presentDistrict change
  useEffect(() => {
    if (presentDistrict) {
      const selectedDistrict = presentDistricts.find(
        (district) => district.name_bn === presentDistrict
      );
      setPresentUpazilas(selectedDistrict ? selectedDistrict.upazilas : []);
    }
  }, [presentDistrict, presentDistricts]);

  // Handling permanentDivision change
  useEffect(() => {
    if (permanentDivision && Array.isArray(DivisionData)) {
      const selectedDivision = DivisionData.find(
        (division) => division.name_bn === permanentDivision
      );
      setPermanentDistricts(selectedDivision ? selectedDivision.districts : []);
    }
  }, [permanentDivision, DivisionData]);

  // Handling permanentDistrict change
  useEffect(() => {
    if (permanentDistrict) {
      const selectedDistrict = permanentDistricts.find(
        (district) => district.name_bn === permanentDistrict
      );
      setPermanentUpazilas(selectedDistrict ? selectedDistrict.upazilas : []);
    }
  }, [permanentDistrict, permanentDistricts]);

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
        text: "আপনার ঠিকানার তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।",
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#38b2ac",
        timer:2000
      });
      onUpdate(updatedUser);
    } catch (error) {
      console.error("Error submitting address:", error.message);

      Swal.fire({
        icon: "error",
        title: "ত্রুটি!",
        text: `আপনার ঠিকানার তথ্য সংরক্ষণে সমস্যা হয়েছে: ${
          error.response?.data?.message || error.message
        }`,
        confirmButtonText: "পুনরায় চেষ্টা করুন",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 lg:px-12 bg-gradient-to-br  md:shadow-md lg:shadow-xl rounded-2xl">
      <h2 className="label-design">ঠিকানা সংক্রান্ত তথ্য</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-3 p-0 ">
          {/* Left Section: Present Address */}
          <div className="space-y-8 ">
            <div>
              <label className="intLabel">বর্তমান বিভাগ:</label>
              <select
                value={presentDivision || ""}
                onChange={(e) =>
                  handleInputChange("presentDivision", e.target.value)
                }
                className="rounded-lg input-field   focus:ring-teal-500 focus:border-teal-500 p-3 w-full  shadow-sm"
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {Array.isArray(DivisionData) && DivisionData.length ? (
                  DivisionData.map((division) => (
                    <option key={division.id} value={division.name_bn || ""}>
                      {division.name_bn}
                    </option>
                  ))
                ) : (
                  <option disabled>কোনো বিভাগ নেই</option>
                )}
              </select>
            </div>

            <div>
              <label className="intLabel">বর্তমান জেলা:</label>
              <select
                value={presentDistrict || ""}
                onChange={(e) =>
                  handleInputChange("presentDistrict", e.target.value)
                }
                className="rounded-lg input-field  focus:ring-teal-500 focus:border-teal-500 p-3 w-full  shadow-sm"
                disabled={!presentDistricts?.length}
              >
                <option value="">জেলা নির্বাচন করুন</option>
                {presentDistricts?.length ? (
                  presentDistricts.map((district) => (
                    <option key={district.id} value={district.name_bn || ""}>
                      {district.name_bn}
                    </option>
                  ))
                ) : (
                  <option disabled>কোনো জেলা নেই</option>
                )}
              </select>
            </div>

            <div>
              <label className="intLabel">বর্তমান উপজেলা:</label>
              <select
                value={presentUpazilla || ""}
                onChange={(e) =>
                  handleInputChange("presentUpazilla", e.target.value)
                }
                className="rounded-lg input-field  focus:ring-teal-500 focus:border-teal-500 p-3 w-full  shadow-sm"
                disabled={!presentUpazilas?.length}
              >
                <option value="">উপজেলা নির্বাচন করুন</option>
                {presentUpazilas?.length ? (
                  presentUpazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name_bn || ""}>
                      {upazila.name_bn}
                    </option>
                  ))
                ) : (
                  <option disabled>কোনো উপজেলা নেই</option>
                )}
              </select>
            </div>

            <div className="pt-3">
              <InputField
                label="বর্তমান ঠিকানা:"
                value={presentCity || ""}
                onChange={(e) =>
                  handleInputChange("presentCity", e.target.value)
                }
                placeholder="বর্তমান ঠিকানা"
                className="rounded-lg input-field  focus:ring-teal-500 focus:border-teal-500 p-3 w-full shadow-sm"
              />
            </div>
          </div>

          {/* Right Section: Permanent Address */}
          <div className="space-y-8">
            <div>
              <label className="intLabel">স্থায়ী বিভাগ:</label>
              <select
                value={permanentDivision || ""}
                onChange={(e) =>
                  handleInputChange("permanentDivision", e.target.value)
                }
                className="rounded-lg input-field  focus:ring-teal-500 focus:border-teal-500 p-3 w-full  shadow-sm"
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {Array.isArray(DivisionData) && DivisionData.length ? (
                  DivisionData.map((division) => (
                    <option key={division.id} value={division.name_bn || ""}>
                      {division.name_bn}
                    </option>
                  ))
                ) : (
                  <option disabled>কোনো বিভাগ নেই</option>
                )}
              </select>
            </div>

            <div>
              <label className="intLabel">স্থায়ী জেলা:</label>
              <select
                value={permanentDistrict || ""}
                onChange={(e) =>
                  handleInputChange("permanentDistrict", e.target.value)
                }
                className="rounded-lg input-field  focus:ring-teal-500 focus:border-teal-500 p-3 w-full  shadow-sm"
                disabled={!permanentDistricts?.length}
              >
                <option value="">জেলা নির্বাচন করুন</option>
                {permanentDistricts?.length ? (
                  permanentDistricts.map((district) => (
                    <option key={district.id} value={district.name_bn || ""}>
                      {district.name_bn}
                    </option>
                  ))
                ) : (
                  <option disabled>কোনো জেলা নেই</option>
                )}
              </select>
            </div>

            <div>
              <label className="intLabel">স্থায়ী উপজেলা:</label>
              <select
                value={permanentUpazilla || ""}
                onChange={(e) =>
                  handleInputChange("permanentUpazilla", e.target.value)
                }
                className="rounded-lg input-field  focus:ring-teal-500 focus:border-teal-500 p-3 w-full  shadow-sm"
                disabled={!permanentUpazilas?.length}
              >
                <option value="">উপজেলা নির্বাচন করুন</option>
                {permanentUpazilas?.length ? (
                  permanentUpazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name_bn || ""}>
                      {upazila.name_bn}
                    </option>
                  ))
                ) : (
                  <option disabled>কোনো উপজেলা নেই</option>
                )}
              </select>
            </div>
            <div className="pt-3">
              <InputField
                label="স্থায়ী ঠিকানা:"
                value={permanentCity || ""}
                onChange={(e) =>
                  handleInputChange("permanentCity", e.target.value)
                }
                placeholder="স্থায়ী ঠিকানা"
                className="rounded-lg input-field focus:ring-teal-500 focus:border-teal-500 p-3 w-full  shadow-sm"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-design">
          ঠিকানা সংরক্ষণ করুন
        </button>
      </form>
    </div>
  );
};

export default Address;
