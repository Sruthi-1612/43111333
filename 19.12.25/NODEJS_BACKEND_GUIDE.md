# Node.js Backend Setup Complete! 🚀

## Quick Start

### Option 1: Use the automated script
```bash
start-all-nodejs.bat
```
This will start both the backend and frontend servers.

### Option 2: Start manually

1. **Start Backend** (in one terminal):
   ```bash
   cd habit-backend
   npm run dev
   ```
   Backend will run on: http://localhost:8080

2. **Start Frontend** (in another terminal):
   ```bash
   npm run dev
   ```
   Frontend will run on: http://localhost:5173

## Prerequisites Checklist

✅ **XAMPP MySQL must be running**
   - Open XAMPP Control Panel
   - Start MySQL (port 3306)
   - Database name: `habit_tracker`

✅ **Node.js installed** (v16 or higher)

## Backend API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Login user |

### Register Example
```json
POST http://localhost:8080/api/auth/register
{
  "username": "testuser",
  "password": "password123",
  "displayName": "Test User"
}
```

### Login Example
```json
POST http://localhost:8080/api/auth/login
{
  "username": "testuser",
  "password": "password123"
}
```

## Database Configuration

The backend automatically creates the `users` table on startup.

Database connection settings (in `habit-backend/.env`):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=habit_tracker
```

## Troubleshooting

### Backend won't start
1. Make sure XAMPP MySQL is running
2. Check if port 8080 is available: `netstat -ano | findstr :8080`
3. Verify database exists in phpMyAdmin: http://localhost/phpmyadmin

### Cannot connect to database
1. Check XAMPP MySQL is running
2. Verify database `habit_tracker` exists
3. Check credentials in `habit-backend/.env`

### Port already in use
- Change port in `habit-backend/.env`:
  ```
  PORT=8081
  ```

## File Structure

```
habit-backend/
├── src/
│   ├── server.ts           # Main server file
│   ├── config/
│   │   └── database.ts     # Database connection
│   ├── routes/
│   │   └── auth.ts         # Authentication routes
│   └── middleware/
│       └── auth.ts         # JWT authentication middleware
├── .env                    # Environment variables
├── package.json            # Dependencies
└── tsconfig.json          # TypeScript config
```

## Testing the Server

1. **Health Check**:
   Open http://localhost:8080/api/health in browser
   Expected: `{"status":"OK","message":"Server is running"}`

2. **Register a User**:
   ```bash
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d "{\"username\":\"test\",\"password\":\"test123\",\"displayName\":\"Test\"}"
   ```

3. **Login**:
   ```bash
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d "{\"username\":\"test\",\"password\":\"test123\"}"
   ```

## Features

✅ User Registration with password hashing (bcrypt)
✅ User Login with JWT token generation
✅ MySQL database with XAMPP
✅ CORS enabled for frontend communication
✅ Auto-reconnecting database pool
✅ TypeScript for type safety
✅ Hot reload with ts-node-dev

## Next Steps

1. Make sure XAMPP MySQL is running
2. Run `start-all-nodejs.bat`
3. Open http://localhost:5173 in your browser
4. Register a new account and start using the app!

## Support

- Backend logs: Check the terminal where `npm run dev` is running
- Database: Use phpMyAdmin at http://localhost/phpmyadmin
- Backend README: See `habit-backend/README.md` for more details
