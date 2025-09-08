import { Parallax } from "react-parallax";
import adviserImage from "../../../../public/assets/Banner Images/banner-1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import "animate.css";

const BuySellCard = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Runs animation once when it enters the viewport
    threshold: 0.2, // Triggers when 20% of the element is visible
  });

  return (
    <div className="hidden lg:block" ref={ref}>
      <Parallax
        className="h-[calc(60vh)] lg:h-auto my-10"
        blur={{ min: -15, max: 15 }}
        bgImage={adviserImage}
        bgImageAlt="the banner"
        strength={-30}
      >
        <div className="hero min-h-screen">
          <div className="hero-overlay bg-opacity-80"></div>
          <div
            className={`mt-[-350px] lg:mt-0 hero-content text-neutral-content text-center transition-all duration-700 ${
              inView ? "animate__animated animate__fadeInUp" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-extrabold text-white drop-shadow-lg">
                কেনা বা বিক্রি
              </h1>
              <p
                className={`mb-8 text-xl font-medium text-white drop-shadow-md transition-all duration-700 ${
                  inView ? "animate__animated animate__fadeIn animate__delay-1s" : "opacity-0"
                }`}
              >
                নতুন সম্পত্তি কিনতে বা পুরোনো বিক্রি করতে চান? আমরা দিচ্ছি দুর্দান্ত সমাধান!
              </p>
              <div className="flex justify-center space-x-6">
                <Link to="/detail">
                  <button className="px-4 py-2 text-xs lg:text-base rounded-md bg-teal-500 text-white hover:bg-teal-600 transition duration-300 shadow-lg">
                    <FontAwesomeIcon icon={faUpload} className="mr-3" />
                    কিনুন
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="px-4 py-2 text-xs lg:text-base rounded-md bg-gray-400 text-white hover:bg-gray-500 transition duration-300 shadow-lg">
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-3" />
                    বিক্রি করুন
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default BuySellCard;
