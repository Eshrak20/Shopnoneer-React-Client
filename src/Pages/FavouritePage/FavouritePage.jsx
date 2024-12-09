import React, { useEffect } from "react";
import FavCard from "./FavCard/FavCard";
import Navbar from "../Shared/Navbar/Navbar";
import { Helmet } from "react-helmet";

const FavouritePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>স্বপ্ননীড়  | Favourite</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto">
        <div className="lg:mx-20">
        <Navbar visible={true} />
        <FavCard></FavCard>
        </div>
      </div>
    </>
  );
};

export default FavouritePage;
