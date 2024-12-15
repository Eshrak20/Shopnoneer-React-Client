import React, { useEffect } from "react";
import Navbar from "../Shared/Navbar/Navbar";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <div className="lg:mx-20">
          <Navbar visible={true} />
          <div className="container px-8 py-12 bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">
                ফ্ল্যাট সম্পর্কে জানুন
              </h2>
              <p className="text-lg text-gray-600">
                ম্যানেজড বাই{" "}
                <span className="font-semibold text-teal-600">স্বপ্ননীড় </span>
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 shadow-lg rounded-lg max-w-2xl mx-auto">
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="প্রথম নাম "
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="শেষ নাম"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="mb-4 relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    +880
                  </span>
                  <input
                    type="tel"
                    placeholder="ফোন নাম্বার "
                    className="w-full pl-16 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="ইমেইল"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    placeholder="মেসেজ"
                    rows="8"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300"
                >
                  আমাদের সাথে যোগাযোগ করুন
                </button>
              </form>

              {/* Terms and Conditions */}
              <p className="text-gray-600 text-sm mt-4 text-center">
                Contact Seller ক্লিক করে, আপনি স্বপ্ননীড় এর{" "}
                <a href="#" className="text-teal-500 hover:underline">
                  শর্তাবলী
                </a>{" "}
                এবং{" "}
                <a href="#" className="text-teal-500 hover:underline">
                  গোপনীয়তা নীতিমালা গ্রহণ করছেন।
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
