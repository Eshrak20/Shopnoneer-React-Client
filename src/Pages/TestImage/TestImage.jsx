import React from "react";
const [isOpen, setIsOpen] = useState(false);
const [photoIndex, setPhotoIndex] = useState(0);

const images = [
  "https://via.placeholder.com/600",
  "https://via.placeholder.com/800",
  "https://via.placeholder.com/1000",
];

const TestImage = () => {
  return (
    <>
      <div>
        <button onClick={() => setIsOpen(true)}>Open Lightbox</button>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
      </div>
    </>
  );
};

export default TestImage;
