/* eslint-disable @typescript-eslint/no-explicit-any */
import "./DetailProp.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState, useRef } from "react";
import Lightbox from "yet-another-react-lightbox"; 
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface DetailPropBannerProps {
  images: string[];
}

const DetailPropBanner: React.FC<DetailPropBannerProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbnailsRef = useRef<any>(null);

  const slides = images.map((img) => ({ src: img, thumbnail: img }));

  return (
    <>
      <Carousel
        showArrows
        showThumbs
        selectedItem={activeIndex}
        onChange={(index) => setActiveIndex(index)}
        thumbWidth={100}
        className="custom-carousel"
      >
        {slides.map((img, index) => (
          <div key={index} onClick={() => setLightboxOpen(true)}>
            <img
              src={img.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[250px] md:h-[400px] 2xl:h-[750px] object-cover cursor-pointer"
            />
          </div>
        ))}
      </Carousel>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={activeIndex}
          // thumbnails={{ ref: thumbnailsRef }}
          on={{
            click: () => {
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
