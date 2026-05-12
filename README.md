# Secure Note-Taking Application

A robust, secure, and responsive note-taking platform featuring Role-Based Access Control (RBAC), advanced MongoDB aggregations, and a modern "Soft UI" interface.

## 🚀 Key Features

- **Authentication & Security**: Secure JWT-based authentication with bcrypt password hashing.
- **Role-Based Access Control (RBAC)**:
  - **User**: Manage personal notes (Create, Read, Update, Delete).
  - **Admin**: Elevated permissions to manage users and access global note data.
- **Database Optimization**:
  - Pagination for efficient list operations.
  - Optimized schema indexing for query performance.
- **MongoDB Aggregations**:
  - **Group by Interests**: Single-call aggregation to visualize users by interest.
  - **User Posts**: Single-call aggregation with `$lookup` to fetch user-linked posts.
- **Modern Responsive UI**: Mobile-first design using Tailwind CSS and Framer Motion.

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, Axios, React Router, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT.

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or via Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd note-taking-application
   ```

2. Install Backend Dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install Frontend Dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration
1. Navigate to the `backend/` directory.
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Open the newly created `.env` file and configure your credentials:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/note-taking
   JWT_SECRET=your_secure_random_string_here
   ```

> **Security Warning**: Do not commit your actual `.env` file to version control.

### Running the Application

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd ../frontend
   npm run dev
   ```

## 🛡 Security & Admin Access
- **Admin Setup**: To grant admin privileges, manually update the `role` field of a user in your MongoDB database to `'Admin'`.
- **RBAC**: Administrative navigation links and data views are dynamically hidden and protected server-side for non-admin users.

## 🧪 Testing Guide
- **Authentication**: Sign up/Log in flow with protected routes.
- **Note Management**: Create, edit, and delete notes.
- **Admin Panel**: Manage users and view specific user notes via the Command Center.
- **Aggregations**: View interest-based grouping in the Aggregations panel.
