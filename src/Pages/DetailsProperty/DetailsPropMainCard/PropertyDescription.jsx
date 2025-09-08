import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PropertyDescription = ({ description, property }) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-xs">
      <h4 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
        সম্পত্তি বর্ণনা
      </h4>

      {/* Location Highlight Section */}
      <div className="mb-4 p-4rounded-lg">
        <div className="flex items-start">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-teal-500 mt-1 mr-3 text-lg"
          />
          <div>
            <p className="text-teal-600 font-medium">{property.housing}, {property.district}, {property.upazila}</p>

            {property.address && (
              <p className="text-gray-600 mt-1 text-sm">{property.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description || "এই সম্পত্তির জন্য কোনো বর্ণনা প্রদান করা হয়নি।"}
      </p>
    </div>
  );
};

export default PropertyDescription;
