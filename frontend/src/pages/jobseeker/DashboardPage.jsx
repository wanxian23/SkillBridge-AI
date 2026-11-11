import { Link } from 'react-router-dom'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { readJobseekerData } from '../../utils/jobseekerStorage'
import { defaultProfile } from '../../data/jobseekerMockData'
import mapIcon from '../../assets/jobseeker/map.svg'
import sparkIcon from '../../assets/jobseeker/spark.svg'

export default function DashboardPage() {
  const profile = readJobseekerData('profile', defaultProfile)
  const progress = readJobseekerData('progress', [
    'Completed',
    'In Progress',
    'Not Started',
  ])
  const completed = progress.filter((status) => status === 'Completed').length
  return (
    <div className="js-page">
      <PageHeading
        title={`Good morning, ${profile.name.split(' ')[0]}`}
        subtitle="Here’s where you stand with your goal of finding a junior software role."
      />
      <div className="js-stats">
        <Link className="js-stat" to="/jobseeker/jobs">
          <span>Top job match</span>
          <strong>74%</strong>
          <b>Browse jobs →</b>
        </Link>
        <Link className="js-stat" to="/jobseeker/skill-gaps">
          <span>Priority skill gaps</span>
          <strong>2</strong>
          <b>Review skill gaps →</b>
        </Link>
        <Link className="js-stat" to="/jobseeker/learning-roadmap">
          <span>Learning progress</span>
          <strong>{completed} of 3</strong>
          <b>Open roadmap →</b>
        </Link>
      </div>
      <div className="js-columns js-dashboard-priorities">
        <Card>
          <p className="js-eyebrow">RECOMMENDED FOR YOU</p>
          <h2 className="js-feature-title">Junior Software Developer</h2>
          <p>Straits Digital · Melaka, Malaysia · Full-time</p>
          <strong>RM 3,200–4,200 per month</strong>
          <div className="js-tags">
            {['Java', 'SQL', 'Git'].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <p>
            To improve your match: add Docker evidence and strengthen unit
            testing.
          </p>
          <div>
            <Button to="/jobseeker/jobs/junior-software-developer">
              See your top match
            </Button>
          </div>
        </Card>
        <Card title="Continue learning">
          <span className="js-badge">
            {completed === 3 ? 'Completed' : 'In progress'}
          </span>
          <h3>
            {completed === 3
              ? 'All activities complete'
              : completed < 2
                ? 'Docker foundations'
                : 'Write your first JUnit test'}
          </h3>
          <p className="js-small">
            {completed < 2
              ? 'Docker Docs · Beginner tutorial · 2 hours'
              : 'JUnit User Guide · Beginner · 1 hour'}
          </p>
          <progress max="3" value={completed} aria-label="Learning progress" />
          <p className="js-small">{completed} of 3 activities completed</p>
          <Link className="js-icon-link" to="/jobseeker/learning-roadmap">
            <img src={mapIcon} alt="" />
            Open roadmap
          </Link>
          <p className="js-note">Progress is recorded by you.</p>
        </Card>
      </div>
      <div className="js-columns js-readiness">
        <Card title="Profile completeness · 4 of 5 sections">
          <progress max="5" value="4" aria-label="Profile completeness" />
          <Link className="js-text-link" to="/jobseeker/profile/edit#skills">
            Add a skill description →
          </Link>
          <p className="js-note">
            Complete your skill evidence for a clearer profile.
          </p>
        </Card>
        <Card tint className="js-resume-banner">
          <div>
            <h3>Prepare your next application</h3>
            <p>Create or refine your resume, then review it before applying.</p>
          </div>
          <Link className="js-icon-link" to="/jobseeker/resume-studio">
            <img src={sparkIcon} alt="" />
            Resume studio
          </Link>
        </Card>
      </div>
    </div>
  )
}
