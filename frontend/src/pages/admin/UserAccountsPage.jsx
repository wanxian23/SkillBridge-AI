import { useState } from 'react'
import PageHeading from '../../components/admin/PageHeading'
import SectionHeading from '../../components/admin/SectionHeading'
import SearchFilterBar from '../../components/admin/SearchFilterBar'
import ManagementTable from '../../components/admin/ManagementTable'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import { useAdminData } from '../../hooks/useAdminData'
import { ACCOUNT_ROLES, ACCOUNT_STATUSES } from '../../data/adminMockData'

const COLUMNS = [
  { label: 'USER', width: '350fr' },
  { label: 'ROLE', width: '200fr' },
  { label: 'ACCOUNT STATUS', width: '260fr' },
  { label: 'ACTION', width: '204fr' },
]

const FILTER_OPTIONS = [
  { value: 'all', label: 'All roles and statuses' },
  { group: 'Role', options: ACCOUNT_ROLES.map((role) => ({ value: `role:${role}`, label: role })) },
  {
    group: 'Status',
    options: ACCOUNT_STATUSES.map((status) => ({ value: `status:${status}`, label: status })),
  },
]

function matchesFilter(user, filter) {
  if (filter === 'all') return true
  const [kind, value] = filter.split(':')
  return kind === 'role' ? user.role === value : user.status === value
}

export default function UserAccountsPage() {
  const { users } = useAdminData()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const text = query.trim().toLowerCase()
  const shown = users.filter(
    (user) =>
      matchesFilter(user, filter) &&
      (!text || user.name.toLowerCase().includes(text) || user.email.toLowerCase().includes(text)),
  )

  const awaiting = shown.filter((user) => user.status === 'Under review').length
  const suspended = shown.filter((user) => user.status === 'Suspended').length
  const subtitle = [
    `${shown.length} ${shown.length === 1 ? 'account' : 'accounts'} shown`,
    awaiting > 0 && `${awaiting} awaiting review`,
    suspended > 0 && `${suspended} suspended`,
  ]
    .filter(Boolean)
    .join(' · ')

  const rows = shown.map((user) => ({
    key: user.id,
    cells: [
      user.name,
      user.role,
      user.status,
      user.status === 'Under review' ? (
        <Button to={`/admin/users/${user.id}/review`} variant="tint">
          Review account
        </Button>
      ) : user.status === 'Suspended' ? (
        <Button to={`/admin/users/${user.id}/outcome`} variant="tint">
          View outcome
        </Button>
      ) : null,
    ],
  }))

  return (
    <>
      <PageHeading
        title="Manage user accounts"
        subtitle="Search by name or filter by role and status."
      />
      <SectionHeading title="Account directory" subtitle={subtitle} />
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search by name or email"
        filter={filter}
        onFilterChange={setFilter}
        filterOptions={FILTER_OPTIONS}
      />
      <ManagementTable columns={COLUMNS} rows={rows} />
      <Card title="Review before changing access" tone="tint" compact>
        <p>
          Account status controls access to SkillBridge AI. Company verification is reviewed
          separately.
        </p>
      </Card>
    </>
  )
}
