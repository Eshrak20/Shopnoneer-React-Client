import React, { useEffect, useState, useRef } from "react";
import { Parallax } from "react-parallax";
import bannerImage from "../../../assets/Banner Images/Favourite/ban-s1.jpg";

import Navbar from "../../Shared/Navbar/Navbar";
import HomeCard from "../../Home/HomeCard/HomeCard"; // Import your HomeCard component

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
      >
        <div className="hero min-h-screen ">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="mt-[-150px] lg:mt-0 hero-content text-neutral-content text-center">
            <div className="mx-auto px-4">
              <div className="relative z-10 text-center text-white">
                <h1 className="text-3xl sm:text-5xl font-bold mb-2">
                  আপনার স্বপ্নের
                </h1>
                <h1 className="text-2xl sm:text-4xl font-semibold mb-2">
                  প্রজেক্ট
                </h1>
                <h1 className="text-xl sm:text-3xl font-light mb-6">
                  শুধু ১ ক্লিকে খুঁজুন
                </h1>
                <div className="join text-black mb-4 flex flex-col sm:flex-row items-center">
                  <input
                    className="input input-bordered join-item mb-2 sm:mb-0 sm:w-2/3"
                    placeholder="অনুসন্ধান"
                  />
                  <select className="select select-bordered join-item mb-2 sm:mb-0 sm:w-1/3">
                    <option>অ্যাপার্টমেন্ট</option>
                    <option>বাড়ি</option>
                    <option>ভিলা</option>
                    <option>জমি</option>
                  </select>
                  <div className="indicator mt-2 sm:mt-0 sm:ml-2">
                    <span className="indicator-item badge badge-accent text-yellow-50">
                      অফার!
                    </span>
                    <button className="btn join-item mt-2 sm:mt-0 sm:ml-2">
                      অনুসন্ধান করুন
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="btn  bg-teal-500 hover:bg-teal-600 my-3 text-yellow-50"
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
