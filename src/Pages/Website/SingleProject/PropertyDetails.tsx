import type { Project } from "@/types/admin.type";
import { Home, Car, SquareStack, Building2, DollarSign, Ruler } from "lucide-react";
interface Property {
  property: Partial<Project>;
}
const PropertyDetails: React.FC<Property> = ({ property }) => {
  const details = [
    { icon: <Home size={20} />, label: "বারান্দা সংখ্যা", value: property.noOfBalcony },
    { icon: <SquareStack size={20} />, label: "কোনায় অবস্থিত", value: property.isCorner ? "হ্যাঁ" : "না" },
    { icon: <Car size={20} />, label: "পার্কিং", value: property.parkingAvailable ? "হ্যাঁ" : "না" },
    { icon: <Building2 size={20} />, label: "ফ্ল্যাটে যে তলায়", value: property.storied },
    { icon: <DollarSign size={20} />, label: "প্রতি স্কয়ার ফিটের মূল্য", value: property.ratePerSqr },
    { icon: <Ruler size={20} />, label: "ফ্লোর আয়তন", value: property.floorArea + " sqft" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">বিস্তারিত তথ্য</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {item.icon}
            <p className="font-medium">{item.label}: </p>
            <p className="text-gray-600">{item.value || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;
