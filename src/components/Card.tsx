import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@mui/material";

// Definir props
interface CardProps {
  year: string;
  title: string;
  image: string;
  description: string;
  revealed: boolean;
}

const Card: React.FC<CardProps> = ({ year, title, image, description, revealed }) => {
  const { ref, inView } = useInView({ threshold: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.5, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1.1 } : { opacity: 0.5, scale: 0.9 }}
      transition={{ duration: 0.6 }}
      className="w-[88mm] h-[107mm] snap-center cursor-pointer"
    >
      <div className="w-[88mm] h-[107mm] bg-white shadow-lg rounded-lg p-2 flex flex-col items-stretch border border-gray-300">
        <motion.div
          className="w-[79mm] h-[79mm] bg-gray-600 rounded-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 6 }}
        >
          {revealed ? (
            <img src={`/img/${image}.jpg`} alt={title} className="w-full h-full object-cover" />
          ) : (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}
        </motion.div>
        <motion.div
          className="w-full flex-grow flex items-end justify-center pb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 6 }}
        >
          <p className="text-sm text-gray-600 font-handwritten">
            {revealed ? `${year} ${title}` : <Skeleton width="80%" />}
          </p>
          {inView && revealed && <p className="mt-2 text-gray-600 text-center">{description}</p>}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;
