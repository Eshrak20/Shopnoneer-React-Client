import React, { useState, useEffect } from "react";

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [cities, setCities] = useState([]);
    const [religions] = useState(['Islam', 'Hinduism', 'Christianism', 'Buddhism']);
    const [occupations] = useState(['Doctor', 'Engineer', 'Teacher', 'Lawyer', 'Business', 'Other']);
    const [educations] = useState(['Masters', 'Bachelor', 'HSC', 'SSC']);
    const [sourceOfIncomes] = useState(['Business', 'Job', 'Others']);

    // Simulate API call
    useEffect(() => {
        // Example data fetching (replace with real API requests)
        setDivisions(["Division 1", "Division 2", "Division 3"]);
        setDistricts(["District 1", "District 2", "District 3"]);
        setUpazillas(["Upazila 1", "Upazila 2", "Upazila 3"]);
        setCities(["City 1", "City 2", "City 3"]);
        
        // Simulated profile data
        setProfile({
            name: "Eshrak G",
            email: "eshrakg62@gmail.com",
            religion: "Islam",
            occupation: "Engineer",
            education: "Bachelor",
            sourceOfIncome: "Job",
            division: "Division 1",
            district: "District 1",
            upazilla: "Upazila 1",
            city: "City 1",
        });
    }, []);

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-teal-400 text-3xl font-bold mb-4">Profile Information</h1>
                
                {/* Profile Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            value={profile.name || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={profile.email || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    {/* Religion */}
                    <div>
                        <label className="block text-gray-300 mb-1">Religion</label>
                        <select
                            value={profile.religion || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            {religions.map((religion, index) => (
                                <option key={index} value={religion}>{religion}</option>
                            ))}
                        </select>
                    </div>

                    {/* Occupation */}
                    <div>
                        <label className="block text-gray-300 mb-1">Occupation</label>
                        <select
                            value={profile.occupation || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            {occupations.map((occupation, index) => (
                                <option key={index} value={occupation}>{occupation}</option>
                            ))}
                        </select>
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-gray-300 mb-1">Education</label>
                        <select
                            value={profile.education || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            {educations.map((education, index) => (
                                <option key={index} value={education}>{education}</option>
                            ))}
                        </select>
                    </div>

                    {/* Source of Income */}
                    <div>
                        <label className="block text-gray-300 mb-1">Source of Income</label>
                        <select
                            value={profile.sourceOfIncome || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            {sourceOfIncomes.map((income, index) => (
                                <option key={index} value={income}>{income}</option>
                            ))}
                        </select>
                    </div>

                    {/* Division */}
                    <div>
                        <label className="block text-gray-300 mb-1">Division</label>
                        <select
                            value={profile.division || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            {divisions.map((division, index) => (
                                <option key={index} value={division}>{division}</option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-gray-300 mb-1">District</label>
                        <select
                            value={profile.district || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>

                    {/* Upazilla */}
                    <div>
                        <label className="block text-gray-300 mb-1">Upazilla</label>
                        <select
                            value={profile.upazilla || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            {upazillas.map((upazilla, index) => (
                                <option key={index} value={upazilla}>{upazilla}</option>
                            ))}
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-gray-300 mb-1">City</label>
                        <select
                            value={profile.city || ""}
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
