import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

  const handleVideoClick = useCallback(() => {
    if (events[activeCard].link && events[activeCard].link.endsWith(".mp4")) {
      setIsVideoPlaying(true);
    } else if (events[activeCard].link) {
      window.open(events[activeCard].link, "_blank");
    }
  }, [activeCard]);

  const handleVideoClose = useCallback(() => {
    setIsVideoPlaying(false);
  }, []);

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
    <div
      className={`flex-1 flex flex-col items-center justify-center relative w-full h-full transition-colors duration-500 ${bgcolors[activeCard]}`}
    >
      <motion.div
        key={activeCard}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center w-full h-full"
      >
        <motion.div
          className="w-full h-full bg-gray-600 overflow-hidden flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed[activeCard] ? 1 : 0 }}
          transition={{ duration: 6, ease: "easeInOut" }}
        >
          {revealed[activeCard] && (
            isVideoPlaying && events[activeCard].link?.endsWith(".mp4") ? (
              <div className="relative w-full h-full">
                <button
                  onClick={handleVideoClose}
                  className="absolute top-2 right-2 z-10 bg-black text-white p-2 rounded"
                >
                  Close
                </button>
                <video
                  src={events[activeCard].link ? events[activeCard].link.replace(/^\/public\//, "/videos/") : ""} // Verificar que link no sea null
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onError={() => {
                    if (events[activeCard].link) {
                      alert(`Error loading video: ${events[activeCard].link.replace(/^\/public\//, "/videos/")}. Please check the file path.`);
                    }
                    setIsVideoPlaying(false);
                  }}
                />
              </div>
            ) : (
              <div
                onClick={events[activeCard].link ? handleVideoClick : undefined} // Solo permitir clic si hay un link válido
                className={`w-full h-full ${
                  events[activeCard].link ? "cursor-pointer hover:opacity-80 hover:scale-105 transition-transform duration-300" : "cursor-default"
                }`}
              >
                <img
                  src={`/img/${events[activeCard].image}.jpg`}
                  alt={events[activeCard].title}
                  className="w-full h-full object-cover" // Cambiar a object-contain si es necesario
                />
              </div>
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CardDisplay;

