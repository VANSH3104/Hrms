import { FaBell } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { useParams } from "react-router-dom";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateUserDetails } from "../../features/userSlice";
import { Notification, User } from "../../Interfaces/interface";

export function NotificationCom() {
  const { id } = useParams<{ id: string }>();
  const users = useSelector(
    (state: RootState) => state.user.users.filter((e: User) => e.id === id)
  );
  const dispatch = useDispatch();
  const OtherUser = useSelector((state:RootState)=>state.user.users)
   useEffect(() => {
      if (OtherUser) {
        localStorage.setItem("user", JSON.stringify(OtherUser));
      }
    }, [OtherUser]);
    useEffect(() => {
      if (users) {
        localStorage.setItem("user", JSON.stringify(users));
      }
    }, [users]);
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUsers = JSON.parse(savedUser);
          dispatch(updateUserDetails(parsedUsers));
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
      }
    };

    const broadcast = new BroadcastChannel('notifications');
    broadcast.onmessage = (event) => {
      dispatch(updateUserDetails(event.data));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      broadcast.close();
    };
  }, [dispatch]);

  const notifications = users[0]?.notification || [];

  const handleAccept = (notificationId: string) => {
    console.log(`Accepted notification with ID: ${notificationId}`);
    const notification = notifications.find((e) => e.id === notificationId);
    if (!notification) {
        console.log('Notification not found');
        return;
    }
    const userId = notification.employeeId;
    const leave = OtherUser.find((e) => e.id === userId);
    if (!leave) {
        console.log('User not found');
        return;
    }

    console.log(leave);
    const leaveRequest = leave.leaveRequests.find((e) => e.id === notificationId);
    if (!leaveRequest) {
        console.log('Leave request not found');
        return;
    }
    console.log(leaveRequest);
    const updatedLeaveRequests = leave.leaveRequests.map((request) =>
        request.id === notificationId ? { ...request, status: 'Approved' } : request
    );
    const updatedEmployeeLeave = {
        ...leave.employeeLeave,
        totalLeaves: leave.employeeLeave.totalLeaves - 1,
        takenLeaves: leave.employeeLeave.takenLeaves + 1,
    };
    const userUpdate: User = {
        ...leave,
        employeeLeave: updatedEmployeeLeave,
        leaveRequests: updatedLeaveRequests,
    };

    console.log(userUpdate, 'after update');
    dispatch(updateUserDetails(userUpdate));
    const updatedNotifications = notifications.filter((e) => e.id !== notificationId);
    console.log(updatedNotifications , "notiiiii")
const update: User = {
  ...users[0],
  notification: updatedNotifications,
};
console.log(update , "uppdpdadpapd")

dispatch(updateUserDetails(update));

};



  const handleReject = (notificationId: string) => {
    console.log(`Rejected notification with ID: ${notificationId}`);
    console.log(`Accepted notification with ID: ${notificationId}`);
    const notification = notifications.find((e) => e.id === notificationId);
    if (!notification) {
        console.log('Notification not found');
        return;
    }
    const userId = notification.employeeId;
    const leave = OtherUser.find((e) => e.id === userId);
    if (!leave) {
        console.log('User not found');
        return;
    }

    console.log(leave);
    const leaveRequest = leave.leaveRequests.find((e) => e.id === notificationId);
    if (!leaveRequest) {
        console.log('Leave request not found');
        return;
    }
    console.log(leaveRequest);
    const updatedLeaveRequests = leave.leaveRequests.map((request) =>
        request.id === notificationId ? { ...request, status: 'Rejected' } : request
    );
    const userUpdate: User = {
        ...leave,
        leaveRequests: updatedLeaveRequests,
    };

    console.log(userUpdate, 'after update');
    dispatch(updateUserDetails(userUpdate));
    const updatedNotifications = notifications.filter((e) => e.id !== notificationId);
    console.log(updatedNotifications , "notiiiii")
const update: User = {
  ...users[0],
  notification: updatedNotifications,
};
console.log(update , "uppdpdadpapd")

dispatch(updateUserDetails(update));

    
  };

  return (
    <div className="p-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="p-2 shadow-lg bg-indigo-500 text-white hover:bg-indigo-400 rounded-md">
            <FaBell className="text-lg" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>Stay updated with the latest notifications.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
          <div className="max-h-[300px] overflow-y-auto">
            {notifications?.length > 0 ? (
              notifications.map((notification: Notification) => (
                <div key={notification.id} className="flex items-center justify-between p-2 border rounded-md shadow-sm">
                  <div>
                    <p className="text-sm font-medium">{notification.type}</p>
                    <p className="text-xs text-gray-500">From: {notification.recipientname}</p>
                    <p className="text-xs text-gray-400">{new Date(parseInt(notification.createdAt)).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAccept(notification.id)}
                      className="bg-green-500 text-white text-xs"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleReject(notification.id)}
                      className="bg-red-500 text-white text-xs"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div>No notifications yet.</div>
            )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
