import NearestFacilities from "../NearestFacilities/NearestFacilities";
import Navbar from "../../Shared/Navbar/Navbar";
`import Navbar from "../../Shared/Navbar/Navbar";`;
import DetailsPropMainCard from "../DetailsPropMainCard/DetailsPropMainCard";
import { DetailsPropertyModel } from "../../../Models/DetailsPropertyModel/DetailsPropMainCard/DetailsPropMainCard";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Amenities from "../Amenities/Amenities";

const DetailsPropMain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [facilities, setFacilities] = useState(null);
  const [amenities, setAmenities] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { property, facilities, amenities } =
          await DetailsPropertyModel.fetchById(id);

        setProperty(property);
        setFacilities(facilities);
        setAmenities(amenities);
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center text-gray-500 my-10">Property not found.</div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto mb-3">
      <Navbar visible={true}></Navbar>
      <DetailsPropMainCard property={property} />
      <NearestFacilities facilities={facilities} />
      <Amenities amenities={amenities}/>
    </div>
  );
};

export default DetailsPropMain;
