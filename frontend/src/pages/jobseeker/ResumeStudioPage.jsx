import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { defaultResumes } from '../../data/jobseekerMockData'
import { readJobseekerData } from '../../utils/jobseekerStorage'

export default function ResumeStudioPage() {
  const resumes = readJobseekerData('resumes', defaultResumes)
  return (
    <div className="js-page js-library">
      <PageHeading
        title="Resume studio"
        subtitle="Manage your saved resumes or create a new version for your next application."
      />
      <div className="js-between js-library-heading">
        <div>
          <h2>Your resumes</h2>
          <p>
            {resumes.length} saved versions · Choose a resume to review or edit.
          </p>
        </div>
        <Button to="/jobseeker/resume-studio/new">Create new resume</Button>
      </div>
      <div className="js-columns js-profile-columns">
        <div className="js-stack">
          {resumes.map((resume) => (
            <Card key={resume.id}>
              <div className="js-between">
                <h2>{resume.title}</h2>
                <span
                  className={`js-badge ${resume.status === 'Need Details' ? 'js-badge--warning' : ''}`}
                >
                  {resume.status}
                </span>
              </div>
              <p>{resume.summary}</p>
              {resume.status !== 'Need Details' && (
                <p className="js-small">
                  Qarera layout · A4 · {resume.name} · {resume.title}
                </p>
              )}
              <div className="js-actions">
                {resume.status !== 'Need Details' && (
                  <Button
                    to={`/jobseeker/resume-studio/${resume.id}/preview`}
                    variant="tint"
                  >
                    Preview
                  </Button>
                )}
                <Button
                  to={`/jobseeker/resume-studio/${resume.id}/edit`}
                  variant="tint"
                >
                  {resume.status === 'Need Details'
                    ? 'Continue editing'
                    : 'Edit resume'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <Card title="A version for each opportunity" tint>
          <p>
            Keep different resumes for different roles. Give each one a clear
            title so it is easy to select when applying.
          </p>
          <h3>Before you apply</h3>
          <p>
            Preview the chosen version and check your facts. You will choose
            which resume to attach on Review Application.
          </p>
          <h3>Saved does not mean complete</h3>
          <p>
            Finish any missing details before submitting a resume to an
            employer.
          </p>
        </Card>
      </div>
    </div>
  )
}
