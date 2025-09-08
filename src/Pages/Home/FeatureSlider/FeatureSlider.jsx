import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import fetchProjects from "../../../Models/HomeModel/FeatureSliderModel/FeatureSliderModel";
import LoadingLottie from "../../../../public/assets/loadingLottie/loadingLottie";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "./FeatureSlider.css";
import { Link } from "react-router-dom";

const FeatureSlider = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState(20); // Dynamic size state

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const projectsData = await fetchProjects(size); // Pass size dynamically
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [size]); // Re-fetch data when size changes

  // এখানে কিছু সময় পর পর  data আসবে size হিট হবে

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSize((prevSize) => {
  //       if (prevSize < 36) {
  //         return Math.min(prevSize * 2, 36); // Double the size but cap it at 36
  //       } else {
  //         clearInterval(interval); // Stop the interval when size reaches 36
  //         return prevSize;
  //       }
  //     });
  //   }, 2000);

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <LoadingLottie />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 relative my-44">
      <SectionTitle
        heading="হাইলাইটেড প্রজেক্টস"
        subHeading="আমাদের নতুন কাজগুলো এক নজরে দেখুন"
      />
      <div>
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          loop={true}
          spaceBetween={40}
          freeMode={true}
          speed={800}
          autoplay={{
            delay: 1000,
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
              className="relative rounded-lg overflow-hidden shadow-lg group transform transition-all duration-300 ease-in-out "
            >
              <Link
                key={project.id || index}
                to={`/detailsPropMain/${project.id}`}
              >
                <div className="relative w-full  md:h-[450px] 2xl:h-[600px]">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-transparent opacity-80 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-center text-white text-2xl font-semibold transform transition-all duration-300 group-hover:scale-110">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeatureSlider;
