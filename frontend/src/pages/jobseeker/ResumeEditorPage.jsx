import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { defaultResumes, resumeFields } from '../../data/jobseekerMockData'
import {
  readJobseekerData,
  saveJobseekerData,
} from '../../utils/jobseekerStorage'

// A small input component keeps the editor fields consistent and easy to read.
function Field({ label, name, resume, onChange, placeholder, type = 'text' }) {
  return (
    <label>
      {label}
      <input
        name={name}
        type={type}
        value={resume[name]}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  )
}

export default function ResumeEditorPage() {
  const { resumeId } = useParams()
  const navigate = useNavigate()
  const resumes = readJobseekerData('resumes', defaultResumes)
  const existing = resumes.find((resume) => resume.id === resumeId)
  const [resume, setResume] = useState(
    () =>
      existing || {
        ...resumeFields,
        title: 'Aina Rahman · Junior Software Developer',
      }
  )
  const [error, setError] = useState('')
  const [extraWork, setExtraWork] = useState(resume.extraWork || '')
  function updateField(event) {
    setResume({ ...resume, [event.target.name]: event.target.value })
  }
  function uploadPhoto(event) {
    const file = event.target.files[0]
    if (!file) return
    if (
      !['image/jpeg', 'image/png'].includes(file.type) ||
      file.size > 2 * 1024 * 1024
    ) {
      setError('Choose a JPG or PNG photo under 2 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setResume({ ...resume, photo: reader.result })
      setError('')
    }
    reader.readAsDataURL(file)
  }
  function preview(event) {
    event.preventDefault()
    if (!resume.title.trim() || !resume.name.trim()) {
      setError('Enter a resume title and full name before previewing.')
      return
    }
    const draft = {
      ...resume,
      extraWork,
      id: resumeId || `resume-${Date.now()}`,
      status: 'Need Details',
      summary: resume.objective,
    }
    // Preview first; Save draft on the next page adds it to the resume library.
    if (!saveJobseekerData('working-resume', draft)) {
      setError(
        'Could not save this preview. Try a smaller photo or free some browser storage.'
      )
      return
    }
    navigate(`/jobseeker/resume-studio/${draft.id}/preview`, {
      state: { working: true },
    })
  }
  if (resumeId && !existing)
    return (
      <div className="js-page">
        <PageHeading title="Resume not found" />
        <Button to="/jobseeker/resume-studio">Back to my resumes</Button>
      </div>
    )
  const fieldProps = { resume, onChange: updateField }
  return (
    <form className="js-page js-editor" onSubmit={preview}>
      <PageHeading
        title={resumeId ? 'Edit your resume' : 'Create a new resume'}
        subtitle={
          resumeId
            ? 'Edit the source fields; the preview keeps the same Qarera section order and alignment.'
            : 'Use the Qarera layout, check required details, then generate your draft.'
        }
      />
      <div className="js-columns js-editor-columns">
        <Card title="Resume information">
          <Field label="Resume title" name="title" {...fieldProps} />
          <div className="js-form-grid">
            <Field label="Full name *" name="name" {...fieldProps} />
            <Field label="Location *" name="location" {...fieldProps} />
            <Field
              label="Email *"
              name="email"
              placeholder="Add email address"
              type="email"
              {...fieldProps}
            />
            <Field
              label="Phone *"
              name="phone"
              placeholder="Add phone number"
              type="tel"
              {...fieldProps}
            />
          </div>
          <Field label="Career objective" name="objective" {...fieldProps} />
          <h3 className="js-accent">Education · 1 record</h3>
          <div className="js-form-grid">
            <Field
              label="Qualification *"
              name="qualification"
              {...fieldProps}
            />
            <Field label="Institution *" name="institution" {...fieldProps} />
            <Field
              label="Start year *"
              name="startYear"
              placeholder="Add start year"
              {...fieldProps}
            />
            <Field
              label="End year / graduation *"
              name="endYear"
              {...fieldProps}
            />
          </div>
          <div className="js-actions">
            <h3 className="js-accent">Internship · 1 record</h3>
            <button
              type="button"
              className="js-text-button"
              onClick={() => setExtraWork(extraWork || ' ')}
            >
              + Add work experience
            </button>
          </div>
          <div className="js-form-grid">
            <Field label="Position *" name="position" {...fieldProps} />
            <Field
              label="Company *"
              name="company"
              placeholder="Add company name"
              {...fieldProps}
            />
            <Field label="Location *" name="workLocation" {...fieldProps} />
            <Field label="Dates *" name="dates" {...fieldProps} />
          </div>
          <Field
            label="Brief job description *"
            name="description"
            placeholder="Add your responsibilities and achievements"
            {...fieldProps}
          />
          {extraWork && (
            <label>
              Additional work experience
              <textarea
                value={extraWork}
                onChange={(event) => setExtraWork(event.target.value)}
                placeholder="Position, employer, dates and responsibilities"
              />
            </label>
          )}
          <p className="js-note">
            No work history? Include internship or projects; never invent
            employment.
          </p>
        </Card>
        <div className="js-stack">
          <Card title="Qarera · Malaysia">
            <p className="js-small">A4 · Single column · Dates aligned right</p>
            <div className="js-photo-settings">
              <div className="js-between">
                <h3>Resume photo</h3>
                <span className="js-small">Optional</span>
              </div>
              <div className="js-actions">
                <label className="js-upload">
                  Upload photo
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={uploadPhoto}
                  />
                </label>
                <div>
                  <strong>
                    {resume.photo ? 'Photo uploaded' : 'No photo uploaded'}
                  </strong>
                  <p className="js-note">JPG or PNG · Max 2 MB</p>
                </div>
              </div>
              <label className="js-checkbox">
                <input
                  type="checkbox"
                  checked={resume.includePhoto}
                  disabled={!resume.photo}
                  onChange={(event) =>
                    setResume({ ...resume, includePhoto: event.target.checked })
                  }
                />
                Include photo in resume
              </label>
              <p className="js-small">
                Upload first, then tick to include it. Unticked means no photo
                in the exported resume.
              </p>
            </div>
            <h3>Personal details · Optional</h3>
            <p className="js-small">
              Add nationality, date of birth, address, expected salary or notice
              period. IC number is off by default; include only if requested.
            </p>
            <h3>Additional sections · Optional</h3>
            <p className="js-small">
              + Co-curricular activities · Certifications · Languages · Referees
              (with permission) · LinkedIn / portfolio
            </p>
            <h3>Skills and project evidence</h3>
            <p className="js-small">
              {resume.skills}
              <br />
              {resume.project}
            </p>
          </Card>
          <Card>
            <h3 className="js-accent">Before generating</h3>
            <p className="js-small">
              Missing details are flagged in the draft. Complete required fields
              before export; empty optional sections are omitted.
            </p>
            <p className="js-small">
              AI can refine wording, not create qualifications, employers, dates
              or achievements.
            </p>
          </Card>
        </div>
      </div>
      {error && (
        <p role="alert" className="js-error">
          {error}
        </p>
      )}
      <div>
        <Button type="submit">
          {resumeId ? 'Preview resume' : 'Generate resume draft'}
        </Button>
      </div>
      {!resumeId && (
        <div>
          <Button to="/jobseeker/resume-studio" variant="tint">
            Back to my resumes
          </Button>
        </div>
      )}
    </form>
  )
}
