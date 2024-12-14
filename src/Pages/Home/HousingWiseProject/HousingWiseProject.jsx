import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import fetchHousingWiseProjects from "../../../Models/HomeModel/HousingWiseProjectModel/HousingWiseProjectModel";
import "./HousingWiseProject.css";

const HousingWiseProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { housing } = await fetchHousingWiseProjects();
        setProjects(housing);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };

    loadProjects();
  }, []);

  return (
    <>
      {/* Section Title */}
      <SectionTitle
        heading="হাউজিং অনুযায়ী প্রজেক্টস"
        subHeading="আমাদের প্রজেক্টগুলি হাউজিং টাইপ অনুযায়ী দেখুন"
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mt-14 mb-24">
        {projects.slice(0, 6).map((project, index) => (
          <Link
            key={index}
            to={`/detail/${project.id}`}
            className="relative transform transition-transform duration-300 hover:scale-105"
          >
            <div className="project-card flex flex-col items-center justify-center text-center p-6 border border-[#9CA3AF]">
              {/* Icon with Green-Lime Gradient */}
              <div className="icon-bg flex items-center justify-center text-white w-20 h-20 mb-4">
                <FaHome className="text-4xl" />
              </div>

              {/* Project Details */}
              <div className="p-4">
                <h2 className="text-2xl font-bold text-[#e5e5e5] mb-2">
                  {project.name}
                </h2>
                <span className="text-lg font-semibold text-[#6c757d]">
                  মোট প্রজেক্ট: {project.total_projects}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default HousingWiseProject;
