import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState, useRef } from "react";
import Lightbox from "yet-another-react-lightbox"; // Import Thumbnails directly
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css"; // Import the Thumbnails CSS
import {
  faBath,
  faBed,
  faHome,
  faCity,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import GoogleMap from "../../../Components/GoogleMap/GoogleMap";

// Import the CSS
import "./DetailsPropMainCard.css";

const DetailsPropMainCard = ({ property }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active image in carousel
  const [lightboxOpen, setLightboxOpen] = useState(false); // Control lightbox visibility
  const thumbnailsRef = useRef(null); // Ref for controlling thumbnails visibility

  const capitalizeFirstChar = (str) => {
    if (!str || str.trim() === "") {
      return "Input string is empty.";
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const images = property.images.map((img) => ({
    src: img,
    thumbnail: img, // You can specify a different thumbnail image here if needed
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
      <Carousel
        showArrows={true}
        showThumbs={true}
        className="custom-carousel"
        selectedItem={activeIndex}
        onChange={(index) => setActiveIndex(index)} // Update active image
        thumbWidth={100} // Thumbnail width
      >
        {images.map((img, index) => (
          <div key={index} onClick={() => setLightboxOpen(true)}>
            {/* Open Lightbox */}
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
          slides={images} // Pass images array
          index={activeIndex} // Start with the active image
          // plugins={[Downloads,Zoom]} // Pass Thumbnails directly here as a reference
          thumbnails={{ ref: thumbnailsRef }} // Reference for controlling thumbnails visibility
          on={{
            click: () => {
              // Toggle visibility of thumbnails when clicked on lightbox
              if (thumbnailsRef.current?.visible) {
                thumbnailsRef.current?.hide();
              } else {
                thumbnailsRef.current?.show();
              }
            },
          }}
        />
      )}

      <div className="pb-4 mb-7">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="lg:col-span-2 space-y-6 bg-white rounded-lg">
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
