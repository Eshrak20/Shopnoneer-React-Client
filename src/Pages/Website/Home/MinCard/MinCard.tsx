import {
  faBullhorn,
  faHandshake,
  faSearchLocation,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

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
      "আপনার প্রোফাইল তৈরি করে আপনার পছন্দ, প্রিয় এলাকাসমূহ ও আগ্রহের তালিকা সংরক্ষণ করুন। সহজে বিজ্ঞাপন দিন ও দ্রুত ফ্ল্যাট বা জমির আপডেট পান。",
    icon: faUser,
  },
  {
    title: "ফ্ল্যাট বা জমির বিজ্ঞাপন দিন",
    description:
      "আপনার জমি বা ফ্ল্যাট বিক্রি করতে চাইলে সহজে বিজ্ঞাপন দিন। ছবি, সুবিধাসমূহ এবং বিস্তারিত তথ্য যুক্ত করে দ্রুত ক্রেতা খুঁজে পান。",
    icon: faBullhorn,
  },
  {
    title: "শেয়ারে বা সরাসরি ক্রয়/বিক্রয়",
    description:
      "শেয়ারে বা সম্পূর্ণ মালিকানায় ফ্ল্যাট ও জমি ক্রয়/বিক্রয় করুন। নিশ্চিত তথ্য এবং সুবিধাসমূহ যাচাই করে নিরাপদ লেনদেন করুন。",
    icon: faHandshake,
  },
]

const MinCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mx-10 mt-14 mb-24">
      {cardData.map((card, index) => (
        <Card
          key={index}
          className="bg-card border-border shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-card-foreground text-base 2xl:text-lg font-bold">
              {card.title}
            </CardTitle>
            <FontAwesomeIcon
              icon={card.icon}
              size="2x"
              className="text-primary hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground md:text-sm 2xl:text-base">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default MinCard