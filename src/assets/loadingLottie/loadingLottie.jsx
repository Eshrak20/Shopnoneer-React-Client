import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "./loadingLottie.json"; 

const LoadingLottie = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <Player
        autoplay
        loop
        src={loadingAnimation} 
        style={{ height: "700px", width: "500px" }} 
      />
    </div>
  );
};

export default LoadingLottie;
