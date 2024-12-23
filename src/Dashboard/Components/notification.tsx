import { FaBell } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { useParams } from "react-router-dom";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateUserDetails } from "../../features/userSlice";

export function NotificationCom() {
  const { id } = useParams<{ id: string }>();
  const users = useSelector(
    (state: RootState) => state.user.users.filter((e)=>e.id === id)
  )
  const leaveUser = useSelector((state: RootState)=>state.user.users)
  const dispatch = useDispatch()
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
      if (users) {
        localStorage.setItem("user", JSON.stringify(users));
      }
    }, [users]);
  const notifications = users[0]?.notification || []
  console.log(notifications , "notification")
  const handleAccept = (notificationId: string) => {
    console.log(`Accepted notification with ID: ${notificationId}`);
    const idleave = notifications.find((e)=>e.employeeId)
    console.log(idleave)
    const mainUser = leaveUser.filter((e)=>(e.id === idleave))
    const leavereq = mainUser.filter((e)=>e.leaveRequests.filter((e)=>e.id ===notificationId))
    console.log(leavereq)
    
  };

  const handleReject = (notificationId: string) => {
    console.log(`Rejected notification with ID: ${notificationId}`);
    users.filter((e)=>e.notification === null)
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
            <DialogDescription>
              Stay updated with the latest notifications.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {notifications?.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-2 border rounded-md shadow-sm">
                  <div>
                    <p className="text-sm font-medium">{notification.type}</p>
                    <p className="text-xs text-gray-500">From: {notification.recipientName}</p>
                    <p className="text-xs text-gray-400">{new Date(parseInt(notification.createdAt)).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAccept(notification.id)}
                      className="bg-green-500 text-white hover:bg-green-400"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleReject(notification.id)}
                      className="bg-red-500 text-white hover:bg-red-400"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No notifications available.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}