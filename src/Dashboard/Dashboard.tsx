import { useParams } from "react-router-dom";
import {useSelector } from 'react-redux';
import { RootState } from "@/store/store";
export const Dashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { user} = useSelector((state: RootState) => state.user);
  const UserInfo = 
    return (
      <div className="bg-slate-100 h-full rounded-xl" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
        <div className="bg-yellow-400 ">
            your id is {user?.id}
        </div>
      </div>
    );
  };
  