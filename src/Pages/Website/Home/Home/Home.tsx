// import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Banner from "../Banner/Banner";
import MinCard from "../MinCard/MinCard";
import TextImage from "@/Pages/MYComponent/TextImage";
import service from "@/Pages/Json/TextImage.json";
import { Helmet } from "react-helmet-async";
import BuySellCard from "../BuySellCard/BuySellCard";
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="bg-background">
        <Helmet>
          <title>স্বপ্ননীড় | হোম</title>
        </Helmet>
        <Banner />
        <MinCard />
        <div>
          {service?.slice(0, 6).map((item, index) => (
            <TextImage
              key={item.id}
              title={item.title}
              description={item.short_description}
              imageUrl={`${item.image}`}
              border={`border`}
              reverse={index % 2 !== 0} // alternate layout
              buttonText="ফ্ল্যাট কিনুন"
              link={`#`}
            />
          ))}
        </div>
        <div className="max-w-screen-2xl mx-auto">
        <div className="md:mx-32 2xl:mx-20">
          {/* <HousingWiseProject /> */}
          {/* <FeatureSlider /> */}
          <BuySellCard />
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
