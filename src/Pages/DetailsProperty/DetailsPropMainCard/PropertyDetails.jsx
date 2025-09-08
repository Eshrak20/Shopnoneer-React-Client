import {
  BedDouble,
  Bath,
  Ruler,
  Building2,
  Car,
  Home,
  SquareStack,
  CornerDownRight,
  DollarSign,
} from "lucide-react";

const formatBoolean = (value) => (value === 1 ? "হ্যাঁ" : "না");

const PropertyDetails = ({ property }) => {
  const propertyDetails = [
    {
      icon: <BedDouble size={20} className="text-teal-600" />,
      label: "বেডরুম সংখ্যা:",
      value: "no_of_beds",
    },
    { 
      icon: <Bath size={20} className="text-teal-600" />, 
      label: "বাথরুম সংখ্যা:", 
      value: "no_of_baths" 
    },
    {
      icon: <Home size={20} className="text-teal-600" />,
      label: "বারান্দা সংখ্যা:",
      value: "no_of_balcony",
    },
    {
      icon: <CornerDownRight size={20} className="text-teal-600" />,
      label: "প্লট ফেস:",
      value: "plot_face",
    },
    {
      icon: <SquareStack size={20} className="text-teal-600" />,
      label: "কোনায় অবস্থিত:",
      value: "is_corner",
      isBoolean: true,
    },
    {
      icon: <Home size={20} className="text-teal-600" />,
      label: "মোট ইউনিট সংখ্যা:",
      value: "no_of_units",
    },
    {
      icon: <Car size={20} className="text-teal-600" />,
      label: "পার্কিং আছে কিনা:",
      value: "parking_available",
      isBoolean: true,
    },
    {
      icon: <Building2 size={20} className="text-teal-600" />,
      label: "ফ্লাটে যে তলায় অবস্থিত:",
      value: "storied",
    },
    {
      icon: <DollarSign size={20} className="text-teal-600" />,
      label: "প্রতি স্কয়ার ফিটের মূল্য:",
      value: "rate_per_sqft",
    },
    {
      icon: <Ruler size={20} className="text-teal-600" />,
      label: "ফ্লোর আয়তনঃ",
      value: "floor_area",
      suffix: " বর্গফুট (sqft)",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-xs">
      <h4 className="text-xl font-bold text-teal-600 mb-4 pb-2 border-b border-teal-100">
        সম্পত্তির বিস্তারিত
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1].map((col) => (
          <ul key={col} className="space-y-3">
            {propertyDetails
              .slice(
                col === 0 ? 0 : Math.ceil(propertyDetails.length / 2),
                col === 0 ? Math.ceil(propertyDetails.length / 2) : propertyDetails.length
              )
              .map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <span className="font-medium text-gray-700">
                      {item.label}{" "}
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {item.isBoolean
                        ? formatBoolean(property[item.value])
                        : property[item.value] + (item.suffix || "")}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;