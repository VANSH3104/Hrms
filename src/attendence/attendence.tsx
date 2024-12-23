import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";

interface AttendanceRecord {
  id: string;
  date: string;
  status: "Present" | "Absent" | "Leave";
}

export function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    status: "Present",
    remarks: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddRecord = () => {
    setAttendanceRecords((prev) => [
      ...prev,
      { id: `att-${Date.now()}`, ...newRecord },
    ]);
    setNewRecord({
      date: new Date().toISOString().split("T")[0], // Reset to current date
      status: "Present",
      remarks: "",
    });
    setDialogOpen(false);
  };

  const handleDeleteRecord = (id: string) => {
    setAttendanceRecords((prev) => prev.filter((record) => record.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Attendance</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-indigo-500 text-white" onClick={() => setDialogOpen(true)}>
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Add Attendance Record</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={newRecord.date}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  value={newRecord.status}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddRecord}>
                Add Record
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record) => (
              <tr key={record.id} className="text-center">
                <td className="p-2 border">{record.date}</td>
                <td className="p-2 border">{record.status}</td>
                <td className="p-2 border">
                  <Button
                    variant="outline"
                    className="bg-red-500 text-white"
                    onClick={() => handleDeleteRecord(record.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                No attendance records available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
