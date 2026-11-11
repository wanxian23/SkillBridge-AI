import PageHeading from '../../components/admin/PageHeading'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import HistoryEntries from '../../components/admin/HistoryEntries'
import { useAdminData } from '../../hooks/useAdminData'
import { plural } from '../../utils/plural'

const CONTEXT = 'ADMINISTRATOR · Employer verification'

export default function CompanyVerificationPage() {
  const { companies } = useAdminData()
  const pending = companies.filter((company) => company.status === 'Awaiting review')
  const history = companies.flatMap((company) => company.history)

  if (pending.length === 0) {
    return (
      <>
        <PageHeading
          title="Company verification"
          subtitle="No submissions are currently awaiting review."
          context={CONTEXT}
          showUser={false}
        />
        <Card title="✓  Review queue is clear" tone="tint" titleTone="accent" compact>
          <p className="adm-ink">New submissions and resubmissions will appear here.</p>
        </Card>
        <Card title="Review history" compact>
          <p>
            Decisions are retained with the reviewer, time and reason. Company verification remains
            separate from user account status.
          </p>
          {history.length > 0 && <HistoryEntries entries={history} />}
        </Card>
        <div>
          <Button to="/admin/dashboard" style={{ width: 290 }}>
            Return to admin overview
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeading
        title="Company verification"
        subtitle="Review employer identity and authority before enabling recruitment."
        context={CONTEXT}
        showUser={false}
      />
      <Card
        title={`${plural(pending.length, 'company', 'companies')} awaiting review`}
        tone="tint"
        titleTone="accent"
        compact
      >
        <p className="adm-ink">
          New employers cannot publish vacancies or access applicant information until approved.
        </p>
      </Card>

      <Card title="Pending review" compact>
        {pending.map((company) => (
          <div key={company.id} className="adm-stack">
            <p>
              <strong className="adm-ink">{company.name}</strong>
              <br />
              Recruiter: {company.recruiter} · Submitted: {company.submitted} · Status:{' '}
              {company.status}
            </p>
            <div>
              <Button to={`/admin/companies/${company.id}`} variant="tint" style={{ width: 240 }}>
                Review submission
              </Button>
            </div>
          </div>
        ))}
      </Card>

      <Card title="Review consistently" compact>
        <p>
          Compare company registration details with the appropriate official record. Confirm the
          representative’s authority. Record your decision and a reason when requesting changes or
          rejecting.
        </p>
      </Card>
    </>
  )
}
