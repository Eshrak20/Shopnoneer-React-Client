import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "daisyui/dist/full.css";

// Constants for price limits
const MIN_PRICE = 2500000; // ২৫ লাখ
const MAX_PRICE = 50000000; // ৫ কোটি
const STEP = 100000; // ১ লাখ

const Slider = () => {
  // State to manage min and max prices
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  // Convert numbers to Bengali format
  const formatBangla = (num) => {
    const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/[0-9]/g, (d) => banglaNumbers[d]);
  };

  // Convert numbers to Bengali currency format without fractions
  const formatPrice = (num) => {
    if (num >= 10000000) {
      return formatBangla(Math.floor(num / 10000000)) + " কোটি";
    }
    return formatBangla(Math.floor(num / 100000)) + " লাখ";
  };

  // Handle slider change
  const handleSliderChange = (e) => {
    setMinPrice(e.minValue);
    setMaxPrice(e.maxValue);
  };

  // Handle input change for min and max prices
  const handleInputChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === "min" && value >= MIN_PRICE && value <= maxPrice) {
      setMinPrice(value);
    }
    if (type === "max" && value <= MAX_PRICE && value >= minPrice) {
      setMaxPrice(value);
    }
  };

  // Handle key press for input (when "Enter" is pressed)
  const handleKeyPress = (e, type) => {
    if (e.key === "Enter") {
      handleInputChange(e, type);
    }
  };

  return (
    <div className="flex flex-col items-start w-auto">
      {/* <h3 className="text-lg font-semibold  text-gray-800 mb-2">
        মূল্য সীমা নির্ধারণ
      </h3> */}

      {/* Multi-Range Slider */}
      <div className="w-full mb-5">
        <MultiRangeSlider
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
          ruler={false}
          barInnerColor="linear-gradient(to right, #16a34a, #f97316)"
          label={true}
          minValue={minPrice}
          maxValue={maxPrice}
          onInput={handleSliderChange}
          style={{
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            borderRadius: "10px",
          }}
        />
      </div>

      {/* Price Display Box */}
      <div className="flex justify-between w-full mb-2">
        <div className="flex flex-col items-center border p-3 rounded-lg bg-gray-100 w-36">
          <span className="text-base font-bold">{formatPrice(minPrice)}</span>
        </div>
        <div className="flex flex-col items-center border p-3 rounded-lg bg-gray-100 w-36">
          <span className="text-base font-bold">{formatPrice(maxPrice)}</span>
        </div>
      </div>

      {/* Input Fields */}
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center">
          <input
            type="number"
            id="min"
            name="min"
            value={minPrice}
            onChange={(e) => handleInputChange(e, "min")}
            onKeyDown={(e) => handleKeyPress(e, "min")}
            className="w-36 rounded-sm text-center bg-gray-100 text-sm"
          />
        </div>
        <div className="flex flex-col items-center">
          <input
            type="number"
            id="max"
            name="max"
            value={maxPrice}
            onChange={(e) => handleInputChange(e, "max")}
            onKeyDown={(e) => handleKeyPress(e, "max")}
            className="w-36 rounded-sm text-center bg-gray-100 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
