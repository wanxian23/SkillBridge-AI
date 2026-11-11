import { Outlet } from 'react-router-dom'
import JobSeekerSidebar from '../components/jobseeker/JobSeekerSidebar'
import JobSeekerHeader from '../components/jobseeker/JobSeekerHeader'
import Footer from '../components/common/Footer'
import '../styles/jobseeker/JobSeekerLayout.css'
import '../styles/jobseeker/JobSeekerPages.css'

export default function JobSeekerLayout() {
  return (
    <div className="jobseeker-layout">
      <JobSeekerSidebar />

      <div className="jobseeker-main">
        <JobSeekerHeader />

        <main className="jobseeker-content">
            {/* Outlet below referring to the nested routes
                which means it is linked to file like DashboardPage.jsx, BrowseJobPage.jsx, SkillGapsPage.jsx, LearningRoadmapPage.jsx, ResumeStudioPage.jsx, ApplicationsPage.jsx, MyProfilePage.jsx\
                but why not direct import, because those files are dynamic, which page change whenever user click on it
                so, static use import while dynamic use Outlet, so that it can change the page whenever user click on it
            */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
