// PriceAndContact.tsx
import React from "react";

interface PriceAndContactProps {
  total_price?: number;
  rate_per_sqft?: number;
}

const PriceAndContact: React.FC<PriceAndContactProps> = ({
  total_price,
  rate_per_sqft,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-gray-800">
          মূল্য:{" "}
          {total_price
            ? `৳ ${total_price.toLocaleString()}`
            : "শীঘ্রই প্রকাশিত হবে!"}
        </h3>
        {rate_per_sqft && (
          <p className="text-gray-600">প্রতি স্কয়ার ফিট: ৳{rate_per_sqft}</p>
        )}
      </div>
      <div className="flex gap-3 mt-4 md:mt-0">
        <button
          onClick={() => window.open(`tel:+8801309176398`, "_self")}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
        >
          কল করুন
        </button>
        <button
          onClick={() => window.open(`mailto:eshrakg62@gmail.com`, "_self")}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          ইমেইল পাঠান
        </button>
      </div>
    </div>
  );
};

export default PriceAndContact;