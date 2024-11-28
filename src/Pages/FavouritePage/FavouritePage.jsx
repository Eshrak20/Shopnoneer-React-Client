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
      <div className="max-w-screen-xl mx-auto">
        <Navbar visible={true} />
        <FavCard></FavCard>
      </div>
    </>
  );
};

export default FavouritePage;
