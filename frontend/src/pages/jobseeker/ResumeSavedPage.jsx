import PageHeading from '../../components/jobseeker/PageHeading'
import Button from '../../components/jobseeker/Button'

export default function ResumeSavedPage() {
  return (
    <div className="js-page">
      <PageHeading
        title="Resume saved"
        subtitle="Your draft is saved. Complete required details before attaching it to an application."
      />
      <div className="js-feedback">
        <strong>✓ Resume saved</strong>
        <p>Qarera Malaysia · Draft saved · Review required details</p>
      </div>
      <div className="js-actions">
        <Button to="/jobseeker/jobs/junior-software-developer/apply">
          Review application
        </Button>
        <Button to="/jobseeker/resume-studio" variant="tint">
          Back to my resumes
        </Button>
      </div>
    </div>
  )
}
