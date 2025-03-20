import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Definir props
interface CardProps {
  year: string;
  title: string;
  image: string;
  source: string;
  link: string | null;
  revealed: boolean;
}

const Card: React.FC<CardProps> = ({ year, title, image, source, link, revealed }) => {
  const { ref, inView } = useInView({ threshold: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1.1 } : { opacity: 0.5, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="w-[88mm] h-[107mm] snap-center cursor-pointer"
    >
      <div className="w-[88mm] h-[107mm] bg-white shadow-lg rounded-lg p-4 flex flex-col items-stretch border border-gray-300">
        <motion.div
          className="w-[79mm] h-[79mm] bg-gray-600 rounded-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 6, ease: "easeInOut" }} // Smoother transition
        >
          {revealed ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={`/img/${image}.jpg`} alt={title} className="w-full h-full object-cover" />
            </a>
          ) : (
            null
          )}
        </motion.div>
        <motion.div
          className="w-full flex-grow flex flex-col items-center justify-end pb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 6, ease: "easeInOut" }} // Smoother transition
        >
          <div className="w-full flex justify-between text-xs text-gray-600 font-handwritten">
            {revealed ? (
              <>
                <span>{year}</span>
                <span>{source}</span>
              </>
            ) : null}
          </div>
          {inView && revealed && <p className="mt-2 text-gray-600 text-sm text-center font-bold">{title}</p>}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;
