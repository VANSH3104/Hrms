import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog";
  import { useDispatch } from "react-redux";
  import { Avatar, AvatarFallback } from "../../components/ui/avatar";
  import { useState } from "react";
  import { updateUserDetails } from "../../features/userSlice";
  
  export const ToggleBar = ({ user }: { user: any }) => {
    const dispatch = useDispatch();
  
    // Set up state to store form data for each user
    const [formData, setFormData] = useState({
      name: user.name,
      role: user.role,
      email: user.profile?.email || "",
      phone: user.profile?.phone || "",
      jobHistory: user.profile?.jobHistory || [],
      skills: user.profile?.skills || [],
      performanceMetrics: user.profile?.performanceMetrics || {},
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = () => {
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...formData },
      };
      dispatch(updateUserDetails(updatedUser));
    };
  
    return (
      <div>
        <Dialog>
          <DialogTrigger>
            <div className="rounded-md shadow-md flex px-3 cursor-pointer">
              <Avatar>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="pl-3 text-lg">
                {user.name}
                <div className="text-sm text-gray-500">{user.role}</div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update the Information</DialogTitle>
              <DialogDescription>Modify the user details below.</DialogDescription>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
  
              {user.role === "Hr" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  >
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              )}
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Job History</label>
                <textarea
                  name="jobHistory"
                  value={formData.jobHistory.map((job: { jobTitle: any; }) => job.jobTitle).join(", ")}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      jobHistory: e.target.value.split(", ").map((title) => ({
                        jobTitle: title,
                        startDate: "2022-01-01", // Default start date, modify if needed
                        description: "Description here", // Default description
                      })),
                    });
                  }}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills.join(", ")}
                  onChange={(e) => setFormData({
                    ...formData,
                    skills: e.target.value.split(", "),
                  })}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Performance Metrics</label>
                <input
                  type="text"
                  name="performanceMetrics"
                  value={formData.performanceMetrics?.rating || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    performanceMetrics: {
                      ...formData.performanceMetrics,
                      rating: parseFloat(e.target.value),
                    },
                  })}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
  
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
              >
                Update
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  