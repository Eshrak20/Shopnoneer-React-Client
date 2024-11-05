// src/hooks/useScrollEffects.js
import { useEffect, useState } from "react";

const useScrollEffects = (opacityThreshold = 640) => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop <= opacityThreshold);
    setOpacity(scrollTop > opacityThreshold ? 0.5 : 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isVisible, opacity };
};

export default useScrollEffects;
