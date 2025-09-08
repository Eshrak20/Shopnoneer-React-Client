import React, { useState } from "react";
import { toWords } from "number-to-words";
import { ToastContainer, toast } from "react-toastify";

const InputFieldWithWord = ({ placeholder, type, value, onChange }) => {
  const [number, setNumber] = useState(value); // Initialize with value prop

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Ensure only numbers are input

    if (value < 2147483647) {
      setNumber(value);
      onChange(e); // Call the parent onChange function
    } else {
      toast.error("সংখ্যাটি খুব বড়", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const formatNumberToWords = (value) => {
    return value ? toWords(value) : "";
  };

  return (
    <>
      <div className="input-container py-2 relative">
        <input
          type={type}
          value={number} // Use local number state to control input value
          onChange={handleChange}
          placeholder=""
          className="input-field"
        />
        <label className="input-label">{placeholder}</label>

        {number
          ? number.length >= 2 && ( // Only show words for numbers greater than or equal to 3 digits
              <span
                className="hidden lg:block absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 truncate max-w-[100px] text-ellipsis overflow-hidden"
                title={formatNumberToWords(number)} // Add tooltip for full text
              >
                {formatNumberToWords(number)}
              </span>
            )
          : null}
        <ToastContainer />
      </div>
    </>
  );
};

export default InputFieldWithWord;
