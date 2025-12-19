# 🎯 Habit Tracker - Full Stack Application

A comprehensive habit tracking application that helps users build and maintain positive habits through gamification and visual tracking. The application features user authentication, daily habit monitoring, mood tracking, journal entries, and motivational quotes.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Workflow](#workflow)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Frontend Components](#frontend-components)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

The Habit Tracker is a full-stack web application built with React (frontend) and Spring Boot (backend) that allows users to:
- Create and track daily habits
- Monitor progress with visual calendar grids
- Log daily mood entries
- Write journal entries
- Access motivational quotes
- Use the app with or without registration (Guest Mode)

### Key Highlights
- **Dual Mode Operation**: Works both with registered users (data saved in MySQL) and guest users (data saved in browser localStorage)
- **RESTful API**: Clean separation between frontend and backend
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Real-time Updates**: Instant habit completion tracking and mood logging

---

## ✨ Features

### 1. **Authentication System**
- User registration with unique username validation
- Secure login with password encryption
- Guest mode for trying the app without registration
- Profile management

### 2. **Habit Management**
- Create custom habits with scheduled times
- Track habit completion by date
- Visual calendar grid showing 7-day week view
- Navigate through different months
- Color-coded completion indicators
- Habit statistics and streaks

### 3. **Mood Tracking**
- Daily mood logging (5-level scale)
- Visual emoji-based interface
- Mood history display
- Date-based mood retrieval

### 4. **Journal Entries**
- Create daily journal entries
- View and edit past entries
- Organized by date
- Personal reflection space

### 5. **Motivational Quotes**
- Access to inspirational quotes
- Daily motivation section
- Quote categorization

### 6. **Theme Support**
- Dark mode and light mode
- Persistent theme preferences
- Smooth theme transitions

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI library for building interactive interfaces |
| **TypeScript** | 5.9.3 | Type-safe JavaScript for better code quality |
| **Vite** | 7.2.4 | Fast build tool and development server |
| **React Router DOM** | 6.28.0 | Client-side routing and navigation |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS framework for styling |
| **PostCSS** | 8.4.49 | CSS processing with Autoprefixer |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Spring Boot** | 3.4.1 | Backend framework for REST API |
| **Spring Data JPA** | Included | Database abstraction layer |
| **Spring Validation** | Included | Input validation |
| **Spring Security (Crypto)** | Included | Password encryption |
| **Hibernate** | Included | ORM for database operations |
| **MySQL Connector** | Latest | Database driver |
| **Lombok** | Latest | Reduce boilerplate code |
| **Maven** | 3.x | Dependency management and build tool |

### Database
| Technology | Version | Purpose |
|------------|---------|---------|
| **MySQL** | 8.0+ | Relational database for persistent storage |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting and quality checks |
| **Node.js** | JavaScript runtime environment |
| **Java 17** | Backend runtime environment |
| **npm** | Frontend package manager |

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     HABIT TRACKER APPLICATION                    │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────┐
│  React Frontend  │◄───────►│ Spring Boot API  │◄───────►│  MySQL   │
│  (Port 5173)     │  HTTP   │   (Port 8080)    │  JDBC   │ Database │
│                  │         │                  │         │          │
│ Components:      │         │ Controllers:     │         │ Tables:  │
│ • Login          │         │ • AuthController │         │ • users  │
│ • Home           │         │ • HealthCheck    │         │          │
│ • Profile        │         │                  │         │ Columns: │
│ • Journal        │         │ Services:        │         │ • id     │
│ • Quotes         │         │ • UserService    │         │ • username│
│                  │         │                  │         │ • password│
│ State Management:│         │ Repositories:    │         │ • displayName│
│ • AuthContext    │         │ • UserRepository │         │          │
│ • ThemeContext   │         │                  │         │          │
│                  │         │ Entities:        │         │          │
│ Routing:         │         │ • User           │         │          │
│ • React Router   │         │                  │         │          │
│                  │         │ Config:          │         │          │
│ Storage:         │         │ • CorsConfig     │         │          │
│ • localStorage   │         │                  │         │          │
└──────────────────┘         └──────────────────┘         └──────────┘
       │                             │
       │ Client Data                 │ Database Config
       │ ├─ loggedInUser            │ ├─ URL: jdbc:mysql://localhost:3306
       │ ├─ isGuest                 │ ├─ Username: root
       │ ├─ theme                   │ ├─ Password: (empty)
       │ ├─ habits_[username]       │ └─ Auto-create: habit_tracker DB
       │ ├─ moods_[username]        │
       │ └─ journal_[username]      │
       │                             │
       └─────────────────────────────┘
```

### Design Patterns Used

1. **MVC (Model-View-Controller)**: Backend follows MVC with clear separation
2. **Repository Pattern**: Data access through JPA repositories
3. **Context API**: Frontend state management using React Context
4. **Component-Based Architecture**: Reusable React components
5. **RESTful API Design**: Standard HTTP methods and status codes

---

## 📁 Project Structure

```
habit-tracker/
│
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/habit/
│   │   │   │   ├── HabitBackendApplication.java    # Main application class
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java             # CORS configuration
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java         # Authentication endpoints
│   │   │   │   │   └── HealthController.java       # Health check endpoint
│   │   │   │   ├── dto/
│   │   │   │   │   ├── AuthRequest.java            # Login/Register request DTO
│   │   │   │   │   └── AuthResponse.java           # Authentication response DTO
│   │   │   │   ├── entity/
│   │   │   │   │   └── User.java                   # User entity (JPA)
│   │   │   │   ├── repository/
│   │   │   │   │   └── UserRepository.java         # User data repository
│   │   │   │   └── service/
│   │   │   │       └── UserService.java            # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties          # App configuration
│   │   └── test/                                   # Test files
│   ├── pom.xml                                     # Maven dependencies
│   ├── mvnw                                        # Maven wrapper (Linux/Mac)
│   └── mvnw.cmd                                    # Maven wrapper (Windows)
│
├── src/                              # React Frontend
│   ├── assets/                       # Static assets
│   ├── contexts/
│   │   ├── AuthContext.tsx           # Authentication context
│   │   └── ThemeContext.tsx          # Theme context
│   ├── pages/
│   │   ├── Login.tsx                 # Login/Register page
│   │   ├── Home.tsx                  # Main habit tracking page
│   │   ├── ProfilePage.tsx           # User profile page
│   │   ├── JournalPage.tsx           # Journal entries page
│   │   └── QuotesPage.tsx            # Motivational quotes page
│   ├── routes/
│   │   └── auth.ts                   # API route definitions
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles
│
├── public/                           # Public static files
│
├── package.json                      # Frontend dependencies
├── vite.config.ts                    # Vite configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── eslint.config.js                  # ESLint configuration
│
├── start-backend.bat                 # Windows script to start backend
├── start-frontend.bat                # Windows script to start frontend
├── start-all.bat                     # Windows script to start both
├── verify-setup.bat                  # System verification script
│
└── Documentation Files
    ├── README.md                     # Basic setup guide
    ├── START_HERE.md                 # Quick start guide
    ├── ARCHITECTURE_OVERVIEW.md      # Detailed architecture
    ├── SETUP_GUIDE.md                # Installation guide
    ├── REGISTRATION_COMPLETE_GUIDE.md # Registration feature docs
    └── VIEW_DATABASE.md              # Database access guide
```

---

## 🚀 Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Java 17** or higher ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Node.js 14+** and **npm 6+** ([Download](https://nodejs.org/))
- **MySQL 8.0+** ([Download](https://dev.mysql.com/downloads/mysql/))

### Verification

```bash
# Check Java
java -version

# Check Node.js
node --version

# Check npm
npm --version

# Check MySQL
mysql --version
```

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd habit-tracker
```

### Step 2: Database Setup

1. Start MySQL service (if not running)
2. The application will automatically create the `habit_tracker` database
3. Default credentials in `application.properties`:
   - Username: `root`
   - Password: (empty)
   - URL: `jdbc:mysql://localhost:3306/habit_tracker`

**To use custom credentials**, edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Step 3: Backend Setup

#### Option A: Using Batch File (Windows - Recommended)

```bash
# Double-click or run
start-backend.bat
```

#### Option B: Manual Setup

```bash
# Navigate to backend directory
cd backend

# Run using Maven wrapper
./mvnw.cmd spring-boot:run    # Windows
./mvnw spring-boot:run         # Linux/Mac

# Or build and run JAR
./mvnw.cmd clean package
java -jar target/habit-backend-0.0.1-SNAPSHOT.jar
```

The backend will start on **http://localhost:8080**

### Step 4: Frontend Setup

#### Option A: Using Batch File (Windows - Recommended)

```bash
# Double-click or run
start-frontend.bat
```

#### Option B: Manual Setup

```bash
# From project root
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:5173**

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### Quick Start (All-in-One)

Windows users can use:
```bash
verify-setup.bat    # Check system requirements
start-all.bat       # Start both backend and frontend
```

---

## 🔄 Workflow

### User Registration & Login Flow

```
┌──────────────┐
│  User Opens  │
│   Browser    │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│   Login Page     │
│  (localhost:5173)│
└──────┬───────────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌────────────┐    ┌─────────────┐
│   Login    │    │  Register   │
└──────┬─────┘    └──────┬──────┘
       │                 │
       │                 ▼
       │          POST /api/auth/register
       │          ┌─────────────────────┐
       │          │ • Validate input    │
       │          │ • Check if exists   │
       │          │ • Encrypt password  │
       │          │ • Save to MySQL     │
       │          │ • Return user data  │
       │          └──────┬──────────────┘
       │                 │
       ▼                 │
POST /api/auth/login     │
┌─────────────────────┐  │
│ • Find user by      │  │
│   username          │  │
│ • Verify password   │  │
│ • Return user data  │  │
└──────┬──────────────┘  │
       │                 │
       └────────┬────────┘
                │
                ▼
       ┌────────────────┐
       │  Save to       │
       │  localStorage  │
       └────────┬───────┘
                │
                ▼
       ┌────────────────┐
       │  Redirect to   │
       │   Home Page    │
       └────────────────┘
```

### Guest Mode Flow

```
┌──────────────┐
│  User Clicks │
│"Guest Mode"  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Set isGuest=true │
│ in localStorage  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Redirect to     │
│   Home Page      │
└──────┬───────────┘
       │
       ▼
┌──────────────────────┐
│ All data saved to    │
│ localStorage only    │
│ • habits_guest       │
│ • moods_guest        │
│ • journal_guest      │
└──────────────────────┘
```

### Habit Tracking Flow

```
┌────────────────┐
│  Home Page     │
│  Loads         │
└────────┬───────┘
         │
         ▼
┌────────────────────────┐
│ Load habits from:      │
│ • localStorage         │
│   (habits_[username])  │
└────────┬───────────────┘
         │
         ▼
┌────────────────────────┐
│ Display Habits in      │
│ Calendar Grid          │
│ • Current week view    │
│ • Color-coded status   │
└────────┬───────────────┘
         │
         ├─────────────────┬──────────────┐
         │                 │              │
         ▼                 ▼              ▼
┌────────────────┐  ┌─────────────┐  ┌──────────┐
│  Add Habit     │  │ Complete    │  │ Navigate │
│  • Name        │  │ Habit       │  │ Months   │
│  • Time        │  │ • Click     │  │          │
└────────┬───────┘  │   checkbox  │  └──────────┘
         │          └──────┬──────┘
         │                 │
         ▼                 ▼
┌──────────────────────────────┐
│ Save to localStorage         │
│ habits_[username]            │
└──────────────────────────────┘
```

### Data Persistence Flow

```
┌─────────────┐
│ User Action │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  State Update    │
│  (React)         │
└──────┬───────────┘
       │
       ▼
┌──────────────────────────┐
│  Check User Mode         │
└──────┬───────────────────┘
       │
       ├──────────────────┬─────────────────┐
       │                  │                 │
       ▼                  ▼                 ▼
┌────────────┐    ┌──────────────┐   ┌─────────────┐
│ Registered │    │    Guest     │   │   Backend   │
│    User    │    │     User     │   │  (Future)   │
└──────┬─────┘    └──────┬───────┘   └──────┬──────┘
       │                 │                  │
       ▼                 ▼                  ▼
┌────────────────┐ ┌────────────────┐ ┌──────────────┐
│ localStorage   │ │ localStorage   │ │   MySQL DB   │
│ Key prefix:    │ │ Key prefix:    │ │  (Auth only) │
│ [username]     │ │ guest          │ │              │
└────────────────┘ └────────────────┘ └──────────────┘
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "username": "john_doe",
  "password": "secure123",
  "displayName": "John Doe"
}

