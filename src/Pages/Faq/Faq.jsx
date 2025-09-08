import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar/Navbar";
import { Helmet } from "react-helmet";
import FaqModel from "../../Models/FaqModel/FaqModel";
import Spinner from "../../../public/assets/loadingSpinner/Spinner";
import LoadingLottie from "../../../public/assets/loadingLottie/loadingLottie";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getFaqData = await FaqModel();
        setFaqData(getFaqData);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>স্বপ্ননীড় | সচরাচর প্রশ্ন</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto">
        <div className="lg:mx-20">
          <Navbar visible={true} />
          <div className="p-6 bg-white shadow-lg">
            <h1 className="text-xl lg:text-3xl font-bold text-teal-600 text-center mb-8">
              প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
            </h1>

            <div className="space-y-6">
              {loading ? (
                <>
                  <LoadingLottie />
                </>
              ) : faqData.length > 0 ? (
                faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-plus bg-base-200"
                  >
                    <input
                      type="radio"
                      name="my-accordion-3"
                      defaultChecked={index === 0}
                    />
                    <div className="collapse-title text-xl font-medium text-teal-700">
                      {index + 1}. {faq.question}{" "}
                      {/* Assuming 'question' contains the question */}
                    </div>
                    <div className="collapse-content">
                      <p className="text-gray-600 p-4">{faq.answer}</p>{" "}
                      {/* Assuming 'answer' contains the answer */}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  কোনো সচরাচর প্রশ্ন নাই.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
