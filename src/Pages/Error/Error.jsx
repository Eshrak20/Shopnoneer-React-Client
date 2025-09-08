
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from "../../../public/assets/loadingLottie/404.json";

const Error = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-100 flex flex-col items-center justify-center z-50 backdrop-blur-md">
    <Player
      autoplay
      loop
      speed={1.5}
      src={loadingAnimation}
      style={{
        height: "50vh",
        width: "50vw",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    />
    <h1 className="text-5xl text-teal-700 font-bold mt-6">404</h1>
    <p className="text-lg text-gray-600 mt-2 text-center">
      পেজটি খুঁজে পাওয়া যায়নি। 
      <br />
      দয়া করে হোমপেজে ফিরে যান।
    </p>
    <a
      href="/"
      className="mt-6 text-white bg-teal-500 hover:bg-teal-600 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300"
    >
      ফিরে যান
    </a>
  </div>
  );
};

export default Error;
