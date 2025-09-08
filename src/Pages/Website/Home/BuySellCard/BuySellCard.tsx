import { Parallax } from "react-parallax";
import adviserImage from "../../../../../public/assets/Banner Images/banner-1.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const BuySellCard = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="hidden lg:block pb-20" ref={ref}>
      <Parallax
        className="h-[60vh] my-10"
        blur={{ min: -15, max: 15 }}
        bgImage={adviserImage}
        bgImageAlt="the banner"
        strength={-200}
      >
        <div className="flex items-center justify-center min-h-[60vh] bg-black/60">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
            className="text-center text-white p-4"
          >
            <h1 className="mb-5 text-4xl md:text-5xl font-extrabold drop-shadow-lg">
              কেনা বা বিক্রি
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-8 text-lg md:text-xl font-medium drop-shadow-md"
            >
              নতুন সম্পত্তি কিনতে বা পুরোনো বিক্রি করতে চান? আমরা দিচ্ছি দুর্দান্ত সমাধান!
            </motion.p>
            <div className="flex justify-center space-x-6">
              <Link to="/detail">
                <button className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition duration-300 shadow-lg flex items-center">
                  <FontAwesomeIcon icon={faUpload} className="mr-3" />
                  কিনুন
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 transition duration-300 shadow-lg flex items-center">
                  <FontAwesomeIcon icon={faFolderOpen} className="mr-3" />
                  বিক্রি করুন
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Parallax>
    </div>
  );
};

export default BuySellCard;