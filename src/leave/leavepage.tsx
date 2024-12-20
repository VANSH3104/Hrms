import { useEffect, useState } from "react"
import { Leave } from "./components/leaveinfo";
import { Leavedata } from "./components/leavedata";
import { useParams } from "react-router-dom";
import { LeaveRequestForm } from "./components/leavebox";

export const LeavePage = ()=>{
    const [currentDate, setCurrentDate] = useState('');
    const { id } = useParams<{ id: string}>();
    useEffect(() => {
      const date = new Date();
      setCurrentDate(formatDate(date));
    }, []);
  
    const formatDate = (date: Date) => {
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      const daySuffix = getDaySuffix(day);
  
      return `Today: ${day}${daySuffix} ${month} ${year}`;
    };
  
    const getDaySuffix = (day: number) => {
      if (day >= 11 && day <= 13) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };
    return (
    <div className="h-screen bg-gray-100 p-6 overflow-auto ">
  <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-y-auto">
    <div className="col-span-1 lg:col-span-1 bg-white rounded-xl shadow p-6">
      <h3 className="text-gray-700 text-lg font-bold">Realtime Insight</h3>
      <p className="text-2xl font-semibold">{currentDate}</p>
      <LeaveRequestForm/>
    </div>
    <div className=" bg-white rounded-xl shadow p-6 gap-3 ">
      <Leavedata/>
    </div>
    <div className="col-span-1 lg:col-span-3 bg-white rounded-xl shadow p-6">
      <div className="mt-4">
        <div className="h-full rounded-lg">
            <Leave id= {id} />  
        </div>
      </div>
    </div>  
  </div>
</div>

    )
}