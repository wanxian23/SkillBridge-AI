import { useState } from 'react'
import PageHeading from '../../components/admin/PageHeading'
import SectionHeading from '../../components/admin/SectionHeading'
import SearchFilterBar from '../../components/admin/SearchFilterBar'
import ManagementTable from '../../components/admin/ManagementTable'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import { useAdminData } from '../../hooks/useAdminData'

const COLUMNS = [
  { label: 'VACANCY / EMPLOYER', width: '350fr' },
  { label: 'STATUS', width: '180fr' },
  { label: 'REVIEW REASON', width: '280fr' },
  { label: 'ACTION', width: '204fr' },
]

const FILTER_OPTIONS = [
  { value: 'all', label: 'All listing statuses' },
  'Published',
  'Flagged',
  'Inactive',
]

export default function VacancyModerationPage() {
  const { vacancies } = useAdminData()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const text = query.trim().toLowerCase()
  const shown = vacancies.filter(
    (vacancy) =>
      (filter === 'all' || vacancy.status === filter) &&
      (!text ||
        vacancy.title.toLowerCase().includes(text) ||
        vacancy.employer.toLowerCase().includes(text)),
  )

  const flagged = shown.filter((vacancy) => vacancy.status === 'Flagged').length
  const inactive = shown.filter((vacancy) => vacancy.status === 'Inactive').length
  const subtitle = [
    `${shown.length} ${shown.length === 1 ? 'listing' : 'listings'} shown`,
    flagged > 0 && `${flagged} flagged for review`,
    inactive > 0 && `${inactive} inactive`,
  ]
    .filter(Boolean)
    .join(' · ')

  const rows = shown.map((vacancy) => ({
    key: vacancy.id,
    cells: [
      <>
        {vacancy.title}
        <span className="adm-cell-sub">{vacancy.employer}</span>
      </>,
      vacancy.status,
      vacancy.reason || 'No report shown',
      vacancy.status === 'Flagged' ? (
        <Button to={`/admin/vacancies/${vacancy.id}/review`} variant="tint">
          Review listing
        </Button>
      ) : vacancy.status === 'Inactive' && vacancy.reason ? (
        <Button to={`/admin/vacancies/${vacancy.id}/outcome`} variant="tint">
          View outcome
        </Button>
      ) : null,
    ],
  }))

  return (
    <>
      <PageHeading
        title="Vacancy moderation"
        subtitle="Review listing details and decide whether a listing can remain published."
      />
      <SectionHeading title="Moderation queue" subtitle={subtitle} />
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search by job title or employer"
        filter={filter}
        onFilterChange={setFilter}
        filterOptions={FILTER_OPTIONS}
      />
      <ManagementTable columns={COLUMNS} rows={rows} />
      <Card title="A report needs review" tone="tint" compact>
        <p>Check the listing and supporting information before changing its visibility.</p>
      </Card>
    </>
  )
}
