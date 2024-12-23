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
    // Handle accept logic here
  };

  const handleReject = (notificationId: string) => {
    console.log(`Rejected notification with ID: ${notificationId}`);
    // Handle reject logic here
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
          <div className="grid gap-4 py-4">
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
