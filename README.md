````md
# 🧪 Lab Management System (Full Stack Project)

This is a simple Lab Management System built with React (frontend), Node.js + Express (backend), and MySQL database.

Users can book test appointments, and admins can manage and search bookings.

---

## ✨ Features

- 👤 User Sign Up & Login (JWT Auth)
- 🧾 Book a medical test (blood, x-ray, etc.)
- 🔐 Admin Login (hardcoded)
- 📋 Admin Dashboard to view & search patient bookings
- 🧠 Role-based JWT protection
- ✅ Clean UI using Material UI (MUI)

---

## 🔧 Tech Stack

- **Frontend**: React, Material UI
- **Backend**: Node.js, Express.js
- **Database**: MySQL (with `mysql2`)
- **Auth**: JWT (JSON Web Tokens)
- **Others**: bcrypt, axios

---

## 🚀 How to Run

### 1. Clone the repo

```bash
git clone https://github.com/your-username/lab-management-system
cd lab-management-system
```
````

### 2. Setup Backend

```bash
cd server
npm install
# Set .env values (MySQL + JWT secret)
node server.js
```

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🔐 Admin Credentials

```bash
Username: admin
Password: admin123
```
