import React, { useEffect, useState, useRef } from "react";
import { Parallax } from "react-parallax";
import bannerImage from "../../../assets/Banner Images/home-4.jpg";
import Navbar from "../../Shared/Navbar/Navbar";
import HomeCard from "../../Home/HomeCard/HomeCard"; // Import your HomeCard component

const Banner = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  
  // Create a ref for the next section
  const nextSectionRef = useRef(null);

  // Function to handle scroll
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
        className="h-56 md:h-96 lg:h-[700px]"
        blur={{ min: -15, max: 15 }}
        bgImage={bannerImage}
        bgImageAlt="the banner"
        strength={-300}
      >
        <div className="hero min-h-screen">
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <div className="relative z-10 text-center text-white">
                <h1 className="text-5xl font-bold mb-2">Find Your Dream</h1>
                <h1 className="text-4xl font-semibold mb-2">Project</h1>
                <h1 className="text-3xl font-light mb-6">In Just 1 Click</h1>
                <div className="join text-black mb-4">
                  <input className="input input-bordered join-item" placeholder="Search" />
                  <select className="select select-bordered join-item">
                    {/* <option disabled selected>Filter</option> */}
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Vila</option>
                    <option>Land</option>
                  </select>
                  <div className="indicator">
                    <span className="indicator-item badge badge-accent text-yellow-50">OFFER!</span>
                    <button className="btn join-item">Search</button>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-accent my-3 text-yellow-50"
                onClick={scrollToNextSection} // Trigger scroll on click
              >
                Get Started
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
