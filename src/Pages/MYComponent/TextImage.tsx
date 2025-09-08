import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "./TextImage.css";
import { Link } from "react-router-dom";

interface TextImageProps {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  reverse?: boolean;
  link: string;
  border?: string; // optional with default value
}

const TextImage: React.FC<TextImageProps> = ({
  title,
  description,
  buttonText,
  imageUrl,
  reverse,
  link,
  border = "teal-500", // Default border color using primary
}) => {
  return (
    <Card className="relative overflow-hidden border-0 bg-background">
      <CardContent className="p-0">
        <div
          className={`flex ${
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          } flex-col 
            md:justify-between md:items-center 
            py-8 px-6
            md:py-10 2xl:py-20
            lg:px-24 xl:px-28 2xl:px-20
             gap-10 lg:gap-16 xl:gap-20 2xl:gap-32
            relative overflow-hidden`}
        >
          {/* Background decorative elements */}
          <div className="absolute -z-10 inset-0 overflow-hidden opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-primary/80 rounded-full filter blur-3xl"></div>
          </div>

          {/* Left side content */}
          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="text-gradient bg-clip-text text-transparent">
              <h1 className="md:mb-7 mb-3 text-3xl 2xl:text-5xl font-extrabold leading-tight text-foreground">
                {title}
              </h1>
            </div>
            <p className="md:mt-2 md:whitespace-pre-line text-base md:text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
            <Link to={link}>
              <Button className="glowing-button mt-8 px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90">
                {buttonText}
              </Button>
            </Link>

            {/* Decorative accent */}
            <div className="absolute -left-10 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/80 rounded-full"></div>
          </motion.div>

          {/* Right side image */}
          <motion.div
            className="md:w-1/2 mt-5 md:mt-0 relative group"
            initial={{ opacity: 0, x: reverse ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div
              className={`ml-2 aspect-[1555/1199] w-full border-4 ${border} rounded-br-[35%] rounded-tl-[40%] pb-1 pr-1 relative image-container`}
            >
              <div className="absolute inset-0 rounded-br-[35%] rounded-tl-[35%] border-4 border-transparent group-hover:border-primary/30 transition-all duration-500"></div>
              <img
                src={imageUrl}
                alt="photo"
                className="w-full h-full object-fill rounded-br-[35%] rounded-tl-[35%] -mt-4 -ml-4 transform transition-transform duration-500 group-hover:scale-105"
              />
              {/* Image overlay effect */}
              <div className="absolute inset-0 rounded-br-[35%] rounded-tl-[35%] bg-gradient-to-t from-primary/30 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -right-5 -top-5 w-20 h-20 rounded-full bg-primary/20 filter blur-xl z-0"></div>
            <div className="absolute -left-5 -bottom-5 w-16 h-16 rounded-full bg-primary/20 filter blur-xl z-0"></div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextImage;