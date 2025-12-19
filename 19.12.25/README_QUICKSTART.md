# 🎯 Habit Tracker - Quick Start Guide

## ✅ What You Have

✓ React 19 + TypeScript Frontend (http://localhost:5173)
✓ Spring Boot 3.4.1 Backend (http://localhost:8080)
✓ MySQL Database (localhost:3306)
✓ User Registration & Login
✓ Guest User Mode
✓ User Profiles
✓ Habit Tracking
✓ Mood Journal
✓ Dark/Light Theme

---

## 🚀 Quick Start (3 Steps)

### Step 1️⃣: Verify Everything is Ready
```bash
# Double-click: verify-setup.bat
# Or in PowerShell:
.\verify-setup.bat
```

This checks:
- ✓ Java 17+
- ✓ Node.js & npm
- ✓ MySQL service
- ✓ Ports availability
- ✓ Backend health

---

### Step 2️⃣: Start Backend (Terminal 1)
```bash
# Option A: Double-click this file
start-backend.bat

# Option B: Manual command
cd backend
.\mvnw.cmd spring-boot:run
```

**Wait for:**
```
Tomcat started on port(s): 8080
Started HabitBackendApplication
```

---

### Step 3️⃣: Start Frontend (Terminal 2)
```bash
# Option A: Double-click this file
start-frontend.bat

# Option B: Manual command
npm run dev
```

**Wait for:**
```
Local:   http://localhost:5173/
```

Open **http://localhost:5173** in your browser ✨

---

## 🔐 Login & Register

### Guest User (No Backend Needed)
1. Click **"Continue as Guest"**
2. Enjoy full access as Guest User
3. Data saved locally only

### Register New User (Requires Backend)
1. Click **"Don't have an account? Register"**
2. Fill in:
   - **Username:** `john_doe` (must be unique)
   - **Password:** `secure123`
   - **Display Name:** `John Doe`
3. Click **Register** → "Registration successful!"
4. Login with same credentials
5. Data synced to MySQL database

### Login with Registered User
1. Enter username & password
2. Data auto-loads from database
3. View profile at 👤 icon

---

## 📊 Database Check

To verify users are being saved:

```powershell
# Open MySQL client
mysql -u root -p root

# In MySQL:
USE habit_tracker;
SELECT * FROM users;
DESC users;
```

You should see:
```
+----+----------+----------+--------------+
| id | username | password | display_name |
+----+----------+----------+--------------+
|  1 | john_doe | secure123 | John Doe    |
+----+----------+----------+--------------+
```

---

## 🛠️ Troubleshooting

### "Cannot connect to backend"
```powershell
# Check if backend is running
netstat -ano | findstr :8080

# If not running, start it:
cd backend
.\mvnw.cmd spring-boot:run
```

### "Username already exists"
```powershell
# Clear test data
mysql -u root -p root
USE habit_tracker;
DELETE FROM users;
```

### MySQL not starting
```powershell
# Check service status
Get-Service MySQL80

# If stopped, start it
Start-Service MySQL80
```

### Port 8080/5173 already in use
```powershell
# Kill process on port 8080
netstat -ano | findstr :8080
# Note the PID, then:
taskkill /PID <PID> /F
```

---

## 📁 Project Structure

```
Habit tracker/
├── src/                          # React Frontend
│   ├── pages/
│   │   ├── Login.tsx            # Login & Register
│   │   ├── Home.tsx             # Main dashboard
│   │   ├── ProfilePage.tsx       # User profile
│   │   ├── JournalPage.tsx       # Diary
│   │   ├── QuotesPage.tsx        # Mindful quotes
│   ├── contexts/
│   │   ├── AuthContext.tsx       # Auth logic
│   │   ├── ThemeContext.tsx      # Dark/Light theme
│   ├── App.tsx                   # Routes
│
├── backend/                       # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/example/habit/
│   │       ├── controller/
│   │       │   ├── AuthController.java      # Login/Register
│   │       │   ├── HealthController.java    # Health check
│   │       ├── entity/
│   │       │   └── User.java                # User model
│   │       ├── repository/
│   │       │   └── UserRepository.java      # Database queries
│   │       ├── dto/
│   │       │   ├── AuthRequest.java
│   │       │   └── AuthResponse.java
│   │       ├── config/
│   │       │   └── CorsConfig.java          # CORS setup
│   ├── pom.xml                             # Maven dependencies
│   ├── src/main/resources/
│   │   └── application.properties            # MySQL config
│
├── SETUP_GUIDE.md                # Detailed setup guide
├── start-backend.bat             # Quick start backend
├── start-frontend.bat            # Quick start frontend
├── verify-setup.bat              # System verification
└── package.json                  # npm dependencies
```

---

## 🌐 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/health` | Backend health check |

**Example Registration:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "secure123",
    "displayName": "John Doe"
  }'
```

---

## 🔒 Security Notes

⚠️ **For Development Only!**

Current Implementation:
- ❌ Passwords stored in plain text
- ❌ No password hashing (bcrypt)
- ❌ No JWT tokens
- ❌ CORS allows all origins

**For Production, Add:**
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication tokens
- ✅ HTTPS/SSL
- ✅ Restrict CORS origins
- ✅ Rate limiting
- ✅ Input validation

---

## 📱 Features

### ✅ Authentication
- Register with username, password, display name
- Login with credentials
- Guest mode (no registration needed)
- Profile page with user info

### ✅ Habit Tracking
- Add habits with time
- Mark complete/incomplete
- View daily habits
- Timeline view

### ✅ Mood Tracking
- 5-level mood selector
- 49-day mood heatmap
- Color coded (red→green)

### ✅ Journaling
- Write diary entries
- Per-day entries
- Auto-save
- Lined paper aesthetic

### ✅ Quotes
- Random mindfulness quotes
- Generate new quotes
- Inspirational messages

### ✅ Theming
- Dark/Light mode toggle
- Persistent preference
- All pages themed

---

## 🎨 Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS 3.4** - Styling
- **React Router 6** - Navigation

### Backend
- **Spring Boot 3.4.1** - Framework
- **Spring Data JPA** - Database ORM
- **MySQL 8.0+** - Database
- **Hibernate** - ORM
- **Lombok** - Boilerplate reduction

---

## 💡 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Cannot connect to backend" | Backend not running | Run `start-backend.bat` |
| "Username already exists" | Username in use | Try different username |
| MySQL connection error | MySQL not running | Start MySQL service |
| Port 8080 in use | Another app using port | `taskkill /PID <PID> /F` |
| Page blank | Frontend not running | Run `start-frontend.bat` |

---

## 📞 Need Help?

1. Check **SETUP_GUIDE.md** for detailed steps
2. Run **verify-setup.bat** to diagnose
3. Check MySQL: `mysql -u root -p root`
4. Check backend logs in terminal
5. Check browser console (F12)

---

**Happy Tracking! 🚀**
