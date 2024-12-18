import { useState } from "react";
import { Calendar } from "../../components/ui/calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export interface Task {
  id: string;
  employeeId: string;
  description: string;
  deadline: string;
  priority: "Low" | "Medium" | "High";
  progress: number;
}

export const TaskBar = ({ user }: { user: string }) => {
  const [date, setDate] = useState<Date>(new Date());
  const tasksInfo = useSelector((state: RootState) => state.task);
  const taskUser = tasksInfo.tasks.filter((task) => task.employeeId === user);
  const formattedSelectedDate = date.toISOString().split('T')[0].split(" ")[0];
  const filteredTasks = taskUser.filter((task) => {
    console.log(formattedSelectedDate.split(" ") , "hii" , task.deadline)
    return task.deadline === formattedSelectedDate;
  });
  const handleDateClick = (value: Date) => {
    setDate(value);
    console.log(value);
  };

  return (
    <div className="gap-6 overflow-hidden">
      <div className="grid gap-4">
        <div className="flex md:w-1/3">
          <Calendar
            onDayClick={handleDateClick}
            value={date}
            className="bg-white shadow-lg rounded-xl"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Tasks for {date.toDateString()}</h2>
          <div className="overflow-auto h-[120px] w-[320px]">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-sm font-semibold">{task.description}</h3>
                  <p className="text-gray-600">Priority: {task.priority}</p>
                  <p className="text-gray-600">Progress: {task.progress}%</p>
                </div>
              ))
            ) : (
              <p>No tasks available for this date.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
