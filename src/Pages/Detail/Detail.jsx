import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar/Navbar";
import FilterSection from "./FilterSection/FilterSection";
import LoadingLottie from "../../assets/loadingLottie/loadingLottie";
import useProjectList from "../../Models/DetailModel/DetailCardModel/DetailCardModel";
import DetailCard from "./DetailCard/DetailCard";

const Detail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { housingId } = useParams();
  const [sortOption, setSortOption] = useState("newest");
  const [bedCount, setBedCount] = useState(""); // Add bed count state
  const [bathCount, setBathCount] = useState(""); // Add bed count state
  const [balconyCount, setBalconyCount] = useState(""); // Add bed count state
  const { projects, isLoading, error } = useProjectList(housingId, bedCount,bathCount,balconyCount); // Pass bed count

  const LoadingSpinner = () => <LoadingLottie />;
  const ErrorMessage = () => (
    <div className="flex justify-center items-center text-red-600">{error}</div>
  );

  const sortedProjects = [...projects];
  if (sortOption === "newest") {
    sortedProjects.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (sortOption === "oldest") {
    sortedProjects.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  } else if (sortOption === "priceHighToLow") {
    sortedProjects.sort((a, b) => b.total_price - a.total_price);
  } else if (sortOption === "priceLowToHigh") {
    sortedProjects.sort((a, b) => a.total_price - b.total_price);
  }

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      <Helmet>
        <title>Shopnoneer | Properties</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-7 lg:mx-20">
          <Navbar visible={true} />
          <div className="flex flex-col items-center mb-4 space-y-4">
            <FilterSection
              sortOption={sortOption}
              setSortOption={setSortOption}
              setBedCount={setBedCount} 
              setBathCount={setBathCount} 
              setBalconyCount={setBalconyCount} 
            />
          </div>
          <DetailCard sortedProjects={sortedProjects}></DetailCard>
        </div>
      </div>
    </div>
  );
};

export default Detail;
