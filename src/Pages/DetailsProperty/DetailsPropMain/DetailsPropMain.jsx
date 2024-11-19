import React from "react";
import DetailsPropMainCard from "../DetailsPropMainCard/DetailsPropMainCard";
import NearestFacilities from "../NearestFacilities/NearestFacilities";
import Amenities from "../Amenities/Amenities";
import Navbar from "../../Shared/Navbar/Navbar";
`import Navbar from "../../Shared/Navbar/Navbar";`

const DetailsPropMain = () => {
  return (
    <div className="md:max-w-screen-md mx-auto mb-5">
      <Navbar  visible={true}></Navbar>
      <DetailsPropMainCard></DetailsPropMainCard>
      <Amenities></Amenities>
      <NearestFacilities></NearestFacilities>
    </div>
  );
};

export default DetailsPropMain;
