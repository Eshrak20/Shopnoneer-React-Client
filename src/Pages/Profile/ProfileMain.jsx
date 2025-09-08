import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Personal from "./Personal";
import Address from "./Address";
import Preference from "./Preference";
import Planning from "./Planning";
import userProfile from "../../Models/ProfileModel/UserProfile";
import Navbar from "../Shared/Navbar/Navbar";
import DivisionModel from "../../Models/DivisionModel/DivisionModel";
import Spinner from "../../../public/assets/loadingSpinner/Spinner";

const ProfileMain = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "Personal";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [user, setUser] = useState(null);
  const [DivisionData, setDivisionData] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("tab", activeTab);
    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [activeTab, navigate]);

  const [Data, setData] = useState({
    fullName: null,
    age: null,
    religion: null,
    occupation: null,
    education: null,
    phoneNumber: null,
    profilePhoto: null,
    presentDivision: null,
    presentDistrict: null,
    presentUpazilla: null,
    presentCity: null,
    permanentDivision: null,
    permanentDistrict: null,
    permanentUpazilla: null,
    permanentCity: null,
    preferableDivision: null,
    preferableDistrict: null,
    preferableUpazilla: null,
    preferableCity: null,
    preferableFlatSize: null,
    estimatedBudget: null,
    currentCapital: null,
    totalFamilyMembers: null,
    sourceOfIncome: null,
    monthlyIncome: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await userProfile();
        if (data) {
          setUser(data.profile);
          setData({
            fullName: data.profile.fullName || null,
            age: data.profile.age || 0,
            religion: data.profile.religion || null,
            occupation: data.profile.occupation || null,
            education: data.profile.education || null,
            phoneNumber: data.profile.phoneNumber || null,
            profilePhoto: data.profile.profilePhoto || null,
            presentDivision: data.profile.presentDivision || null,
            presentDistrict: data.profile.presentDistrict || null,
            presentUpazilla: data.profile.presentUpazilla || null,
            presentCity: data.profile.presentCity || null,
            permanentDivision: data.profile.permanentDivision || null,
            permanentDistrict: data.profile.permanentDistrict || null,
            permanentUpazilla: data.profile.permanentUpazilla || null,
            permanentCity: data.profile.permanentCity || null,
            preferableDivision: data.profile.preferableDivision || null,
            preferableDistrict: data.profile.preferableDistrict || null,
            preferableUpazilla: data.profile.preferableUpazilla || null,
            preferableCity: data.profile.preferableCity || null,
            preferableFlatSize: data.profile.preferableFlatSize || null,
            estimatedBudget: data.profile.estimatedBudget || null,
            currentCapital: data.profile.currentCapital || null,
            totalFamilyMembers: data.profile.totalFamilyMembers || null,
            sourceOfIncome: data.profile.sourceOfIncome || null,
            monthlyIncome: data.profile.monthlyIncome || null,
          });
        }
      } catch (error) {
        console.error("ব্যবহারকারী প্রোফাইল লোড করতে সমস্যা:", error);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const loadDivision = async () => {
      try {
        const data = await DivisionModel();
        if (data) {
          setDivisionData(data);
        }
      } catch (error) {
        console.error("বিভাগ লোড করতে সমস্যা:", error);
      }
    };
    loadDivision();
  }, []);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const renderTabContent = () => {
    if (!user) {
      return <Spinner />;
    }

    switch (activeTab) {
      case "Personal":
        return (
          <Personal
            Data={Data}
            setData={setData}
            user={user}
            onUpdate={handleUpdate}
          />
        );
      case "Address":
        return (
          <Address
            user={user}
            Data={Data}
            DivisionData={DivisionData}
            setData={setData}
            onUpdate={handleUpdate}
          />
        );
      case "Preference":
        return (
          <Preference
            user={user}
            Data={Data}
            DivisionData={DivisionData}
            setData={setData}
            onUpdate={handleUpdate}
          />
        );
      case "Planning":
        return (
          <Planning
            Data={Data}
            setData={setData}
            user={user}
            onUpdate={handleUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-screen-2xl mx-auto">
        <Navbar visible={true} />
        <div className="md:mx-32 2xl:mx-20 flex flex-col md:flex-row ">
          <div className="lg:mt-14 md:w-1/6 max-w-4xl flex md:ml-20 2xl:ml-10 flex-col gap-4">
            <div className="flex justify-between items-center">
              <Link to="/profile">
                <button className="flex md:text-xl 2xl:text-2xl items-center text-teal-600 hover:text-teal-800 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 12H5m7-7l-7 7 7 7"
                    />
                  </svg>
                  প্রোফাইল
                </button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 md:flex-col justify-start md:justify-start">
              {["Personal", "Address", "Preference", "Planning"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1  md:px-4 md:py-2 rounded-sm 2xl:rounded-lg md:text-xl 2xl:text-3xl font-semibold transition-all duration-300 ease-in-out 
        ${
          activeTab === tab
            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white"
            : "bg-gray-100 text-teal-600 border-2 border-teal-50 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-50"
        }`}
                >
                  {tab === "Personal" && "ব্যক্তিগত"}
                  {tab === "Address" && "ঠিকানা"}
                  {tab === "Preference" && "পছন্দ"}
                  {tab === "Planning" && "পরিকল্পনা"}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full rounded-lg max-w-max mx-auto lg:p-8 transform transition-all duration-300 ease-in-out md:mt-5 2xl:mt-0">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
