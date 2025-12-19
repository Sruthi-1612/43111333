# 🎉 Registration System Setup - Complete Guide

## ✅ What Has Been Implemented

Your registration system is now **fully functional** with backend-to-database connection via XAMPP MySQL!

### Backend Features
- ✅ **Password Encryption**: BCrypt hashing for secure password storage
- ✅ **Input Validation**: Username, password (min 6 chars), display name required
- ✅ **Duplicate Prevention**: Username uniqueness enforced
- ✅ **Error Handling**: Proper HTTP status codes and error messages
- ✅ **CORS Configuration**: Frontend can communicate with backend

### Database Features
- ✅ **Auto-Creation**: Database `habit_tracker` created automatically
- ✅ **Table Schema**: Users table with id, username, password, display_name
- ✅ **Connection**: Spring Boot connected to XAMPP MySQL on localhost:3306

### Frontend Features
- ✅ **Registration Form**: Already exists in Login.tsx
- ✅ **API Integration**: AuthContext configured for backend calls
- ✅ **Error Display**: Shows validation and server errors to users

## 🚀 How to Start Everything

### 1. Start XAMPP MySQL
```
1. Open XAMPP Control Panel
2. Click "Start" next to MySQL
3. Wait for it to show "Running" status
```

### 2. Start Backend (Choose ONE method)

**Method A: Using start-backend.bat**
```batch
Double-click: start-backend.bat
```

**Method B: Command Line**
```bash
cd backend
mvnw.cmd spring-boot:run
```

**Method C: New PowerShell Window**
```powershell
cd "C:\Users\Akshaya\Gammified Learning\Habit tracker\backend"
.\mvnw.cmd spring-boot:run
```

Wait for: `Started HabitBackendApplication in X seconds`

### 3. Start Frontend
```bash
npm run dev
```

Open browser: `http://localhost:5173`

## 🧪 Testing the Registration

### Option 1: Through the UI (Recommended)
1. Open `http://localhost:5173`
2. Click "Register" or "Don't have an account? Register"
3. Fill in the form:
   - Username: `johndoe` (must be unique)
   - Password: `mypassword123` (min 6 characters)
   - Display Name: `John Doe`
4. Click "Register"
5. On success, you'll be able to login with these credentials

### Option 2: Using PowerShell Script
```powershell
cd "C:\Users\Akshaya\Gammified Learning\Habit tracker"
.\test-registration.ps1
```

### Option 3: Using Batch File
```batch
Double-click: test-registration.bat
```

### Option 4: Using Postman or curl
**POST** `http://localhost:8080/api/auth/register`

Headers:
```
Content-Type: application/json
```

Body:
```json
{
  "username": "johndoe",
  "password": "mypassword123",
  "displayName": "John Doe"
}
```

Expected Response (201 Created):
```json
{
  "id": 1,
  "username": "johndoe",
  "displayName": "John Doe",
  "message": "Registration successful"
}
```

## 🗄️ Viewing Data in Database

### Quick Method: phpMyAdmin
1. Go to `http://localhost/phpmyadmin`
2. Click `habit_tracker` database (left sidebar)
3. Click `users` table
4. Click "Browse" tab
5. See all registered users!

**See [VIEW_DATABASE.md](VIEW_DATABASE.md) for detailed instructions**

## 📊 API Endpoints

### Register New User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",      // Required, unique
  "password": "string",      // Required, min 6 chars
  "displayName": "string"    // Required
}

Response Codes:
- 201: Success
- 400: Invalid input
- 409: Username already exists
- 500: Server error
```

### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response Codes:
- 200: Success
- 400: Invalid input
- 401: Invalid credentials
```

## 🔒 Security Features

### Password Encryption
- **Algorithm**: BCrypt with cost factor 10
- **Storage**: Encrypted passwords stored in database
- **Verification**: Passwords compared using BCrypt's secure compare function
- **Sample**: `$2a$10$abc123xyz...` (60 characters)

