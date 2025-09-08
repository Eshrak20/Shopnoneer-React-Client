import React, { useEffect, useState } from "react";
import userProfile from "../../Models/ProfileModel/UserProfile";
import { Link } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import {
  FaPhoneAlt,
  FaGraduationCap,
  FaBriefcase,
  FaHome,
} from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Spinner from "../../../public/assets/loadingSpinner/Spinner";
import LoadingLottie from "../../../public/assets/loadingLottie/loadingLottie";

const Profile = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await userProfile();
        setUser(data.profile);
        
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <>
        <Spinner />
        {/* <LoadingLottie /> */}
      </>
    );
  }
  

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
          <p className="text-xl text-gray-700 mb-6">
            ব্যবহারকারীর তথ্য পাওয়া যায়নি
          </p>
          <div className="mt-4">
            <a
              href="/"
              className="text-white bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded-md transition-all duration-300"
            >
              ফিরে যান
            </a>
          </div>
        </div>
      </div>
    );
  }

  const {
    fullName,
    email,
    profilePhoto,
    phoneNumber,
    education,
    occupation,
    presentDistrict,
  } = user;
  const getProfilePhotoUrl = (profilePhoto) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    return `${apiUrl}/storage/${profilePhoto}`;
  };

  const profileCompletion = calculateProfileCompletion(user);

  function calculateProfileCompletion(user) {
    let completedFields = 0;

    const userProfile = user;
    const fields = { ...userProfile };

    //! Convert the object to array for using forEach

    const fieldValues = Object.values(fields);

    fieldValues.forEach((field) => {
      if (field) completedFields++;
    });

    return (completedFields / fieldValues.length) * 100;
  }

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

  return (
    <>
      <div className="container mx-auto">
        <Navbar visible={true} />
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-xl overflow-hidden lg:mt-8">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start px-8 pt-3 lg:py-6">
          {/* Profile Card */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative">
              {profilePhoto ? (
                <img
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-teal-500 cursor-pointer"
                  src={getProfilePhotoUrl(profilePhoto) || ""}
                  alt={fullName}
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-teal-500 flex items-center justify-center bg-teal-50 text-teal-600 text-7xl font-bold">
                  {fullName ? getInitials(fullName) : null}
                </div>
              )}
            </div>
            <h1 className="text-4xl font-bold text-teal-700 mt-4 text-center">
              {fullName}
            </h1>
            {/* Linear Progress Bar Section */}
            <div className="lg:hidden">
              <progress
                className="progress progress-success w-56"
                value={profileCompletion}
                max="100"
              ></progress>
              <div className="text-center mt-2 text-sm font-semibold text-teal-700">
                {`${profileCompletion.toFixed(0)}%`}
              </div>
            </div>

            <p className="text-gray-600 text-xl mt-2 text-center">{email}</p>

            {/* Personal Information Section */}
            <div className="w-full">
              {/* <h2 className="text-3xl font-semibold text-teal-600 text-center">
                ব্যক্তিগত তথ্য
              </h2> */}
              <div className="mt-6 space-y-6">
                <div className="flex items-center py-3 border-b">
                  <FaPhoneAlt className="text-teal-600 mr-4" size={20} />
                  <span className="text-gray-600 font-medium text-xl">
                    ফোন নাম্বার:
                  </span>{" "}
                  {/* Increased size */}
                  <span className="ml-auto text-gray-800 text-xl">
                    {" "}
                    {/* Increased size */}
                    {phoneNumber || "কোনো নাম্বার নেই"}
                  </span>
                </div>
                <div className="flex items-center py-3 border-b">
                  <FaGraduationCap className="text-teal-600 mr-4" size={20} />
                  <span className="text-gray-600 font-medium text-xl">
                    শিক্ষা:
                  </span>{" "}
                  {/* Increased size */}
                  <span className="ml-auto text-gray-800 text-xl">
                    {" "}
                    {/* Increased size */}
                    {education || "পাঠ্যবিষয় নির্ধারণ করা হয়নি"}
                  </span>
                </div>
                <div className="flex items-center py-3 border-b">
                  <FaBriefcase className="text-teal-600 mr-4" size={20} />
                  <span className="text-gray-600 font-medium text-xl">
                    পেশা:
                  </span>{" "}
                  {/* Increased size */}
                  <span className="ml-auto text-gray-800 text-xl">
                    {" "}
                    {/* Increased size */}
                    {occupation || "পেশা নির্ধারণ করা হয়নি"}
                  </span>
                </div>
                <div className="flex items-center py-3">
                  <FaHome className="text-teal-600 mr-4" size={20} />
                  <span className="text-gray-600 font-medium text-xl">
                    অবস্থান:
                  </span>{" "}
                  {/* Increased size */}
                  <span className="ml-auto text-gray-800 text-xl">
                    {" "}
                    {/* Increased size */}
                    {presentDistrict
                      ? `${presentDistrict} ,বাংলাদেশ`
                      : "অবস্থান নির্ধারণ করা হয়নি"}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Circular Progress Bar Section */}
          <div className="hidden lg:block items-center lg:ml-20 ">
            <h2 className="hidden lg:block text-xl lg:text-3xl font-semibold text-teal-600 ">
              প্রোফাইল সম্পূর্ণতা
            </h2>
            <div className="w-1/2 lg:w-full mt-6 relative">
              <CircularProgressbar
                value={profileCompletion}
                text={`${profileCompletion.toFixed(0)}%`}
                strokeWidth={10}
                styles={{
                  root: {},
                  path: {
                    stroke: "url(#gradient)", // Apply gradient to the path
                    strokeLinecap: "round",
                  },
                  trail: {
                    stroke: "#e0e0e0", // Lighter gray trail for contrast
                  },
                  text: {
                    fill: "url(#text-gradient)", // Apply gradient to text
                    fontSize: "20px", // Larger text size
                    fontWeight: "bold", // Bold text
                  },
                }}
              />
              <svg width="0" height="0">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#14b8a6" /> {/* Teal 500 */}
                    <stop offset="100%" stopColor="#0d9488" /> {/* Teal 600 */}
                  </linearGradient>
                  <linearGradient
                    id="text-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#14b8a6" /> {/* Teal 500 */}
                    <stop offset="100%" stopColor="#0d9488" /> {/* Teal 600 */}
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="px-6 py-4 bg-gray-100 rounded-b-lg ">
          <Link to="/profile-edit">
            <button className="btn-design">প্রোফাইল আপডেট করুন</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
