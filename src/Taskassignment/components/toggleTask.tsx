import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog";
  import { useDispatch, useSelector } from "react-redux";
  import { useState } from "react";
  import { addTask } from "../../features/taskSlice";
  import { Task } from "../../Interfaces/interface";
import { useParams } from "react-router-dom";
import { RootState } from "../../store/store";
  
  export const ToggleTask = () => {
    const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    state.user.users.find((user) => user.id === id)
  );
    const dispatch = useDispatch();
  
    const [formData, setFormData] = useState<Task>({
      id: "",
      employeeId: user?.id,
      description: "",
      deadline: "",
      priority: "Medium",
      progress: 0,
    });
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: name === "progress" ? Number(value) : value,
      });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.id || !formData.employeeId || !formData.description || !formData.deadline) {
        alert("All fields are required.");
        return;
      }
      dispatch(addTask(formData));
      setFormData({
        id: "",
        employeeId: user?.id,
        description: "",
        deadline: "",
        priority: "Medium",
        progress: 50,
      });
    };
  
    return (
      <Dialog>
        <DialogTrigger>
          <button className="bg-indigo-500 w-[250px] text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700">
            Add Task
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Task</DialogTitle>
            <DialogDescription>Fill in the details to create a new task.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Task ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Progress</label>
              <input
                type="number"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                min="0"
                max="100"
              />
            </div>
  
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700"
            >
              Add Task
            </button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  