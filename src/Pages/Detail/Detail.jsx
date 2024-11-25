import React, { useEffect } from "react";
import DetailCard from "./DetailCard/DetailCard";
import Navbar from "../Shared/Navbar/Navbar";
import { Helmet } from "react-helmet-async";
const Detail = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
