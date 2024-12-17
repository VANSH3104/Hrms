import { Button } from "../../components/ui/button";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
export const Sidebar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const location = useLocation(); 
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
    else{
      setIsDarkMode(false)
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]); 
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`w-56 min-h-screen p-5 rounded-lg shadow-xl overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-slate-100"}`}>
      <div className="text-center">
        <h2 className={`text-3xl font-bold ${isDarkMode ? "text-indigo-300" : "text-indigo-500"}`}>HRMS</h2>
      </div>
      <nav className="mt-4">
        <ul className="space-y-4">
          <li>
            <Link
              to={`/dashboard/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/dashboard/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            ><div className="flex gap-1 text-center">
                <RxDashboard className="pt-1 h-full" /> Dashboard
            </div>
            </Link>
          </li>
          <li>
            <Link
              to={`/employee-profiles/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/employee-profiles/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              Employee Directory
            </Link>
          </li>
          <li>
            <Link
              to={`/leave-management/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/leave-management/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              Leave Management
            </Link>
          </li>
          <li>
            <Link
              to={`/attendance-tracking/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/attendance-tracking/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              Attendance Tracking
            </Link>
          </li>
          <li>
            <Link
              to={`/task-assignments/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/task-assignments/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              Task Assignments
            </Link>
          </li>
          <li>
            <Link
              to={`/performance-reviews/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/performance-reviews/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              Performance Reviews
            </Link>
          </li>
          <li>
            <Link
              to={`/onboarding/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/onboarding/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              Onboarding Workflow
            </Link>
          </li>
          <li>
            <Link
              to={`/search/${id}`}
              className={`block py-2 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/search/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              Employee Search
            </Link>
          </li>
          <li>
            <Link
              to={`/settings/${id}`}
              className={`block py-2 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/settings/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to={`/logout/${id}`}
              className={`block py-2 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/logout/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              Logout
            </Link>
          </li>
        </ul>
        <div className="flex w-full pt-8">
          <Button onClick={toggleTheme} className="bg-indigo-500 hover:bg-indigo-400 w-full">
            {isDarkMode ? "Light" : "Dark"}
          </Button>
        </div>
      </nav>
    </div>
  );
};
