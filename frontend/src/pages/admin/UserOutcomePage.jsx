import { useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import DetailCard from '../../components/admin/DetailCard'
import Button from '../../components/admin/Button'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import { useAdminData } from '../../hooks/useAdminData'

export default function UserOutcomePage() {
  const { id } = useParams()
  const { users } = useAdminData()
  const user = users.find((item) => item.id === id)

  if (!user) {
    return <NotFoundNotice title="Account status updated" backTo="/admin/users" backLabel="Back to accounts" />
  }

  return (
    <>
      <PageHeading title="Account status updated" subtitle={`${user.name} · ${user.role}`} />
      <DetailCard
        title="Suspension confirmed"
        items={[
          { label: 'Account', value: `${user.name} · ${user.role}` },
          { label: 'New status', value: user.status },
          { label: 'Effect', value: 'This account can no longer sign in to SkillBridge AI.' },
        ]}
      />
      <div>
        <Button to="/admin/users" style={{ width: 220 }}>
          Back to accounts
        </Button>
      </div>
    </>
  )
}
