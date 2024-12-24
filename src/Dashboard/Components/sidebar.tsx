import { IoMdExit } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { Link, useParams, useLocation } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUserDetails } from "../../features/userSlice";
import { Button } from "../../components/ui/button";
export const Sidebar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const location = useLocation(); 
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.selectedUser);

  useEffect(() => {
    if (id) {
      dispatch(setUserDetails(id));
    }
  }, [id, dispatch]);
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
    <div className={`w-56 min-h-screen p-5 rounded-lg shadow-xl overflow-hidden ${isDarkMode ? "bg-gray-800" : ""}`}>
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
                <RxDashboard className="pt-1.5 h-full" /> 
              <div className="text-xl">
                Dashboard
              </div>  
            </div>
            </Link>
          </li>
          <li>
            <Link
              to={`/userdetails/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/userdetails/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            ><div className="flex gap-1 text-center">
                <TbListDetails className="pt-1.5 h-full" /> 
              <div className="text-xl">
                Overview
              </div>  
            </div>
            </Link>
          </li>
          {(user?.managerId === "Null" || user?.managerId === "Hr") && (
            <li>
              <Link
                to={`/employee/${id}`}
                className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${
                  isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"
                } ${
                  isActive(`/employee/${id}`)
                    ? "bg-indigo-200 border-l-8 border-indigo-400"
                    : ""
                }`}
              >
                <div className="flex gap-1 text-center">
                <FaSearch className="pt-1.5 h-full" /> 
                <div className="text-xl">
                  Employee
                  </div>
                </div>  
              </Link>
            </li>
          )}
          {(user?.role === "Employee") && (
            <li>
              <Link
                to={`/employeeSearch/${id}`}
                className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${
                  isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"
                } ${
                  isActive(`/employee/${id}`)
                    ? "bg-indigo-200 border-l-8 border-indigo-400"
                    : ""
                }`}
              >
                <div className="flex gap-1 text-center">
                <FaSearch className="pt-1.5 h-full" /> 
                <div className="text-xl">
                  Employee
                  </div>
                </div> 
              </Link>
            </li>
          )}
          <li>
            <Link
              to={`/leave-management/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/leave-management/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              <div className="flex gap-1 text-center">
                <CiMail  className="pt-1.5 h-full" />
                <div className="text-xl">
                  Leave
                  </div>
                </div>
            </Link>
          </li>
          <li>
            <Link
              to={`/attendance-tracking/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/attendance-tracking/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              <div className="flex gap-1 text-center">
                <MdPushPin  className="pt-2 h-full" />
                <div className="text-xl">
                  Attendence
                </div>
                </div>
            </Link>
          </li>
          <li>
            <Link
              to={`/task-assignments/${id}`}
              className={`block py-1 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/task-assignments/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              <div className="flex gap-1 text-center">
                <FaTasks  className="pt-1.5  h-full" /> 
                <div className="text-xl">
                  Task
                </div>
                </div>
            </Link>
          </li>
          <li>
            <Link
              to={`/`}
              className={`block py-2 px-4 hover:bg-indigo-100 hover:border-l-8 hover:border-indigo-400 rounded ${isDarkMode ? "text-white hover:text-gray-700" : "text-gray-800 hover:text-gray-600"} ${isActive(`/logout/${id}`) ? "bg-indigo-200 border-l-8 border-indigo-400" : ""}`}
            >
              <div className="flex gap-1 text-center">
                <IoMdExit  className="pt-0.5 h-full w-6" />
                <div className="text-xl">
                  Exit
                </div>
                </div>
            </Link>
          </li>
        </ul>
            {/* <div className="flex w-full pt-8">
              <Button onClick={toggleTheme} className="bg-indigo-500 hover:bg-indigo-400 w-full">
                {isDarkMode ? "Light" : "Dark"}
              </Button>
            </div> */}
      </nav>
    </div>
  );
};
