import { useState } from 'react'
import PageHeading from '../../components/admin/PageHeading'
import SectionHeading from '../../components/admin/SectionHeading'
import SearchFilterBar from '../../components/admin/SearchFilterBar'
import ManagementTable from '../../components/admin/ManagementTable'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import { useAdminData } from '../../hooks/useAdminData'

const COLUMNS = [
  { label: 'RESOURCE', width: '350fr' },
  { label: 'SKILL', width: '180fr' },
  { label: 'LEVEL / DURATION', width: '280fr' },
  { label: 'ACTION', width: '204fr' },
]

export default function LearningCataloguePage() {
  const { resources, resourceTotal } = useAdminData()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const skills = [...new Set(resources.map((resource) => resource.skill))]
  const filterOptions = [{ value: 'all', label: 'All skills' }, ...skills]

  const text = query.trim().toLowerCase()
  const shown = resources.filter(
    (resource) =>
      (filter === 'all' || resource.skill === filter) &&
      (!text ||
        resource.title.toLowerCase().includes(text) ||
        resource.skill.toLowerCase().includes(text)),
  )

  const rows = shown.map((resource) => ({
    key: resource.id,
    cells: [
      <>
        {resource.title}
        {resource.provider && <span className="adm-cell-sub">{resource.provider}</span>}
      </>,
      resource.skill,
      [resource.level, resource.duration].filter(Boolean).join(' · '),
      <Button to={`/admin/learning/${resource.id}/edit`} variant="tint">
        Edit resource
      </Button>,
    ],
  }))

  return (
    <>
      <PageHeading
        title="Maintain learning resources"
        subtitle="Manage external courses, skill tags and the resources available for role-based recommendations."
      />
      <SectionHeading
        title="Resource catalogue"
        subtitle={`${shown.length} of ${resourceTotal} resources shown`}
        action={
          <Button to="/admin/learning/new" style={{ width: 220 }}>
            Add resource
          </Button>
        }
      />
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        searchPlaceholder="Search by resource title or skill"
        filter={filter}
        onFilterChange={setFilter}
        filterOptions={filterOptions}
      />
      <ManagementTable columns={COLUMNS} rows={rows} />
      <Card title="Keep recommendations useful" tone="tint" compact>
        <p>
          Check the external link, associated skill, difficulty and estimated duration before making
          a resource active.
        </p>
        <div>
          <Button to="/admin/learning/skills" variant="outline" style={{ width: 200 }}>
            Skill categories
          </Button>
        </div>
      </Card>
    </>
  )
}
