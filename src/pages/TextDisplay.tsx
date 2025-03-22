interface TextDisplayProps {
  year: string;
  title: string;
  source: string;
  description: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ year, title, source, description }) => {
  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-sm py-4 px-20">
      <div className="text-xs text-gray-600 font-handwritten flex justify-between">
        <span>{year}</span>
        <span>{source}</span>
      </div>
      <p className="mt-2 text-gray-600 text-sm text-center font-bold">{title}</p>
      <p className="mt-2 text-gray-600 text-sm text-center">{description}</p>
    </div>
  );
};

export default TextDisplay;
