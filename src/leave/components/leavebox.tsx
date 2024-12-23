import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { RootState } from "@/store/store";
import { LeaveRequest, User } from "../../Interfaces/interface";
import { updateUserDetails } from "../../features/userSlice";

export const LeaveRequestForm = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    state.user.users.find((user) => user.id === id)
  );
  const dispatch = useDispatch();
  const OtherUsers = useSelector((state: RootState) =>
    state.user.users.filter((user) => user.role === "HR")[0]
  );
  
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);
  useEffect(() => {
    if (OtherUsers) {
      localStorage.setItem("user", JSON.stringify(OtherUsers));
    }
  }, [OtherUsers]);

  const [formData, setFormData] = useState({
    id: "",
    startDate: "",
    endDate: "",
    reason: "",
    leaveType: "Sick",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNotify = () => {
    if (!user) return;

    const newNotification: Notification = {
      id: `${Date.now()}`,
      employeeId: user.id,
      recipientname: user.name,
      type: formData.leaveType,
      createdAt: `${Date.now()}`,
    };
    console.log("Before Notify", OtherUsers);

    const updatedUser2: User = {
      ...OtherUsers,
      notification: [...OtherUsers.notification, newNotification],
    };
    dispatch(updateUserDetails(updatedUser2))
    console.log(updatedUser2 , "user 2")
  };


  const handleSubmit = () => {
    if (!user || !formData) return;
    const newLeaveRequest: LeaveRequest = {
      id: `${Date.now()}`,
      employeeId: user.id,
      startDate: formData.startDate,
      endDate: formData.endDate,
      leaveType: formData.leaveType,
      status: "Pending",
    };

    const updatedUser: User = {
      ...user,
      leaveRequests: [...user.leaveRequests, newLeaveRequest],
    };

    // Dispatch updated user details in Redux
    dispatch(updateUserDetails(updatedUser));

    // Call notify after updating user details
    handleNotify();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg">Leave Request</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Request</DialogTitle>
            <DialogDescription>Submit your leave request here.</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Leave Type</label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              >
                <option value="Sick">Sick</option>
                <option value="Vacation">Vacation</option>
                <option value="Emergency">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700"
            >
              Submit Request
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
