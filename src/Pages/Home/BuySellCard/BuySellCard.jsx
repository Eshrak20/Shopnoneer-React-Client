import { Parallax } from "react-parallax";
import adviserImage from "../../../assets/Banner Images/adviser.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const BuySellCard = () => {
  return (
    <>
      <Parallax
        className="h-56 md:h-96 lg:h-auto my-20"
        blur={{ min: -15, max: 15 }}
        bgImage={adviserImage}
        bgImageAlt="the banner"
        strength={-300}
      >
        <div className="hero min-h-screen">
          <div className="hero-overlay bg-opacity-80"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold text-white drop-shadow-lg">
                Buy or Sell
              </h1>
              <p className="mb-5 text-2xl font-bold text-white drop-shadow-md">
                Looking to buy a new property or sell an existing one? We
                provide an awesome solution!
              </p>
              <div className="flex justify-center space-x-3">
                <button className="btn bg-teal-500 text-white hover:bg-teal-600 transition duration-300 shadow-lg">
                  <FontAwesomeIcon icon={faUpload} className="mr-2" />
                  Upload Yours
                </button>
                <button className="btn bg-gray-400 text-white hover:bg-gray-500 transition duration-300 shadow-lg">
                  <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
                  Browser your Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </Parallax>
    </>
  );
};

export default BuySellCard;
