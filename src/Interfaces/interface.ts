export interface HRMSState {
    User?: User,
    profile?: UserProfile,
    jobHistory?: JobHistory,
    performance?: PerformanceMetrics
}
export interface User {
    id: string;
    name: string;
    role: 'HR' | 'Manager' | 'Employee';
    managerId?: string;
    profile: UserProfile;
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
