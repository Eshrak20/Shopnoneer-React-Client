import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BuySellCard from "../BuySellCard/BuySellCard";
import FeatureSlider from "../FeatureSlider/FeatureSlider";
import HousingWiseProject from "../HousingWiseProject/HousingWiseProject";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Shopnoneer | Home</title>
      </Helmet>
      <Banner></Banner>
      <HousingWiseProject></HousingWiseProject>
      <FeatureSlider></FeatureSlider>
      <BuySellCard></BuySellCard>
    </div>
  );
};

export default Home;
