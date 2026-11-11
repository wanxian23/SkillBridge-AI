import PageHeading from '../../components/jobseeker/PageHeading'
import Card from '../../components/jobseeker/Card'
import Button from '../../components/jobseeker/Button'

export default function SkillGapsPage() {
  return (
    <div className="js-page js-page--compact">
      <PageHeading
        title="Understand your skill gaps"
        subtitle="See what needs attention, then choose how to strengthen your profile."
      />
      <Card title="Junior Software Developer">
        <p>
          Straits Digital · Melaka · 5 required skills · Intermediate
          proficiency
        </p>
      </Card>
      <div className="js-columns">
        <div className="js-stack">
          <Card>
            <div className="js-between">
              <h2>01 · Docker</h2>
              <span className="js-badge">Not evidenced · Mandatory</span>
            </div>
            <strong>Required: Intermediate / Your profile: No evidence</strong>
            <p>
              Add evidence if you already use Docker; otherwise start with the
              fundamentals.
            </p>
            <div className="js-practice">
              Practice: containerise a small Java application and explain how to
              run it.
            </div>
            <div>
              <Button to="/jobseeker/profile/edit#skills">Add skill evidence</Button>
            </div>
          </Card>
          <Card>
            <div className="js-between">
              <h2>02 · Unit testing</h2>
              <span className="js-badge">Partial · Mandatory</span>
            </div>
            <strong>Required: Intermediate / Your profile: Beginner</strong>
            <p>
              Strengthen your testing practice and update your proficiency when
              supported by evidence.
            </p>
            <div className="js-practice">
              Practice: write unit tests for a Java service, including failure
              and edge cases.
            </div>
            <div>
              <Button to="/jobseeker/learning-roadmap">
                View learning steps
              </Button>
            </div>
          </Card>
        </div>
        <Card tint>
          <p className="js-eyebrow">YOUR SKILL COVERAGE</p>
          <strong className="js-number">3 of 5</strong>
          <p className="js-ink">Required skills meet the stated level</p>
          <h3>1 partial · 1 not evidenced</h3>
          <p>
            Not evidenced means your profile does not yet show the skill. It
            does not mean you cannot do it.
          </p>
          <h3>Next step</h3>
          <p className="js-ink">
            Build evidence through focused practice, or add work you have
            already completed.
          </p>
          <Button to="/jobseeker/learning-roadmap">
            Open learning roadmap
          </Button>
        </Card>
      </div>
      <Card>
        <h3 className="js-accent">✓ Java, SQL and Git meet the stated level</h3>
        <p className="js-small">
          Priorities reflect mandatory skills and proficiency gaps. Learning
          completion alone does not verify proficiency.
        </p>
      </Card>
    </div>
  )
}
