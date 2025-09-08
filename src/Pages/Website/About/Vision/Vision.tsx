import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface VisionProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
  buttonText?: string;
  link?: string;
  buttonTrue?: boolean;
}

const Vision: React.FC<VisionProps> = ({
  title,
  description,
  imageUrl,
  reverse,
  buttonText,
  link,
  buttonTrue,
}) => {
  return (
    <div
      className={`flex ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col md:justify-between md:items-center p-6 my-7 md:my-44 gap-5 md:gap-20 relative`}
    >
      {/* Decorative background elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 to-primary/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Left side content */}
      <motion.div
        className="md:w-1/2 relative"
        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          <h1 className="mb-7 text-3xl md:text-5xl font-extrabold leading-tight">
            {title}
          </h1>
        </div>
        <p className="mt-2 md:whitespace-pre-line text-lg md:text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>
        {buttonTrue && link && (
          <Link to={link}>
            <Button className="glowing-button mt-8 px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 relative overflow-hidden group">
              {buttonText}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Button>
          </Link>
        )}

        {/* Decorative accent */}
        <div className="absolute -left-10 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/80 rounded-full"></div>
      </motion.div>

      {/* Right side image */}
      <motion.div
        className="md:w-[60%] image-container relative group"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Card className="relative w-full aspect-video rounded-xl overflow-hidden group border-0">
          <CardContent className="p-0">
            <span aria-hidden="true" />
            <img
              src={imageUrl}
              alt="photo"
              className="absolute top-0 left-0 w-full h-full object-fill rounded-xl transition-all duration-500 ease-out group-hover:scale-95 shadow-glow"
            />
            {/* Image overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </CardContent>
        </Card>

        {/* Floating decorative elements */}
        <div className="absolute -right-5 -top-5 w-20 h-20 rounded-full bg-primary/20 filter blur-xl z-0"></div>
        <div className="absolute -left-5 -bottom-5 w-16 h-16 rounded-full bg-primary/20 filter blur-xl z-0"></div>
      </motion.div>
    </div>
  );
};

export default Vision;