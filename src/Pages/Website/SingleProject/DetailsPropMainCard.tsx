// DetailsPropMainCard.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import PriceAndContact from "./PriceAndContact";
import QuickStats from "./QuickStats";
import PropertyDescription from "./PropertyDescription";
import PropertyDetails from "./PropertyDetails";
import GoogleMap from "@/Pages/MYComponent/GoogleMap";
import type { Project } from "@/types/admin.type";

interface DetailsPropMainCardProps {
  property: Partial<Project>;
}

const DetailsPropMainCard: React.FC<DetailsPropMainCardProps> = ({
  property,
}) => {
  return (
    <div className="py-10 md:px-4 sm:px-6 lg:px-0 mx-auto">
      <div className="bg-white rounded-xl overflow-hidden">
        <section className="grid grid-cols-1 lg:grid-cols-3 p-0">
          {/* Left Column: Property Details */}
          <div className="lg:col-span-2 space-y-6 py-6 px-4">
            {/* Title + Address */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mb-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
                {property.name}
              </h1>
            </div>

            {/* Address */}
            <div className="mb-4 rounded-lg flex items-start gap-3">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-teal-500 mt-1 text-lg"
              />
              <div>
                <p className="text-teal-600 font-medium">
                  {property.housing?.nameBn}, {property.district?.nameBn},{" "}
                  {property.upazila?.nameBn}
                </p>
                {property.address && (
                  <p className="text-gray-600 mt-1 text-sm">
                    {property.address}
                  </p>
                )}
              </div>
            </div>

            {/* Price and Contact */}
            <PriceAndContact
              total_price={property.totalPrice}
              rate_per_sqft={property.ratePerSqr}
            />

            {/* Quick Stats */}
            <QuickStats
              no_of_beds={property.noOfBeds ?? 0}
              no_of_baths={property.noOfBaths ?? 0}
              no_of_balcony={property.noOfBalcony ?? 0}
              floor_area={property.floorArea ?? 0}
            />

            {/* Description */}
            <PropertyDescription description={property.description} />

            {/* Property Details */}
            <PropertyDetails property={property} />
          </div>

          {/* Right Column: Map */}
          <div className="p-6 space-y-6 lg:p-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg transition-all hover:shadow-xl h-[400px] lg:h-full">
              <div className="px-6 pt-5 pb-3 border-b border-gray-100">
                <h4 className="text-xl font-semibold text-teal-700 flex items-center">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-3 text-teal-500"
                  />
                  <span className="leading-tight">
                    {property.housing?.nameBn},
                    <span className="block text-md text-teal-600 font-medium mt-1 text-sm">
                      {property.district?.nameBn}, {property.upazila?.nameBn}
                    </span>
                  </span>
                </h4>
              </div>
              <div className="relative h-[calc(100%-85px)] w-full">
                <GoogleMap property={property} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailsPropMainCard;