import DynamicBanner from "@/Pages/MYComponent/DynamicBanner";
import Vision from "./Vision/Vision";
import missionData from "../../Json/missionData.json"
import profileData from "../../Json/profileData.json"
import managementData from "../../Json/managementData.json"
import Mission from "./Mission/Mission";
import Leader from "./Leader/Leader";
import Management from "./Management/Management";
const About = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <>
      <DynamicBanner title="আমাদের সম্পর্কে" breadcrumb="হোম / আমাদের সম্পর্কে" />
      <div className="max-w-full mt-20 lg:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto md:px-8 lg:px-12">
        <Mission missionData={missionData} />
        <Vision
          title="সবার জন্য স্বপ্নের ঠিকানা"
          description={`আমাদের ভিশন হলো এমন একটি ডিজিটাল প্ল্যাটফর্ম তৈরি করা যেখানে যে কেউ সহজে, দ্রুত এবং স্বচ্ছ প্রক্রিয়ায় তার স্বপ্নের ফ্ল্যাট বা প্রপার্টি খুঁজে পাবে।`}
          imageUrl={`/assets/Vision/vision.webp`}
        />
        <Vision
          title="প্রযুক্তি নির্ভর প্রপার্টি মার্কেট"
          description={`প্রপার্টি কেনা-বেচা ও ভাড়া দেওয়ার অভিজ্ঞতাকে আধুনিক প্রযুক্তির মাধ্যমে সহজ এবং বিশ্বাসযোগ্য করে তোলা।`}
          imageUrl={`/assets/Vision/vision2.jpg`}
          reverse={true}
          buttonTrue={false}
        />

        <Leader profiles={profileData} />
        <Management managementData={managementData} />
      </div>
    </>
  );
};

export default About;
