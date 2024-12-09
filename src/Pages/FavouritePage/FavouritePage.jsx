import React from "react";
import FavCard from "./FavCard/FavCard";
import Navbar from "../Shared/Navbar/Navbar";
import { Helmet } from "react-helmet";

const FavouritePage = () => {
  return (
    <>
      <Helmet>
        <title>Shopnoneer | Favourite</title>
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
