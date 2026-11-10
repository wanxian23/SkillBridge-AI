# SkillBridge AI

**AI-Powered Job Recommendation and Personalised Career Development System**

SkillBridge AI is a web-based project intended to help fresh graduates, particularly those seeking entry-level IT jobs in Malaysia, explore career opportunities and improve their employability.

The project aims to bring job discovery and career development support together in one platform. The system is currently in its initial development stage, with the development environment established and the core application features yet to be implemented.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Objectives](#project-objectives)
- [Target Users](#target-users)
- [Planned Features](#planned-features)
- [Current Development Status](#current-development-status)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Running the Project](#running-the-project)
- [Accessing the Services](#accessing-the-services)
- [Useful Commands](#useful-commands)
- [Project Directory Structure](#project-directory-structure)
- [Database Information](#database-information)
- [Troubleshooting](#troubleshooting)
- [Version Control and Collaboration](#version-control-and-collaboration)
- [Development Notes](#development-notes)

## Project Overview

Fresh graduates may face difficulties finding suitable entry-level jobs because they lack work experience, have limited awareness of employer requirements, or are uncertain about the skills needed for their desired careers.

SkillBridge AI aims to address these challenges by providing a platform that supports job discovery, skill assessment, and personalised career development.

The project is being developed as part of an undergraduate Workshop II project. Its scope, methodology, and detailed system design will be refined as development progresses.

## Project Objectives

The initial objectives of SkillBridge AI are to:

1. Help fresh graduates discover job opportunities that align with their skills and career interests.
2. Assist job seekers in identifying skill gaps between their current abilities and the requirements of their desired jobs.
3. Provide personalised career development guidance and relevant learning resources.
4. Enable recruiters to manage job vacancies and review potential candidates.
5. Provide administrators with tools to manage and maintain the platform.

These objectives may be refined during the project development process.

## Target Users

The system is planned to support three main user roles.

| User Role | Description |
|---|---|
| Job Seeker | Creates a profile, manages skills, explores job opportunities, and receives career development guidance. |
| HR / Recruiter | Manages job vacancies and reviews applicants or potential candidates. |
| Administrator | Manages users and oversees the overall operation of the system. |

## Planned Features

The following features are planned for development. They are not yet implemented unless stated in the current development status.

### Job Seeker

- User registration and login.
- Profile and skill management.
- Resume upload and resume generation support.
- Job listings and job details.
- Job recommendations based on skills and preferences.
- Job matching scores.
- Skill-gap analysis.
- Personalised learning resource recommendations.
- Learning progress tracking.

### HR / Recruiter

- Recruiter profile management.
- Job vacancy creation and management.
- Candidate browsing and filtering.
- Applicant information review.

### Administrator

- User management.
- Platform management.
- Administrative monitoring and maintenance.

### AI-Assisted Capabilities

The project intends to explore AI-assisted features for job matching, skill-gap analysis, and personalised career development. The specific implementation approach and AI services have not yet been finalised.

Learning resources may initially use curated external links.

## Current Development Status

The initial development environment is established. The team is beginning frontend UI development based on its completed prototype design. Backend API integration will take place later.

| Component | Current Status |
|---|---|
| Git and GitHub repository | Set up; `main` has a branch ruleset |
| React + Vite frontend | Created and running locally |
| React Router | Installed; initial routes and placeholder Login, Register, and Job Seeker Dashboard pages created |
| Axios | Installed; shared API client configuration prepared, not yet connected to working endpoints |
| ESLint | Configured and lint check passing at time of setup |
| Frontend environment variables | `frontend/.env.example` provided; each developer creates their own `frontend/.env` |
| UI prototype | Completed; implementation of actual page designs is beginning |
| Spring Boot backend | Created and successfully started in Docker |
| MySQL database | Running in Docker and connected to Spring Boot |
| Docker Compose | Configured for backend and database services |
| Backend APIs and authentication | Pending development |
| Application database tables | Pending development |
| Job matching and AI features | Pending development |

The placeholder pages and routes are for navigation testing only. They do not yet provide working authentication or role-based authorization.

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development server and build tool |
| React Router | Client-side page navigation |
| Axios | HTTP client prepared for future Spring Boot API integration |
| Java 17 | Backend programming language |
| Spring Boot | Backend application development |
| Spring Data JPA | Database access and persistence support |
| Hibernate | Object-relational mapping and database schema management |
| MySQL 8.4 | Relational database |
| Maven | Backend dependency management and build tool |
| Docker | Containerised backend and database services |
| Docker Compose | Management of multiple Docker services |
| Git | Version control |
| GitHub | Source code hosting and collaboration |
| ESLint | JavaScript and React code checking |

## Prerequisites

Install the following software before running the project on a new computer.

- **Git** — to clone the repository and manage source code.
- **Docker Desktop** — to run the backend and MySQL containers.
- **Node.js and npm** — to install frontend dependencies and run Vite.

The frontend is currently run directly on the host computer, so Node.js and npm are required even when the backend runs in Docker.

For reference, the development environment has been tested with Node.js 22.18.0, npm 10.9.3, and Java 17. The backend's Java runtime is provided by Docker.

On Windows, PowerShell is used for the commands in this README.

## Getting Started

### 1. Clone or pull the repository

New contributors can clone the repository (replace the URL with the actual repository URL):

```powershell
git clone <your-github-repository-url>
cd skillbridge-ai
```

Existing contributors should switch to `main` and pull the latest changes using GitHub Desktop or Git. Create a feature branch before making changes.

### 2. Frontend-only setup (recommended for current UI development)

You **do not need Docker, Spring Boot, or MySQL** to work on the frontend UI and placeholder pages.

From the project root:

```powershell
cd frontend
npm.cmd ci
Copy-Item .env.example .env
npm.cmd run dev
```

Open the local address displayed by Vite, usually `http://localhost:5173/`.

The frontend `.env` file should contain:

```dotenv
VITE_API_BASE_URL=http://localhost:8080/api
```

The API URL is prepared for future integration; no working `/api` endpoints are required to view the current placeholder pages. Restart Vite after changing `.env`.

To check code quality, open another terminal in `frontend/` and run:

```powershell
npm.cmd run lint
```

Use `npm.cmd ci` when setting up a fresh checkout with the committed lockfile. Use `npm.cmd install <package>` only when intentionally adding or updating a dependency; commit both `package.json` and `package-lock.json` when they change.

### 3. Optional: set up the backend and database

Backend work and integration require Docker Desktop. From the **project root**, copy the root environment template:

```powershell
Copy-Item .env.example .env
```

Edit the root `.env` and replace example database passwords with private local values. `MYSQL_PASSWORD` and `SPRING_DATASOURCE_PASSWORD` must match; the MySQL root password can be different. Do not commit either `.env` file.

Start Docker Desktop, then run from the project root:

```powershell
docker compose up --build -d
docker compose ps
```

The MySQL service should become healthy and the backend should start. The backend and database are not needed for frontend-only UI development.

## Environment Configuration

The project uses **two separate local environment files**:

| Location | Purpose | Tracked by Git? |
|---|---|---|
| Root `.env.example` | Template for Docker/MySQL/Spring Boot configuration | Yes |
| Root `.env` | Private local database and backend settings | No |
| `frontend/.env.example` | Template for Vite API URL | Yes |
| `frontend/.env` | Local Vite API URL | No |

The root `.env.example` documents these variables:

| Variable | Purpose |
|---|---|
| `MYSQL_ROOT_PASSWORD` | Password for the MySQL root account |
| `MYSQL_DATABASE` | Name of the application database |
| `MYSQL_USER` | MySQL application account username |
| `MYSQL_PASSWORD` | Password for the MySQL application account |
| `SPRING_DATASOURCE_URL` | Example Spring Boot database URL; Compose supplies its container-specific URL |
| `SPRING_DATASOURCE_USERNAME` | Spring Boot database username |
| `SPRING_DATASOURCE_PASSWORD` | Spring Boot database password |
| `SPRING_JPA_DDL_AUTO` | Hibernate schema setting; currently defaults to `update` |
| `SPRING_JPA_SHOW_SQL` | Whether Hibernate displays SQL in logs |

The frontend uses `VITE_API_BASE_URL=http://localhost:8080/api` for its prepared Axios client. This address assumes future Spring Boot endpoints use the `/api` prefix. The backend endpoints have **not** been implemented yet.

Variables prefixed `VITE_` are exposed to browser code: **never store passwords, API keys, or secrets in frontend environment files**.

Docker Compose connects the backend to MySQL through the internal hostname `mysql`. These configurations are for local development, not production secret management.

## Running the Project

### Frontend-only development (current workflow)

From the project root:

```powershell
cd frontend
npm.cmd run dev
```

Open the URL displayed by Vite, usually `http://localhost:5173/`. The backend and database do not need to be running while working on static UI, routing, or mock data.

Stop Vite with `Ctrl + C`. Run `npm.cmd run lint` from `frontend/` to check the frontend code.

### Backend and database (when needed)

Start Docker Desktop. From the project root:

```powershell
docker compose up -d
```

If Java backend source files have changed and need rebuilding:

```powershell
docker compose up --build -d backend
```

To stop the containers without deleting stored database data:

```powershell
docker compose stop
```

Avoid `docker compose down -v` unless intentionally deleting the database volume and its contents.

## Accessing the Services

| Service | Address | Purpose |
|---|---|---|
| React + Vite frontend | `http://localhost:5173/` | Frontend UI and placeholder routes |
| Spring Boot backend | `http://localhost:8080/` | Backend service; application APIs pending |
| MySQL from the host computer | `127.0.0.1:3307` | Optional database client connection |
| MySQL inside Docker | `mysql:3306` | Backend container's database connection |

Current frontend routes include `/login`, `/register`, and `/jobseeker/dashboard`; `/` redirects to `/login`. These routes are placeholders and **not protected by real authentication** yet.

Host port `3307` is used for the Docker MySQL instance because local port `3306` may already be occupied. The frontend and backend are not yet integrated.

## Useful Commands

Run Docker Compose commands from the project root directory; run npm commands from `frontend/`.

| Frontend command | Description |
|---|---|
| `npm.cmd ci` | Install exactly the dependencies from `package-lock.json` |
| `npm.cmd run dev` | Start the Vite frontend development server |
| `npm.cmd run lint` | Run ESLint checks |
| `npm.cmd run build` | Build the frontend for production |

Backend and Git commands:

| Command | Description |
|---|---|
| `docker compose up -d` | Start services in the background |
| `docker compose up --build -d` | Build images and start services |
| `docker compose up --build -d backend` | Rebuild and start the backend service |
| `docker compose stop` | Stop services without removing containers or database data |
| `docker compose ps` | Check service status |
| `docker compose logs --tail=100 backend` | View recent backend logs |
| `docker compose logs --tail=100 mysql` | View recent MySQL logs |
| `docker compose restart backend` | Restart the backend container |
| `docker compose down` | Stop and remove containers and the Compose network, while preserving named volumes |
| `git status` | Check local Git changes |
| `git pull` | Retrieve updates from the configured Git remote |
| `git add .` | Stage changes for a commit; review the files before committing |
| `git commit -m "Describe your changes"` | Create a commit |
| `git push` | Push committed changes to the remote repository |

**Warning:** Avoid `docker compose down -v` unless you intentionally want to delete the Compose-managed database volume and its stored data.

## Project Directory Structure

The current frontend contains basic routing and service setup. Some organizational folders may still be empty locally; Git does not track empty folders.

```text
skillbridge-ai/
├── frontend/
│   ├── .env                 # Local Vite config (ignored)
│   ├── .env.example         # Shared Vite config template
│   ├── public/              # Public assets, including project SVG
│   ├── src/
│   │   ├── assets/          # Images and other imported assets
│   │   ├── components/      # Reusable UI components (as developed)
│   │   ├── layouts/         # Shared page layouts (as developed)
│   │   ├── pages/
│   │   │   ├── auth/        # LoginPage, RegisterPage
│   │   │   └── jobseeker/   # DashboardPage placeholder
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── services/
│   │   │   └── api.js       # Shared Axios client
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── backend/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/skillbridge/backend/BackendApplication.java
│       │   └── resources/application.properties
│       └── test/
├── .env                    # Local Docker/backend secrets (ignored)
├── .env.example            # Shared Docker/backend config template
├── .gitattributes
├── .gitignore
├── README.md
└── docker-compose.yml
```

Additional folders such as `hooks/`, `context/`, `utils/`, `styles/`, `recruiter/`, and `admin/` can be populated as their features are implemented. `frontend/node_modules/`, `frontend/dist/`, and `backend/target/` are generated locally and should not be committed.

## Database Information

The project currently uses MySQL 8.4 in a Docker container.

The database is configured through Docker Compose, and Spring Boot has successfully connected to it.

At the current stage:

- The `skillbridge_ai` database is created when the MySQL container initializes its data volume.
- The backend has database connectivity configured.
- Application-specific entity classes, repositories, and database tables have not yet been developed.
- Hibernate is currently configured with `ddl-auto=update` for development.

As the application grows, database schema changes and migrations will need to be managed carefully to preserve data and support collaboration.

The named Docker volume `mysql_data` stores the database data across ordinary container stops and removals.

## Troubleshooting

### Docker is not running

**Symptom:** Docker commands fail to connect to the Docker engine.

**Solution:** Start Docker Desktop, wait until it is ready, and retry the command.

### MySQL does not become healthy

**Symptom:** The backend waits for the database or fails to start.

**Solution:** Check the database logs:

```powershell
docker compose logs --tail=100 mysql
```

Confirm that the `.env` file exists and contains valid values.

### Backend fails to connect to MySQL

**Symptom:** Spring Boot reports a database connection error.

**Solution:**

- Confirm that the MySQL container is healthy.
- Check the database username and password in `.env`.
- Ensure the database name is correct.
- Use the Docker service hostname `mysql` and port `3306` in the backend container's JDBC URL. Do not use `localhost:3307` for this internal connection.

### Port 8080 or 3307 is already in use

**Symptom:** Docker cannot bind a configured host port.

**Solution:** Check whether another application is using the port. Stop the conflicting service or update the relevant port mapping in `docker-compose.yml` if needed.

### Frontend dependencies are missing

**Symptom:** Vite cannot start or reports missing packages.

**Solution:** Run the following command inside `frontend/`:

```powershell
npm.cmd ci
```

Then restart the development server:

```powershell
npm.cmd run dev
```

### Frontend URL does not open

**Symptom:** The browser cannot connect to `localhost:5173`.

**Solution:** Confirm that `npm.cmd run dev` is still running and open the exact local URL displayed in the terminal.

### Backend code changes are not reflected

**Symptom:** Changes to backend source files do not appear in the running container.

**Solution:** Rebuild and restart the backend:

```powershell
docker compose up --build -d backend
```

Check the logs if the application does not start successfully.

## Version Control and Collaboration

Git and GitHub are used for group collaboration. The `main` branch is covered by an active branch ruleset; teammates without bypass permissions should use feature branches and pull requests rather than pushing directly to `main`.

### Before committing

- Run `git status` and review the staged files.
- Commit source files, images used by the app, `package.json`, `package-lock.json`, and `.env.example` templates.
- Do **not** commit root or frontend `.env`, database passwords, `node_modules/`, `frontend/dist/`, or `backend/target/`.
- Review unrelated temporary files (for example, a root `tmp/` folder) rather than staging them automatically.

### Suggested team workflow

1. Pull the latest `main` branch before starting work.
2. Create a feature branch, such as `feature/jobseeker-ui` or `feature/recruiter-ui`.
3. Implement and test the assigned changes locally (`npm.cmd run lint` for frontend changes).
4. Commit with a descriptive message and push the feature branch.
5. Open a pull request targeting `main` and follow the repository's review rules.
6. After merging, everyone pulls the updated `main` branch. Run `npm.cmd ci` if frontend dependencies changed.

Repository administrators or other authorized bypass users may have different permissions. Required approval counts are determined by the active ruleset, not by the number of teammates. Coordinate edits to shared files such as `AppRoutes.jsx`, `package.json`, and configuration files to reduce merge conflicts.

## Development Notes

The development environment and basic frontend navigation are ready. The UI prototype has been completed, and the team is starting to implement its pages in React. The frontend can be developed with temporary mock data while the backend APIs are still pending.

**Implemented setup:** React + Vite, React Router with initial placeholder routes, Axios client configuration, ESLint, Spring Boot container, MySQL container, Docker Compose, and GitHub repository setup.

**Not yet implemented:** complete page designs, real login/registration, authorization and role protection, Spring Boot application APIs, application database entities, job recommendations and matching, skill-gap analysis, AI-assisted capabilities, learning roadmaps, and end-to-end integration.

The team should agree on API request/response formats before connecting the frontend to Spring Boot, but API endpoints do not need to be implemented during the initial UI design phase.

This README should be updated as features are completed.
