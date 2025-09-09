// QuickStats.tsx
import React from "react";
import { BedDouble, Bath, Home, Ruler } from "lucide-react";

interface Quick {
  no_of_beds: number;
  no_of_baths: number;
  no_of_balcony: number;
  floor_area: number;
}

const QuickStats: React.FC<Quick> = ({
  no_of_beds = 0,
  no_of_baths = 0,
  no_of_balcony = 0,
  floor_area = 0,
}) => {
  const stats = [
    { icon: <BedDouble size={20} />, label: "বেডরুম", value: no_of_beds },
    { icon: <Bath size={20} />, label: "বাথরুম", value: no_of_baths },
    { icon: <Home size={20} />, label: "ব্যালকনি", value: no_of_balcony },
    {
      icon: <Ruler size={20} />,
      label: "ফ্লোর এরিয়া",
      value: `${floor_area} sqft`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl shadow-sm">
      {stats.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {item.icon}
          <div>
            <p className="font-semibold">{item.value || "-"}</p>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;