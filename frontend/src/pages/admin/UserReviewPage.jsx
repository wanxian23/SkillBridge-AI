import { useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import DetailCard from '../../components/admin/DetailCard'
import DecisionPanel from '../../components/admin/DecisionPanel'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import { useAdminData } from '../../hooks/useAdminData'

export default function UserReviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { users, suspendUser } = useAdminData()
  const user = users.find((item) => item.id === id)

  if (!user) {
    return <NotFoundNotice title="Review account activity" backTo="/admin/users" backLabel="Back to accounts" />
  }

  const canSuspend = user.status === 'Under review'

  function confirmSuspension() {
    suspendUser(user.id)
    navigate(`/admin/users/${user.id}/outcome`)
  }

  return (
    <>
      <PageHeading title="Review account activity" subtitle={`${user.name} · ${user.role}`} />
      <div className="adm-columns">
        <div className="adm-stack">
          <DetailCard
            title="Account information"
            items={[
              { label: 'Full name', value: user.name },
              { label: 'Role', value: user.role },
              { label: 'Current status', value: user.status },
            ]}
          />
          <DetailCard
            title="Review context"
            items={[
              {
                label: 'Reason for review',
                value: user.reviewReason ?? 'No reason has been recorded for this account.',
              },
              {
                label: 'Evidence',
                value:
                  'Detailed activity evidence is unavailable here. Check the supporting record before confirming suspension.',
              },
            ]}
          />
        </div>
        <DecisionPanel
          title="Suspend this account?"
          description="Suspension prevents this user from signing in. Confirm the account and review context before proceeding."
          confirmLabel="Confirm suspension"
          onConfirm={confirmSuspension}
          confirmDisabled={!canSuspend}
          cancelLabel="Cancel review"
          cancelTo="/admin/users"
        />
      </div>
    </>
  )
}
