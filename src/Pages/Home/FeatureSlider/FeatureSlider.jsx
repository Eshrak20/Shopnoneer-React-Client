import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
  const [swiper, setSwiper] = useState(null);

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
      <div className="flex justify-center items-center h-[400px]">
        <LoadingLottie />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-20 relative">
      <SectionTitle heading="হাইলাইটেড প্রজেক্টস" subHeading="আমাদের নতুন কাজগুলো এক নজরে দেখুন" />
      <div>
        <Swiper
          onSwiper={setSwiper}
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
            delay: 2500,
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
              className="relative rounded-lg transition-all duration-300 ease-in-out transform flex flex-col items-center"
            >
              <div className="relative overflow-hidden w-full rounded-md group">
                <img
                  src={project.images[0]}
                  alt={project.housing}
                  className="w-full h-[250px] lg:h-[500px] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-center text-white text-2xl font-bold">
                    {project.housing}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Controls */}
        <div className="custom-pagination-controls flex justify-between absolute bottom-1/2 transform translate-y-1/2 w-full px-4">
          <button onClick={() => swiper.slidePrev()} className="pagination-btn">
            <IoIosArrowBack size={30} color="#4A5568" />
          </button>
          <button onClick={() => swiper.slideNext()} className="pagination-btn">
            <IoIosArrowForward size={30} color="#4A5568" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSlider;
