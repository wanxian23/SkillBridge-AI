import { useState } from 'react'
import PageHeading from '../../components/admin/PageHeading'
import SectionHeading from '../../components/admin/SectionHeading'
import SearchFilterBar from '../../components/admin/SearchFilterBar'
import ManagementTable from '../../components/admin/ManagementTable'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import { useAdminData } from '../../hooks/useAdminData'

const COLUMNS = [
  { label: 'CATEGORY', width: '350fr' },
  { label: 'ASSOCIATED SKILLS', width: '664fr' },
]

export default function SkillCategoriesPage() {
  const { categories } = useAdminData()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const filterOptions = [
    { value: 'all', label: 'All categories' },
    ...categories.map((category) => category.name),
  ]

  const text = query.trim().toLowerCase()
  const shown = categories.filter(
    (category) =>
      (filter === 'all' || category.name === filter) &&
      (!text ||
        category.name.toLowerCase().includes(text) ||
        category.skills.some((skill) => skill.toLowerCase().includes(text))),
  )

  const rows = shown.map((category) => ({
    key: category.id,
    cells: [category.name, category.skills.join(', ')],
  }))

  return (
    <>
      <PageHeading
        title="Manage skill categories"
        subtitle="Keep skill tags consistent across the catalogue."
      />
      <SectionHeading
        title="Skill taxonomy"
        subtitle={`${shown.length} ${shown.length === 1 ? 'category' : 'categories'} shown`}
      />
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search category or skill"
        filter={filter}
        onFilterChange={setFilter}
        filterOptions={filterOptions}
      />
      <ManagementTable columns={COLUMNS} rows={rows} />
      <Card title="Use consistent skill labels" tone="tint" compact>
        <p>
          Review similar names before adding skills. Keep categories meaningful so recruiters and
          job seekers can recognise the same skills.
        </p>
      </Card>
      <div>
        <Button to="/admin/learning" style={{ width: 220 }}>
          Back to catalogue
        </Button>
      </div>
    </>
  )
}
