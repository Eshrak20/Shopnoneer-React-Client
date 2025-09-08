import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faCity, faHome } from "@fortawesome/free-solid-svg-icons";

const QuickStats = ({ no_of_beds, no_of_baths, no_of_balcony, floor_area }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-0">
      <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-xs text-center">
        <div className="flex justify-center items-center text-teal-500 mb-1">
          <FontAwesomeIcon icon={faBed} className="text-lg" />
        </div>
        <p className="text-gray-600 text-sm">বেডরুম</p>
        <p className="font-semibold text-gray-800">{no_of_beds}</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-xs text-center">
        <div className="flex justify-center items-center text-teal-500 mb-1">
          <FontAwesomeIcon icon={faBath} className="text-lg" />
        </div>
        <p className="text-gray-600 text-sm">বাথরুম</p>
        <p className="font-semibold text-gray-800">{no_of_baths}</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-xs text-center">
        <div className="flex justify-center items-center text-teal-500 mb-1">
          <FontAwesomeIcon icon={faCity} className="text-lg" />
        </div>
        <p className="text-gray-600 text-sm">ব্যালকনি</p>
        <p className="font-semibold text-gray-800">{no_of_balcony}</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-xs text-center">
        <div className="flex justify-center items-center text-teal-500 mb-1">
          <FontAwesomeIcon icon={faHome} className="text-lg" />
        </div>
        <p className="text-gray-600 text-sm">আয়তন</p>
        <p className="font-semibold text-gray-800">{floor_area} বর্গফুট</p>
      </div>
    </div>
  );
};

export default QuickStats;