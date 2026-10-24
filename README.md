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

The initial development environment has been established.

| Component | Current Status |
|---|---|
| Git and GitHub repository | Set up |
| React + Vite frontend | Created; default starter page available |
| Spring Boot backend | Created and successfully started in Docker |
| MySQL database | Running in Docker and connected to Spring Boot |
| Docker Compose | Configured for the backend and database services |
| Environment variable configuration | Set up using `.env` and `.env.example` |
| Application pages and UI | Pending development |
| Backend APIs | Pending development |
| Application database tables | Pending development |
| Authentication and user management | Pending development |
| Job matching and AI features | Pending development |

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development server and build tool |
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

### 1. Clone the repository

Replace `<your-github-repository-url>` with the actual URL of the GitHub repository.

```powershell
git clone <your-github-repository-url>
cd skillbridge-ai
```

### 2. Configure the environment variables

Create a local `.env` file from the provided example:

```powershell
Copy-Item .env.example .env
```

Open `.env` in a text editor and replace the placeholder passwords with your own values.

Use separate passwords for the MySQL root account and the application database account. The `MYSQL_PASSWORD` and `SPRING_DATASOURCE_PASSWORD` values must match.

Do not upload the `.env` file to GitHub or share its passwords.

### 3. Start Docker Desktop

Open Docker Desktop and wait until the Docker engine is running.

### 4. Start the backend and database

From the project root directory, run:

```powershell
docker compose up --build -d
```

This command builds the backend image if necessary and starts the backend and MySQL services in the background. On the first run, Docker may need to download the required images.

Check the service status:

```powershell
docker compose ps
```

The MySQL service should become healthy, and the backend should start successfully.

### 5. Install frontend dependencies

Open a terminal in the project root and run:

```powershell
cd frontend
npm.cmd install
```

This installs the dependencies defined in the frontend's `package.json`.

### 6. Start the frontend

In the same terminal, run:

```powershell
npm.cmd run dev
```

Vite will display a local development URL, usually:

`http://localhost:5173/`

Open the URL in a web browser to access the frontend.

Keep the terminal running while developing the frontend.

## Environment Configuration

The project uses environment variables to configure database credentials and backend settings.

The root `.env.example` file provides placeholder values for the required configuration.

| Variable | Purpose |
|---|---|
| `MYSQL_ROOT_PASSWORD` | Password for the MySQL root account |
| `MYSQL_DATABASE` | Name of the application database |
| `MYSQL_USER` | MySQL application account username |
| `MYSQL_PASSWORD` | Password for the MySQL application account |
| `SPRING_DATASOURCE_URL` | Example Spring Boot database URL; the Compose configuration supplies the container-specific URL |
| `SPRING_DATASOURCE_USERNAME` | Spring Boot database username |
| `SPRING_DATASOURCE_PASSWORD` | Spring Boot database password |
| `SPRING_JPA_DDL_AUTO` | Hibernate schema management setting; currently defaults to `update` |
| `SPRING_JPA_SHOW_SQL` | Controls whether Hibernate displays SQL statements in the logs |

The Compose configuration connects the backend to MySQL through the internal Docker service hostname `mysql`.

The example configuration is intended for local development. Production deployments will require appropriate secret management and deployment-specific configuration.

## Running the Project

### Start the project

Start Docker Desktop, then run the following command from the project root:

```powershell
docker compose up -d
```

Start the frontend in a separate terminal:

```powershell
cd "D:\Project Development\skillbridge-ai\frontend"
npm.cmd run dev
```

If the repository is located elsewhere, replace the example path with the actual project directory.

### Stop the frontend

Press `Ctrl + C` in the terminal running Vite.

### Stop the backend and database

From the project root, run:

```powershell
docker compose stop
```

This stops the containers without deleting the database volume.

### Resume development

Start Docker Desktop and run:

```powershell
docker compose up -d
```

Then start Vite again using `npm.cmd run dev` from the `frontend` directory.

## Accessing the Services

The following local addresses and ports are configured for development.

| Service | Address | Purpose |
|---|---|---|
| React + Vite frontend | `http://localhost:5173/` | Access the frontend |
| Spring Boot backend | `http://localhost:8080/` | Backend application endpoint |
| MySQL from the host computer | `127.0.0.1:3307` | Optional database client connection |
| MySQL inside Docker | `mysql:3306` | Connection used by the backend container |

The MySQL port is mapped to `3307` on the host because the standard MySQL port `3306` may already be in use by a locally installed MySQL server.

The backend and frontend currently have no completed application integration. A working frontend URL does not mean that all application features or APIs are available.

## Useful Commands

Run Docker Compose commands from the project root directory.

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

The repository currently follows this structure. Additional directories and files will be added as development progresses.

```text
skillbridge-ai/
├── frontend/
│   ├── node_modules/       # Installed dependencies (not tracked by Git)
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/
│       │   │   └── com/skillbridge/backend/
│       │   │       └── BackendApplication.java
│       │   └── resources/
│       │       └── application.properties
│       └── test/
│
├── .env                    # Local secrets; not tracked by Git
├── .env.example            # Configuration template
├── .gitattributes
├── .gitignore
├── README.md
└── docker-compose.yml
```

The `node_modules/` directory is created locally after installing frontend dependencies. It is excluded from Git and therefore will not normally appear in the GitHub repository.

The `.env` file must remain private. The `.env.example` file can be committed because it contains placeholder values rather than actual secrets.

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
npm.cmd install
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

Git and GitHub are used to manage the source code and collaborate on development.

### Before committing

- Review `git status`.
- Check the files being staged.
- Ensure `.env` and other secrets are not staged.
- Avoid committing generated folders such as `node_modules/`, `frontend/dist/`, and `backend/target/`.
- Commit the source code and configuration templates needed by other developers.

### Suggested workflow

1. Pull the latest changes from GitHub before starting work.
2. Develop and test changes locally.
3. Review the modified files.
4. Commit meaningful changes with descriptive messages.
5. Push the commits to GitHub.
6. Coordinate shared changes to configuration and database-related files with teammates.

Each developer should create their own local `.env` file based on `.env.example`. Never share private passwords through source control.

## Development Notes

This repository represents the initial development setup for SkillBridge AI.

The frontend currently uses the default React + Vite starter page. The backend currently contains the initial Spring Boot application and database connection configuration.

The following areas remain open for future development and decisions:

- Detailed requirements and final feature scope.
- User interface design and page implementation.
- Backend API development.
- Authentication and role-based access.
- Database entities and schema design.
- Job recommendation and matching logic.
- AI-assisted features and integrations.
- Testing, deployment, and production configuration.

The README will be updated as the project develops and these details are finalised.

---

**Project:** SkillBridge AI  
**Project Type:** Undergraduate Workshop II project  
**Development Status:** Initial setup completed; application feature development pending.

test
