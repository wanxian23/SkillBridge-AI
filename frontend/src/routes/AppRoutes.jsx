import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import DashboardPage from '../pages/jobseeker/DashboardPage'
import BrowseJobPage from '../pages/jobseeker/BrowseJobPage'
import JobDetailsPage from '../pages/jobseeker/JobDetailsPage'
import SkillGapsPage from '../pages/jobseeker/SkillGapsPage'
import LearningRoadmapPage from '../pages/jobseeker/LearningRoadmapPage'
import ResumeStudioPage from '../pages/jobseeker/ResumeStudioPage'
import ResumeEditorPage from '../pages/jobseeker/ResumeEditorPage'
import ResumePreviewPage from '../pages/jobseeker/ResumePreviewPage'
import ResumeSavedPage from '../pages/jobseeker/ResumeSavedPage'
import ReviewApplicationPage from '../pages/jobseeker/ReviewApplicationPage'
import ApplicationSubmittedPage from '../pages/jobseeker/ApplicationSubmittedPage'
import ApplicationsPage from '../pages/jobseeker/ApplicationsPage'
import MyProfilePage from '../pages/jobseeker/MyProfilePage'
import EditProfilePage from '../pages/jobseeker/EditProfilePage'
import JobSeekerLayout from '../layouts/JobSeekerLayout'
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
import HrWorkspace from '../pages/hr/HrWorkspace'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hr/*" element={<HrWorkspace />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobseeker" element={<JobSeekerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="jobs" element={<BrowseJobPage />} />
          <Route path="jobs/:jobId" element={<JobDetailsPage />} />
          <Route path="jobs/:jobId/apply" element={<ReviewApplicationPage />} />
          <Route path="jobs/:jobId/submitted" element={<ApplicationSubmittedPage />} />
          <Route path="skill-gaps" element={<SkillGapsPage />} />
          <Route path="learning-roadmap" element={<LearningRoadmapPage />} />
          <Route path="resume-studio" element={<ResumeStudioPage />} />
          <Route path="resume-studio/new" element={<ResumeEditorPage key="new" />} />
          <Route path="resume-studio/saved" element={<ResumeSavedPage />} />
          <Route path="resume-studio/:resumeId/edit" element={<ResumeEditorPage />} />
          <Route path="resume-studio/:resumeId/preview" element={<ResumePreviewPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="profile" element={<MyProfilePage />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
        </Route>

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





