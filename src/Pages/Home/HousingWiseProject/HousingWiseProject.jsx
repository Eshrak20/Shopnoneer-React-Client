import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import fetchHousingWiseProjects from "../../../Models/HomeModel/HousingWiseProjectModel/HousingWiseProjectModel";
import "./HousingWiseProject.css";

// Fisher-Yates shuffle function
const shuffleArrayFisherYates = (array) => {
  let shuffledArray = [...array]; // Clone the array to avoid mutating the original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

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
  // Shuffle the projects and slice the first 6 items
  const shuffledProjects = shuffleArrayFisherYates(projects).slice(0, 6);

  return (
    <>
      {/* Section Title */}
      <hr className="border-2" />
      <div className="mt-20 mb-32">

        <SectionTitle
          heading="হাউজিং অনুযায়ী ফ্ল্যাট/প্রপার্টি"
          subHeading="আমাদের ফ্ল্যাটগুলি হাউজিং অনুযায়ী দেখুন"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mt-7">
          {shuffledProjects.map((project, index) => (
            <Link
              key={project.id || index}
              to="/detail"
              state={{ housingId: project.id }}
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
                    মোট অ্যাপার্টমেন্ট: {project.total_projects}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HousingWiseProject;
