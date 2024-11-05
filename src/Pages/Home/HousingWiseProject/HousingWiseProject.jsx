import React, { useEffect, useState } from 'react';
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import fetchHousingWiseProjects from "../../../Models/HomeModel/HousingWiseProjectModel/HousingWiseProjectModel"; // Import the model function
import './HousingWiseProject.css';

const HousingWiseProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchHousingWiseProjects(); // Use the model to fetch data
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };

    loadProjects();
  }, []);

  return (
    <>
      <SectionTitle heading="Housing Wise Projects" subHeading="Explore our projects by housing type" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mt-14 mb-24">
        {projects.slice(0, 6).map((project, index) => (
          <div
            key={index}
            className="project-card bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-102 flex flex-col items-center"
          >
            <div className="flex flex-col justify-center items-center mb-4 h-40">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
                {project.housing}
              </h2>
              <span className="text-teal-500 text-xl font-semibold">15 Projects</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HousingWiseProject;
