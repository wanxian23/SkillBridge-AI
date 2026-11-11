import { useState } from 'react'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { defaultApplications, jobs } from '../../data/jobseekerMockData'
import { readJobseekerData } from '../../utils/jobseekerStorage'

export default function ApplicationsPage() {
  const applications = readJobseekerData('applications', defaultApplications)
  const [selectedId, setSelectedId] = useState(applications[0]?.id)
  const selected = applications.find((item) => item.id === selectedId)
  const job = selected && jobs.find((item) => item.id === selected.jobId)
  return (
    <div className="js-page">
      <PageHeading
        title="My applications"
        subtitle="Keep track of your submissions and the latest updates from employers."
      />
      <div className="js-stats js-application-stats">
        <div className="js-stat">
          <strong>{applications.length}</strong>
          <span>Total applications</span>
        </div>
        <div className="js-stat">
          <strong>
            {applications.filter((item) => item.status === 'Submitted').length}
          </strong>
          <span>Submitted</span>
        </div>
        <div className="js-stat">
          <strong>
            {applications.filter((item) => item.status === 'In Review').length}
          </strong>
          <span>In review</span>
        </div>
      </div>
      <div className="js-columns js-application-columns">
        <div className="js-stack">
          <h3>Recent applications</h3>
          {applications.map((application) => {
            const vacancy = jobs.find((item) => item.id === application.jobId)
            return (
              <button
                key={application.id}
                className={`js-card js-application ${application.id === selectedId ? 'js-application--selected' : ''}`}
                onClick={() => setSelectedId(application.id)}
                aria-pressed={application.id === selectedId}
              >
                <div className="js-between">
                  <h2>{vacancy.title}</h2>
                  <span className="js-badge">{application.status}</span>
                </div>
                <p>
                  {vacancy.employer} · {vacancy.location}
                </p>
                <p>Applied {application.date}</p>
                <p className="js-ink">
                  {application.status === 'Submitted'
                    ? 'Your application was sent successfully.'
                    : 'The employer is reviewing your application.'}
                </p>
              </button>
            )
          })}
          <p className="js-small">
            Statuses are updated by the hiring team. A submission is not a
            hiring decision.
          </p>
          <div>
            <Button to="/jobseeker/jobs">Browse more jobs</Button>
          </div>
        </div>
        {selected && job && (
          <Card title="Application details">
            <h3>{job.title}</h3>
            <p>{job.employer}</p>
            <span className="js-badge">{selected.status}</span>
            <h3 className="js-accent">✓ Application submitted</h3>
            <p>{selected.date}</p>
            <h3>
              {selected.status === 'In Review' ? '✓' : '○'} Employer review
            </h3>
            <p>
              {selected.status === 'In Review'
                ? 'The employer is reviewing your application.'
                : 'Awaiting an update from the hiring team.'}
            </p>
            <h4>Resume used</h4>
            <p>
              {selected.applicant || 'Aina Rahman'} · {selected.resumeTitle}
            </p>
            <Button to={`/jobseeker/jobs/${job.id}`} variant="tint">
              View vacancy
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
