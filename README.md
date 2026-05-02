# 🎓 Student Management System (SMS)

A full-stack web application built with the **PERN stack** (PostgreSQL, Express, React, Node.js) featuring secure authentication, email verification, role-based access, and a modern dashboard UI.

## ✨ Features

- **Secure Authentication:** JWT-based login and registration system.
- **Email Verification:** 6-digit OTP-based email verification via Nodemailer before allowing users to log in.
- **Modern Dashboard UI:** Beautiful, responsive UI built with React, Tailwind CSS, and Lucide React icons.
- **State Management:** React Context API for managing user authentication state across the application.
- **Database:** PostgreSQL hosted on Neon Serverless DB, managed entirely with Prisma ORM (Prisma 7 Adapter).

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Framework:** React (via Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **State Management:** Context API
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend (`/server`)
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL (NeonDB)
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt (Password Hashing)
- **Email Service:** Nodemailer

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following installed or set up:
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- A free [NeonDB](https://neon.tech/) account for PostgreSQL hosting.
- A Gmail account with "App Passwords" enabled (for Nodemailer OTP sending).

### 1. Installation

Clone the repository and install the dependencies for both the frontend and the backend.

**Install Backend Dependencies:**
```bash
cd server
npm install
```

**Install Frontend Dependencies:**
```bash
cd client
npm install
```

### 2. Environment Variables

Navigate to the `server` directory and create a `.env` file. You will need to add your specific configuration:

```env
# Server Configuration
PORT=5000

# Nodemailer Configuration (For sending OTPs)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_string

# Prisma Database Connections (NeonDB)
# Notice the "-pooler" in the DATABASE_URL
DATABASE_URL="postgresql://user:password@ep-your-host-pooler.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-your-host.aws.neon.tech/neondb?sslmode=require"
```

### 3. Database Setup

Once your `.env` file is ready, generate the Prisma client and push your schema to the Neon database:

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Running the Application

You need to run both the frontend and backend servers concurrently. Open two separate terminal windows.

**Start the Backend Server:**
```bash
cd server
npm run dev
```
*(The server will start on `http://localhost:5000`)*

**Start the Frontend Client:**
```bash
cd client
npm run dev
```
*(The client will start on `http://localhost:5173`)*

---

## 📂 Folder Structure

```text
SMS/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Sidebar, etc.)
│   │   ├── context/        # AuthContext for global state
│   │   ├── pages/          # Pages (Login, Signup, Dashboard, Profile, VerifyOtp)
│   │   ├── App.jsx         # Main routing file
│   │   └── main.jsx        # Entry point
│   └── tailwind.config.js  
│
└── server/                 # Node.js/Express Backend
    ├── prisma/             
    │   └── schema.prisma   # Database schema and models
    ├── routes/             
    │   ├── authRoutes.js   # Signup, Login, Verify OTP
    │   └── userRoutes.js   # Protected profile routes
    ├── middleware/
    │   └── authMiddleware.js # JWT verification
    ├── utils/
    │   └── sendEmail.js    # Nodemailer logic
    ├── db.js               # Prisma Client initialization
    ├── index.js            # Express server entry point
    └── .env                # Secret environment variables
```
