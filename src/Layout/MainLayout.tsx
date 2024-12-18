import { useState } from "react";
import { Sidebar } from "../Dashboard/Components/sidebar";
import { Button } from "../components/ui/button";
import { FaGripLines } from "react-icons/fa";
import "../App.css"
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex">
      <div className={`pl-3 ${isSidebarVisible ? "block" : "hidden"} md:block`}>
        <Sidebar />
      </div>
      
      <main className="p-4 w-full">
        <div className="mb-4">
          <Button className="block md:hidden" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
            <FaGripLines />
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
};
