import { useLocation } from "react-router";
import ProgressBar from "../../components/ProgressBar";

const SidebarRight = () => {

    const location = useLocation();

    return (
        <div className="w-full h-full flex items-center justify-center">
            {location.pathname === "/" ? (
                <span className="text-4xl [writing-mode:vertical-lr]">20.644 Cultura Digital</span>
            ) : (
                <ProgressBar />
            )}
        </div>
    );
};

export default SidebarRight;