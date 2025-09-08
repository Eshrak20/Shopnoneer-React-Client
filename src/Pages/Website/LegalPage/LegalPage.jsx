import React from "react";
import Navbar from "../Shared/Navbar/Navbar";

const LegalPage = () => {
  const isNavbarVisible = true;
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <div className="md:mx-32 2xl:mx-20">
          <Navbar visible={isNavbarVisible} />

          <div className="mx-auto px-6 py-12 text-gray-800 ">
            <h1 className="text-4xl font-bold text-teal-600 mb-10 text-center">
              আইনগত তথ্য
            </h1>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-teal-500 mb-4">
                ব্যবহারের শর্ত
              </h2>
              <p className="text-lg leading-8">
                আমাদের ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি আমাদের শর্তাবলী মেনে
                নিচ্ছেন। আপনি আইনগতভাবে বৈধভাবে ওয়েবসাইট ব্যবহার করতে বাধ্য
                থাকবেন। যেকোনো ধরনের অপব্যবহার, ভুয়া তথ্য বা ক্ষতিকর
                কার্যকলাপের বিরুদ্ধে আমরা প্রয়োজনীয় পদক্ষেপ নিতে পারি।
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-teal-500 mb-4">
                গোপনীয়তা নীতি
              </h2>
              <p className="text-lg leading-8">
                আপনার ব্যক্তিগত তথ্য আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা
                আপনার তথ্য নিরাপদ রাখতে অঙ্গীকারবদ্ধ। কোনোরকম তৃতীয় পক্ষের
                সঙ্গে আপনার তথ্য ভাগ করা হবে না, শুধুমাত্র সেবা প্রদান ও
                নিরাপত্তা নিশ্চিত করার জন্য ব্যবহার করা হবে।
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-teal-500 mb-4">
                কুকি নীতি
              </h2>
              <p className="text-lg leading-8">
                আপনার অভিজ্ঞতা উন্নত করার জন্য আমরা কুকি ব্যবহার করি। কুকি
                আমাদের সাহায্য করে আপনার পছন্দ, লগইন তথ্য ও সাইট ব্যবহার বুঝতে।
                আপনি চাইলে আপনার ব্রাউজারের সেটিংস থেকে কুকি নিয়ন্ত্রণ বা
                নিষ্ক্রিয় করতে পারেন।
              </p>
            </section>

            <footer className="text-center text-base text-gray-500 mt-16">
              &copy; {new Date().getFullYear()} Shopnoneer. সর্বস্বত্ব সংরক্ষিত।
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalPage;
