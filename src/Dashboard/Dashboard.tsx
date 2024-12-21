import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setUserDetails } from "../features/userSlice";
import { LuHandMetal } from "react-icons/lu";
import { ToggleBar } from "./Components/Toglebar";
import { TaskBar } from "./Components/TaskBar";
import { CountUser } from "./Components/userCount";
import { NotificationCom } from "./Components/notification";
export const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.selectedUser);

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
              {user.role !== "Employee" && <NotificationCom  />}
              <ToggleBar />
            </div>
          </div>
          <div className="text-slate-400 font-serif text-sm md:text-base">
            Welcome Back
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user found with ID: {id}</p>
      )}
      <div className="mt-8 grid gap-6 md:grid-cols-1 lg:grid-cols-2 overflow-auto">
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 md:w-full lg:w-auto">
            <CountUser/>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 md:w-full lg:w-auto">
            <TaskBar/>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg">Component 3</h3>
          <p className="text-sm text-gray-600">Content for component 3</p>
        </div>
      </div>
    </div>
  );
};
