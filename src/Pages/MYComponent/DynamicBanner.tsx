interface DynamicBannerProps {
  title: string;
  breadcrumb?: string;
  description?: string;
  imageUrl?: string;
}
const DynamicBanner: React.FC<DynamicBannerProps> = ({ title }) => {
  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // 👈 this disables repeat
        width: "100%",
        height: "50vh",
        backgroundImage: "url('reactAssets/images/ilabsimages/image3.avif')",
      }}
      className="relative w-full h-64 md:h-[500px] 2xl:h-[700px] flex items-center justify-center"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered Text Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl md:text-7xl underline font-bold text-white text-center">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default DynamicBanner;
