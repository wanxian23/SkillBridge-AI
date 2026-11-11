import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeading from '../../components/admin/PageHeading'
import Card from '../../components/admin/Card'
import Field from '../../components/admin/Field'
import Button from '../../components/admin/Button'
import NotFoundNotice from '../../components/admin/NotFoundNotice'
import { useAdminData } from '../../hooks/useAdminData'
import {
  DIFFICULTY_LEVELS,
  RESOURCE_STATUSES,
  RESOURCE_TYPES,
} from '../../data/adminMockData'

const EMPTY = {
  title: '',
  description: '',
  url: '',
  skill: '',
  type: '',
  level: '',
  duration: '',
  // New resources stay inactive until the link and content have been reviewed.
  status: 'Inactive',
}

function validate(values) {
  const errors = {}
  if (!values.title.trim()) errors.title = 'Enter a resource title.'
  if (!values.description.trim()) errors.description = 'Enter a short description.'
  if (!values.url.trim()) {
    errors.url = 'Enter the link to the course or guide.'
  } else {
    try {
      const url = new URL(values.url.trim())
      if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('protocol')
    } catch {
      errors.url = 'Enter a full link that starts with https://'
    }
  }
  if (!values.skill) errors.skill = 'Select the skill this resource teaches.'
  if (!values.type) errors.type = 'Select a resource type.'
  if (!values.level) errors.level = 'Select a difficulty level.'
  if (!values.duration.trim()) errors.duration = 'Enter the estimated duration, for example 2 hours.'
  if (!values.status) errors.status = 'Select a status.'
  return errors
}

function ResourceForm({ resource }) {
  const navigate = useNavigate()
  const { categories, resources, saveResource } = useAdminData()
  const isEditing = Boolean(resource)

  const [values, setValues] = useState(() => (resource ? { ...EMPTY, ...resource } : EMPTY))
  const [errors, setErrors] = useState({})

  const skillOptions = [
    ...new Set([
      ...categories.flatMap((category) => category.skills),
      ...resources.map((item) => item.skill),
      values.skill,
    ]),
  ].filter(Boolean)

  function bind(name) {
    return {
      value: values[name],
      error: errors[name],
      onChange: (event) => {
        setValues((current) => ({ ...current, [name]: event.target.value }))
        if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
      },
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    saveResource({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      url: values.url.trim(),
      duration: values.duration.trim(),
      id: resource?.id,
    })
    navigate('/admin/learning')
  }

  return (
    <>
      <PageHeading
        title={isEditing ? 'Edit learning resource' : 'Add learning resource'}
        subtitle="Resources connect a skill gap to an external course or guide."
      />
      <form onSubmit={handleSubmit} noValidate className="adm-form">
        <div className="adm-columns">
          <Card title="Resource information">
            <Field label="Resource title" required {...bind('title')} />
            <Field label="Description" required {...bind('description')} />
            <Field label="Resource URL" required type="url" inputMode="url" {...bind('url')} />
            <div className="adm-form-row">
              <Field
                label="Skill"
                required
                as="select"
                placeholder="Select skill"
                options={skillOptions}
                {...bind('skill')}
              />
              <Field
                label="Resource type"
                required
                as="select"
                placeholder="Select resource type"
                options={RESOURCE_TYPES}
                {...bind('type')}
              />
            </div>
            <div className="adm-form-row">
              <Field
                label="Difficulty level"
                required
                as="select"
                placeholder="Select difficulty"
                options={DIFFICULTY_LEVELS}
                {...bind('level')}
              />
              <Field
                label="Estimated duration"
                required
                placeholder="Enter duration, for example 2 hours"
                {...bind('duration')}
              />
            </div>
            <Field
              label="Resource status"
              required
              as="select"
              options={RESOURCE_STATUSES}
              {...bind('status')}
            />
          </Card>

          <Card title="Before you save" tone="tint">
            <p>
              Use a clear title and a direct link to the course or guide. Associate the resource
              with the skill it teaches.
            </p>
            <h2>Active or inactive?</h2>
            <p>
              Active resources are available for recommendations. Keep a new resource inactive until
              its content and link have been reviewed.
            </p>
          </Card>
        </div>

        <div className="adm-actions">
          <Button type="submit" style={{ width: 200 }}>
            {isEditing ? 'Save changes' : 'Save resource'}
          </Button>
          <Button to="/admin/learning" variant="tint" style={{ width: 160 }}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  )
}

export default function ResourceEditorPage() {
  const { id } = useParams()
  const { resources } = useAdminData()
  const resource = id ? resources.find((item) => item.id === id) : undefined

  if (id && !resource) {
    return (
      <NotFoundNotice
        title="Edit learning resource"
        backTo="/admin/learning"
        backLabel="Back to catalogue"
      />
    )
  }

  // key resets the form when switching between resources.
  return <ResourceForm key={id ?? 'new'} resource={resource} />
}
