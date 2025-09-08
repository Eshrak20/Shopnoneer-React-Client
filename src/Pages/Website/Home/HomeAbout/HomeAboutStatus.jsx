import React, { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ value }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounter();
                    setHasAnimated(true);
                    observer.disconnect(); // stop observing once triggered
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [value]);

    const animateCounter = () => {
        let start = 0;
        const end = parseInt(value);
        if (isNaN(end)) return;

        const duration = 1000;
        const incrementTime = 30;
        const step = Math.ceil(end / (duration / incrementTime));

        const counter = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(counter);
            } else {
                setCount(start);
            }
        }, incrementTime);
    };

    return (
        <div ref={ref} className="relative inline-block">
            {/* Blue Fire Effect */}
            <div className="absolute -inset-3 rounded-full bg-blue-400 opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500 animate-pulse"></div>
            <div className="absolute -inset-2 rounded-full bg-blue-300 opacity-0 group-hover:opacity-40 blur-md transition-all duration-300"></div>
            <span className="relative z-10 text-white font-extrabold 2xl:text-3xl md:text-2xl">
                {count}+
            </span>
        </div>
    );
};
const HomeAboutStatus = ({ stats }) => {
    return (
        <div className="relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white rounded-md md:rounded-2xl px-0 py-4 md:p-10 shadow-2xl mt-10 overflow-hidden">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

            <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-blue-300/20"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${
                                Math.random() * 10 + 5
                            }s linear infinite`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex gap-4 justify-evenly">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="text-center group transform transition-all duration-500 hover:scale-105"
                    >
                        <p className="text-sm md:text-lg  font-medium text-blue-100">
                            {stat.label}
                        </p>
                        <h2 className="mt-2 ">
                            <AnimatedCounter value={stat.value} />
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeAboutStatus;
