import React, { useState } from 'react';

const Navbar = () => {
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [showDropdowns, setShowDropdowns] = useState({
        offerType: false,
        propertyType: false,
        location: false,
        price: false,
        bedrooms: false,
    });
    const [priceRange, setPriceRange] = useState({ min: 10, max: 1000 });

    const toggleDropdown = (dropdown) => {
        setShowDropdowns((prev) => {
            // Close all other dropdowns and toggle the selected one
            const newDropdowns = {
                offerType: false,
                propertyType: false,
                location: false,
                price: false,
                bedrooms: false,
            };
            newDropdowns[dropdown] = !prev[dropdown]; // Toggle the selected dropdown
            return newDropdowns;
        });
    };

    const toggleMoreFilters = () => {
        // Close all other dropdowns and toggle more filters
        setShowDropdowns({
            offerType: false,
            propertyType: false,
            location: false,
            price: false,
            bedrooms: false,
        });
        setShowMoreFilters((prev) => !prev);
    };

    const closeDropdowns = () => {
        setShowDropdowns({
            offerType: false,
            propertyType: false,
            location: false,
            price: false,
            bedrooms: false,
        });
    };

    return (
        <div className="relative">
            <nav className="bg-teal-600 p-4">
                <div className="container mx-auto flex flex-wrap justify-between items-center">
                    <div className="flex space-x-4">
                        {/* Offer Type Dropdown */}
                        <div className="relative" onBlur={closeDropdowns}>
                            <button 
                                onClick={() => toggleDropdown('offerType')} 
                                className="bg-white text-teal-600 rounded-md px-4 py-2 flex items-center"
                            >
                                🏷️ Offer Type {showDropdowns.offerType ? '▲' : '▼'}
                            </button>
                            {showDropdowns.offerType && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                                    <ul>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">For Sale</li>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">For Rent</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Property Type Dropdown */}
                        <div className="relative" onBlur={closeDropdowns}>
                            <button 
                                onClick={() => toggleDropdown('propertyType')} 
                                className="bg-white text-teal-600 rounded-md px-4 py-2 flex items-center"
                            >
                                🏠 Property Type {showDropdowns.propertyType ? '▲' : '▼'}
                            </button>
                            {showDropdowns.propertyType && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                                    <ul>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">Apartment</li>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">Villa</li>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">Land</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Location Dropdown */}
                        <div className="relative" onBlur={closeDropdowns}>
                            <button 
                                onClick={() => toggleDropdown('location')} 
                                className="bg-white text-teal-600 rounded-md px-4 py-2 flex items-center"
                            >
                                📍 Location {showDropdowns.location ? '▲' : '▼'}
                            </button>
                            {showDropdowns.location && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                                    <ul>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">New York</li>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">Los Angeles</li>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">Chicago</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Price Range Selector */}
                        <div className="relative" onBlur={closeDropdowns}>
                            <button 
                                onClick={() => toggleDropdown('price')} 
                                className="bg-white text-teal-600 rounded-md px-4 py-2 flex items-center"
                            >
                                💵 Price Range {showDropdowns.price ? '▲' : '▼'}
                            </button>
                            {showDropdowns.price && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4">
                                    <label className="block mb-2">Select Price Range:</label>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1000" 
                                        value={priceRange.min} 
                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} 
                                        className="w-full"
                                    />
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1000" 
                                        value={priceRange.max} 
                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} 
                                        className="w-full mt-2"
                                    />
                                    <div>Price: ${priceRange.min} - ${priceRange.max}</div>
                                </div>
                            )}
                        </div>

                        {/* Bedrooms Dropdown */}
                        <div className="relative" onBlur={closeDropdowns}>
                            <button 
                                onClick={() => toggleDropdown('bedrooms')} 
                                className="bg-white text-teal-600 rounded-md px-4 py-2 flex items-center"
                            >
                                🛏️ Bedrooms {showDropdowns.bedrooms ? '▲' : '▼'}
                            </button>
                            {showDropdowns.bedrooms && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                                    <ul>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">1 Bedroom</li>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">2 Bedrooms</li>
                                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">3 Bedrooms</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* More Filters Button */}
                        <button 
                            onClick={toggleMoreFilters} 
                            className="bg-white text-teal-600 rounded-md px-4 py-2 flex items-center ml-2"
                        >
                            ⚙️ More Filters
                        </button>
                    </div>

                    {/* Search Button with Input */}
                    <div className="flex items-center">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="bg-white text-teal-600 rounded-md px-4 py-2 mr-2"
                        />
                        <button className="bg-white text-teal-600 rounded-md px-4 py-2">
                            🔍 Search
                        </button>
                    </div>
                </div>
            </nav>

            {/* More Filters Section */}
            {showMoreFilters && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white shadow-lg rounded-md p-4 z-10">
                    <h4 className="font-bold mb-2">Subcategories:</h4>
                    <ul className="flex flex-col">
                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">🚽 Bathrooms</li>
                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">📏 Floor Area</li>
                        <li className="px-4 py-2 hover:bg-teal-100 cursor-pointer">🏢 Amenities</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
