import { Outlet } from "react-router";
import Header from "../ui/components/Header";
import SidebarLeft from "../ui/components/SidebarLeft"; // Import SidebarLeft
import SidebarRight from "../ui/components/SidebarRight";
import Footer from "../ui/components/Footer";


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen border-2 border-black">
      {/* Header */}
      <header className="h-auto flex items-center justify-center border-b-2 border-black text-xl font-bold">
        <Header />
      </header>

      {/* Contenedor central */}
      <div className="flex flex-1">
        {/* Sidebar izquierdo */}
        <aside className="w-20 border-r-2 border-black flex items-center justify-center">
          <SidebarLeft />
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 flex items-center justify-center">
          <Outlet />
        </main>

        {/* Sidebar derecho */}
        <aside className="w-20 border-l-2 border-black flex items-center justify-center">
          <SidebarRight />
        </aside>
      </div>

      {/* Footer */}
      <footer className="h-auto flex items-center justify-between px-4 border-t-2 border-black text-5xl">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
