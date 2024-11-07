import React from "react";
import DetailsPropMainCard from "../DetailsPropMainCard/DetailsPropMainCard";
import NearestFacilities from "../NearestFacilities/NearestFacilities";
import Amenities from "../Amenities/Amenities";
`import Navbar from "../../Shared/Navbar/Navbar";`

const DetailsPropMain = () => {
  return (
    <div className="md:max-w-screen-md lg:max-w-screen-lg mx-auto my-5 px-4 sm:px-6 lg:px-8">
      <Navbar  visible={true}></Navbar>
      <DetailsPropMainCard></DetailsPropMainCard>
      <Amenities></Amenities>
      <NearestFacilities></NearestFacilities>
    </div>
  );
};

export default DetailsPropMain;
