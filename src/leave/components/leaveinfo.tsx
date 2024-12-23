import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const Leave = ({ id }: { id: string }) => {
  const user = useSelector((state: RootState) =>
    state.user.users.find((user) => user.id === id)
  );

  const leaveRequests = user?.leaveRequests

  if (leaveRequests?.length === 0)
    return <div>No leave requests found for this user.</div>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-md space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave Requests</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {leaveRequests?.map((leave) => (
          <div
            key={leave.id}
            className="p-4 bg-gray-50 shadow-sm rounded-md flex flex-col space-y-3"
          >
            <div className="flex justify-between">
              <span className="text-gray-500">Leave Type:</span>
              <span className="font-medium">{leave.leaveType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Start Date:</span>
              <span className="font-medium">{leave.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">End Date:</span>
              <span className="font-medium">{leave.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span
                className={`font-medium ${
                  leave.status === "Approved"
                    ? "text-green-500"
                    : leave.status === "Rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {leave.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};