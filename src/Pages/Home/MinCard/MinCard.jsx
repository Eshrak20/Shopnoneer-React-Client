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
    title: "পারফেক্ট লোকেশন",
    description:
      "উচ্চ সিলিং সহ চমৎকার স্থানে বসবাস। উল্লেখযোগ্য স্থপতির নকশা এবং সহজীকরণের প্রতীক এটি। ঐতিহাসিক দিক দিয়ে এটি অনন্য।",
    icon: faBuilding,
  },
  {
    title: "আধুনিক জীবনযাপন",
    description:
      "আকর্ষণীয় পরিবেশ এবং উন্নতমানের ফিনিশিং। এখানে আধুনিক থিমের সাথে একত্রে উন্নতির ছোঁয়া।",
    icon: faHome,
  },
  {
    title: "প্রাকৃতিক শান্তি",
    description:
      "প্রকৃতির মাঝে প্রশান্তিময় পরিবেশে বসবাস। এটি আদর্শ সম্প্রদায়ের জন্য একটি উপযুক্ত স্থান।",
    icon: faTree,
  },
  {
    title: "লাক্সারি আরাম",
    description:
      "উচ্চমানের সুবিধাসমূহের সঙ্গে বিলাসবহুল জীবনযাপনের অভিজ্ঞতা। সেরা বাড়ির আরামের স্বাদ নিন।",
    icon: faBed,
  },
];

const MinCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-14 mb-24">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:shadow-2xl  transition-transform duration-300 ease-in-out transform"
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
