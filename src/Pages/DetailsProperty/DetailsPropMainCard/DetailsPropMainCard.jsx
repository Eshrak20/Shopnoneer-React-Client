// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useEffect, useState } from "react";
// import {
//   faBath,
//   faBed,
//   faHome,
//   faCity,
//   faMapMarkerAlt,
//   faBookmark,
//   faPhone,
//   faEnvelope,
// } from "@fortawesome/free-solid-svg-icons";

// import {
//   BedDouble,
//   Bath,
//   Ruler,
//   Building2,
//   Car,
//   Home,
//   SquareStack,
//   CornerDownRight,
//   DollarSign,
// } from "lucide-react";
// import GoogleMap from "../../../Components/GoogleMap/GoogleMap";
// import "./DetailsPropMainCard.css";
// import FavAdd from "../../../Models/FavModel/FavAdd.js";
// import FavRemove from "../../../Models/FavModel/FavRemove.js";
// import Swal from "sweetalert2";
// import FavModel from "../../../Models/FavModel/FavModel.js";

// const DetailsPropMainCard = ({ property }) => {
//   const [bookmarked, setBookmarked] = useState({});
//   const token = localStorage.getItem("user_token");
//   if (token) {
//     useEffect(() => {
//       const loadData = async () => {
//         try {
//           const FavItem = await FavModel();
//           setBookmarked({
//             [property.id]: FavItem.some((fav) => fav.id === property.id),
//           });
//         } catch (error) {
//           console.error("Failed to fetch bookmark data:", error);
//         }
//       };

//       loadData();
//     }, []);
//   }
//   const formatBoolean = (value) => (value === 1 ? "হ্যাঁ" : "না");

// const handleBookmarkClick = async (id) => {
//   try {
//     if (bookmarked[id]) {
//       await FavRemove(id);
//       setBookmarked((prev) => ({ ...prev, [id]: false }));
//       Swal.fire({
//         icon: "success",
//         title: "বুকমার্ক মুছে ফেলা হয়েছে",
//         text: "এই সম্পত্তিটি আপনার প্রিয় তালিকা থেকে মুছে ফেলা হয়েছে।",
//         confirmButtonText: "ঠিক আছে",
//         confirmButtonColor: "#e53e3e",
//         timer: 3000,
//       });
//     } else {
//       const success = await FavAdd(id);
//       if (success) {
//         setBookmarked((prev) => ({ ...prev, [id]: true }));
//         Swal.fire({
//           icon: "success",
//           title: "বুকমার্ক করা হয়েছে!",
//           text: "এই ফ্ল্যাটটি আপনার প্রিয় তালিকায় যোগ করা হয়েছে।",
//           confirmButtonText: "ঠিক আছে",
//           confirmButtonColor: "#38b2ac",
//           timer: 3000,
//         });
//       }
//     }
//   } catch (error) {
//     Swal.fire({
//       title: "অনুগ্রহ করে লগইন করুন",
//       text: "আপনার প্রিয় তালিকা দেখার জন্য আপনাকে লগইন করতে হবে।",
//       icon: "warning",
//       confirmButtonColor: "#38b2ac",
//       confirmButtonText: "লগ ইন",
//       timer: 3000,
// html: '<button id="laterButton" class="swal2-confirm swal2-styled" style="margin-left: 10px;">পরে করবও</button>',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         window.location.href = window.location.origin + "/login";
//       }
//     });
//     console.error("Failed to toggle bookmark:", error);
//   }
// };

