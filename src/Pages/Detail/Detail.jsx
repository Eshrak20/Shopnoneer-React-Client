import { useEffect, useState, useMemo } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar/Navbar";
import FilterSection from "./FilterSection/FilterSection";
import useProjectList from "../../Models/DetailModel/DetailCardModel/DetailCardModel";
import DetailCard from "./DetailCard/DetailCard";
import Pagination from "./PaginationSection/PaginationSection";
import Error404 from "../../../public/assets/loadingLottie/404";
const Detail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { housingId } = location.state || {};
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from search parameters
  const [filters, setFilters] = useState({
    sortOption: searchParams.get("sortOption") || "",
    bedCount: searchParams.get("bedCount") || "",
    bathCount: searchParams.get("bathCount") || "",
    balconyCount: searchParams.get("balconyCount") || "",
    housing: housingId || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minSqr: searchParams.get("minSqr") || "",
    maxSqr: searchParams.get("maxSqr") || "",
  });

  const [page, setPage] = useState(1);

  // Fetch project list based on filters
  const { projects, totalProject, isLoading, error } = useProjectList(
    filters.housing,
    housingId,
    filters.bedCount,
    filters.bathCount,
    filters.balconyCount,
    page,
    filters.minPrice,
    filters.maxPrice,
    filters.minSqr,
    filters.maxSqr

  );

  // Sorting logic
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      switch (filters.sortOption) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "priceHighToLow":
          return b.total_price - a.total_price;
        case "priceLowToHigh":
          return a.total_price - b.total_price;
        default:
          return 0;
      }
    });
  }, [projects, filters.sortOption]);

  // Update search params whenever any filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Handle error state
  if (error)
    return (
      <div className="flex justify-center items-center text-red-600">
        {/* {error}  */}
        <Error404 />
      </div>
    );

  return (
    <div>
      <Helmet>
        <title>স্বপ্ননীড় | ফ্ল্যাট সমূহও</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto">
        <div className="md:mx-32 2xl:mx-20">
          <Navbar visible={true} />
          <div className="flex flex-wrap">
            <FilterSection filters={filters} setFilters={setFilters} />
            <div className="flex-1 p-3 lg:pr-0">
              <DetailCard
                sortedProjects={sortedProjects}
                isLoading={isLoading}
              />
              <div className="mt-3 lg:mt-8 lg:pl-6 px-3">
                <Pagination
                  onPageChange={setPage}
                  totalProjects={totalProject}
                />
              </div>
            </div>
          </div>
          {/* {isLoading && (
            <div className="flex justify-center mt-4">
              <Spinner />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Detail;
