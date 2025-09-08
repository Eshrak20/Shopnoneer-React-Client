import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "./noDataLottie.json";
const noDataLottie = () => {
  return (
    <>
      <div className="flex justify-center items-center my-10">
        <Player
          autoplay
          loop
          src={loadingAnimation}
          style={{
            height: "50vh", // 50% of the viewport height
            width: "50vw", // 50% of the viewport width
            maxWidth: "100%", // Ensures it doesn't overflow parent container
            maxHeight: "100%",
          }}
        />
      </div>
    </>
  );
};

export default noDataLottie;
