// Sample records from Figma. Replace these with API data when the backend is ready.
export const jobs = [
  {
    id: 'junior-software-developer',
    title: 'Junior Software Developer',
    employer: 'Straits Digital',
    location: 'Melaka',
    salary: 'RM 3,200–4,200',
    type: 'Full-time',
    match: 74,
    skills: 'Java · SQL · Git · Docker · Unit testing',
    experience: 'No experience required',
    note: 'Docker evidence missing · Unit testing partial',
  },
  {
    id: 'graduate-qa-analyst',
    title: 'Graduate QA Analyst',
    employer: 'Meridian Labs',
    location: 'Kuala Lumpur',
    salary: 'RM 3,000–3,800',
    type: 'Full-time',
    match: 70,
    skills: 'Graduate opportunity · On-site',
    experience: 'Not specified',
    note: 'Check the vacancy requirements before applying.',
  },
  {
    id: 'junior-data-analyst',
    title: 'Junior Data Analyst',
    employer: 'Cedar Systems',
    location: 'Selangor',
    salary: 'RM 3,100–4,000',
    type: 'Full-time',
    match: 68,
    skills: 'Entry-level opportunity · Full-time',
    experience: 'Not specified',
    note: 'Compare the role with your skills and career interests.',
  },
]
export const activities = [
  {
    title: 'Docker concepts',
    source: 'Docker Docs · Reading · 30 minutes',
    description: 'Understand images, containers and how they fit together.',
    url: 'https://docs.docker.com/get-started/docker-concepts/',
  },
  {
    title: 'Docker foundations',
    source: 'Docker Docs · Tutorial · Beginner · 2 hours',
    description: 'Practise running a small application in a container.',
    url: 'https://docs.docker.com/get-started/',
  },
  {
    title: 'Write your first JUnit test',
    source: 'JUnit User Guide · Guide · Beginner · 1 hour',
    description: 'Write a Java unit test and check its expected result.',
    url: 'https://docs.junit.org/current/user-guide/',
  },
]
export const defaultProfile = {
  name: 'Aina Rahman',
  location: 'Melaka, Malaysia',
  interest: 'Software development',
  summary: 'IT graduate with Java and SQL project experience.',
  skills: 'Java · SQL · Git',
  evidence: 'Java · Campus equipment booking portal. Add SQL evidence.',
  employment: '',
  visibility: 'Visible to recruiters',
  education: [
    {
      id: 'education-utem',
      institution: 'Universiti Teknikal Malaysia Melaka',
      qualification: 'Bachelor’s degree',
      fieldOfStudy: 'Information Technology',
      startDate: 'Sep 2022',
      endDate: 'Jul 2026',
      result: '',
    },
  ],
  experience: [
    {
      id: 'experience-intern',
      jobTitle: 'IT Intern',
      company: '',
      employmentType: 'Internship',
      startDate: 'Feb 2026',
      endDate: 'Jul 2026',
      responsibilities: '',
      location: 'Melaka',
    },
  ],
}
export const resumeFields = {
  name: 'Aina Rahman',
  location: 'Melaka, Malaysia',
  email: '',
  phone: '',
  objective: 'IT graduate with Java and SQL project experience.',
  qualification: 'Bachelor of Information Technology',
  institution: 'UTeM',
  startYear: '',
  endYear: '2026',
  position: 'IT Intern',
  company: '',
  workLocation: 'Melaka',
  dates: 'Feb 2026 – Jul 2026',
  description: '',
  skills: 'Java, SQL, Git',
  project: 'Campus equipment booking portal',
  projectDescription:
    'Built a campus equipment booking portal using Java and MySQL.',
  photo: '',
  includePhoto: false,
}
export const defaultResumes = [
  {
    ...resumeFields,
    id: 'software-developer',
    title: 'Software Developer resume',
    summary: 'Java, SQL and Git · Software development focus',
    status: 'Saved',
  },
  {
    ...resumeFields,
    id: 'general-it',
    title: 'General IT resume',
    summary: 'General IT roles · Education and transferable skills',
    status: 'Saved',
  },
  {
    ...resumeFields,
    id: 'junior-draft',
    title: 'Junior Software Developer draft',
    summary:
      'Complete contact details and internship information before applying.',
    status: 'Need Details',
  },
]
export const defaultApplications = [
  {
    id: 'sample-software',
    jobId: jobs[0].id,
    date: '12 Oct 2026',
    status: 'Submitted',
    resumeTitle: 'Software Developer resume',
  },
  {
    id: 'sample-qa',
    jobId: jobs[1].id,
    date: '08 Oct 2026',
    status: 'In Review',
    resumeTitle: 'General IT resume',
  },
]
