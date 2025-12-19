# 📋 System Architecture & Data Flow

## Complete System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         HABIT TRACKER APP                        │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────┐
│  React Frontend  │◄───────►│ Spring Boot REST │◄───────►│  MySQL   │
│  (Port 5173)     │  HTTP   │   (Port 8080)    │ JDBC    │ Database │
│                  │         │                  │         │          │
│ • Login          │         │ • AuthController │         │ • users  │
│ • Register       │         │ • Health Check   │         │ • habits │
│ • Home           │         │ • Validate Auth  │         │ • moods  │
│ • Profile        │         │ • CORS Enabled   │         │ • journal│
│ • Journal        │         │                  │         │          │
│ • Quotes         │         │ Dependencies:    │         │ Structure:
│ • Guest Mode     │         │ • Spring Web     │         │ id
│                  │         │ • Spring Data    │         │ username
│ Technologies:    │         │ • Hibernate      │         │ password
│ • React 19       │         │ • Lombok         │         │ displayName
│ • TypeScript     │         │ • MySQL Driver   │         │
│ • Tailwind CSS   │         │                  │         │
│ • React Router   │         │                  │         │
└──────────────────┘         └──────────────────┘         └──────────┘
       │                             │
       │ localStorage                │ application.properties
       │ ├─ loggedInUser            │ ├─ mysql://localhost:3306
       │ ├─ isGuest                 │ ├─ username: root
       │ └─ theme                   │ ├─ password: root
       │                             │ └─ ddl-auto: update
       │                             │
       └─────────────────────────────┘
```

---

## Authentication Flow

### 📝 Registration

```
User Input                 Frontend                Backend                Database
    │                         │                        │                     │
    │──username───────────────│                        │                     │
    │──password───────────────│                        │                     │
    │──displayName────────────│                        │                     │
    │                         │                        │                     │
    │                    Validate Input                │                     │
    │                    (not empty)                   │                     │
    │                         │                        │                     │
    │                    POST /api/auth/register       │                     │
    │◄────────────────────────├──────────────────────►│                     │
    │                         │              Check if exists                 │
    │                         │                        │────────────────────►│
    │                         │                        │◄────────────────────│
    │                         │                        │                     │
    │                         │              Create User & Save              │
    │                         │                        │────────────────────►│
    │                         │                        │◄────────────────────│
    │                         │   Return id & data     │                     │
    │◄────────────────────────├────────────────────────│                     │
    │                         │                        │                     │
    │ "Registration successful"                        │                     │
    │                         │                        │                     │
```

### 🔐 Login

```
User Input                 Frontend                Backend                Database
    │                         │                        │                     │
    │──username───────────────│                        │                     │
    │──password───────────────│                        │                     │
    │                         │                        │                     │
    │                    Validate Input                │                     │
    │                         │                        │                     │
    │                    POST /api/auth/login          │                     │
    │◄────────────────────────├──────────────────────►│                     │
    │                         │           Find username                      │
    │                         │                        │────────────────────►│
    │                         │                        │◄────────────────────│
    │                         │         Check password matches                │
    │                         │                        │                     │
    │                         │   Return User (id + data)                    │
    │◄────────────────────────├────────────────────────│                     │
    │                         │                        │                     │
    │ Save to localStorage    │                        │                     │
    │ Redirect to Home        │                        │                     │
    │                         │                        │                     │
```

### 👤 Guest Mode

```
User Input                 Frontend                Backend                Database
    │                         │                        │                     │
    │──"Continue as Guest"────│                        │                     │
    │                         │                        │ (No Call)           │
    │                         │                        │                     │
    │ Create Guest User       │                        │                     │
    │ {                       │                        │                     │
    │   username: 'guest'     │                        │                     │
    │   displayName: 'Guest User'                      │                     │
    │ }                       │                        │                     │
    │                         │                        │                     │
    │ Save to localStorage    │                        │                     │
    │ Set isGuest = true      │                        │                     │
    │ Redirect to Home        │                        │                     │
    │                         │                        │                     │
