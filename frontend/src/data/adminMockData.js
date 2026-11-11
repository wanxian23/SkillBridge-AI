// Mock data for the administrator UI.
// Replace these with API calls (services/api.js) once the backend endpoints exist.

export const ADMIN_USER = { name: 'Administrator', role: 'ADMINISTRATOR' }

export const ACCOUNT_ROLES = ['Job Seeker', 'Recruiter', 'Administrator']
export const ACCOUNT_STATUSES = ['Active', 'Under review', 'Suspended']

export const RESOURCE_TYPES = ['Tutorial', 'Course', 'Guide', 'Video', 'Documentation']
export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced']
export const RESOURCE_STATUSES = ['Active', 'Inactive']

export const APPROVAL_NOTE =
  'Company identity and representative authority checked (prototype demonstration).'

export const initialUsers = [
  {
    id: 'u-aina',
    name: 'Aina Rahman',
    email: 'aina@example.com',
    role: 'Job Seeker',
    status: 'Active',
  },
  {
    id: 'u-maya',
    name: 'Maya Lim',
    email: 'maya@example.com',
    role: 'Recruiter',
    status: 'Active',
  },
  {
    id: 'u-sample',
    name: 'Sample account',
    email: 'sample@example.com',
    role: 'Job Seeker',
    status: 'Under review',
    reviewReason: 'Account activity was flagged for administrative review.',
  },
]

export const initialCompanies = [
  {
    id: 'EV-001',
    name: 'Straits Digital Sdn. Bhd.',
    recruiter: 'Maya Lim',
    recruiterTitle: 'Talent Acquisition Executive',
    email: 'maya@example.com',
    phone: '+60 12 345 6789',
    registration: '202601012345',
    address: 'Melaka, Malaysia',
    submitted: '6 Nov 2026',
    status: 'Awaiting review',
    reason: '',
    evidence: ['ssm-company-profile-demo.pdf', 'hr-authorisation-demo.pdf'],
    history: [],
  },
]

export const initialVacancies = [
  {
    id: 'v-junior-dev',
    title: 'Junior Software Developer',
    employer: 'Straits Digital',
    status: 'Published',
    reason: '',
  },
  {
    id: 'v-it-support',
    title: 'IT Support Trainee',
    employer: 'Sample employer',
    status: 'Flagged',
    reason: 'Upfront fee reported',
    summary: 'The listing asks applicants to pay an upfront fee.',
  },
]

export const initialResources = [
  {
    id: 'r-docker',
    title: 'Docker foundations',
    provider: 'Docker Docs',
    description: 'Learn images, containers and Docker Compose from the official docs.',
    url: 'https://docs.docker.com/get-started/',
    skill: 'Docker',
    type: 'Tutorial',
    level: 'Beginner',
    duration: '2 hours',
    status: 'Active',
  },
  {
    id: 'r-junit',
    title: 'First JUnit test',
    provider: 'JUnit Guide',
    description: 'Write and run a first unit test with JUnit.',
    url: 'https://junit.org/junit5/docs/current/user-guide/',
    skill: 'Unit testing',
    type: 'Guide',
    level: 'Beginner',
    duration: '',
    status: 'Active',
  },
  {
    id: 'r-git',
    title: 'Git workflow',
    provider: 'GitHub Skills',
    description: 'Practise branches, commits and pull requests.',
    url: 'https://skills.github.com/',
    skill: 'Version control',
    type: 'Course',
    level: 'Beginner',
    duration: '',
    status: 'Active',
  },
]

// The design shows "3 of 12 resources", so the catalogue total is kept separately
// from the sample list until the backend can return real counts.
export const INITIAL_RESOURCE_TOTAL = 12

export const initialCategories = [
  { id: 'c-containers', name: 'Containers', skills: ['Docker'] },
  { id: 'c-testing', name: 'Testing', skills: ['JUnit', 'Unit testing'] },
  { id: 'c-vcs', name: 'Version control', skills: ['Git'] },
]
