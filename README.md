# GymForge – Back-End Setup Guide
## CIS2213 Final Project | Semester 202520

---

## Project Structure

```
gym-project/              ← Front-End (Task 2 – your HTML/CSS/JS files)
gymforge-backend/         ← Back-End (Task 3, 4, 5 – this folder)
│
├── database/
│   ├── schema.sql        ← Run this in MySQL first
│   └── db.js             ← MySQL connection pool
│
├── routes/
│   ├── auth.js           ← /api/register, /api/login, /api/logout, /api/me
│   ├── machines.js       ← /api/machines
│   ├── services.js       ← /api/services
│   ├── bookings.js       ← /api/bookings
│   └── repairs.js        ← /api/repairs
│
├── .env                  ← Database credentials (edit this!)
├── server.js             ← Express server entry point
└── package.json
```

---

## Step 1 – Set Up the Database (MySQL)

Open **MySQL Workbench** or your terminal MySQL client and run:

```sql
SOURCE /full/path/to/gymforge-backend/database/schema.sql
```

This will:
- Create the `gymforge_db` database
- Create all tables (users, machines, services, bookings, repair_requests)
- Insert sample machine and service data

---

## Step 2 – Configure Your Database Password

Open the `.env` file and update:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=gymforge_db
SESSION_SECRET=gymforge_secret_key_2025
PORT=3000
```

---

## Step 3 – Install Dependencies

```bash
cd gymforge-backend
npm install
```

---

## Step 4 – Run the Server

```bash
npm start
```

You should see:
```
✅  GymForge server running at http://localhost:3000
📂  Serving static files from: gym-project/
🔗  API base: http://localhost:3000/api
```

Open your browser at: **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint              | Auth Required | Description              |
|--------|-----------------------|---------------|--------------------------|
| POST   | /api/register         | No            | Create new account       |
| POST   | /api/login            | No            | Login (creates session)  |
| POST   | /api/logout           | No            | Logout (destroys session)|
| GET    | /api/me               | Yes           | Get logged-in user info  |
| GET    | /api/machines         | No            | Get all machines         |
| GET    | /api/machines/:id     | No            | Get machine by ID        |
| GET    | /api/services         | No            | Get all services         |
| GET    | /api/services/:id     | No            | Get service by ID        |
| GET    | /api/bookings         | Yes           | Get user's bookings      |
| POST   | /api/bookings         | Yes           | Create a new booking     |
| DELETE | /api/bookings/:id     | Yes           | Cancel a booking         |
| GET    | /api/repairs          | Yes           | Get user's repair reqs   |
| POST   | /api/repairs          | Yes           | Submit a repair request  |