Response (201 Created):
{
  "id": 1,
  "username": "john_doe",
  "displayName": "John Doe",
  "error": null
}

Response (409 Conflict):
{
  "id": null,
  "username": "john_doe",
  "displayName": null,
  "error": "Username already exists"
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "username": "john_doe",
  "password": "secure123"
}

Response (200 OK):
{
  "id": 1,
  "username": "john_doe",
  "displayName": "John Doe",
  "error": null
}

Response (401 Unauthorized):
{
  "id": null,
  "username": null,
  "displayName": null,
  "error": "Invalid username or password"
}
```

#### 3. Health Check
```http
GET /api/health

Response (200 OK):
{
  "status": "UP",
  "timestamp": "2025-12-18T10:30:00Z"
}
```

### CORS Configuration
The backend allows requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative frontend port)

Allowed methods: GET, POST, PUT, DELETE, OPTIONS

---

## 💾 Database Schema

### Users Table

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Column Details:
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key, auto-incremented |
| username | VARCHAR(255) | Unique username for login |
| password | VARCHAR(255) | Encrypted password (BCrypt) |
| display_name | VARCHAR(255) | User's display name |
| created_at | TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### Entity Mapping (JPA)

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String displayName;
}
```

---

## 🎨 Frontend Components

### 1. App Component (App.tsx)
- Main application wrapper
- Route configuration
- Context providers (Auth, Theme)

