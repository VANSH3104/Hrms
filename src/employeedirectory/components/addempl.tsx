import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addUser } from "../../features/userSlice";

export function DialogAdd() {
    const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("User");
  const [formData, setFormData] = useState({
    id: nanoid(),
    name: "",
    role: "Employee",
    managerId: "",
    profile: {
      email: "",
      password: "Welcome123",
      phone: "",
      jobHistory: [],
      skills: [],
      performanceMetrics: {
        id: nanoid(),
        rating: 0,
        feedback: "",
      },
    },
    leaveRequests: [],
    attendance: [],
    attendenceList:{
      employeeId: nanoid(),
      present: 0,
      absent: 0,
    },
    tasks: [],
    employeeLeave: {
      employeeId: nanoid(),
      totalLeaves: 45,
      nationalHolidays: 5,
      takenLeaves: 0,
      usedNationalHolidays: 0,
      remainingLeaves: 45,
    },
    notification: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleJobHistoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const jobTitles = e.target.value.split(", ");
    setFormData((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        jobHistory: jobTitles.map((title, index) => ({
          id: `job-${index}`,
          jobTitle: title.trim(),
          startDate: prevState.profile.jobHistory[index]?.startDate || "2022-01-01",
          description: prevState.profile.jobHistory[index]?.description || "Default description",
        })),
      },
    }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillNames = e.target.value.split(", ");
    setFormData((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        skills: skillNames.map((skill) => skill.trim()),
      },
    }));
  };

  const handleSave = () => {
    const storedData = JSON.parse(localStorage.getItem("employees") || "[]");
    const updatedData = [...storedData, formData][0]
    dispatch(addUser(updatedData))
    alert("Employee added successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-indigo-500 text-white">
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <div className="flex border-b mb-4">
          {["User", "Profile", "Job History", "Skills"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 p-2 text-center ${
                activeTab === tab ? "border-b-2 border-indigo-500 font-bold" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          {activeTab === "User" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium">
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                >
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <div>
                <label htmlFor="managerId" className="block text-sm font-medium">
                  Manager
                </label>
                <select
                  id="managerId"
                  value={formData.managerId}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Manager</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>
          )}
          {activeTab === "Profile" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="profile.email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="profile.email"
                  type="email"
                  value={formData.profile.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, email: e.target.value },
                    }))
                  }
                  placeholder="Enter email"
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="profile.phone" className="block text-sm font-medium">
                  Phone
                </label>
                <input
                  id="profile.phone"
                  type="tel"
                  value={formData.profile.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, phone: e.target.value },
                    }))
                  }
                  placeholder="Enter phone number"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
          )}
          {activeTab === "Job History" && (
            <div>
              <label htmlFor="jobHistory" className="block text-sm font-medium">
                Job History (comma-separated)
              </label>
              <textarea
                id="jobHistory"
                value={formData.profile.jobHistory.map((job) => job.jobTitle).join(", ")}
                onChange={handleJobHistoryChange}
                placeholder="e.g., Developer, Team Lead"
                className="w-full border rounded p-2"
              />
            </div>
          )}
          {activeTab === "Skills" && (
            <div>
              <label htmlFor="skills" className="block text-sm font-medium">
                Skills (comma-separated)
              </label>
              <textarea
                id="skills"
                value={formData.profile.skills.join(", ")}
                onChange={handleSkillsChange}
                placeholder="e.g., JavaScript, React, Node.js"
                className="w-full border rounded p-2"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
