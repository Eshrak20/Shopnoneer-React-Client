import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import fetchProjects from "../../../Models/HomeModel/FeatureSliderModel/FeatureSliderModel"; // Import the model function
import LoadingLottie from "../../../assets/loadingLottie/loadingLottie"; // Import your loading component
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "./FeatureSlider.css";

const FeatureSlider = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    loadProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <LoadingLottie />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5 relative">
      <SectionTitle heading="হাইলাইটেড প্রজেক্টস" subHeading="আমাদের নতুন কাজগুলো এক নজরে দেখুন" />
      <div>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          spaceBetween={40}
          freeMode={true}
          speed={800}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Autoplay]}
          className="mySwiper mt-8"
        >
          {projects.map((project) => (
            <SwiperSlide
              key={project.id}
              className="relative rounded-lg overflow-hidden shadow-lg group transform transition-all duration-300 ease-in-out"
            >
              <div className="relative w-full h-[300px] lg:h-[500px]">
                <img
                  src={project.images[0]}
                  alt={project.housing}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-teal-700 to-transparent opacity-80 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-100">
                  <h3 className="text-center text-white text-2xl font-semibold transform transition-all duration-300 group-hover:scale-110">
                    {project.housing}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeatureSlider;
