import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const PriceAndContact = ({ total_price, rate_per_sqft, phone, email }) => {
  return (
    <div className="bg-teal-50 rounded-lg p-4  flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4">
      <div>
        <h3 className="text-lg md:text-xl 2xl:text-3xl font-semibold text-gray-900 mt-4 mb-4 mr-3 lg:mr-16">
          মূল্য: ৳{" "}
          {total_price
            ? total_price.toLocaleString()
            : "মূল্য শীঘ্রই প্রকাশিত হবে!"}
        </h3>
        {rate_per_sqft ? (
          <p className="text-sm text-gray-600 mt-1">
            ৳ {rate_per_sqft.toLocaleString()} প্রতি বর্গফুট
          </p>
        ) : (
          <p>"বর্গফুট শীঘ্রই প্রকাশিত হবে!"</p>
        )}
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        <button
          onClick={() =>
            window.open(`tel:${phone || "+880 1521-498303"}`, "_self")
          }
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faPhone} />
          <span className="text-sm sm:text-base">কল করুন</span>
        </button>
        <button
          onClick={() =>
            window.open(`mailto:${email || "Shohag.cse3@gmail.com"}`, "_self")
          }
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="text-sm sm:text-base">ইমেইল</span>
        </button>
      </div>
    </div>
  );
};

export default PriceAndContact;
