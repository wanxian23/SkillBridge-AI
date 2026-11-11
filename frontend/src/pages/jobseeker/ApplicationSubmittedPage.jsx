import { useParams } from 'react-router-dom'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { jobs } from '../../data/jobseekerMockData'
import { readJobseekerData } from '../../utils/jobseekerStorage'

export default function ApplicationSubmittedPage() {
  const { jobId } = useParams()
  const job = jobs.find((item) => item.id === jobId)
  const application = readJobseekerData('applications', []).find(
    (item) => item.jobId === jobId
  )
  if (!job || !application)
    return (
      <div className="js-page">
        <PageHeading title="No submitted application" />
        <Button to="/jobseeker/jobs">Browse jobs</Button>
      </div>
    )
  return (
    <div className="js-page">
      <PageHeading
        title="Application submitted"
        subtitle={`Your application has been sent to ${job.employer}.`}
      />
      <Card>
        <h2 className="js-accent">✓ {job.title}</h2>
        <h4>Resume submitted</h4>
        <h3>
          {application.applicant} · {application.resumeTitle}
        </h3>
        <p>You can track updates from the employer in My Applications.</p>
      </Card>
      <div>
        <Button to="/jobseeker/applications">Track my application</Button>
      </div>
      <div>
        <Button to="/jobseeker/jobs" variant="tint">
          Browse jobs
        </Button>
      </div>
    </div>
  )
}
