import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeAboutImage = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const images = [
        {
            main: "reactAssets/images/HomeAboutImages/fardinPc1.jpeg",
            left1: "reactAssets/images/HomeAboutImages/g1.jpeg",
            left2: "reactAssets/images/HomeAboutImages/jisan1.jpeg",
        },
        {
            main: "reactAssets/images/HomeAboutImages/g1.jpeg",
            left1: "reactAssets/images/HomeAboutImages/fardinPc1.jpeg",
            left2: "reactAssets/images/HomeAboutImages/g1.jpeg",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const fadeSlide = {
        enter: (direction) => ({
            opacity: 0,
            x: direction > 0 ? 100 : -100,
            scale: 0.95,
        }),
        center: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
        exit: (direction) => ({
            opacity: 0,
            x: direction > 0 ? -100 : 100,
            scale: 0.95,
            transition: { duration: 0.6, ease: "easeIn" },
        }),
    };

    return (
        <div className="flex justify-center items-center gap-4 md:p-4">
            {/* Left - 2 Small Images */}
            <div className="flex animated-border gap-1 md:hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                        key={`left1-${index}`}
                        src={images[index].left1}
                        alt="Left Top"
                        className="w-40 h-40  rounded-tl-lg object-cover shadow-lg"
                        variants={fadeSlide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={direction}
                    />
                </AnimatePresence>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                        key={`left2-${index}`}
                        src={images[index].left2}
                        alt="Left Bottom"
                        className="w-40 h-40 rounded-tr-lg object-cover shadow-lg"
                        variants={fadeSlide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={-direction}
                    />
                </AnimatePresence>
            </div>

            {/* Right - Big Main Image with Enhanced Animated Border */}
            <div className="image-container hidden md:block">
                <div className="animated-border 2xl:w-[850px] 2xl:h-[700px] md:w-[500px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl relative">
                    <span>
                        <motion.div
                            whileHover={{
                                boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
                            }}
                            initial={{
                                boxShadow: "0 0 0 0px rgba(99, 102, 241, 0)",
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            className="relative w-full h-full"
                        >
                            <AnimatePresence custom={direction} mode="wait">
                                <motion.div
                                    key={`main-${index}`}
                                    className="absolute inset-0"
                                    custom={direction}
                                    variants={fadeSlide}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <img
                                        src={images[index].main}
                                        alt="Main"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/20" />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HomeAboutImage;
