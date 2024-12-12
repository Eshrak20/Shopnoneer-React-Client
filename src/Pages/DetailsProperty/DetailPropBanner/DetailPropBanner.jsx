import "../DetailsPropMainCard/DetailsPropMainCard.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState, useRef } from "react";
import Lightbox from "yet-another-react-lightbox"; // Import Thumbnails directly
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css"; // Import the Thumbnails CSS

const DetailPropBanner = ({ property }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active image in carousel
  const [lightboxOpen, setLightboxOpen] = useState(false); // Control lightbox visibility
  const thumbnailsRef = useRef(null); // Ref for controlling thumbnails visibility
  const images = property.images.map((img) => ({
    src: img,
    thumbnail: img, // You can specify a different thumbnail image here if needed
  }));
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
              className="w-full h-[250px] lg:h-[550px] object-cover cursor-pointer "
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
    </>
  );
};

export default DetailPropBanner;