### 2. Authentication Context (AuthContext.tsx)
```typescript
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isGuest: boolean;
}
```
Manages:
- User authentication state
- Login/logout functions
- Guest mode detection
- localStorage persistence

### 3. Theme Context (ThemeContext.tsx)
```typescript
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
```
Manages:
- Dark/light theme state
- Theme toggle function
- Theme persistence

### 4. Login Page (Login.tsx)
Features:
- Login form
- Registration form
- Guest mode button
- Form validation
- Error handling

### 5. Home Page (Home.tsx)
Features:
- Habit creation form
- 7-day calendar grid view
- Habit completion tracking
- Mood logging (5-level scale)
- Monthly navigation
- Habit statistics
- Theme toggle
- Profile navigation

Key Functions:
```typescript
- addHabit(): Create new habit
- toggleHabitCompletion(): Mark habit done/undone
- setMood(): Log daily mood
- getCurrentWeek(): Get 7-day range
- goToNextMonth(): Navigate forward
- goToPreviousMonth(): Navigate backward
```

### 6. Profile Page (ProfilePage.tsx)
Displays:
- User ID
- Username
- Display name
- Logout button

### 7. Journal Page (JournalPage.tsx)
Features:
- Create journal entries
- View past entries
- Date-based organization
- Edit functionality

