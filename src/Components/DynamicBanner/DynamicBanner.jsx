import { motion } from "framer-motion";

const DynamicBanner = ({ title, description, imageUrl, reverse }) => {
  return (
    <div
      className={`flex ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col  md:justify-between md:items-center p-5 md:px-20 md:py-16 2xl:p-10  my-5 2xl:gap-20`}
    >
      {/* Left side content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:w-2/3 2xl:w-3/4">
          <h1 className="2xl:mb-7 text-4xl md:text-3xl 2xl:text-5xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="mt-2 md:xl 2xl:text-2xl 2xl:whitespace-pre-line mb-10">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Right side image */}
      <div className="md:w-1/3">
        <motion.img
          src={imageUrl}
          alt="photo"
          className="rounded-lg w-auto h-auto md:w-full md:h-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default DynamicBanner;
