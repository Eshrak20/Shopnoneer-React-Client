import React, { useEffect, useState, useRef } from "react";
import { Parallax } from "react-parallax";
import bannerImage from "../../../assets/Banner Images/Favourite/ban-s1.jpg";

import Navbar from "../../Shared/Navbar/Navbar";
import HomeCard from "../../Home/HomeCard/HomeCard"; // Import your HomeCard component
import { Link } from "react-router-dom";

const Banner = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Create a ref for the next section
  const nextSectionRef = useRef(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 640) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to HomeCard
  const scrollToNextSection = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar visible={isNavbarVisible} />
      <Parallax
        className="h-[calc(40vh)] hidden lg:h-auto lg:block"
        blur={{ min: -15, max: 15 }}
        bgImage={bannerImage}
        bgImageAlt="the banner"
        strength={-30}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="hero min-h-screen">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="mt-[-150px] lg:mt-0 hero-content text-neutral-content text-center">
            <div className="mx-auto px-4">
              <div className="relative z-10 text-center text-white">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1.5s">
                  আপনার স্বপ্নের
                </h1>
                <h1 className="text-2xl sm:text-4xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-1s">
                  প্রজেক্ট
                </h1>
                <h1 className="text-xl sm:text-3xl font-light mb-8 animate__animated animate__fadeIn animate__delay-2s">
                  শুধু ১ ক্লিকে খুঁজুন
                </h1>
                <div className="join text-black mb-6 flex flex-col sm:flex-row items-center justify-center">
                  <input
                    className="input input-bordered join-item mb-2 sm:mb-0 sm:w-2/3 text-lg"
                    placeholder="অনুসন্ধান"
                  />
                  <select className="select select-bordered join-item mb-2 sm:mb-0 sm:w-1/3 text-lg">
                    <option>মোহাম্মদপুর</option>
                    <option>বসিলা</option>
                    <option>ঘাটারচর</option>
                    <option>আঁটিবাজার</option>
                  </select>
                  <div className="mt-2 sm:mt-0 sm:ml-2 relative">
                    <span className="badge badge-accent text-yellow-50 absolute -top-3 right-0 transform translate-x-1 translate-y-1 z-10">
                      অফার!
                    </span>
                    <Link to={"/detail"}>
                      <button className="btn join-item mt-2 sm:mt-0 sm:ml-2 hover:scale-105 transition-all duration-300">
                        অনুসন্ধান করুন 
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <button
                className="btn bg-teal-500 hover:bg-teal-600 my-3 text-yellow-50 shadow-lg transform hover:scale-110 transition-all duration-300"
                onClick={scrollToNextSection} // Trigger scroll on click
              >
                শুরু করুন
              </button>
            </div>
          </div>
        </div>
      </Parallax>

      {/* Render HomeCard and pass the ref */}
      <HomeCard ref={nextSectionRef} />
    </>
  );
};

export default Banner;
