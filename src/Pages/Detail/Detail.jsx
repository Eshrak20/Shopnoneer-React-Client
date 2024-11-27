import DetailCard from "./DetailCard/DetailCard";
import Navbar from "../Shared/Navbar/Navbar";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProjectList from "../../Models/DetailModel/DetailCardModel/DetailCardModel";
import FilterSection from "./FilterSection/FilterSection";
import LoadingLottie from "../../assets/loadingLottie/loadingLottie";
const Detail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { housingId } = useParams();
  const { projects, isLoading, error } = useProjectList(housingId);
  const [sortOption, setSortOption] = useState("newest");

  const LoadingSpinner = () => (
    <LoadingLottie />
  );

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
      <div className="max-w-screen-xl mx-auto">
        <Navbar visible={true} />
        <div className="flex flex-col items-center mb-4 space-y-4">
          <FilterSection
            sortOption={sortOption}
            setSortOption={setSortOption}
            projects={projects}
          />
        </div>
        <DetailCard sortedProjects={sortedProjects}></DetailCard>
      </div>
    </div>
  );
};

export default Detail;
