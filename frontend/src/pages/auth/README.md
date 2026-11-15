# Login and sign-up pages

These pages use the existing React Router routes and the Shared access frames in the team's Figma design. The shared `AuthLayout`, local Inter fonts and existing logo keep the screens consistent. Styles are scoped to `.auth-shell`, so other teammates' pages are unaffected. Existing workspace buttons and fields have role-specific styling; the auth fields are shared between these two forms instead.

## Preview

From the repository root, run:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

Use the address printed by Vite (normally `http://localhost:5173`):

- `/login`: email and password sign-in form.
- `/register`: choose Job Seeker or HR / Recruiter.
- `/register?role=jobseeker` or `?role=recruiter`: choose sign-up method.
- `/register?role=jobseeker&method=email` or `?role=recruiter&method=email`: registration form.

Docker, a database and a local `.env` are not required for this interface preview. Use dummy details when testing.

## What works

- Responsive desktop panels and stacked mobile layout.
- Navigation between sign-in, account type, sign-up method and email forms, including browser Back.
- Required fields, email format, phone format (8–15 digits), and an eight-character registration password minimum.
- Password show/hide controls, keyboard focus, labels, inline errors and announced submission feedback.
- No credentials are saved to browser storage, logged or sent to an API.

The Figma step counters vary between three and four. These pages consistently use four to include the planned email verification step. Step four is not simulated.

## Backend work still needed

The Spring Boot project has no login or registration endpoints, user model, password hashing, session management, email verification, password reset or Google OAuth integration. The Axios client in `src/services/api.js` is ready for future requests, but there are no agreed endpoints to call yet.

Valid submissions explain that authentication is unavailable. They do not create accounts, sign in, send email or redirect to a dashboard. Google buttons are disabled with an explanation. Forgot password displays an unavailable message.

Before connecting these forms, agree with the backend teammate on request fields, role values, error responses, password rules and session handling. The server must validate all values, enforce roles and protect workspace routes. Existing dashboard routes remain unprotected demo pages; these forms do not change that.

## Checks

Run inside `frontend`:

```powershell
npm.cmd run lint
npm.cmd run build
node --test src/utils/authValidation.test.js
```

For a manual check, submit blank forms, enter an invalid email/phone or short registration password, toggle password visibility, then submit valid dummy details. Confirm the message says no account/session was created. Check both roles, Back links and keyboard navigation. Check the layout at 320px, 375px, 768px and desktop width.

Implementation verification: production build and all seven validation tests passed. ESLint passed for all auth files. The full-project lint command reports 20 existing errors in `src/pages/hr/HrWorkspace.jsx`, which is outside this assignment and was left unchanged. Browser checks covered empty and valid submissions, password visibility, sign-up navigation, both role forms and overflow checks at 320px, 375px and 768px.

## Commit review

Commit the two auth pages, this README, `src/layouts/AuthLayout.jsx`, `src/components/auth/`, `src/styles/auth.css`, and `src/utils/authValidation.js` plus its test. No new dependency is needed and no manifest or lockfile change is expected.

Keep `.env`, local credentials, `node_modules/`, `dist/`, `backend/target/`, logs and temporary screenshots out of commits. Existing ignore rules already cover those generated/local files. Keep `.env.example`, source assets, package manifests and lockfiles tracked. Ignore rules cannot remove files already committed: if a real secret is found in history, rotate it, coordinate with the team, then remove it from tracking/history as appropriate.
