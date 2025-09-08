import React, { useEffect, useState, useRef } from "react";
import { Parallax } from "react-parallax";
import banner_1 from "../../../../public/assets/Banner Images/1001.jpg";
import banner_2 from "../../../../public/assets/Banner Images/1002.jpg";
import banner_3 from "../../../../public/assets/Banner Images/1003.jpg";
import Navbar from "../../Shared/Navbar/Navbar";
import HomeCard from "../../Home/HomeCard/HomeCard"; // Import HomeCard component
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import useProjectList from "../../../Models/DetailModel/DetailCardModel/DetailCardModel";

const Banner = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  // const [bannerImage, setBannerImage] = useState(null);
  // const [searchQuery, setSearchQuery] = useState(""); 
  const nextSectionRef = useRef(null);
  const bannerImages = [banner_1, banner_2, banner_3];
  const navigate = useNavigate(); // Hook for navigation

  // Update navbar visibility on scroll
  const handleScroll = () => {
    setIsNavbarVisible(window.scrollY <= 640);
  };

  // Scroll to next section (HomeCard)
  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   const storedIndex = parseInt(localStorage.getItem("bannerIndex"), 10);
  //   const newIndex = isNaN(storedIndex) ? 1 : (storedIndex + 1) % bannerImages.length;

  //   setBannerImage(bannerImages[newIndex]);
  //   localStorage.setItem("bannerIndex", newIndex);

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <>
      <Navbar visible={isNavbarVisible} />
      <Parallax
        className="h-[calc(40vh)] hidden lg:h-auto lg:block"
        blur={{ min: -15, max: 15 }}
        bgImage={banner_3} // Use dynamic banner image
        bgImageAlt="the banner"
        strength={-30}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="hero min-h-screen">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="mt-[-150px] lg:mt-0 hero-content text-neutral-content text-center">
            <div className="mx-auto px-4">
              <div className="relative z-10 text-white">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1.5s">
                  আপনার স্বপ্নের
                </h1>
                <h1 className="text-2xl sm:text-4xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-1s">
                  প্রজেক্ট
                </h1>
                <h1 className="text-xl sm:text-3xl font-light mb-8 animate__animated animate__fadeIn animate__delay-2s">
                  শুধু ১ ক্লিকে খুঁজুন
                </h1>
                {/* <div className="join text-black mb-6 flex flex-col sm:flex-row items-center justify-center">
                  <input
                    type="text"
                    value={searchQuery} // Bind input value to state
                    onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
                    className="input input-bordered join-item mb-2 sm:mb-0 sm:w-2/3 text-lg"
                    placeholder="অনুসন্ধান"
                  />
                  <div className="mt-2 sm:mt-0 sm:ml-2 relative">
                    <span className="badge badge-accent text-yellow-50 absolute -top-3 right-0 transform translate-x-1 translate-y-1 z-10">
                      অফার!
                    </span>
                    <button 
                      onClick={handleSearch} // Call handleSearch on button click
                      className="btn join-item mt-2 sm:mt-0 sm:ml-2 hover:scale-105 transition-all duration-300"
                    >
                      অনুসন্ধান করুন
                    </button>
                  </div>
                </div> */}
              </div>
              <button
                className="px-4 py-2 text-xs lg:text-base rounded-md bg-teal-500 text-white hover:bg-teal-600 transition duration-300 shadow-lg"
                onClick={scrollToNextSection}
              >
                শুরু করুন
              </button>
            </div>
          </div>
        </div>
      </Parallax>

      <HomeCard ref={nextSectionRef} />
    </>
  );
};

export default Banner;
