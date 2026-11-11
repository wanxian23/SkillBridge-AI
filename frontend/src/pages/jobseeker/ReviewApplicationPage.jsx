import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import {
  defaultApplications,
  defaultProfile,
  defaultResumes,
  jobs,
} from '../../data/jobseekerMockData'
import {
  readJobseekerData,
  saveJobseekerData,
} from '../../utils/jobseekerStorage'

export default function ReviewApplicationPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [resumeId, setResumeId] = useState('')
  const [error, setError] = useState('')
  const job = jobs.find((item) => item.id === jobId)
  const resumes = readJobseekerData('resumes', defaultResumes)
  const profile = readJobseekerData('profile', defaultProfile)
  const selected = resumes.find((resume) => resume.id === resumeId)
  if (!job)
    return (
      <div className="js-page">
        <PageHeading title="Job not found" />
        <Button to="/jobseeker/jobs">Browse jobs</Button>
      </div>
    )
  function submitApplication() {
    if (!selected) return
    const applications = readJobseekerData('applications', defaultApplications)
    // Updating the existing demo application prevents duplicate submissions.
    const application = {
      id: `application-${job.id}`,
      jobId: job.id,
      status: 'Submitted',
      resumeTitle: selected.title,
      resume: { ...selected },
      applicant: profile.name,
      date: new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Kuala_Lumpur',
      }).format(new Date()),
    }
    const updated = [
      application,
      ...applications.filter((item) => item.jobId !== job.id),
    ]
    if (!saveJobseekerData('applications', updated)) {
      setError('The application could not be saved. Please try again.')
      return
    }
    navigate(`/jobseeker/jobs/${job.id}/submitted`)
  }
  return (
    <div className="js-page js-review">
      <PageHeading
        title="Review your application"
        subtitle="Choose a saved resume, check your details, then submit your application."
      />
      <Card title={job.title}>
        <p>
          {job.employer} · {job.location} · {job.type} · {job.salary} / month
        </p>
      </Card>
      <div className="js-columns js-review-columns">
        <div className="js-stack">
          <Card title="1. Choose a resume">
            <p>
              Select the saved version you want to share with this employer.
            </p>
            <label>
              Resume to submit *
              <select
                value={resumeId}
                onChange={(event) => setResumeId(event.target.value)}
              >
                <option value="">Select a saved resume</option>
                {resumes.map((resume) => (
                  <option
                    key={resume.id}
                    value={resume.id}
                    disabled={resume.status === 'Need Details'}
                  >
                    {resume.title}
                    {resume.status === 'Need Details'
                      ? ' · Complete missing details first'
                      : ''}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <Button to="/jobseeker/resume-studio" variant="tint">
                Create or edit a resume
              </Button>
            </div>
          </Card>
          <Card title="2. Review the selected resume">
            <h3 className={selected ? '' : 'js-muted'}>
              {selected
                ? `${selected.name} · ${selected.title}`
                : 'No resume selected'}
            </h3>
            <p>
              {selected
                ? selected.summary
                : 'Your selected resume’s title and summary will appear here.'}
            </p>
            {selected && (
              <div>
                <Button
                  to={`/jobseeker/resume-studio/${selected.id}/preview`}
                  variant="tint"
                >
                  Preview selected resume
                </Button>
              </div>
            )}
          </Card>
        </div>
        <Card title="Application summary" tint>
          <h4>Applicant</h4>
          <p className="js-ink">
            {profile.name} · {profile.location}
          </p>
          <h4>Shared with {job.employer}</h4>
          <p>
            Your submitted profile, selected resume and vacancy match summary.
          </p>
          <h3>Only one resume is attached</h3>
          <p>Other saved resumes are not included in this application.</p>
        </Card>
      </div>
      <div className="js-actions">
        <Button disabled={!selected} onClick={submitApplication}>
          Submit application
        </Button>
        <Button to={`/jobseeker/jobs/${job.id}`} variant="tint">
          Back to job
        </Button>
      </div>
      <p className="js-small">
        Select a resume before submitting. You can change your selection at any
        time before submission.
      </p>
      {error && (
        <p role="alert" className="js-error">
          {error}
        </p>
      )}
    </div>
  )
}
