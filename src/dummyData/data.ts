export const DUMMY_USERS = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Hr',
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
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Manager',
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
  },
  {
    id: '3',
    name: 'Emily Taylor',
    role: 'Employee',
    profile: {
      id: 'profile3',
      email: 'emily@domain.com',
      password: 'hrsecure',
      phone: '1122334455',
      jobHistory: [
        { id: 'job3', jobTitle: 'HR Specialist', startDate: '2019-05-01', description: 'Handled recruitment and onboarding' },
      ],
      skills: ['Recruitment', 'Employee Relations', 'Conflict Management'],
      performanceMetrics: { id: 'metrics3', rating: 4.9, feedback: 'Great team player and recruiter' },
    },
  },
];
