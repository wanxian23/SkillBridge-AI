import { useContext } from 'react'
import { AdminDataContext } from '../context/adminDataContext'

export function useAdminData() {
  const value = useContext(AdminDataContext)
  if (!value) {
    throw new Error('useAdminData must be used inside <AdminDataProvider>')
  }
  return value
}
