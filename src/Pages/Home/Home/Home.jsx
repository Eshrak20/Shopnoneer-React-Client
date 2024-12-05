import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FeatureSlider from "../FeatureSlider/FeatureSlider";
import HousingWiseProject from "../HousingWiseProject/HousingWiseProject";
import { useEffect } from "react";
import BuySellCard from "../BuySellCard/BuySellCard";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Shopnoneer | Home</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="lg:mx-20">
          <HousingWiseProject />
          <FeatureSlider />
          <BuySellCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
