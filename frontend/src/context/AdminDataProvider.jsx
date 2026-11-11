import { useMemo, useState } from 'react'
import { AdminDataContext } from './adminDataContext'
import {
  APPROVAL_NOTE,
  INITIAL_RESOURCE_TOTAL,
  initialCategories,
  initialCompanies,
  initialResources,
  initialUsers,
  initialVacancies,
} from '../data/adminMockData'

function formatToday() {
  return new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Holds the admin mock data in memory so decisions made on one page
// (suspend, approve, deactivate, save) show up on the others.
export default function AdminDataProvider({ children }) {
  const [users, setUsers] = useState(initialUsers)
  const [companies, setCompanies] = useState(initialCompanies)
  const [vacancies, setVacancies] = useState(initialVacancies)
  const [resources, setResources] = useState(initialResources)
  const [resourceTotal, setResourceTotal] = useState(INITIAL_RESOURCE_TOTAL)
  const [categories] = useState(initialCategories)

  const value = useMemo(
    () => ({
      users,
      companies,
      vacancies,
      resources,
      resourceTotal,
      categories,

      suspendUser(id) {
        setUsers((list) =>
          list.map((u) => (u.id === id ? { ...u, status: 'Suspended' } : u)),
        )
      },

      decideCompany(id, decision, reason = '') {
        const date = formatToday()
        const note = decision === 'Approved' ? APPROVAL_NOTE : reason
        setCompanies((list) =>
          list.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status: decision,
                  reason,
                  history: [
                    { date, actor: 'Administrator', decision, note },
                    ...c.history,
                  ],
                }
              : c,
          ),
        )
      },

      deactivateVacancy(id) {
        setVacancies((list) =>
          list.map((v) => (v.id === id ? { ...v, status: 'Inactive' } : v)),
        )
      },

      saveResource(resource) {
        if (resource.id) {
          setResources((list) =>
            list.map((r) => (r.id === resource.id ? { ...r, ...resource } : r)),
          )
        } else {
          const id = `r-${Date.now()}`
          setResources((list) => [...list, { ...resource, id, provider: '' }])
          setResourceTotal((n) => n + 1)
        }
      },
    }),
    [users, companies, vacancies, resources, resourceTotal, categories],
  )

  return (
    <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
  )
}
