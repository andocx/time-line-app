import { Outlet } from "react-router";
import Header from "../ui/components/Header";
import SidebarLeft from "../ui/components/SidebarLeft"; // Import SidebarLeft
import SidebarRight from "../ui/components/SidebarRight";
import Footer from "../ui/components/Footer";


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-auto flex items-center justify-center border-b border-black text-xl font-bold">
          <Header />       
      </header>

      <div className="flex flex-1">
        <aside className="w-1/8 border-r border-black flex items-center justify-center">
          <SidebarLeft /> 
        </aside>
        
        <main className="flex-1 flex items-center justify-center border-black border-x">
          <Outlet />
        </main>

        <aside className="w-1/8 border-l border-black flex items-center justify-center">
          <SidebarRight />
        </aside>
      </div>

      <footer className="h-auto flex items-center justify-between px-4 border-t border-black text-5xl">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
