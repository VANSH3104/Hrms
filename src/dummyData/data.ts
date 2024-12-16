export const DUMMY_USERS = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Employee',
      profile: {
        id: 'profile1',
        email: 'john.doe@domain.com',
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
        email: 'jane.smith@domain.com',
        password: 'admin456',
        phone: '0987654321',
        jobHistory: [
          { id: 'job2', jobTitle: 'Project Manager', startDate: '2020-01-01', description: 'Managed teams' },
        ],
        skills: ['Leadership', 'Project Management'],
        performanceMetrics: { id: 'metrics2', rating: 4.8, feedback: 'Exceptional leader' },
      },
    },
  ];
  