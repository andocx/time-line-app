import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { events } from "../data/events";

const ProgressBar = () => {
  const { id } = useParams<{ id: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const activeCard = Number(id) || 0;
    const progress = (activeCard / (events.length - 1)) * 100;
    setScrollProgress(progress);
  }, [id]);

  const getGradient = (progress: number) => {
    const colors = [
      "#999d8f", "#946baf", "#0096d5", "#01b5b4", "#69c07b",
      "#a2ce53", "#fcc602", "#e98a14", "#ef584d", "#010101"
    ];
    const segments = Math.ceil(progress / 10);
    const gradient = colors.slice(0, segments).join(", ");
    return `linear-gradient(to bottom, ${gradient})`;
  };

  return (
    <div className="w-full h-full"> {/* Set width to full */}
      <motion.div
        className="w-full" // Set progress line width to full
        style={{
          background: getGradient(scrollProgress),
          position: "relative", // Ensure proper layering
        }}
        initial={{ height: 0 }}
        animate={{ height: `${scrollProgress}%` }}
        transition={{ ease: "linear" }}
      />
    </div>
  );
};

export default ProgressBar;
