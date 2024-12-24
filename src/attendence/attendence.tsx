import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateUserDetails } from "../features/userSlice";
import { nanoid } from "nanoid";
import { AttendanceList, User } from "../Interfaces/interface";

export function Attendance() {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    state.user.users.find((e) => e.id === id)
  );
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];

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

  const [formData, setFormData] = useState({
    id: nanoid(),
    employeeId: id || "",
    date: today,
    status: "Absent",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRecord = () => {
    if (!user) return;
    const updatedAttendanceList: AttendanceList = {
      employeeId: formData.employeeId,
      present: formData.status === "Present" || formData.status === "Late" 
               ? (user?.attendenceList?.present || 0) + 1 
               : user?.attendenceList?.present || 0,
      absent: formData.status === "Absent" 
              ? (user?.attendenceList?.absent || 0) + 1 
              : user?.attendenceList?.absent || 0,
    };

    const updatedAttendance = [
      ...(user.attendance || []),
      formData,
    ];

    const updatedUser: User = {
      ...user,
      attendance: updatedAttendance,
      attendenceList: updatedAttendanceList,
    };

    dispatch(updateUserDetails(updatedUser));
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Present":
        return "text-green-500 font-bold";
      case "Absent":
        return "text-red-500 font-bold";
      case "Late":
        return "text-yellow-500 font-bold";
      default:
        return "";
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{user?.name || "User"}'s Attendance</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Add Attendance Record</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddRecord}>
                Add Record
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* Scrollable container for the table */}
      <div className="overflow-y-auto max-h-[800px]">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {user?.attendance && user.attendance.length > 0 ? (
              // Reverse the array to show the most recent record first
              [...user.attendance].reverse().map((record) => (
                <tr key={record.id} className="text-center">
                  <td className="p-3 border border-gray-300">{record.date}</td>
                  <td className={`p-3 border border-gray-300 ${getStatusClass(record.status)}`}>
                    {record.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  No attendance records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

