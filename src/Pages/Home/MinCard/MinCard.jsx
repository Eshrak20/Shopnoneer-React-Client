import {
  faBath,
  faBed,
  faBuilding,
  faHome,
  faHouse,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cardData = [
  {
    title: "Perfect Location",
    description:
      "Eos an high ceilings delicata. Quo ei noted architect discere facilisi. Eos dico historic delicata e",
    icon: faBuilding,
  },
  {
    title: "Modern Living",
    description:
      "Pro in stunning environments and high-end finishings. Ut eos rising theme delicata.",
    icon: faHome,
  },
  {
    title: "Serene Nature",
    description:
      "In the heart of nature with tranquil surroundings. Eos ideal community delicata.",
    icon: faTree,
  },
  {
    title: "Luxury Comfort",
    description:
      "Quo ei luxury amenities facilisi. Experience the comfort of the finest homes.",
    icon: faBed,
  },
];

const MinCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-14 mb-24">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4  rounded-lg shadow-md border border-gray-700 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out transform"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              {card.title}
            </h2>
            <FontAwesomeIcon
              icon={card.icon}
              size="2x"
              className="text-teal-500 hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>
          <p className="text-gray-300">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MinCard;