```

---

## Database Schema & Relationships

```
┌────────────────────────────────┐
│           users                │
├────────────────────────────────┤
│ id (PK)         │ BIGINT       │ ◄────── Auto Increment
│ username (UK)   │ VARCHAR(255) │ ◄────── Unique Constraint
│ password        │ VARCHAR(255) │ ◄────── Plain text (dev only)
│ display_name    │ VARCHAR(255) │
└────────────────────────────────┘
        │
        │ Referenced by:
        │ ├─ Habits (future)
        │ ├─ Moods (future)
        │ └─ Journal Entries (future)
        │
```

---

## API Endpoint Details

### Register Endpoint
```
POST /api/auth/register
Content-Type: application/json

REQUEST:
{
  "username": "john_doe",
  "password": "secure123",
  "displayName": "John Doe"
}

RESPONSE 201 CREATED:
{
  "id": 1,
  "username": "john_doe",
  "displayName": "John Doe",
  "message": "Registration successful"
}

RESPONSE 409 CONFLICT:
{
  "id": null,
  "username": "john_doe",
  "displayName": null,
  "message": "Username already exists"
}
```

### Login Endpoint
```
POST /api/auth/login
Content-Type: application/json

REQUEST:
{
  "username": "john_doe",
  "password": "secure123"
}

RESPONSE 200 OK:
{
  "id": 1,
  "username": "john_doe",
  "displayName": "John Doe",
  "message": "Login successful"
}

RESPONSE 401 UNAUTHORIZED:
{
  "id": null,
  "username": "john_doe",
  "displayName": null,
  "message": "Invalid username or password"
}
```

### Health Check
```
GET /api/health

RESPONSE 200 OK:
{
  "status": "UP",
  "message": "Habit Tracker Backend is running"
}
```

---

## Technology Stack Layers

```
┌─────────────────────────────────────┐
│      React + TypeScript (19.2)      │ ◄── Presentation Layer
│      Tailwind CSS (3.4)             │
│      React Router DOM (6.28)        │
└──────────────┬──────────────────────┘
               │ REST API (JSON)
               │ http://localhost:5173
┌──────────────▼──────────────────────┐
│    Spring Boot (3.4.1)              │ ◄── Application Layer
│    Spring MVC (Controllers)         │
│    Spring Data JPA                  │
│    CORS Configuration               │
└──────────────┬──────────────────────┘
               │ JDBC Connection
               │ localhost:3306
┌──────────────▼──────────────────────┐
│    Hibernate ORM (6.6)              │ ◄── Persistence Layer
│    Spring Data Repositories         │
│    JPA Entities                     │
└──────────────┬──────────────────────┘
               │ SQL Queries
┌──────────────▼──────────────────────┐
│    MySQL (8.0+)                     │ ◄── Data Layer
│    Database: habit_tracker          │
│    Table: users                     │
└─────────────────────────────────────┘
```

---

## Error Handling Flow

```
Frontend Request
    │
    ├─► Network Error
    │   ├─ "Failed to fetch"
    │   └─► Show: "Cannot connect to backend"
    │
    ├─► HTTP Error Response
    │   ├─ 409 (Conflict)
    │   │  └─► Show: "Username already exists"
    │   │
    │   ├─ 401 (Unauthorized)
    │   │  └─► Show: "Invalid username or password"
    │   │
    │   └─ 400 (Bad Request)
    │      └─► Show: "Registration failed"
    │
    └─► Success (200, 201)
        └─► Process response & redirect
