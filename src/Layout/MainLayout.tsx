import { useState } from "react";
import { Sidebar } from "../Dashboard/Components/sidebar";
import { Button } from "../components/ui/button";
import { FaGripLines } from "react-icons/fa";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden"> 
      <div className={`pl-3 ${isSidebarVisible ? "block" : "hidden"} md:block rounded-md`}>
        <Sidebar />
      </div>
      
      <main className="p-4 w-full flex-1 overflow-hidden">
        <div className="mb-4">
          <Button
            className="block md:hidden h-full"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <FaGripLines />
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
};
