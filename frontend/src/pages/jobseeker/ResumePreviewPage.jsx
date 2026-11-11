import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { defaultResumes } from '../../data/jobseekerMockData'
import {
  readJobseekerData,
  saveJobseekerData,
} from '../../utils/jobseekerStorage'

export default function ResumePreviewPage() {
  const { resumeId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const resumes = readJobseekerData('resumes', defaultResumes)
  const working = readJobseekerData('working-resume', null)
  const resume =
    location.state?.working && working?.id === resumeId
      ? working
      : resumes.find((item) => item.id === resumeId)
  if (!resume)
    return (
      <div className="js-page">
        <PageHeading title="Resume not found" />
        <Button to="/jobseeker/resume-studio">Back to my resumes</Button>
      </div>
    )
  const missing = []
  if (!resume.email || !resume.phone)
    missing.push('Add email and phone number.')
  if (!resume.startYear) missing.push('Add education start year.')
  if (!resume.company) missing.push('Add the internship company name.')
  if (!resume.description)
    missing.push('Add a brief internship job description.')
  if (
    !resume.location ||
    !resume.qualification ||
    !resume.institution ||
    !resume.endYear ||
    !resume.position ||
    !resume.dates
  )
    missing.push('Complete the required education and internship fields.')
  function saveDraft(edit = false) {
    const saved = {
      ...resume,
      status: missing.length ? 'Need Details' : 'Saved',
    }
    const updated = resumes.some((item) => item.id === resume.id)
      ? resumes.map((item) => (item.id === resume.id ? saved : item))
      : [...resumes, saved]
    if (!saveJobseekerData('resumes', updated)) {
      setError(
        'The draft could not be saved. Try a smaller photo or free some browser storage.'
      )
      return
    }
    navigate(
      edit
        ? `/jobseeker/resume-studio/${resume.id}/edit`
        : '/jobseeker/resume-studio/saved'
    )
  }
  return (
    <div className="js-page">
      <PageHeading
        title="Review your resume"
        subtitle={`${resume.name} · ${resume.title} · Review and complete any missing details.`}
      />
      <div className="js-preview-columns">
        <article className="js-resume-paper" aria-label="Resume preview">
          {resume.includePhoto && resume.photo && (
            <img
              className="js-resume-photo"
              src={resume.photo}
              alt={`${resume.name} resume photo`}
            />
          )}
          <h2>{resume.name}</h2>
          <p>{resume.location}</p>
          <section>
            <h3>CAREER OBJECTIVE</h3>
            <p>{resume.objective}</p>
          </section>
          <section>
            <h3>PERSONAL DETAILS</h3>
            <div className="js-paper-details">
              <span>Address</span>
              <span>{resume.location}</span>
            </div>
            {resume.email && <p>Email · {resume.email}</p>}
            {resume.phone && <p>Phone · {resume.phone}</p>}
          </section>
          <section>
            <h3>EDUCATION</h3>
            <div className="js-between">
              <strong>{resume.qualification}</strong>
              <span>
                {resume.startYear && `${resume.startYear} – `}
                {resume.endYear}
              </span>
            </div>
            <em>{resume.institution}</em>
          </section>
          <section>
            <h3>INTERNSHIP (LATIHAN INDUSTRI)</h3>
            <div className="js-between">
              <strong>{resume.position}</strong>
              <span>{resume.dates}</span>
            </div>
            {resume.company && <p>{resume.company}</p>}
            <em>{resume.workLocation}</em>
            {resume.description && <p>{resume.description}</p>}
          </section>
          {resume.extraWork?.trim() && (
            <section>
              <h3>WORK EXPERIENCE</h3>
              <p>{resume.extraWork}</p>
            </section>
          )}
          {resume.project && (
            <section>
              <h3>PROJECTS</h3>
              <strong>{resume.project}</strong>
              <p>• {resume.projectDescription}</p>
            </section>
          )}
          <section>
            <h3>SKILLS</h3>
            <p>{resume.skills}</p>
          </section>
          <span className="js-page-number">1</span>
        </article>
        <div className="js-stack">
          <Card
            title={
              missing.length
                ? 'Draft · needs your details'
                : 'Ready for your review'
            }
          >
            <p>
              The preview uses only information already entered. Missing facts
              are not invented.
            </p>
            <h3 className="js-accent">
              {missing.length
                ? 'Complete before final PDF export'
                : 'Required details completed'}
            </h3>
            {missing.length > 0 && (
              <ol className="js-missing-list">
                {missing.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            )}
            <p>
              Work history is required when applicable. For a first-time job
              seeker, use genuine internship or project experience instead.
            </p>
          </Card>
          <Card>
            <h3 className="js-accent">Format applied</h3>
            <p className="js-ink">
              Single-column A4 • Colour section headings
              <br />
              Left-aligned content • Right-aligned dates
              <br />
              Education before work and internships
              <br />
              Empty optional sections hidden
            </p>
            <h3>
              Resume photo ·{' '}
              {resume.includePhoto && resume.photo
                ? 'Included'
                : 'Not included'}
            </h3>
            <p>
              Choose Edit draft → Resume photo to upload and tick Include photo
              in resume. Leaving it unticked exports no photo or blank space.
            </p>
          </Card>
          <div className="js-actions">
            <Button onClick={() => saveDraft()}>Save draft</Button>
            <Button variant="tint" onClick={() => saveDraft(true)}>
              Edit draft
            </Button>
          </div>
          <p className="js-small">
            Saving a draft does not certify it is complete. Final export should
            remain unavailable until required facts are supplied.
          </p>
          {error && (
            <p className="js-error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
