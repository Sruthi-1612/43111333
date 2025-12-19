# Habit Tracker Backend

Spring Boot + MySQL backend for the Habit Tracker application.

## Prerequisites

- **Java 17+** (verify with `java -version`)
- **MySQL 8.0+** running on `localhost:3306`
- Default credentials in `application.properties`:
  - Username: `root`
  - Password: `root`
  - Database: `habit_tracker` (auto-created)

## Setup

1. **Start MySQL** (ensure it's running on port 3306)

2. **(Optional) Update credentials** in `src/resources/application.properties` if your MySQL user/password differs.

## Run Backend

### Using Maven Wrapper (recommended)

```bash
cd backend
./mvnw spring-boot:run
```

### Using Installed Maven

```bash
cd backend
mvn spring-boot:run
```

The server will start on **http://localhost:8080**

## Verify

Health check endpoint:
```bash
curl http://localhost:8080/api/health
```

Expected response:
```json
{
  "status": "UP",
  "message": "Habit Tracker Backend is running"
}
```

## Tech Stack

- Spring Boot 3.4.1
- Spring Data JPA
- MySQL Driver
- Lombok (reduces boilerplate)
- Spring Validation
- Spring DevTools (hot reload)

## Database Schema

Hibernate auto-generates tables on startup (`spring.jpa.hibernate.ddl-auto=update`). Check console logs for SQL statements.

## CORS

Configured to allow requests from Vite dev server (`http://localhost:5173`). Update `CorsConfig.java` for production origins.

## Next Steps

- Add entity models (User, Habit, MoodEntry, JournalEntry)
- Create repositories and services
- Build REST APIs for CRUD operations
- Integrate JWT authentication (optional)
