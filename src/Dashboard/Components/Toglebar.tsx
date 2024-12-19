import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { RootState } from "@/store/store";
import { updateUserDetails } from "../../features/userSlice";
import { User } from "../../Interfaces/interface";

export const ToggleBar = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    state.user.users.find((user) => user.id === id)
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    role: user?.role || "Employee",
    email: user?.profile?.email || "",
    phone: user?.profile?.phone || "",
    jobHistory: user?.profile?.jobHistory || [],
    skills: user?.profile?.skills || [],
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

  const handleJobHistoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const jobTitles = e.target.value.split(", ");
    setFormData((prevState) => ({
      ...prevState,
      jobHistory: jobTitles.map((title, index) => ({
        id: `job-${index}`,
        jobTitle: title.trim(),
        startDate: prevState.jobHistory[index]?.startDate || "2022-01-01",
        description: prevState.jobHistory[index]?.description || "Default description",
      })),
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: e.target.value.split(", ").map((skill) => skill.trim()),
    }));
  };

  const handleSubmit = () => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      name: formData.name,
      role: formData.role,
      profile: {
        ...user.profile,
        email: formData.email,
        phone: formData.phone,
        jobHistory: formData.jobHistory,
        skills: formData.skills,
      },
    };

    dispatch(updateUserDetails(updatedUser));
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="rounded-md shadow-md flex px-3 cursor-pointer">
            <Avatar>
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="pl-3 text-lg">
              {user?.name}
              <div className="text-sm text-gray-500">{user?.role}</div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Information</DialogTitle>
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

            {user?.role === "HR" && (
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
                value={formData.jobHistory.map((job) => job.jobTitle).join(", ")}
                onChange={handleJobHistoryChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills.join(", ")}
                onChange={handleSkillsChange}
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
