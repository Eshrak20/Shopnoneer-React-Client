import { Helmet } from "react-helmet";
import BigText from "../../Components/Bigtext/BigText";
import DynamicBanner from "../../Components/DynamicBanner/DynamicBanner";

import MidText from "../../Components/Midtext/MidText";
import Form from "./Form";
import Visit from "./Visit";
import Navbar from "../Shared/Navbar/Navbar";

const Contact = () => {
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  return (
    <>
      <Helmet>
        <title>স্বপ্ননীড় | যোগাযোগ</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto">
        <div className="lg:mx-20">
          <Navbar visible={true} />
          <DynamicBanner
            title={`ফ্ল্যাট দরকার আমাদের সাথে যোগাযোগ করুন`}
            description={`ফ্ল্যাট দরকার? আমাদের জানান অথবা অফিসে এসে ঘুরে যান।`}
            imageUrl={`${baseUrl}/assets/Banner Images/img3.png`}
          />

          <div className="-my-16">
            <MidText
              title="ঘুরে যান"
              subtitle="আমাদের"
              description="আপনি আমাদের সাথে দেখা করে আপনার প্রজেক্ট আইডিয়া শেয়ার করতে পারেন!"
            />
          </div>

          <Visit />
          <Form />

          <BigText title="কিছু জানতে চান ?" subtitle="কল দিন" />
        </div>
      </div>
    </>
  );
};

export default Contact;