### 8. Quotes Page (QuotesPage.tsx)
Features:
- Display motivational quotes
- Quote categories
- Daily inspiration

---

## 🔧 Development Guide

### Running in Development Mode

#### Backend Development
```bash
cd backend

# Hot reload with Spring Boot DevTools
./mvnw.cmd spring-boot:run

# The server will restart automatically on code changes
```

#### Frontend Development
```bash
# Vite provides hot module replacement (HMR)
npm run dev

# Changes are reflected instantly in the browser
```

### Building for Production

#### Backend Build
```bash
cd backend

# Create executable JAR
./mvnw.cmd clean package

# Run the JAR
java -jar target/habit-backend-0.0.1-SNAPSHOT.jar
```

#### Frontend Build
```bash
# Create optimized production build
npm run build

# Output will be in the 'dist' folder

# Preview production build
npm run preview
```

### Code Quality

#### Frontend Linting
```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npx eslint src --ext .ts,.tsx --fix
```

#### TypeScript Type Checking
```bash
# Check types
npx tsc --noEmit
```

### Testing

#### Backend Tests
```bash
cd backend

# Run all tests
./mvnw.cmd test

# Run specific test
./mvnw.cmd test -Dtest=AuthControllerTest
```

#### Frontend Tests (Setup Required)
```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Backend Won't Start

**Error**: `Port 8080 already in use`
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (Windows)
taskkill /PID <process-id> /F
```