```

---

## File Structure

```
c:\Users\Akshaya\Gammified Learning\Habit tracker\
│
├── 📁 frontend/
│   ├── src/
│   │   ├── 📁 pages/
│   │   │   ├── Login.tsx ◄── Auth UI (register/login/guest)
│   │   │   ├── Home.tsx
│   │   │   ├── ProfilePage.tsx ◄── Shows user from DB
│   │   │   ├── JournalPage.tsx
│   │   │   └── QuotesPage.tsx
│   │   │
│   │   ├── 📁 contexts/
│   │   │   ├── AuthContext.tsx ◄── API calls to backend
│   │   │   └── ThemeContext.tsx
│   │   │
│   │   └── App.tsx ◄── Routes including /profile
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── 📁 backend/
│   ├── src/main/java/com/example/habit/
│   │   ├── 📁 controller/
│   │   │   ├── AuthController.java ◄── /api/auth/register, /login
│   │   │   ├── HealthController.java
│   │   │   └── ...
│   │   │
│   │   ├── 📁 entity/
│   │   │   ├── User.java ◄── Database model
│   │   │   └── ...
│   │   │
│   │   ├── 📁 repository/
│   │   │   ├── UserRepository.java ◄── Database queries
│   │   │   └── ...
│   │   │
│   │   ├── 📁 dto/
│   │   │   ├── AuthRequest.java
│   │   │   └── AuthResponse.java
│   │   │
│   │   ├── 📁 config/
│   │   │   └── CorsConfig.java
│   │   │
│   │   └── HabitBackendApplication.java
│   │
│   ├── src/main/resources/
│   │   └── application.properties ◄── MySQL config
│   │
│   ├── pom.xml ◄── Maven dependencies
│   └── mvnw.cmd ◄── Maven wrapper
│
├── 📁 mysql/
│   └── Database: habit_tracker
│       └── Table: users
│
└── Documentation/
    ├── START_HERE.md ◄── Quick start
    ├── README_QUICKSTART.md
    ├── SETUP_GUIDE.md ◄── Detailed steps
    ├── REGISTRATION_FIX.md
    └── REGISTRATION_FIX_SUMMARY.md ◄── This overview
```

---

## Request/Response Flow Example

### Complete Registration Flow

```
Browser:
│
├─ User clicks "Register"
├─ Fills in username: "alice", password: "pass123", displayName: "Alice"
├─ Frontend validates (not empty)
├─ Frontend sends:
│  POST http://localhost:8080/api/auth/register
│  Content-Type: application/json
│  {"username": "alice", "password": "pass123", "displayName": "Alice"}
│
└─► Spring Boot AuthController:
    ├─ Receives AuthRequest
    ├─ Calls userRepository.findByUsername("alice")
    ├─ Query MySQL: SELECT * FROM users WHERE username = 'alice'
    ├─ Result: Not found
    ├─ Creates new User object
    ├─ Sets: username, password, displayName
    ├─ Calls userRepository.save(user)
    ├─ Saves to MySQL:
    │  INSERT INTO users (username, password, display_name)
    │  VALUES ('alice', 'pass123', 'Alice')
    │  ► id = 1 (auto-generated)
    ├─ Returns 201 CREATED with:
    │  {"id": 1, "username": "alice", "displayName": "Alice", "message": "Registration successful"}
    │
    └─► Browser:
        ├─ Receives success response
        ├─ Shows "Registration successful!"
        ├─ User clicks Login
        ├─ Enters username "alice", password "pass123"
        ├─ Frontend sends:
        │  POST http://localhost:8080/api/auth/login
        │  {"username": "alice", "password": "pass123"}
        │
        └─► Spring Boot AuthController:
            ├─ Receives AuthRequest
            ├─ Calls userRepository.findByUsername("alice")
            ├─ Query MySQL: SELECT * FROM users WHERE username = 'alice'
            ├─ Result: Found (id=1, username='alice', password='pass123', displayName='Alice')
            ├─ Checks: password == 'pass123' ✓
            ├─ Returns 200 OK with user data
            │
            └─► Browser:
                ├─ Receives {id: 1, username: 'alice', displayName: 'Alice'}
                ├─ Saves to localStorage
                ├─ Redirects to /home
                └─ Profile page shows: "Alice" (id: 1)
```

---

**Architecture complete and documented!** 📊

All systems integrated and ready for use.
