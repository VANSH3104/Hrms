import { FaTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updateUserDetails } from "../../features/userSlice";
import { useParams } from "react-router-dom";
import { Toggleupdate } from "./togleupdate";
import { deleteUser } from "../../features/userSlice";
import { DialogAdd } from "./addempl";
// Example users 

export function Tabledata() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.user.users);
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
  const [searchQuery, setSearchQuery] = useState("");
  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) && user.id !== id
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleDelete = (userId: string) => {
    dispatch(deleteUser(userId))
  };

  const handleView = (userId: string) => {
    console.log(`Viewing user with ID: ${userId}`);
  };

  return (
    <div>
      <div className="mb-4">
        {/* Search input for filtering users by name */}
        <div className="flex justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="p-2 border rounded-md"
        />
        <div>
        <DialogAdd />
      </div>
        </div>
      </div>

      <Table>
        <TableCaption>All Users listed above</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={user}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  {/* Edit Button */}
                  <Toggleupdate id= {user.id} />
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}

