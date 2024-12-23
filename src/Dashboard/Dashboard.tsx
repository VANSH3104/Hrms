import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setUserDetails, updateUserDetails } from "../features/userSlice";
import { LuHandMetal } from "react-icons/lu";
import { ToggleBar } from "./Components/Toglebar";
import { TaskBar } from "./Components/TaskBar";
import { CountUser } from "./Components/userCount";
import { NotificationCom } from "./Components/notification";
import { AttendanceShow } from "./Components/attendenceshow";

export const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.selectedUser);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          dispatch(updateUserDetails(JSON.parse(savedUser)));
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      dispatch(setUserDetails(id));
    }
  }, [id, dispatch]);

  return (
    <div className="shadow-lg rounded-xl p-4 h-screen overflow-auto">
      {user ? (
        <div className="space-y-4">
          <div className="rounded-md text-black font-bold text-xl font-serif flex justify-between items-center">
            <div className="flex gap-2 pt-5 text-lg md:text-xl">
              Hello {user.name} <LuHandMetal />
            </div>
            <div className="flex gap-3">
              {user.role !== "Employee" && <NotificationCom />}
              <ToggleBar id={id} />
            </div>
          </div>
          <div className="text-slate-400 font-serif text-sm md:text-base">
            Welcome Back
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user found with ID: {id}</p>
      )}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <CountUser />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <AttendanceShow />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md w-full xl:col-span-2">
          <TaskBar />
        </div>
      </div>
    </div>
  );
};
