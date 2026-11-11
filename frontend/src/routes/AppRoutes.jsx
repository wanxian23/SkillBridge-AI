
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import DashboardPage from '../pages/jobseeker/DashboardPage'

import AdminDataProvider from '../context/AdminDataProvider'
import AdminLayout from '../layouts/AdminLayout'
import AdminDashboardPage from '../pages/admin/DashboardPage'
import UserAccountsPage from '../pages/admin/UserAccountsPage'
import UserReviewPage from '../pages/admin/UserReviewPage'
import UserOutcomePage from '../pages/admin/UserOutcomePage'
import CompanyVerificationPage from '../pages/admin/CompanyVerificationPage'
import CompanyReviewPage from '../pages/admin/CompanyReviewPage'
import CompanyEvidencePage from '../pages/admin/CompanyEvidencePage'
import CompanyRequestChangesPage from '../pages/admin/CompanyRequestChangesPage'
import CompanyRejectPage from '../pages/admin/CompanyRejectPage'
import CompanyDecisionPage from '../pages/admin/CompanyDecisionPage'
import VacancyModerationPage from '../pages/admin/VacancyModerationPage'
import VacancyReviewPage from '../pages/admin/VacancyReviewPage'
import VacancyOutcomePage from '../pages/admin/VacancyOutcomePage'
import LearningCataloguePage from '../pages/admin/LearningCataloguePage'
import ResourceEditorPage from '../pages/admin/ResourceEditorPage'
import SkillCategoriesPage from '../pages/admin/SkillCategoriesPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobseeker/dashboard" element={<DashboardPage />} />

        {/* Administrator workspace (not protected by real authentication yet) */}
        <Route
          path="/admin"
          element={
            <AdminDataProvider>
              <AdminLayout />
            </AdminDataProvider>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />

          <Route path="users" element={<UserAccountsPage />} />
          <Route path="users/:id/review" element={<UserReviewPage />} />
          <Route path="users/:id/outcome" element={<UserOutcomePage />} />

          <Route path="companies" element={<CompanyVerificationPage />} />
          <Route path="companies/:id" element={<CompanyReviewPage />} />
          <Route path="companies/:id/evidence" element={<CompanyEvidencePage />} />
          <Route path="companies/:id/request-changes" element={<CompanyRequestChangesPage />} />
          <Route path="companies/:id/reject" element={<CompanyRejectPage />} />
          <Route path="companies/:id/decision" element={<CompanyDecisionPage />} />

          <Route path="vacancies" element={<VacancyModerationPage />} />
          <Route path="vacancies/:id/review" element={<VacancyReviewPage />} />
          <Route path="vacancies/:id/outcome" element={<VacancyOutcomePage />} />

          <Route path="learning" element={<LearningCataloguePage />} />
          <Route path="learning/new" element={<ResourceEditorPage />} />
          <Route path="learning/skills" element={<SkillCategoriesPage />} />
          <Route path="learning/:id/edit" element={<ResourceEditorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