//   const propertyDetails = [
//     {
//       icon: <BedDouble size={20} />,
//       label: "বেডরুম সংখ্যা:",
//       value: "no_of_beds",
//     },
//     { icon: <Bath size={20} />, label: "বাথরুম সংখ্যা:", value: "no_of_baths" },
//     {
//       icon: <Home size={20} />,
//       label: "বারান্দা সংখ্যা:",
//       value: "no_of_balcony",
//     },
//     {
//       icon: <CornerDownRight size={20} />,
//       label: "প্লট ফেস:",
//       value: "plot_face",
//     },
//     {
//       icon: <SquareStack size={20} />,
//       label: "কোনায় অবস্থিত:",
//       value: "is_corner",
//       isBoolean: true,
//     },
//     {
//       icon: <Home size={20} />,
//       label: "মোট ইউনিট সংখ্যা:",
//       value: "no_of_units",
//     },
//     {
//       icon: <Car size={20} />,
//       label: "পার্কিং আছে কিনা:",
//       value: "parking_available",
//       isBoolean: true,
//     },
//     {
//       icon: <Building2 size={20} />,
//       label: "ফ্লাটে যে তলায় অবস্থিত:",
//       value: "storied",
//     },
//     {
//       icon: <DollarSign size={20} />,
//       label: "প্রতি স্কয়ার ফিটের মূল্য:",
//       value: "rate_per_sqft",
//     },
//     {
//       icon: <Ruler size={20} />,
//       label: "ফ্লোর আয়তনঃ",
//       value: "floor_area",
//       suffix: " বর্গফুট (sqft)",
//     },
//   ];

//   return (
//     <>
//       <div className="pb-4 mb-7">
//         <section className="p-2 grid grid-cols-1 lg:grid-cols-3 gap-6 border-none lg:p-6 lg:bg-gray-50  rounded-xl lg:shadow-md">
//           <div className="lg:col-span-2 space-y-6  rounded-xl lg:p-6 ">
//             <div className="flex justify-start md:justify-between lg:items-center">
//               <div className="w-auto mr-5 md:w-full lg:flex-1">
//                 <h1 className="text-2xl font-bold text-gray-900 md:text-3xl 2xl:text-4xl text-left">
//                   {property.title}
//                 </h1>
//               </div>
{
  /* <div className="relative group">
  <button
    className={`px-2 py-0 md:px-3 md:py-2 mt-1 rounded-sm shadow-sm md:rounded-md md:shadow-lg transition-all duration-300 ${
      bookmarked[property.id]
        ? "bg-white border border-teal-500"
        : "bg-teal-500 hover:bg-teal-600"
    }`}
    onClick={() => handleBookmarkClick(property.id)}
  >
    <FontAwesomeIcon
      icon={faBookmark}
      className={`text-sm md:text-lg 2xl:text-xl transition-all duration-300 ${
        bookmarked[property.id] ? "text-teal-500" : "text-white"
      }`}
    />
    <span className="absolute bottom-full mb-5 md:mb-8 left-1/2 transform md:-translate-x-1/2 text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p
        className={`${
          bookmarked[property.id]
            ? "text-orange-500"
            : "text-teal-500"
        } transition-colors duration-300`}
      >
        {bookmarked[property.id] ? "সরান" : "সংরক্ষণ"}
      </p>
    </span>
  </button>
</div> */
}
// </div>

// <h4 className="text-xl text-teal-600 flex flex-col mb-4">
//   <span className="flex lg:items-center">
//     <FontAwesomeIcon
//       icon={faMapMarkerAlt}
//       className="mt-2 lg:mt-0 mr-2"
//     />
//     {property.district}, {property.upazila}, {property.housing}
//   </span>
// </h4>

//             <div className="flex lg:justify-start items-center">
// <h3 className="text-lg md:text-xl 2xl:text-3xl font-semibold text-gray-900 mt-4 mb-4 mr-3 lg:mr-16">
//   মূল্য: ৳{" "}
//   {property.total_price
//     ? property.total_price.toLocaleString()
//     : "মূল্য শীঘ্রই প্রকাশিত হবে!"}
// </h3>
// <div className="space-x-2 flex">
//   {/* Call Button */}
//   <button
//     onClick={() =>
//       window.open(
//         `tel:${property.phone || "+880 1521-498303"}`,
//         "_self"
//       )
//     }
//     className="flex items-center justify-center text-sm 2xl:text-lg px-3 py-1 2xl:px-4 2xl:py-2  rounded-sm 2xl:rounded-md bg-teal-500 text-white hover:bg-teal-700 transition duration-300"
//   >
//     <FontAwesomeIcon icon={faPhone} />
//   </button>

