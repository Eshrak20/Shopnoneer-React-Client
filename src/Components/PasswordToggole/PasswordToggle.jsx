import React from "react";

const PasswordToggle = ({ showPassword, setShowPassword, topPosition = "top-14" }) => {
  return (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className={`absolute ${topPosition} right-3 flex items-center text-gray-500 hover:text-gray-700`}
    >
      {showPassword ? (
        <span role="img" aria-label="Hide password">
          🐵
        </span>
      ) : (
        <span role="img" aria-label="Show password">
          🙈
        </span>
      )}
    </button>
  );
};

export default PasswordToggle;