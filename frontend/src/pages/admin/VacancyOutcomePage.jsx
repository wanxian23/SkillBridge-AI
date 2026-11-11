import { useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import DetailCard from '../../components/admin/DetailCard'
import Button from '../../components/admin/Button'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import { useAdminData } from '../../hooks/useAdminData'

export default function VacancyOutcomePage() {
  const { id } = useParams()
  const { vacancies } = useAdminData()
  const vacancy = vacancies.find((item) => item.id === id)

  if (!vacancy) {
    return (
      <NotFoundNotice
        title="Listing status updated"
        backTo="/admin/vacancies"
        backLabel="Back to moderation"
      />
    )
  }

  return (
    <>
      <PageHeading
        title="Listing status updated"
        subtitle={`${vacancy.title} · Sample listing`}
      />
      <DetailCard
        title="Deactivation confirmed"
        items={[
          { label: 'Vacancy', value: vacancy.title },
          { label: 'Employer', value: vacancy.employer },
          { label: 'New status', value: vacancy.status },
          {
            label: 'Effect',
            value: 'Job seekers will no longer find this listing in job discovery.',
          },
        ]}
      />
      <div>
        <Button to="/admin/vacancies" style={{ width: 240 }}>
          Back to moderation
        </Button>
      </div>
    </>
  )
}
