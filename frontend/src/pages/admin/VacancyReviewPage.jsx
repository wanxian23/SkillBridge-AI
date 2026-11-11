import { useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import DetailCard from '../../components/admin/DetailCard'
import DecisionPanel from '../../components/admin/DecisionPanel'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import { useAdminData } from '../../hooks/useAdminData'

export default function VacancyReviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { vacancies, deactivateVacancy } = useAdminData()
  const vacancy = vacancies.find((item) => item.id === id)

  if (!vacancy) {
    return (
      <NotFoundNotice
        title="Review flagged vacancy"
        backTo="/admin/vacancies"
        backLabel="Back to moderation"
      />
    )
  }

  const canDeactivate = vacancy.status === 'Flagged'

  function confirmDeactivation() {
    deactivateVacancy(vacancy.id)
    navigate(`/admin/vacancies/${vacancy.id}/outcome`)
  }

  return (
    <>
      <PageHeading
        title="Review flagged vacancy"
        subtitle={`${vacancy.title} · Sample listing`}
      />
      <div className="adm-columns">
        <div className="adm-stack">
          <DetailCard
            title="Listing information"
            items={[
              { label: 'Job title', value: vacancy.title },
              { label: 'Employer', value: vacancy.employer },
              {
                label: 'Current status',
                value: vacancy.status === 'Flagged' ? 'Flagged for review' : vacancy.status,
              },
            ]}
          />
          <DetailCard
            title="Reported issue"
            items={[
              {
                label: 'Report summary',
                value: vacancy.summary ?? 'No report summary has been recorded.',
              },
              {
                label: 'Review evidence',
                value: 'Compare the reported issue with the original listing before taking action.',
              },
            ]}
          />
        </div>
        <DecisionPanel
          title="Deactivate this listing?"
          description="Deactivation removes this vacancy from job discovery. It does not suspend the employer’s account."
          confirmLabel="Confirm deactivation"
          onConfirm={confirmDeactivation}
          confirmDisabled={!canDeactivate}
          cancelLabel="Cancel review"
          cancelTo="/admin/vacancies"
        />
      </div>
    </>
  )
}
