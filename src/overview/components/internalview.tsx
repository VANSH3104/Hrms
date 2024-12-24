import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const InterUser = ({ id }: { id: string }) => {
  const user = useSelector((e: RootState) => e.user.users.filter((e) => e.id === id))[0];

  if (!user) {
    return <div className="text-center text-red-500 mt-10">User not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg overflow-hidden">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-gray-800">{user.name}</h1>
        <p className="text-base sm:text-lg text-gray-500">Role: <span className="text-gray-700 font-medium">{user.role}</span></p>
      </div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">Profile</h2>
          <p><strong className="text-gray-600">Email:</strong> {user.profile.email}</p>
          <p><strong className="text-gray-600">Phone:</strong> {user.profile.phone}</p>
          <p><strong className="text-gray-600">Skills:</strong> {user.profile.skills.join(", ")}</p>
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">Performance Metrics</h2>
          <p><strong className="text-gray-600">Rating:</strong> {user.profile.performanceMetrics.rating}</p>
          <p><strong className="text-gray-600">Feedback:</strong> {user.profile.performanceMetrics.feedback}</p>
        </section>

        <section className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">Job History</h2>
          {user.profile.jobHistory.map((job) => (
            <div key={job.id} className="mb-4 sm:mb-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
              <p><strong className="text-gray-600">Title:</strong> {job.jobTitle}</p>
              <p><strong className="text-gray-600">Start Date:</strong> {job.startDate}</p>
              <p><strong className="text-gray-600">End Date:</strong> {job.endDate || "Current"}</p>
              <p><strong className="text-gray-600">Description:</strong> {job.description}</p>
            </div>
          ))}
        </section>

        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">Attendance</h2>
          <p><strong className="text-gray-600">Present:</strong> {user.attendenceList.present}</p>
          <p><strong className="text-gray-600">Absent:</strong> {user.attendenceList.absent}</p>
        </section>
      </div>
    </div>
  );
};