//   {/* Email Button */}
//   <button
//     onClick={() =>
//       window.open(
//         `mailto:${property.email || "Shohag.cse3@gmail.com"}`,
//         "_self"
//       )
//     }
//     className="flex items-center justify-center text-sm 2xl:text-lg px-3 py-1 2xl:px-4 2xl:py-2  rounded-sm 2xl:rounded-md bg-red-500 text-white  hover:bg-red-700 transition duration-300"
//   >
//     <FontAwesomeIcon icon={faEnvelope} />
//   </button>
// </div>
//             </div>

//             <div className="flex flex-wrap gap-4 my-6 text-gray-600 text-sm 2xl:text-lg">
//               <div className="flex items-center gap-3">
//                 <FontAwesomeIcon
//                   icon={faBed}
//                   className="w-5 h-5 2xl:w-6 2xl:h-6"
//                 />
//                 <span>{property.no_of_beds} বেড</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <FontAwesomeIcon
//                   icon={faBath}
//                   className="w-5 h-5 2xl:w-6 2xl:h-6"
//                 />
//                 <span>{property.no_of_baths} বাথরুম</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <FontAwesomeIcon
//                   icon={faCity}
//                   className="w-5 h-5 2xl:w-6 2xl:h-6"
//                 />
//                 <span>{property.no_of_balcony} ব্যালকনি</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <FontAwesomeIcon
//                   icon={faHome}
//                   className="w-5 h-5 2xl:w-6 2xl:h-6"
//                 />
//                 <span>{property.floor_area} বর্গফুট</span>
//                 {/* <span>{property.rate_per_sqft} বর্গফুট</span> */}
//               </div>
//             </div>

//             <div className="my-6">
//               <h4 className="text-lg 2xl:text-xl mb-2 font-semibold text-gray-900">
//                 সামগ্রিক ধারণা
//               </h4>
//               <p className="text-gray-600 text-sm 2xl:text-lg">
//                 {property.description}
//               </p>
//             </div>
//             <div>
//               <h4 className="text-xl font-bold text-teal-600 mb-4 border-b pb-2">
//                 বিস্তারিত তথ্য
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-base">
//                 <ul className="space-y-3">
//                   {propertyDetails
//                     .slice(0, Math.ceil(propertyDetails.length / 2))
//                     .map((item, index) => (
//                       <li key={index} className="flex items-center gap-3">
//                         {item.icon}
//                         <span className="font-semibold">{item.label}</span>{" "}
//                         {item.isBoolean
//                           ? formatBoolean(property[item.value])
//                           : property[item.value] + (item.suffix || "")}
//                       </li>
//                     ))}
//                 </ul>

//                 <ul className="space-y-3">
//                   {propertyDetails
//                     .slice(Math.ceil(propertyDetails.length / 2))
//                     .map((item, index) => (
//                       <li key={index} className="flex items-center gap-3">
//                         {item.icon}
//                         <span className="font-semibold">{item.label}</span>{" "}
//                         {item.isBoolean
//                           ? formatBoolean(property[item.value])
//                           : property[item.value] + (item.suffix || "")}
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="relative  h-64 sm:h-96 md:h-[400px] lg:h-[500px]">
//             <GoogleMap property={property} />
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default DetailsPropMainCard;