### Validation Rules
| Field | Rules |
|-------|-------|
| Username | Required, unique, trimmed |
| Password | Required, minimum 6 characters |
| Display Name | Required, trimmed |

### CORS Configuration
- **Allowed Origin**: http://localhost:5173
- **Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Credentials**: Enabled

## 📁 Project Structure

```
Habit tracker/
├── backend/
│   ├── src/main/java/com/example/habit/
│   │   ├── controller/
│   │   │   └── AuthController.java      ← Registration & Login endpoints
│   │   ├── service/
│   │   │   └── UserService.java         ← Password encryption & validation
│   │   ├── entity/
│   │   │   └── User.java                ← Database model
│   │   ├── repository/
│   │   │   └── UserRepository.java      ← Database queries
│   │   └── config/
│   │       └── CorsConfig.java          ← CORS settings
│   └── src/main/resources/
│       └── application.properties       ← Database configuration
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx              ← Frontend API calls
│   └── pages/
│       └── Login.tsx                    ← Registration UI
├── test-registration.ps1                ← PowerShell test script
├── test-registration.bat                ← Batch test script
├── BACKEND_FRONTEND_SETUP.md            ← This file
└── VIEW_DATABASE.md                     ← Database viewing guide
```

## 🐛 Troubleshooting

### Backend Won't Start
**Issue**: Port 8080 already in use
```powershell
# Find process using port 8080
netstat -ano | findstr :8080
# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Cannot Connect to Database
**Issue**: MySQL not running
```
1. Open XAMPP Control Panel
2. Start MySQL
3. If fails, check logs in XAMPP control panel
```

**Issue**: Database doesn't exist
```
- Backend creates it automatically on first run
- Or create manually in phpMyAdmin: Database name "habit_tracker"
```

### Frontend Cannot Connect
**Issue**: CORS error
```
- Verify backend is running on port 8080
- Check browser console for specific error
- Ensure CORS allows localhost:5173
```

**Issue**: "Failed to fetch"
```
- Backend is not running
- Check backend logs for errors
- Verify URL is http://localhost:8080
```

### Registration Fails

| Error | Cause | Solution |
|-------|-------|----------|
| Username already exists | Username is taken | Choose different username |
| Password must be at least 6 characters | Password too short | Use 6+ characters |
| Username is required | Empty username | Fill in username |
| Display name is required | Empty display name | Fill in display name |

## 📝 Configuration Files

### Database Connection
**File**: `backend/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/habit_tracker
spring.datasource.username=root
spring.datasource.password=
```

### Frontend API URL
**File**: `src/contexts/AuthContext.tsx`
```typescript
const API_URL = 'http://localhost:8080/api/auth';
```

## 🎯 Next Steps

### Immediate
1. ✅ Test registration through UI
2. ✅ Verify data in phpMyAdmin
3. ✅ Test login with registered user

### Future Enhancements
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add JWT token authentication
- [ ] Create user profile page
- [ ] Add avatar/image upload
- [ ] Implement role-based access control

## 📞 Quick Reference

| Service | URL | Status Check |
|---------|-----|--------------|
| Frontend | http://localhost:5173 | Should show habit tracker app |
| Backend | http://localhost:8080 | Spring Boot banner in console |
| Database | http://localhost/phpmyadmin | Shows phpMyAdmin interface |
| MySQL | localhost:3306 | Green "Running" in XAMPP |

## ✨ Key Files Modified

1. **backend/pom.xml** - Added Spring Security Crypto dependency
2. **backend/src/main/java/.../service/UserService.java** - Created with BCrypt
3. **backend/src/main/java/.../controller/AuthController.java** - Enhanced validation

## 🎉 Success Indicators

Your setup is working correctly if:
- ✅ Backend logs show: "Started HabitBackendApplication"
- ✅ Database connection shows: "HikariPool-1 - Start completed"
- ✅ Frontend loads without errors
- ✅ Registration returns HTTP 201 with user data
- ✅ Data appears in phpMyAdmin users table
- ✅ Login works with registered credentials

---

**Everything is ready! Start testing your registration system now! 🚀**
