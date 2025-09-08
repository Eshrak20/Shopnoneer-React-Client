import { motion } from 'framer-motion';

interface MidTextProps {
  title: string;
  subtitle: string;
  description: string;
}

const MidText = ({ title, subtitle, description }: MidTextProps) => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-16 p-3 md:p-8">
        {/* Title Animation */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-center text-foreground"
          initial={{ opacity: 0, y: -20 }} // Start slightly above
          whileInView={{ opacity: 1, y: 0 }} // Fade in and move to original position
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }} // Trigger animation only once when in view
        >
          {title} <span className="text-primary">{subtitle}?</span>
        </motion.h1>

        {/* Description Animation */}
        <motion.p
          className="p-3 md:px-20 2xl:px-44 -mt-14 text-lg text-muted-foreground text-center md:whitespace-pre-line"
          initial={{ opacity: 0, y: 20 }} // Start slightly below
          whileInView={{ opacity: 1, y: 0 }} // Fade in and move to original position
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} // Delay for staggered effect
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
};

export default MidText;