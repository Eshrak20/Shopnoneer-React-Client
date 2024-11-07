import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  faBath,
  faBed,
  faHome,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import DetailsPropertyModel from "../../../Models/DetailsPropertyModel/DetailsPropMainCard/DetailsPropMainCard"; // Adjust the import path

const DetailsPropMainCard = () => {
  const { id } = useParams(); // Use the id from URL parameters
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const response = await fetch(
          "https://sna.shopnoneer.com/api/get-project-by-id",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ project_id: id }), // Send project_id in the body
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        const propertyModel = new DetailsPropertyModel(data.data); // Create a new instance of the property model
        setProperty(propertyModel); // Set the property data
        // console.log(propertyModel);
      } catch (error) {
        console.error("Failed to fetch home card data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Fetch data when id changes

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

  const capitalizeFirstChar = (str) => {
    // Check if the string is empty or only contains whitespace
    if (!str || str.trim() === "") {
      return "Input string is empty."; // Return a message if the string is empty
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const images = property.images; // Get images from property data

  return (
    <>
      <div className="bg-gray-100">
        <Carousel
          showArrows
          showThumbs={false}
          autoPlay
          infiniteLoop
          className="max-w-screen-2xl mx-auto my-5"
        >
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="object-cover h-[600px]"
              />
            </div>
          ))}
        </Carousel>

        <section className="md:max-w-screen-xl lg:max-w-screen-2xl mx-auto my-5 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Property Details */}
          <div className="lg:col-span-2 space-y-6 p-10 bg-white rounded-lg shadow-lg">
            {/* Property Title and Price */}
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {property.title}
            </h1>
            <h4 className="text-xl text-teal-600 flex flex-col mb-4">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {capitalizeFirstChar(property.division.name)},{" "}
                {capitalizeFirstChar(property.district.name)},{" "}
                {capitalizeFirstChar(property.upazila.name)},{" "}
                {capitalizeFirstChar(property.housing.name)}
              </span>
              <span>
                Road: {property.road}, Block: {property.block}, Plot:{" "}
                {property.plot}
              </span>
            </h4>

            <h3 className="text-3xl font-semibold text-gray-900 mt-4 mb-4">
              Price: ৳{" "}
              {property.total_price
                ? property.total_price.toLocaleString()
                : "Upcoming"}
            </h3>

            {/* Property Details */}
            <div className="flex gap-4 my-4 items-center text-gray-600 text-lg">
              <FontAwesomeIcon icon={faBed} />
              <span>{property.no_of_beds} Beds</span>
              <FontAwesomeIcon icon={faBath} />
              <span>{property.no_of_baths} Baths</span>
              <FontAwesomeIcon icon={faHome} />
              <span>{property.rate_per_sqft} sqft</span>
            </div>

            {/* Overview Section */}
            <div className="my-4">
              <h4 className="text-lg font-semibold text-gray-900">Overview</h4>
              <p className="text-gray-600 text-lg">{property.description}</p>
            </div>

            {/* Amenities Section */}
            <div className="my-4">
              <h4 className="text-lg font-semibold text-gray-900">Amenities</h4>
              <p className="text-gray-600 text-lg">{property.amenities}</p>
            </div>

            {/* Location Details */}
            <div className="my-4">
              <h4 className="text-lg font-semibold text-gray-900">Location</h4>
              <p className="text-gray-600 text-lg">
                {property.location_details}
              </p>
            </div>

            {/* Additional Info */}
            <div className="my-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Additional Information
              </h4>
              <p className="text-gray-600 text-lg">
                Plot: {property.plot}, Road: {property.road}
              </p>
              <p className="text-gray-600 text-lg">
                Block: {property.block}, Plot Size: {property.plot_size} sqft
              </p>
              <p className="text-gray-600 text-lg">
                Floor Area: {property.floor_area} sqft, Floor Number:{" "}
                {property.floor_no}
              </p>
            </div>

            <button className="mt-6 px-8 py-4 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition duration-300 text-xl">
              Inquire Now
            </button>
          </div>

          {/* Right: Property Images */}
          <div className="space-y-4">
            {images.slice(0, 3).map((img, index) => (
              <div key={index + 1} className="relative overflow-hidden">
                <img
                  src={img}
                  alt={`Property additional image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-lg transition duration-300 transform scale-100 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailsPropMainCard;
