# Jobseeker pages

These pages follow the Job Seeker workspace in the SkillBridge AI Figma file.
The sidebar, header and footer retain their existing design.

## Where to start

- `DashboardPage.jsx`: dashboard cards and links.
- `BrowseJobPage.jsx`: search inputs, filters and job cards.
- `JobDetailsPage.jsx`: shared vacancy layout and match breakdown for all three
  roles, using role-specific sample comparisons in `data/jobDetailsMockData.js`.
- `SkillGapsPage.jsx`: the two priority skills and next steps.
- `LearningRoadmapPage.jsx`: activity status and progress updates.
- `ResumeStudioPage.jsx`: saved resume library.
- `ResumeEditorPage.jsx`: editable source fields and optional photo upload.
- `ResumePreviewPage.jsx`: HTML resume preview, missing details and Save draft.
- `ReviewApplicationPage.jsx`: select one saved resume and submit the demo application.
- `ApplicationsPage.jsx`: select an application to see its details.
- `MyProfilePage.jsx`: view saved profile information at `/jobseeker/profile`.
- `EditProfilePage.jsx`: edit career information at `/jobseeker/profile/edit`;
  saving returns to the overview, while Cancel discards unsaved changes.

Education and work experience are arrays in the profile record. Each entry has
an ID, so editing one record leaves the others unchanged. `ProfileEntryDialog`
provides the Figma add/edit dialogs. Save entry updates the form's draft; Save
profile persists the full profile. Cancel in a dialog discards that entry's
edits; Cancel on the edit page discards all changes since the last profile save.
Older saved profiles inherit the sample records if these arrays are missing.

## How it fits together

`routes/AppRoutes.jsx` lists the routes. `JobSeekerLayout` renders the shared
sidebar, header and footer, with the current page inside React Router's `Outlet`.
The sidebar checks the current URL to highlight the right item.

`styles/jobseeker/JobSeekerPages.css` styles the new page content. Class names
start with `js-` so they do not change the administrator pages. `Card`, `Button`
and `PageHeading` in `components/jobseeker` are small shared components, following
the same approach as the existing administrator pages. New icons and fonts live
in `assets/jobseeker`; page assets do not depend on temporary Figma URLs.

`data/jobseekerMockData.js` contains the Figma sample records. The pages use
ordinary `useState`, input change handlers and array methods. The two functions
in `utils/jobseekerStorage.js` read and save the demo data in browser localStorage.
Profile edits, progress, saved resumes and submitted applications survive refresh.

This is a frontend demonstration. Match percentages are the supplied sample
values, not calculated from edits. Resume generation builds an HTML draft from
the supplied fields; it does not call an AI service or export a PDF. Application
submission and profile visibility are stored locally, not sent to an employer
or enforced by a backend. Replace the mock records/storage with API calls later.
