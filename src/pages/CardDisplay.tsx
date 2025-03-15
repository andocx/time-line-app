import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { events } from "../data/events";

const bgcolors = [
  "bg-[#999d8f]/25",
  "bg-[#946baf]/25",
  "bg-[#0096d5]/25",
  "bg-[#01b5b4]/25",
  "bg-[#69c07b]/25",
  "bg-[#a2ce53]/25",
  "bg-[#fcc602]/25",
  "bg-[#e98a14]/25",
  "bg-[#ef584d]/25",
  "bg-[#010101]/25",
];

const CardDisplay = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeCard, setActiveCard] = useState(Number(id) || 0);
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    navigate(`/card/${activeCard}`);
  }, [activeCard, navigate]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0 && activeCard < events.length - 1) {
        setActiveCard((prev) => prev + 1);
      } else if (event.deltaY < 0 && activeCard > 0) {
        setActiveCard((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [activeCard]);

  const revealContent = useCallback(() => {
    setRevealed((prev) => ({ ...prev, [activeCard]: true }));
  }, [activeCard]);

  useEffect(() => {
    if (!revealed[activeCard]) {
      const timer = setTimeout(() => {
        revealContent();
      }, 6000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeCard, revealed, revealContent]);

  return (
    <div className={`flex-1 flex flex-col items-center justify-center relative w-full h-full transition-colors duration-500 ${bgcolors[activeCard]}`}>
      <motion.div
        key={activeCard}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center"
      >
        <Card {...events[activeCard]} revealed={revealed[activeCard]} />
      </motion.div>

      <div className="absolute right-4 bottom-40 text-xl inline-block align-middle">
        <span className="[writing-mode:vertical-lr]">scroll down</span>
      </div>
    </div>
  );
};

export default CardDisplay;

