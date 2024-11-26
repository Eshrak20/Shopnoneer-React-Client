import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FeatureSlider from "../FeatureSlider/FeatureSlider";
import HousingWiseProject from "../HousingWiseProject/HousingWiseProject";
import { useEffect } from "react";

const Home = () => {

  return (
    <div>
    <Helmet>
      <title>Shopnoneer | Home</title>
    </Helmet>
    <div className="max-w-screen-2xl mx-auto">
      <Banner />
    </div>
    <div className="max-w-screen-xl mx-auto"> 
      <HousingWiseProject />
      <FeatureSlider />
    </div>
  </div>
  );
};

export default Home;
