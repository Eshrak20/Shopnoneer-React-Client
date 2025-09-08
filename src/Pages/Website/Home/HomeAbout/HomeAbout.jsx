import HomeAboutStatus from "./HomeAboutStatus";
import HomeAboutImage from "./HomeAboutImage";

const HomeAbout = ({ stats }) => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-10 md:gap-44 mt-10 mb-5 md:mb-20 lg:p-20 p-2 items-center">
                {/* Text Section */}
                <div className="w-full px-4 md:px-0">
                    <h1 className="text-xl 2xl:text-4xl font-medium leading-tight mb-6 md:mb-10">
                        <span className="text-success">Insights</span> About{" "}
                        <br /> Our Company
                    </h1>
                    {/* Full detailed paragraph for tablet and larger screens */}
                    <p className="hidden sm:block text-sm 2xl:text-lg font-medium leading-relaxed">
                        InnovationLabs360 is now exporting software to 3+
                        countries including Bangladesh. In Bangladesh, it is
                        working with Bangladeshi Govt organizations,
                        Multinational Companies, Group of Companies, Private
                        Companies, and other organizations.
                        <br />
                        InnovationLabs360 is committed to providing its clients
                        with the highest level of service. The company offers a
                        100% satisfaction guarantee on all services, and its
                        team is always available to answer questions and provide
                        support. However, InnovationLabs360 serves clients all
                        over the world. InnovationLabs360 is the perfect choice
                        if you are looking for a reliable and experienced IT
                        partner.
                    </p>

                    {/* Short summary for mobile only */}
                    <p className="block sm:hidden text-sm font-medium leading-relaxed">
                        InnovationLabs360 exports software globally and works
                        with top organizations in Bangladesh.
                    </p>

                    <HomeAboutStatus stats={stats} />
                </div>
                <div>
                    <HomeAboutImage />
                </div>
            </div>
        </>
    );
};

export default HomeAbout;
