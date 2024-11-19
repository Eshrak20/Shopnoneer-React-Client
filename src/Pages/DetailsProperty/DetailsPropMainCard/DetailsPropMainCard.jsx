import React, { useEffect, useState, useRef } from "react";
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
  const mapRef = useRef(null);

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
      } catch (error) {
        console.error("Failed to fetch home card data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Fetch data when id changes

  useEffect(() => {
    if (!property) return;

    // Initialize the Google Map
    const initializeMap = () => {
      const map = new google.maps.Map(mapRef.current, {
        center: {
          lat: parseFloat(property.latitude) || 23.756724360562256,
          lng: parseFloat(property.longitude) || 90.35648582209016,
        }, // Default center (or fetched from property)
        zoom: 18,
      });

      // Add a marker
      new google.maps.Marker({
        position: {
          lat: parseFloat(property.latitude) || 37.7749,
          lng: parseFloat(property.longitude) || -122.4194,
        },
        map,
        title: property.title || "Default Location",
      });
    };

    // Load the Google Maps script dynamically
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyABnAbo9ifTK9aGO-2oBameLdIKPxVKoXI&libraries=places";
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [property]);

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
    if (!str || str.trim() === "") {
      return "Input string is empty.";
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const images = property.images; // Get images from property data

  return (
    <>
      <div className="bg-gray-100 pb-4">
        <Carousel
          showArrows
          showThumbs={false}
          autoPlay
          infiniteLoop
          className="max-w-screen-2xl mx-auto mb-5"
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

        <section className="md:max-w-screen-2xl lg:max-w-screen-2xl mx-auto my-5 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6 p-10 bg-white rounded-lg shadow-lg">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {property.title}
            </h1>
            <h4 className="text-xl text-teal-600 flex flex-col mb-4">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {capitalizeFirstChar(property.division)},{" "}
                {capitalizeFirstChar(property.district)},{" "}
                {capitalizeFirstChar(property.upazila)},{" "}
                {capitalizeFirstChar(property.housing)}
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

            <div className="flex gap-4 my-4 items-center text-gray-600 text-lg">
              <FontAwesomeIcon icon={faBed} />
              <span>{property.no_of_beds} Beds</span>
              <FontAwesomeIcon icon={faBath} />
              <span>{property.no_of_baths} Baths</span>
              <FontAwesomeIcon icon={faHome} />
              <span>{property.rate_per_sqft} sqft</span>
            </div>

            <div className="my-4">
              <h4 className="text-lg font-semibold text-gray-900">Overview</h4>
              <p className="text-gray-600 text-lg">{property.description}</p>
            </div>

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
          </div>

          {/* Google Map */}
          <div
            ref={mapRef}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
            className="shadow-lg"
          ></div>
        </section>
      </div>
    </>
  );
};

export default DetailsPropMainCard;
