import {
  faBath,
  faBed,
  faBuilding,
  faBullhorn,
  faHandshake,
  faHome,
  faHouse,
  faSearchLocation,
  faTree,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cardData = [
  {
    title: "ফ্ল্যাট বা প্রপার্টি খোঁজ করুন",
    description:
      "আপনার এলাকা, সুবিধা ও বাজেট অনুযায়ী ফ্ল্যাট বা জমি খুঁজুন। প্রতিটি প্রপার্টির বেডরুম, বাথরুম, কিচেন, বারান্দা ও নিকটবর্তী স্কুল, মাদ্রাসা, ব্যাংকসহ সব তথ্য একসাথে পাবেন।",
    icon: faSearchLocation,
  },
  {
    title: "আপনার প্রোফাইল তৈরি করুন",
    description:
      "আপনার প্রোফাইল তৈরি করে আপনার পছন্দ, প্রিয় এলাকাসমূহ ও আগ্রহের তালিকা সংরক্ষণ করুন। সহজে বিজ্ঞাপন দিন ও দ্রুত ফ্ল্যাট বা জমির আপডেট পান।",
    icon: faUser,
  },
  {
    title: "ফ্ল্যাট বা জমির বিজ্ঞাপন দিন",
    description:
      "আপনার জমি বা ফ্ল্যাট বিক্রি করতে চাইলে সহজে বিজ্ঞাপন দিন। ছবি, সুবিধাসমূহ এবং বিস্তারিত তথ্য যুক্ত করে দ্রুত ক্রেতা খুঁজে পান।",
    icon: faBullhorn,
  },
  {
    title: "শেয়ারে বা সরাসরি ক্রয়/বিক্রয়",
    description:
      "শেয়ারে বা সম্পূর্ণ মালিকানায় ফ্ল্যাট ও জমি ক্রয়/বিক্রয় করুন। নিশ্চিত তথ্য এবং সুবিধাসমূহ যাচাই করে নিরাপদ লেনদেন করুন।",
    icon: faHandshake,
  },
];


const MinCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mx-10 mt-14 mb-24">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:shadow-2xl  transition-transform duration-300 ease-in-out transform"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-base 2xl:text-lg font-bold text-white">
              {card.title}
            </h2>
            <FontAwesomeIcon
              icon={card.icon}
              size="2x"
              className="text-teal-500 hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>
          <p className="text-gray-300 md:text-sm 2xl:text-base">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MinCard;
