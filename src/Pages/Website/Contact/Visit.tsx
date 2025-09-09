import { useEffect, useState } from "react";

const Visit = () => {
  const [, setCurrentDate] = useState("");
  const [showStreetView, setShowStreetView] = useState(false);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-5 gap-8 mb-20 md:mb-44">
      {/* Left side: Information */}
      <div className="md:w-1/2 w-full py-3 md:p-8 rounded-lg space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">ঠিকানা</h2>
          <p className="text-lg text-muted-foreground">
            বাড়ি: ৫/১, চাঁদ উদ্যান , মোহাম্মদপুর , ঢাকা-১২০৭
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-foreground">খোলার সময়</h2>
          <p className="text-lg text-muted-foreground">
            শনি - বৃহস্পতি: সকাল ৯টা থেকে রাত ১১টা পর্যন্ত
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-foreground">যোগাযোগ</h2>
          <p className="text-lg text-muted-foreground">
            ইমেইল:
            <a
              href="mailto:info@shopnoneer.com"
              className="text-primary hover:text-primary/80 hover:underline ml-1"
            >
              info@shopnoneer.com
            </a>
          </p>
          <p className="text-lg text-muted-foreground">
            ফোন:
            <a
              href="tel:+8801571119993"
              className="text-primary hover:text-primary/80 hover:underline ml-1"
            >
              📞 +৮৮০ ১৫২১-৪৯৮৩০৩
            </a>
          </p>
        </div>

        {/* Optional: Current date and time */}
        {/* <div>
          <h2 className="text-2xl font-bold text-foreground">
            বর্তমান তারিখ ও সময়
          </h2>
          <p className="text-lg text-muted-foreground">{currentDate}</p>
        </div> */}
      </div>

      {/* Right side: Google Map */}
      <div className="md:w-1/2 w-full md:p-4 space-y-4">
        <iframe
          src={
            showStreetView
              ? "https://www.google.com/maps/embed?pb=!4v1746626775144!6m8!1m7!1s6W7BqznYrnXkhpQCTiqXDQ!2m2!1d23.75607256148205!2d90.35256262395859!3f168.8878233473955!4f27.950931428239926!5f0.4000000000000002"
              : "https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d1103.3632018154497!2d90.35134892888405!3d23.75603838839133!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3755bf66b3c0a14f%3A0x777f459aa721862f!2sChadd%20Uddan%20Dhaka!3m2!1d23.7561906!2d90.3518903!5e0!3m2!1sen!2sbd!4v1746626675376!5m2!1sen!2sbd"
          }
          width="100%"
          height="450"
          className="rounded-lg border border-border"
          // allowFullScreen=""
          loading="lazy"
          title={
            showStreetView ? "Shopnoneer Street View" : "Shopnoneer Map View"
          }
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <button
          onClick={() => setShowStreetView(!showStreetView)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
        >
          {showStreetView ? "🌍 Show Map View" : "🚶 Show Street View"}
        </button>
      </div>
    </div>
  );
};

export default Visit;