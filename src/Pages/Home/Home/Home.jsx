import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
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
    </div>
  );
};

export default Home;
