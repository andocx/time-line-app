import { Outlet } from "react-router";
import Header from "../ui/components/Header";
import SidebarLeft from "../ui/components/SidebarLeft"; // Import SidebarLeft
import SidebarRight from "../ui/components/SidebarRight";
import Footer from "../ui/components/Footer";


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen border-2 border-black my-2 mx-80 rounded-lg">
      {/* Header */}
      <header className="h-auto flex items-center justify-center text-xl font-bold">
        <Header />
      </header>

      {/* Contenedor central */}
      <div className="flex flex-1">
        {/* Sidebar izquierdo */}
        <aside className="w-20 flex items-center justify-center">
          <SidebarLeft />
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 flex items-center justify-center border-2 border-black">
          <Outlet />
        </main>

        {/* Sidebar derecho */}
        <aside className="w-20 flex items-center justify-center">
          <SidebarRight />
        </aside>
      </div>

      {/* Footer */}
      <footer className="h-auto flex items-center justify-between px-4 text-5xl">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
