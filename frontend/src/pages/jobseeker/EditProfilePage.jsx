import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import ProfileEntryDialog from '../../components/jobseeker/ProfileEntryDialog'
import { defaultProfile } from '../../data/jobseekerMockData'
import {
  readJobseekerData,
  saveJobseekerData,
} from '../../utils/jobseekerStorage'

export default function EditProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(() => ({
    ...defaultProfile,
    ...readJobseekerData('profile', defaultProfile),
  }))
  const [entryEditor, setEntryEditor] = useState(null)
  const [message, setMessage] = useState('')
  function updateField(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
    setMessage('')
  }
  function saveProfile(event) {
    event.preventDefault()
    if (saveJobseekerData('profile', profile)) {
      navigate('/jobseeker/profile', { state: { profileSaved: true } })
    } else {
      setMessage('Your changes could not be saved. Please try again.')
    }
  }
  function saveEntry(entry) {
    const type = entryEditor.type
    const records = profile[type]
    const updated = entryEditor.entry
      ? records.map((record) => (record.id === entry.id ? entry : record))
      : [...records, entry]
    setProfile({ ...profile, [type]: updated })
    setEntryEditor(null)
    setMessage('')
  }
  return (
    <form className="js-page" onSubmit={saveProfile}>
      <PageHeading
        title="Edit profile"
        subtitle="Keep your career information up to date for clearer job comparisons."
      />
      <div className="js-columns js-profile-columns">
        <div className="js-stack">
          <Card title="Personal information">
            <div className="js-form-grid">
              <label>
                Full name
                <input
                  name="name"
                  value={profile.name}
                  onChange={updateField}
                  required
                />
              </label>
              <label>
                Location
                <input
                  name="location"
                  value={profile.location}
                  onChange={updateField}
                  required
                />
              </label>
            </div>
          </Card>
          <Card title="Career direction">
            <label>
              Career interest
              <input
                name="interest"
                value={profile.interest}
                onChange={updateField}
              />
            </label>
            <label>
              Career summary
              <input
                name="summary"
                value={profile.summary}
                onChange={updateField}
              />
            </label>
          </Card>
          <Card title="Education & experience">
            <section
              className="js-profile-entries"
              aria-label="Education entries"
            >
              <h3>Education</h3>
              {profile.education.map((entry, index) => (
                <div className="js-profile-entry" key={entry.id}>
                  <p>
                    {[
                      entry.qualification,
                      entry.fieldOfStudy,
                      entry.institution,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <div className="js-entry-actions">
                    <button
                      type="button"
                      className="js-entry-button"
                      onClick={() =>
                        setEntryEditor({ type: 'education', entry })
                      }
                    >
                      Edit entry
                    </button>
                    {index === profile.education.length - 1 && (
                      <button
                        type="button"
                        className="js-entry-button"
                        onClick={() => setEntryEditor({ type: 'education' })}
                      >
                        + Add education
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {profile.education.length === 0 && (
                <>
                  <p>No education records added.</p>
                  <button
                    type="button"
                    className="js-entry-button"
                    onClick={() => setEntryEditor({ type: 'education' })}
                  >
                    + Add education
                  </button>
                </>
              )}
            </section>
            <section
              className="js-profile-entries"
              aria-label="Work experience entries"
            >
              <h3>Work experience</h3>
              {profile.experience.map((entry, index) => (
                <div className="js-profile-entry" key={entry.id}>
                  <p>
                    {entry.jobTitle}
                    {entry.startDate || entry.endDate
                      ? ` · ${[entry.startDate, entry.endDate].filter(Boolean).join('–')}`
                      : ''}
                  </p>
                  <div className="js-entry-actions">
                    <button
                      type="button"
                      className="js-entry-button"
                      onClick={() =>
                        setEntryEditor({ type: 'experience', entry })
                      }
                    >
                      Edit entry
                    </button>
                    {index === profile.experience.length - 1 && (
                      <button
                        type="button"
                        className="js-entry-button"
                        onClick={() => setEntryEditor({ type: 'experience' })}
                      >
                        + Add work experience
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {profile.experience.length === 0 && (
                <>
                  <p>No work experience records added.</p>
                  <button
                    type="button"
                    className="js-entry-button"
                    onClick={() => setEntryEditor({ type: 'experience' })}
                  >
                    + Add work experience
                  </button>
                </>
              )}
            </section>
          </Card>
          <section id="skills" className="js-card">
            <h2>Skills &amp; evidence</h2>
            <label>
              Skills
              <input
                name="skills"
                value={profile.skills}
                onChange={updateField}
              />
            </label>
            <label htmlFor="profile-skill-evidence">Skill evidence</label>
            <textarea
              id="profile-skill-evidence"
              name="evidence"
              value={profile.evidence}
              onChange={updateField}
              rows="2"
            />
          </section>
        </div>
        <div className="js-stack">
          <Card title="Current employment" tint>
            <label>
              Current employment status
              <select
                name="employment"
                value={profile.employment}
                onChange={updateField}
              >
                <option value="">Select status</option>
                <option>Employed</option>
                <option>Self-employed</option>
                <option>Not currently employed</option>
                <option>Prefer not to say</option>
              </select>
            </label>
            <p>
              You can explore new roles whether you are currently working or
              not.
            </p>
          </Card>
          <Card title="Profile visibility">
            <label>
              Who can see your profile?
              <select
                name="visibility"
                value={profile.visibility}
                onChange={updateField}
              >
                <option>Visible to recruiters</option>
                <option>Private</option>
              </select>
            </label>
            <p>
              Your employment status is separate from your skills and
              experience. It does not add or remove match points.
            </p>
          </Card>
          <Card title="Make your profile useful">
            <p>
              Describe what you have done, add relevant skills and keep your
              education and work history current.
            </p>
            <Button to="/jobseeker/skill-gaps" variant="tint">
              Review skill gaps
            </Button>
          </Card>
        </div>
      </div>
      <div className="js-actions js-profile-edit-actions">
        <button className="js-button js-button--primary" type="submit">
          Save profile
        </button>
        <Link className="js-button js-button--tint" to="/jobseeker/profile">
          Cancel
        </Link>
      </div>
      {message && (
        <p className="js-feedback" role="status">
          {message}
        </p>
      )}
      {entryEditor && (
        <ProfileEntryDialog
          type={entryEditor.type}
          entry={entryEditor.entry}
          onSave={saveEntry}
          onCancel={() => setEntryEditor(null)}
        />
      )}
    </form>
  )
}
