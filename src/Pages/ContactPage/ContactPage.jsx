import React from "react";
import Navbar from "../Shared/Navbar/Navbar";

const ContactPage = () => {
  return (
    <>
      <div className=" mx-auto">
        <Navbar visible={true} />
      </div>
      <div className="container   mx-auto px-8 py-12 bg-gray-100 min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Ask about the property
          </h2>
          <p className="text-lg text-gray-600">
            Managed by{" "}
            <span className="font-semibold text-teal-600">Shopnoneer</span>
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 shadow-lg rounded-lg max-w-2xl mx-auto">
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="mb-4 relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                +880
              </span>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-16 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Message"
                rows="8"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300"
            >
              Contact Us
            </button>
          </form>

          {/* Terms and Conditions */}
          <p className="text-gray-600 text-sm mt-4 text-center">
            By clicking Contact Seller, you are accepting Shopnoneer's{" "}
            <a href="#" className="text-teal-500 hover:underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-teal-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          {/* Share and Report Buttons */}
          {/* <div className="flex justify-center mt-8 space-x-4">
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-teal-500 transition duration-300">
              Share
            </button>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300">
              Report
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ContactPage;
