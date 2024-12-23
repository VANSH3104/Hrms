export interface HRMSState {
    User?: User,
    profile?: UserProfile,
    jobHistory?: JobHistory,
    performance?: PerformanceMetrics
    leaveRequests?: LeaveRequest[];
    attendance?: Attendance[];
    attendenceList: AttendanceList;
    tasks?: Task[];
}
export interface User {
    id: string;
    name: string;
    role: 'HR' | 'Manager' | 'Employee';
    managerId: string;
    profile: UserProfile;
    leaveRequests: LeaveRequest[];
    attendance: Attendance[];
    tasks: Task[];
    employeeLeave: EmployeeLeave;
    notification?: Notification[];
    attendenceList: AttendanceList; 
  }
  
export interface UserProfile {
    id: string;
    email: string;
    password: string;
    phone: string;
    jobHistory: JobHistory[];
    skills: string[];
    performanceMetrics: PerformanceMetrics;
  }
  
export interface JobHistory {
    id: string;
    jobTitle: string;
    startDate: string;
    endDate?: string;
    description: string;
  }
  
export interface PerformanceMetrics {
    id: string;
    rating: number;
    feedback: string;
  }
export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: 'Sick' | 'Vacation' | 'Other';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface Task {
  id: string;
  employeeId: string;
  description: string;
  deadline: string; 
  priority: 'Low' | 'Medium' | 'High';
  progress: number;
}
export interface EmployeeLeave {
  employeeId: string;
  totalLeaves: number;
  nationalHolidays: number;
  takenLeaves: number;
  usedNationalHolidays: number;
  remainingLeaves: number;
}
export interface Notification {
  id: string;
  employeeId: string,
  recipientId: string;
  recipientName: string;
  type: 'LeaveRequest' | 'Task' | 'Performance';
  createdAt: string;
}
export interface AttendanceList {
  employeeId: string;
  present: number;
  absent: number;
}