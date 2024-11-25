import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  faBath,
  faBed,
  faHome,
  faCity,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import GoogleMap from "../../../Components/GoogleMap/GoogleMap";

const DetailsPropMainCard = ({ property }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active image in carousel
  const [lightboxOpen, setLightboxOpen] = useState(false); // Control lightbox visibility

  const capitalizeFirstChar = (str) => {
    if (!str || str.trim() === "") {
      return "Input string is empty.";
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const images = property.images.map((img) => ({
    src: img,
  }));

  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* Carousel Section */}
      <Carousel
        showArrows={true}
        showThumbs={true}
        className="custom-carousel"
        selectedItem={activeIndex}
        onChange={(index) => setActiveIndex(index)} // Update active image
        thumbWidth={100} // Thumbnail width
      >
        {images.map((img, index) => (
          <div key={index} onClick={() => setLightboxOpen(true)}> {/* Open Lightbox */}
            <img
              src={img.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[550px] object-cover cursor-pointer"
            />
          </div>
        ))}
      </Carousel>

      {/* Lightbox Section */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)} // Close lightbox
          slides={images}
          index={activeIndex} // Start with the active image
        />
      )}

      {/* Inline CSS */}
      <style>
        {`
        .custom-carousel .thumbs-wrapper {
          display: flex;
          overflow-x: auto;
          white-space: nowrap;
          scroll-behavior: smooth;
        }

        .custom-carousel .thumb {
          display: inline-flex;
          max-height: 60px;
          max-width: 100px;
          align-items: center;
          justify-content: center;
          margin: 0 5px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .custom-carousel .thumb img {
          object-fit: contain;
          width: 100%;
          height: auto;
          display: block;
        }

        .custom-carousel .thumb.active {
          transform: scale(0.9); 
          opacity: 0.5;
        }

        .custom-carousel .thumbs-wrapper {
          scrollbar-width: thin;
          scrollbar-color: #888 #ccc;
        }

        .custom-carousel .thumbs-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .custom-carousel .thumbs-wrapper::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 10px;
        }

        .custom-carousel .thumbs-wrapper::-webkit-scrollbar-track {
          background-color: #ccc;
        }

        .custom-carousel .thumb.selected {
          border: 2px solid #00b4d8; 
          transform: scale(1.1); 
        }
        `}
      </style>


      <div className="pb-4 mb-7">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-2  ">
          <div className="lg:col-span-2 space-y-6  bg-white rounded-lg ">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {property.title}
            </h1>
            <h4 className="text-xl text-teal-600 flex flex-col mb-4">
              <span className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {capitalizeFirstChar(property.division)},{" "}
                {capitalizeFirstChar(property.district)},{" "}
                {capitalizeFirstChar(property.upazila)},{" "}
                {capitalizeFirstChar(property.housing)},{" "}
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
              <FontAwesomeIcon icon={faCity} />
              <span>{property.no_of_balcony} Balcony</span>
              <FontAwesomeIcon icon={faHome} />
              <span>{property.rate_per_sqft} sqft</span>
            </div>

            <div className="my-4">
              <h4 className="text-xl mb-2 font-semibold text-gray-900">
                Overview
              </h4>
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
          <div className="-mt-16">
            <GoogleMap></GoogleMap>
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailsPropMainCard;
