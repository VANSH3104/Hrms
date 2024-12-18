import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setUserDetails } from "../features/userSlice";
import { LuHandMetal } from "react-icons/lu";
import { ToggleBar } from "./Components/Toglebar";
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
    <div 
      className="bg-slate-100 h-full rounded-xl p-4" 
      style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
    >
      {user ? (
        <div>
          <div className= "rounded-md text-black font-bold text-xl font-serif flex justify-between">
            <div className="flex gap-2 pt-2">
              Hello {user.name} <LuHandMetal/>
            </div>
            <div>
              <ToggleBar user={user} />
            </div>
          </div>
          <div className="text-slate-400 font-serif">
            Welcome Back
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user found with ID: {id}</p>
      )}
    </div>
  );
};
