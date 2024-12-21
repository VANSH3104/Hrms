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
import { useSelector } from "react-redux";

export function NotificationCom() {
  const { id } = useParams<{ id: string }>();
  const users = useSelector(
    (state: RootState) => state.user.users.filter((e)=>e.id === id)
  )
  const notifications = users[0]?.notification || []
  console.log(notifications , "notification")
  const handleAccept = (notificationId: string) => {
    console.log(`Accepted notification with ID: ${notificationId}`);
    // Implement logic to handle accept action
  };

  const handleReject = (notificationId: string) => {
    console.log(`Rejected notification with ID: ${notificationId}`);
    // Implement logic to handle reject action
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
