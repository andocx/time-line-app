import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { events } from "../data/events";

const ProgressTitle = () => {
  const { id } = useParams<{ id: string }>();
  const [letterColors, setLetterColors] = useState<string[]>(Array(9).fill("#000"));

  useEffect(() => {
    const activeCard = id ? Number(id) : -1;
    const colors = [
      "#999d8f", "#946baf", "#0096d5", "#01b5b4", "#69c07b",
      "#a2ce53", "#fcc602", "#e98a14", "#ef584d", "#010101"
    ];
    const newColors = Array(9).fill("#000");
    if (activeCard >= 0) {
      for (let i = 0; i <= activeCard; i++) {
        newColors[i] = colors[i % colors.length];
      }
    }
    setLetterColors(newColors);
  }, [id]);

  const text = "\u2022Timeline\u2022";

  return (
    <h2 className="text-7xl [writing-mode:sideways-lr]">
      {text.split("").map((char, index) => (
        <span key={index} style={{ color: letterColors[index] }}>
          {char}
        </span>
      ))}
    </h2>
  );
};

export default ProgressTitle;
