import React from "react";
import BrandName from "./BrandName/BrandName";
import DetailCard from "./DetailCard/DetailCard";
import Navbar from "../Shared/Navbar/Navbar";
import { Helmet } from "react-helmet-async";
const Detail = () => {
  return (
    <div>
      <Helmet>
        <title>Shopnoneer | Properties</title>
      </Helmet>
      <Navbar visible={true} />
      {/* <BrandName></BrandName> */}
      <DetailCard></DetailCard>
    </div>
  );
};

export default Detail;
