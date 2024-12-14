import { Parallax } from "react-parallax";
import adviserImage from "../../../assets/Banner Images/Favourite/banner-1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "animate.css";


const BuySellCard = () => {
  return (
    <div className="hidden lg:block">
      <Parallax
        className="h-[calc(60vh)] lg:h-auto my-10"
        blur={{ min: -15, max: 15 }}
        bgImage={adviserImage}
        bgImageAlt="the banner"
        strength={-30}
      >
        <div className="hero min-h-screen">
          <div className="hero-overlay bg-opacity-80"></div>
          <div className="mt-[-350px] lg:mt-0 hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-extrabold text-white drop-shadow-lg animate__animated animate__fadeInUp">
                কেনা বা বিক্রি
              </h1>
              <p className="mb-8 text-xl font-medium text-white drop-shadow-md animate__animated animate__fadeIn animate__delay-1s">
                নতুন সম্পত্তি কিনতে বা পুরোনো বিক্রি করতে চান? আমরা দিচ্ছি
                দুর্দান্ত সমাধান!
              </p>
              <div className="flex justify-center space-x-6">
                <Link to="/detail">
                  <button className="btn bg-teal-500 text-white hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    <FontAwesomeIcon icon={faUpload} className="mr-3" />
                    কিনুন
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="btn bg-gray-400 text-white hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 shadow-2xl">
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