import QuickStats from "./QuickStats";
import PropertyDescription from "./PropertyDescription";
import PropertyDetails from "./PropertyDetails";
import PropertyHighlights from "./PropertyHighlights";
import GoogleMap from "../../../Components/GoogleMap/GoogleMap";
import FavAdd from "../../../Models/FavModel/FavAdd.js";
import FavRemove from "../../../Models/FavModel/FavRemove.js";
import FavModel from "../../../Models/FavModel/FavModel.js";
import { faBookmark, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PriceAndContact from "./PriceAndContact.jsx";

const DetailsPropMainCard = ({ property }) => {
  const [bookmarked, setBookmarked] = useState({});
  const token = localStorage.getItem("user_token");
  console.log(token);

  if (token) {
    useEffect(() => {
      const loadData = async () => {
        try {
          const FavItem = await FavModel();
          setBookmarked({
            [property.id]: FavItem.some((fav) => fav.id === property.id),
          });
        } catch (error) {
          console.error("Failed to fetch bookmark data:", error);
        }
      };

      loadData();
    }, []);
  }
  const handleBookmarkClick = async (id) => {
    try {
      if (bookmarked[id]) {
        await FavRemove(id);
        setBookmarked((prev) => ({ ...prev, [id]: false }));
        Swal.fire({
          icon: "success",
          title: "বুকমার্ক মুছে ফেলা হয়েছে",
          text: "এই সম্পত্তিটি আপনার প্রিয় তালিকা থেকে মুছে ফেলা হয়েছে।",
          confirmButtonText: "ঠিক আছে",
          confirmButtonColor: "#e53e3e",
          timer: 3000,
        });
      } else {
        const success = await FavAdd(id);
        if (success) {
          setBookmarked((prev) => ({ ...prev, [id]: true }));
          Swal.fire({
            icon: "success",
            title: "বুকমার্ক করা হয়েছে!",
            text: "এই ফ্ল্যাটটি আপনার প্রিয় তালিকায় যোগ করা হয়েছে।",
            confirmButtonText: "ঠিক আছে",
            confirmButtonColor: "#38b2ac",
            timer: 3000,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "অনুগ্রহ করে লগইন করুন",
        text: "আপনার প্রিয় তালিকা দেখার জন্য আপনাকে লগইন করতে হবে।",
        icon: "warning",
        confirmButtonColor: "#38b2ac",
        confirmButtonText: "লগ ইন",
        timer: 3000,
        html: '<button id="laterButton" class="swal2-confirm swal2-styled" style="margin-left: 10px;">পরে করবও</button>',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = window.location.origin + "/login";
        }
      });
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <div className="py-10 md:px-4 sm:px-6 lg:px-0 mx-auto ">
      <div className="bg-white rounded-xl overflow-hidden">
        <section className="grid grid-cols-1 lg:grid-cols-3  p-0">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6 py-6">
            {/* Title and Bookmark positioned properly */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mb-5">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
                {property.title}
              </h1>

              <button
                className={`flex items-center justify-center w-14 h-14 rounded-full border transition-all duration-300 shadow-sm ${
                  bookmarked[property.id]
                    ? "bg-white border-teal-500 hover:shadow-md"
                    : "bg-teal-500 border-transparent hover:bg-teal-600"
                }`}
                onClick={() => handleBookmarkClick(property.id)}
                aria-label="Bookmark"
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  className={`text-xl transition-all duration-300 ${
                    bookmarked[property.id] ? "text-teal-500" : "text-white"
                  }`}
                />
              </button>
            </div>
            <div className="mb-4 p-4rounded-lg">
              <div className="flex items-start">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-teal-500 mt-1 mr-3 text-lg"
                />
                <div>
                  <p className="text-teal-600 font-medium">
                    {property.housing}, {property.district}, {property.upazila}
                  </p>

                  {property.address && (
                    <p className="text-gray-600 mt-1 text-sm">
                      {property.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <PriceAndContact
              total_price={property.total_price}
              rate_per_sqft={property.rate_per_sqft}
              phone={property.phone}
              email={property.email}
            />

            <QuickStats
              no_of_beds={property.no_of_beds}
              no_of_baths={property.no_of_baths}
              no_of_balcony={property.no_of_balcony}
              floor_area={property.floor_area}
            />

            <PropertyDescription
              description={property.description}
              property={property}
            />

            <PropertyDetails property={property} />
          </div>

          {/* Right Column - Map and Highlights */}
          <div className="md:p-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg transition-all hover:shadow-xl h-[400px] lg:h-[500px]">
              {/* Header with improved styling */}
              <div className="px-6 pt-5 pb-3 border-b border-gray-100">
                <h4 className="text-xl font-semibold text-teal-700 flex items-center">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-3 text-teal-500"
                  />
                  <span className="leading-tight">
                    {property.housing}
                    <span className="block text-md text-teal-600 font-medium mt-1 text-sm">
                      {property.upazila}, {property.district}
                    </span>
                  </span>
                </h4>
              </div>

              {/* Map container */}
              <div className="relative h-[calc(100%-85px)] w-full">
                <GoogleMap property={property} />
              </div>
            </div>

            {/* Highlights section */}
            <div className="mt-6">
              <PropertyHighlights highlights={property.highlights} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailsPropMainCard;
