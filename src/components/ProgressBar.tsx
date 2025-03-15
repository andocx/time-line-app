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
    <div className="w-9 h-full">
      <motion.div
        className="w-8" // Increase the width of the progress line
        style={{ background: getGradient(scrollProgress) }}
        initial={{ height: 0 }}
        animate={{ height: `${scrollProgress}%` }}
        transition={{ ease: "linear" }}
      />
    </div>
  );
};

export default ProgressBar;