**Error**: `Cannot connect to MySQL`
```bash
# Check MySQL is running
services.msc  # Windows
# Find MySQL service and start it

# Or use command line
net start MySQL80
```

**Error**: `Access denied for user 'root'`
- Update `application.properties` with correct credentials
- Or reset MySQL root password

#### 2. Frontend Won't Start

**Error**: `Port 5173 already in use`
```bash
# Kill process on port 5173
npx kill-port 5173
```

**Error**: `Module not found`
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

#### 3. CORS Errors

**Error**: `CORS policy: No 'Access-Control-Allow-Origin'`
- Ensure backend is running on port 8080
- Check `CorsConfig.java` allows your frontend URL
- Clear browser cache

#### 4. Database Issues

**Error**: `Table 'users' doesn't exist`
```bash
# Delete and recreate database
mysql -u root -p
DROP DATABASE habit_tracker;
CREATE DATABASE habit_tracker;
exit

# Restart backend (will auto-create tables)
```

**Error**: `Duplicate entry for key 'username'`
- Username already exists in database
- Use different username or clear test data:
```sql
DELETE FROM users WHERE username = 'test_user';
```

#### 5. Build Errors

**Frontend Build Fails**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

**Backend Build Fails**
```bash
cd backend
# Clean and rebuild
./mvnw.cmd clean install -DskipTests
```

### Debugging Tips

#### Enable Debug Logging (Backend)
```properties
# application.properties
logging.level.com.example.habit=DEBUG
logging.level.org.springframework.web=DEBUG
```

#### Browser DevTools (Frontend)
- Check Console tab for errors
- Check Network tab for API calls
- Check Application tab for localStorage data

#### Verify System Setup
```bash
# Run verification script
verify-setup.bat

# This checks:
# ✓ Java installation
# ✓ Node.js installation
# ✓ MySQL running
# ✓ Ports availability
```

---

## 📊 Data Flow Examples

### Example 1: Complete a Habit

```
User clicks checkbox on Home page
    ↓
React state updates (habits array)
    ↓
toggleHabitCompletion() function called
    ↓
Check if date exists in completedDates array
    ├─ If exists: Remove date (uncheck)
    └─ If not exists: Add date (check)
    ↓
Update habits state
    ↓
Save to localStorage
    Key: habits_[username]
    Value: JSON array of all habits
    ↓
UI re-renders with new state
```

### Example 2: Register New User

```
User fills registration form
    ↓
Clicks "Register" button
    ↓
Frontend validation
    ├─ Username not empty
    ├─ Password >= 6 characters
    └─ Display name not empty
    ↓
POST request to /api/auth/register
    ↓
Backend Controller receives request
    ↓
Service layer processes
    ├─ Check username exists
    ├─ Encrypt password (BCrypt)
    └─ Save to database
    ↓
Repository saves User entity
    ↓
MySQL stores record
    ↓
Response sent back
    ├─ Success: User data with ID
    └─ Error: Error message
    ↓
Frontend receives response
    ├─ Success: Show success message
    └─ Error: Display error to user
```

---

## 🚀 Future Enhancements

Potential features for future versions:

1. **Backend Integration for Habits**
   - Move habit storage from localStorage to MySQL
   - Sync habits across devices
   - Backup and restore functionality

2. **Social Features**
   - Share habits with friends
   - Leaderboards and challenges
   - Group habit tracking

3. **Analytics & Insights**
   - Habit completion statistics
   - Mood trend analysis
   - Weekly/monthly reports
   - Streak tracking

4. **Notifications**
   - Email reminders
   - Push notifications
   - Daily motivational messages

5. **Gamification**
   - Points and badges system
   - Achievement unlocks
   - Levels and progress bars

6. **Mobile App**
   - React Native version
   - Offline support
   - Native notifications

---

## 📝 License

This project is developed for educational purposes.

---

## 👥 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation files:
  - `START_HERE.md` for quick start
  - `SETUP_GUIDE.md` for detailed setup
  - `ARCHITECTURE_OVERVIEW.md` for system design

---

## 🙏 Acknowledgments

- Spring Boot team for excellent framework
- React team for the UI library
- Tailwind CSS for the styling framework
- Vite for the build tool
- MySQL for the database

---

**Happy Habit Tracking! 🎯**

*Last Updated: December 18, 2025*
