import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useLocation } from "react-router-dom";

const ContactInfo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contactType, setContactType] = useState("");
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Check for homepage
  useEffect(() => {
    const appElement =
      document.getElementById("__next") || document.getElementById("root");
    Modal.setAppElement(appElement || document.body);
  }, []);

  const phoneNumber = "+880 1521-498303";
  const email = "info@shopnoneer.com";

  const openModal = (type) => {
    setContactType(type);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {/* Contact icons */}
      <div className="flex flex-row md:flex md:flex-col 2xl:flex-row 2xl:items-end md:items-start md:space-y-2 2xl:space-x-2 mr-2">
        <div
          className="flex items-center text-white cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => openModal("phone")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {isHomePage && (
            <span className="hidden md:inline md:text-xs 2xl:text-xs">{phoneNumber}</span>
          )}
        </div>
        <div
          className="flex items-center text-white cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => openModal("email")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {isHomePage && (
            <span className="hidden md:block md:text-xs 2xl:text-sm">
              {email}
            </span>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="যোগাযোগ তথ্য"
        className="bg-white  rounded-2xl p-8 max-w-lg w-[90%] mx-auto shadow-2xl outline-none relative z-[1001]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-[1000]"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold mb-6 text-[#53D2A6] ">
            {contactType === "phone" ? "আমাদের কল করুন" : "ইমেইল করুন"}
          </h2>

          <div className="mb-8">
            <div className="text-2xl font-bold text-red-500 ">
              {contactType === "phone" ? phoneNumber : email}
            </div>
            <p className="text-gray-600 mt-2 ">
              {contactType === "phone"
                ? "আমরা ২৪/৭ সময়ের জন্য উপলব্ধ আছি"
                : "আমরা ২৪ ঘণ্টার মধ্যে উত্তর দেব"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {contactType === "phone" && (
              <button
                onClick={() => window.open(`tel:${phoneNumber}`, "_self")}
                className="bg-[#53D2A6] hover:bg-teal-600 text-white px-6 py-3 rounded-full flex items-center shadow-md transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                এখনই কল করুন
              </button>
            )}

            {contactType === "email" && (
              <button
                onClick={() => window.open(`mailto:${email}`, "_self")}
                className="bg-[#53D2A6] hover:bg-teal-600 text-white px-6 py-3 rounded-full flex items-center shadow-md transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                ইমেইল পাঠান
              </button>
            )}

            <button
              onClick={closeModal}
              className="border border-gray-300  hover:bg-gray-100  text-gray-700  px-6 py-3 rounded-full transition"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContactInfo;
