import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "./loadingLottie.json";

const LoadingLottie = () => {
  return (
    <div className="flex justify-center items-center my-10 backdrop-blur-md bg-white bg-opacity-50 z-50">
      <Player
        autoplay
        loop
        speed={1.5}
        src={loadingAnimation}
        style={{
          height: "40vh", // 50% of the viewport height
          width: "40vw", // 50% of the viewport width
          maxWidth: "100%", // Ensures it doesn't overflow parent container
          maxHeight: "100%",
        }}
        
      />
    </div>
  );
};

export default LoadingLottie;
