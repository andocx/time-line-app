import { useLocation, useParams } from "react-router";
import TextDisplay from "../../pages/TextDisplay";
import { events } from "../../data/events";

const Footer = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const activeCard = Number(id) || 0;
  const isHome = location.pathname === "/";

  return (
    <div className="w-full p-4">
      {isHome ? (
        <div className="flex justify-between items-center mt-4">
          <span className="py-5 px-24 text-4xl">©2025</span>
          <span className="py-5 px-24 text-4xl">andocx</span>
        </div>
      ) : (
        <TextDisplay
          year={events[activeCard].year}
          title={events[activeCard].title}
          source={events[activeCard].source}
          description={events[activeCard].description}
        />
      )}
    </div>
  );
};

export default Footer;