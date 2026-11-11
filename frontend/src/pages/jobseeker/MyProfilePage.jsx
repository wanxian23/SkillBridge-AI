import { Link, useLocation } from 'react-router-dom'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { defaultProfile } from '../../data/jobseekerMockData'
import { readJobseekerData } from '../../utils/jobseekerStorage'

// Display saved information here; the separate edit page owns the form state.
export default function MyProfilePage() {
  const profile = {
    ...defaultProfile,
    ...readJobseekerData('profile', defaultProfile),
  }
  const { state } = useLocation()
  return (
    <div className="js-page js-profile-overview">
      <div className="js-profile-heading">
        <PageHeading
          title="My profile"
          subtitle="View the career details used to personalise your job matches."
        />
        <Link
          className="js-button js-button--primary js-profile-edit-link"
          to="/jobseeker/profile/edit"
        >
          Edit profile
        </Link>
      </div>
      {state?.profileSaved && (
        <p className="js-feedback" role="status">
          Profile saved. Your changes have been saved.
        </p>
      )}
      <div className="js-columns js-profile-columns">
        <div className="js-stack">
          <Card title="Personal information">
            <div className="js-form-grid">
              <div className="js-profile-detail">
                <h4>Full name</h4>
                <p>{profile.name || 'Not provided'}</p>
              </div>
              <div className="js-profile-detail">
                <h4>Location</h4>
                <p>{profile.location || 'Not provided'}</p>
              </div>
            </div>
          </Card>
          <Card title="Career direction">
            <div className="js-profile-detail">
              <h4>Career interest</h4>
              <p>{profile.interest || 'Not provided'}</p>
            </div>
            <div className="js-profile-detail">
              <h4>Career summary</h4>
              <p>{profile.summary || 'Not provided'}</p>
            </div>
          </Card>
          <Card title="Education & experience">
            {profile.education.map((entry) => (
              <div className="js-profile-detail" key={entry.id}>
                <h3>
                  {[entry.qualification, entry.fieldOfStudy]
                    .filter(Boolean)
                    .join(' · ')}
                </h3>
                <p>{entry.institution}</p>
                {(entry.startDate || entry.endDate) && (
                  <p>
                    {[entry.startDate, entry.endDate].filter(Boolean).join('–')}
                  </p>
                )}
                {entry.result && <p>Result: {entry.result}</p>}
              </div>
            ))}
            {profile.education.length === 0 && (
              <p>No education records added.</p>
            )}
            {profile.experience.map((entry) => (
              <div className="js-profile-detail" key={entry.id}>
                <h3>{entry.jobTitle}</h3>
                {(entry.company || entry.employmentType) && (
                  <p>
                    {[entry.company, entry.employmentType]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
                {(entry.location || entry.startDate || entry.endDate) && (
                  <p>
                    {[
                      entry.location,
                      [entry.startDate, entry.endDate]
                        .filter(Boolean)
                        .join('–'),
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
                {entry.responsibilities && <p>{entry.responsibilities}</p>}
              </div>
            ))}
            {profile.experience.length === 0 && (
              <p>No work experience records added.</p>
            )}
            <p className="js-small">
              Keep your employment dates and responsibilities accurate.
            </p>
          </Card>
          <section id="skills" className="js-card">
            <h2>Skills &amp; evidence</h2>
            <div className="js-profile-detail">
              <h4>Skills</h4>
              <p>{profile.skills || 'Not provided'}</p>
            </div>
            <div className="js-profile-detail">
              <h4>Skill evidence</h4>
              <p>{profile.evidence || 'Not provided'}</p>
            </div>
          </section>
        </div>
        <div className="js-stack">
          <Card title="Current employment" tint>
            <div className="js-profile-detail">
              <h4>Current employment status</h4>
              <p>{profile.employment || 'Not provided'}</p>
            </div>
            <p>
              You can explore new roles whether you are currently working or
              not.
            </p>
          </Card>
          <Card title="Profile visibility">
            <div className="js-profile-detail">
              <h4>Who can see your profile?</h4>
              <p>{profile.visibility || 'Not provided'}</p>
            </div>
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
    </div>
  )
}
