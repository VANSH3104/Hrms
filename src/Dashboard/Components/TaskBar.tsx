import { useState } from "react";
import { Calendar } from "../../components/ui/calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { useLocation, useParams } from "react-router-dom";

export interface Task {
  id: string;
  employeeId: string;
  description: string;
  deadline: string;
  priority: "Low" | "Medium" | "High";
  progress: number;
}

export const TaskBar = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    state.user.users.find((user) => user.id === id)
  );
  const location = useLocation();
  const [date, setDate] = useState<Date>(new Date());
  const tasksInfo = useSelector((state: RootState) => state.task);
  const taskUser = tasksInfo.tasks.filter((task) => task.employeeId === user?.id);
  const formattedSelectedDate = date.toISOString().split('T')[0].split(" ")[0];
  const filteredTasks = taskUser.filter((task) => {
    console.log(formattedSelectedDate.split(" ") , "hii" , task.deadline)
    return task.deadline === formattedSelectedDate;
  });
  const isTaskAssignmentsPath = location.pathname.startsWith("/task-assignments/");
  const handleDateClick = (value: Date) => {
    setDate(value);
  };
  return (
    <div className="gap-6 overflow-hidden items-center">
      <div className={isTaskAssignmentsPath ? "md:flex gap-4 ":"grid gap-4"}>
        <div className="flex md:w-1/8">
          <Calendar
            onDayClick={handleDateClick}
            value={date}
            className="bg-white shadow-lg rounded-xl"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Tasks for {date.toDateString()}</h2>
          <div className={isTaskAssignmentsPath ? "overflow-auto h-[120px] md:h-[220px] w-full":"overflow-auto h-[120px] w-[320px]"}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="p-4 rounded-lg shadow-md">
                  <h3 className="text-sm font-semibold">{task.description}</h3>
                  <div className="flex gap-4">
                    <Button className={task.priority ==="High" ? "bg-red-500 hover:bg-red-400": task.priority ==="Medium" ? "bg-yellow-500 hover:bg-yellow-300": "bg-green-500 hover:bg-green-400"}>
                      <p className="text-gray-700">{task.priority}</p>
                    </Button>
                    <div className="pt-1">
                    <Progress value={task.progress} color="bg-indigo-500" />
                    <p className="text-gray-600">Progress: {task.progress}%</p>
                  </div>
                  </div>
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
