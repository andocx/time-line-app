import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { events } from "../data/events";

const bgcolors = [
  "bg-[#999d8f]/20 backdrop-blur-lg",
  "bg-[#946baf]/20 backdrop-blur-lg",
  "bg-[#0096d5]/20 backdrop-blur-lg shadow-lg",
  "bg-[#01b5b4]/20 backdrop-blur-lg shadow-lg",
  "bg-[#69c07b]/20 backdrop-blur-lg shadow-lg",
  "bg-[#a2ce53]/20 backdrop-blur-lg shadow-lg",
  "bg-[#fcc602]/20 backdrop-blur-lg shadow-lg",
  "bg-[#e98a14]/20 backdrop-blur-lg shadow-lg",
  "bg-[#ef584d]/20 backdrop-blur-lg shadow-lg",
  "bg-[#010101]/20 backdrop-blur-lg shadow-lg",
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
      if (event.deltaY > 0) {
        if (activeCard < events.length - 1) {
          setActiveCard((prev) => prev + 1);
        }
        // Removed navigation to Closure page
      } else if (event.deltaY < 0 && activeCard > 0) {
        setActiveCard((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [activeCard, navigate]);

  const revealContent = useCallback(() => {
    setRevealed((prev) => ({ ...prev, [activeCard]: true }));
  }, [activeCard]);

  useEffect(() => {
    if (!revealed[activeCard]) {
      const timer = setTimeout(() => {
        revealContent();
      }, 1000); // Cambiar a 1 segundo
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeCard, revealed, revealContent]);

  return (
    <div className={`flex-1 flex flex-col items-center justify-center relative w-full h-full transition-colors duration-500 ${bgcolors[activeCard]}`}>
      <motion.div
        key={activeCard}
        initial={{ opacity: 0, x: 100 }} // Comienza fuera del viewport a la derecha
        animate={{ opacity: 1, x: 0 }} // Se posiciona en el centro
        exit={{ opacity: 0, x: -100 }} // Sale hacia la izquierda
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center"
      >
        <Card {...events[activeCard]} revealed={revealed[activeCard]} />
      </motion.div>

      <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-sm">
        <p className="mx-10 mb-5">{events[activeCard].description}</p>
      </div>

      <div className="absolute right-4 bottom-40 text-xl inline-block align-middle">
        <span className="[writing-mode:vertical-lr]">scroll down</span>
      </div>
    </div>
  );
};

export default CardDisplay;

