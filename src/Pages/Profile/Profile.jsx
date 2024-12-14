import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

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

    const [activeSection, setActiveSection] = useState('personal'); // Default section

    // Simulate API call
    useEffect(() => {
        setDivisions(["Division 1", "Division 2", "Division 3"]);
        setDistricts(["District 1", "District 2", "District 3"]);
        setUpazillas(["Upazila 1", "Upazila 2", "Upazila 3"]);
        setCities(["City 1", "City 2", "City 3"]);
        
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

    const renderSection = () => {
        switch (activeSection) {
            case 'personal':
                return (
                    <>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">Name</label>
                            <input
                                type="text"
                                value={profile.name || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">Email</label>
                            <input
                                type="email"
                                value={profile.email || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            />
                        </div>
                    </>
                );
            case 'address':
                return (
                    <>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">Division</label>
                            <select
                                value={profile.division || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            >
                                {divisions.map((division, index) => (
                                    <option key={index} value={division}>{division}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">District</label>
                            <select
                                value={profile.district || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            >
                                {districts.map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">Upazilla</label>
                            <select
                                value={profile.upazilla || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            >
                                {upazillas.map((upazilla, index) => (
                                    <option key={index} value={upazilla}>{upazilla}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">City</label>
                            <select
                                value={profile.city || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            >
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </>
                );
            case 'preference':
                return (
                    <>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">Religion</label>
                            <select
                                value={profile.religion || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            >
                                {religions.map((religion, index) => (
                                    <option key={index} value={religion}>{religion}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">Occupation</label>
                            <select
                                value={profile.occupation || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            >
                                {occupations.map((occupation, index) => (
                                    <option key={index} value={occupation}>{occupation}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">Education</label>
                            <select
                                value={profile.education || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            >
                                {educations.map((education, index) => (
                                    <option key={index} value={education}>{education}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2 text-xl">Source of Income</label>
                            <select
                                value={profile.sourceOfIncome || ""}
                                className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-lg"
                            >
                                {sourceOfIncomes.map((income, index) => (
                                    <option key={index} value={income}>{income}</option>
                                ))}
                            </select>
                        </div>
                    </>
                );
            case 'planning':
                return (
                    <div>
                        <h2 className="text-gray-700 text-2xl">Planning Section</h2>
                        <p className="text-gray-600">Here, you can set up your future planning goals.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    // Pie chart data
    const pieChartData = {
        labels: ['Religion', 'Occupation', 'Education', 'Income'],
        datasets: [
            {
                label: 'Profile Stats',
                data: [25, 25, 25, 25], // Simulated data
                backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#FF5722'],
            },
        ],
    };

    return (
        <div className="bg-white text-gray-900 min-h-screen flex justify-center items-start py-10">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl flex">
                {/* Pie Chart */}
                <div className="w-1/3 pr-6">
                    <h2 className="text-teal-600 text-3xl font-bold mb-4">Profile Stats</h2>
                    <Pie data={pieChartData} />
                </div>

                {/* Profile Form */}
                <div className="w-2/3">
                    <h1 className="text-teal-600 text-3xl font-bold mb-4">Profile Information</h1>

                    {/* Navbar */}
                    <div className="flex space-x-6 mb-4">
                        <button
                            onClick={() => setActiveSection('personal')}
                            className="text-teal-600 text-xl hover:text-teal-700 focus:outline-none"
                        >
                            Personal
                        </button>
                        <button
                            onClick={() => setActiveSection('address')}
                            className="text-teal-600 text-xl hover:text-teal-700 focus:outline-none"
                        >
                            Address
                        </button>
                        <button
                            onClick={() => setActiveSection('preference')}
                            className="text-teal-600 text-xl hover:text-teal-700 focus:outline-none"
                        >
                            Preference
                        </button>
                        <button
                            onClick={() => setActiveSection('planning')}
                            className="text-teal-600 text-xl hover:text-teal-700 focus:outline-none"
                        >
                            Planning
                        </button>
                    </div>

                    {/* Profile Form */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderSection()}
                        {/* Submit Button */}
                        <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
                            <button
                                type="submit"
                                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-xl"
                            >
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
