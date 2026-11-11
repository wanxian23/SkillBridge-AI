import { useParams } from 'react-router-dom'
import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'
import { jobs } from '../../data/jobseekerMockData'
import { jobDetails } from '../../data/jobDetailsMockData'

export default function JobDetailsPage() {
  const { jobId } = useParams()
  const job = jobs.find((item) => item.id === jobId)
  const details = jobDetails[jobId]
  if (!job || !details)
    return (
      <div className="js-page">
        <PageHeading
          title="Job not found"
          subtitle="This vacancy is unavailable."
        />
        <Button to="/jobseeker/jobs">Browse jobs</Button>
      </div>
    )

  return (
    <div className="js-page js-job-details">
      <PageHeading title={job.title} subtitle={details.subtitle} />
      <Card className="js-job-description">
        <div>
          <h4>What you’ll do</h4>
          <p className="js-ink">{details.description}</p>
          <h4>Required skills</h4>
          <p>{details.requiredSkills}</p>
        </div>
        <div>
          <h4>Pay</h4>
          <strong>{job.salary} per month</strong>
          <h4>Requirements</h4>
          <p>{details.requirements}</p>
        </div>
      </Card>
      <div className="js-match-columns">
        <Card tint>
          <p className="js-eyebrow">DOCUMENTED MATCH</p>
          <strong className="js-score">{job.match}%</strong>
          <b className="js-match-label">{details.matchLabel}</b>
          <strong>{details.scoredPoints}</strong>
          <p className="js-match-experience">{details.experienceNote}</p>
          <div className="js-inset">
            <strong>{details.evidenceTitle}</strong>
            <p>
              {details.evidenceDescription}
              {details.possibleRange && (
                <>
                  <br />
                  {details.possibleRange}
                </>
              )}
            </p>
          </div>
          <p className="js-note">
            Requirement coverage, not a hiring probability. Profile information
            is self-reported.
          </p>
        </Card>
        <Card title="How your profile compares">
          <div className="js-comparison js-comparison--skills">
            <div className="js-between">
              <strong>Skills &amp; proficiency</strong>
              <b>{details.skillPoints}</b>
            </div>
            <p>{details.skillRequirement}</p>
            <p>{details.skillComparison}</p>
          </div>
          <div className="js-comparison js-comparison--education">
            <div className="js-between">
              <strong>Education &amp; credentials</strong>
              <b className="js-accent">10 / 10 pts</b>
            </div>
            <p>
              IT degree or equivalent → Bachelor of Information Technology, UTeM
            </p>
            <p className="js-accent">Meets the stated education requirement</p>
          </div>
          <div className="js-comparison js-comparison--experience">
            <div className="js-between">
              <strong>Relevant experience</strong>
              <b>Not scored</b>
            </div>
            <p>{details.experienceRequirement}</p>
            <p>Your record: IT Intern · Feb–Jul 2026</p>
          </div>
          <div className="js-comparison">
            <p className="js-practical-heading">
              Practical fit · Not included in the score
            </p>
            <div className="js-practical">
              <div>
                Location<p>{details.locationComparison}</p>
              </div>
              <div>
                Salary preference<p>Not provided</p>
              </div>
              <div>
                Work setup<p>{details.workSetup}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      {details.showApplicationActions ? (
        <>
          <div className="js-actions js-job-actions">
            <Button to={`/jobseeker/jobs/${job.id}/apply`}>
              Apply with resume
            </Button>
            <Button to="/jobseeker/skill-gaps" variant="tint">
              View skill gaps
            </Button>
          </div>
          <div className="js-job-resume-action">
            <Button to="/jobseeker/resume-studio/new" variant="outline">
              Generate resume for this job
            </Button>
          </div>
        </>
      ) : (
        <div className="js-job-actions">
          <Button to="/jobseeker/jobs">Back to browse jobs</Button>
        </div>
      )}
    </div>
  )
}
