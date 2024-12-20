export const DUMMY_USERS = [
  {
    id: '1',
    name: 'John Doe',
    role: 'HR',
    managerId: 'Null',
    profile: {
      id: 'profile1',
      email: 'john@domain.com',
      password: 'password123',
      phone: '1234567890',
      jobHistory: [
        { id: 'job1', jobTitle: 'Developer', startDate: '2021-01-01', description: 'Frontend Developer' },
      ],
      skills: ['JavaScript', 'React', 'Redux'],
      performanceMetrics: { id: 'metrics1', rating: 4.5, feedback: 'Excellent performance' },
    },
    leaveRequests: [
      {
        id: 'leave1',
        employeeId: '1',
        leaveType: 'Vacation',
        startDate: '2024-12-01',
        endDate: '2024-12-10',
        status: 'Approved',
      },
      {
        id: 'leave4',
        employeeId: '1',
        leaveType: 'Sick',
        startDate: '2024-12-15',
        endDate: '2024-12-17',
        status: 'Pending',
      },
    ],
    attendance: [
      { id: 'attendance1', employeeId: '1', date: '2024-12-16', status: 'Present' },
      { id: 'attendance2', employeeId: '1', date: '2024-12-17', status: 'Late' },
      { id: 'attendance7', employeeId: '1', date: '2024-12-18', status: 'Present' },
    ],
    tasks: [
      {
        id: 'task1',
        employeeId: '1',
        description: 'Complete frontend development for new feature',
        deadline: '2024-12-18',
        priority: 'High',
        progress: 70,
      },
      {
        id: 'task4',
        employeeId: '1',
        description: 'Prepare monthly HR report',
        deadline: '2024-12-25',
        priority: 'Medium',
        progress: 30,
      },
    ],
    employeeLeave: {
      employeeId: '1',
      totalLeaves: 43,
      nationalHolidays: 5,
      takenLeaves: 7,
      usedNationalHolidays: 1,
      remainingLeaves: 36,
    },
    notification :{},
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Manager',
    managerId: 'HR',
    profile: {
      id: 'profile2',
      email: 'jane@domain.com',
      password: '1234',
      phone: '0987654321',
      jobHistory: [
        { id: 'job2', jobTitle: 'Project Manager', startDate: '2020-01-01', description: 'Managed teams' },
      ],
      skills: ['Leadership', 'Project Management'],
      performanceMetrics: { id: 'metrics2', rating: 4.8, feedback: 'Exceptional leader' },
    },
    leaveRequests: [
      {
        id: 'leave2',
        employeeId: '2',
        leaveType: 'Sick',
        startDate: '2024-12-01',
        endDate: '2024-12-02',
        status: 'Approved',
      },
      {
        id: 'leave5',
        employeeId: '2',
        leaveType: 'Vacation',
        startDate: '2024-12-20',
        endDate: '2024-12-27',
        status: 'Pending',
      },
    ],
    attendance: [
      { id: 'attendance3', employeeId: '2', date: '2024-12-16', status: 'Present' },
      { id: 'attendance4', employeeId: '2', date: '2024-12-17', status: 'Absent' },
      { id: 'attendance8', employeeId: '2', date: '2024-12-18', status: 'Present' },
    ],
    tasks: [
      {
        id: 'task2',
        employeeId: '2',
        description: 'Conduct team meeting to discuss project milestones',
        deadline: '2024-12-18',
        priority: 'Medium',
        progress: 90,
      },
      {
        id: 'task5',
        employeeId: '2',
        description: 'Evaluate performance reports of team members',
        deadline: '2024-12-22',
        priority: 'High',
        progress: 60,
      },
    ],
    employeeLeave: {
      employeeId: '2',
      totalLeaves: 43,
      nationalHolidays: 5,
      takenLeaves: 2,
      usedNationalHolidays: 0,
      remainingLeaves: 41,
    },
    notification :{},
  },
  {
    id: '3',
    name: 'Emily Taylor',
    role: 'Employee',
    managerId: 'Manager',
    profile: {
      id: 'profile3',
      email: 'emily@domain.com',
      password: '1234',
      phone: '1122334455',
      jobHistory: [
        { id: 'job3', jobTitle: 'HR Specialist', startDate: '2019-05-01', description: 'Handled recruitment and onboarding' },
      ],
      skills: ['Recruitment', 'Employee Relations', 'Conflict Management'],
      performanceMetrics: { id: 'metrics3', rating: 4.9, feedback: 'Great team player and recruiter' },
    },
    leaveRequests: [
      {
        id: 'leave3',
        employeeId: '3',
        leaveType: 'Vacation',
        startDate: '2024-12-05',
        endDate: '2024-12-15',
        status: 'Pending',
      },
      {
        id: 'leave6',
        employeeId: '3',
        leaveType: 'Other',
        startDate: '2024-12-28',
        endDate: '2024-12-30',
        status: 'Pending',
      },
    ],
    attendance: [
      { id: 'attendance5', employeeId: '3', date: '2024-12-16', status: 'Present' },
      { id: 'attendance6', employeeId: '3', date: '2024-12-17', status: 'Late' },
      { id: 'attendance9', employeeId: '3', date: '2024-12-18', status: 'Absent' },
    ],
    tasks: [
      {
        id: 'task3',
        employeeId: '3',
        description: 'Update employee records and handle onboarding tasks',
        deadline: '2024-12-20',
        priority: 'High',
        progress: 50,
      },
      {
        id: 'task6',
        employeeId: '3',
        description: 'Prepare recruitment strategy for Q1 2025',
        deadline: '2024-12-31',
        priority: 'Medium',
        progress: 20,
      },
    ],
    employeeLeave: {
      employeeId: '3',
      totalLeaves: 43,
      nationalHolidays: 5,
      takenLeaves: 0,
      usedNationalHolidays: 0,
      remainingLeaves: 43,
    },
    notification :{},
  },
];
