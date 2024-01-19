import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images, interval = 4000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextSlide = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, interval);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, interval]);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="image-slider">
      <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex}`} />
      <div className="flex gap-2 py-4 items-center justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-[1.5vh] w-[1.5vh] rounded-xl bg-[#4E2167] cursor-pointer ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
