import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BrandName = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get("details.json");
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching the company data:", error);
      }
    };

    fetchCompany();
  }, []);

  return (
    <div className="max-w-screen-2xl px-1 md:mx-auto p-5">
      <h1 className="text-3xl font-bold text-gray-600 mb-4 text-left">
        Flat Sales In Dhaka
      </h1>
      <p className="text-lg mb-6 text-left">
        Flat prices in Bangladesh range from BDT 5,100 to BDT 158,000 depending
        on the location, size, and amenities. Whether you're looking for a cozy
        studio or a spacious apartment, there are options to suit various needs
        and budgets. Explore the available companies in popular areas and book your
        new home today!
      </p>
      <div className="flex flex-wrap gap-2">
        {company.map((company, index) => (
          <Link key={index} to="/brandName" className="block">
            <button className="btn bg-gray-600 text-white hover:bg-teal-600 transition duration-300 shadow-lg w-auto p-2 rounded">
              {company.company_name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandName;
