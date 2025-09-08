import { motion } from "framer-motion";

interface BigTextProps {
  title: string;
  subtitle: string;
}

const BigText = ({ title, subtitle }: BigTextProps) => {
  return (
    <div className="md:pt-10 pb-10 md:pb-20 md:mx-5">
      <div className="flex flex-col items-center md:p-8">
        {/* Title Animation */}
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-center text-foreground md:mb-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }} // Ensures animation triggers only once when in view
        >
          {title} <span className="text-primary">{subtitle}?</span>
        </motion.h1>

        {/* Subtitle Animation */}
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-center text-foreground"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          চলেন কথা বলি!
        </motion.h1>
      </div>
      <div className="flex flex-col items-center mt-5">
        {/* Buttons Animation */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => (window.location.href = "tel:+880 1571119993")}
            className="px-3 py-1 md:px-8 md:py-3 border-2 border-primary text-primary font-bold rounded-md md:rounded-lg hover:bg-primary hover:text-primary-foreground transition text-base md:text-lg"
          >
            যোগাযোগ করুন
          </button>
          
         
        </motion.div>
      </div>
    </div>
  );
};

export default BigText;