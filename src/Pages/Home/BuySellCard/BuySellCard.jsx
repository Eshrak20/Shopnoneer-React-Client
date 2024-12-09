import { Parallax } from "react-parallax";
import adviserImage from "../../../assets/Banner Images/Favourite/banner-1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BuySellCard = () => {
  return (
    <>
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
                <h1 className="mb-5 text-5xl font-bold text-white drop-shadow-lg">
                  কেনা বা বিক্রি
                </h1>
                <p className="mb-5 text-2xl font-bold text-white drop-shadow-md">
                  নতুন সম্পত্তি কিনতে বা পুরোনো বিক্রি করতে চান? আমরা দিচ্ছি
                  দুর্দান্ত সমাধান!
                </p>
                <div className="flex justify-center space-x-3">
                  <Link to="/detail">
                    <button className="btn bg-teal-500 text-white hover:bg-teal-600 transition duration-300 shadow-lg">
                      <FontAwesomeIcon icon={faUpload} className="mr-2" />
                      কিনুন
                    </button>
                  </Link>
                  <Link to="/contact">
                    <button className="btn bg-gray-400 text-white hover:bg-gray-500 transition duration-300 shadow-lg">
                      <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
                      বিক্রি করুন
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </div>
    </>
  );
};

export default BuySellCard;
