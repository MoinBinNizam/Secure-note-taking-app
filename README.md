# Secure Note-Taking Application

A robust, secure, and responsive note-taking platform featuring Role-Based Access Control (RBAC), advanced MongoDB aggregations, and a modern "Soft UI" interface.

## 🚀 Features

- **Authentication & Security**: Secure JWT-based authentication with password hashing (bcrypt).
- **Role-Based Access Control (RBAC)**:
  - **User**: Can CRUD their own notes.
  - **Admin**: Manages users and has global visibility of all notes.
- **Database Optimization**:
  - Pagination implemented across all list endpoints.
  - Efficient indexing strategy following the "Critical Constraint" (No unnecessary indexes).
- **MongoDB Aggregations**:
  - **Group by Interests**: Aggregation pipeline to group users by interest categories.
  - **User Posts ($lookup)**: Aggregation pipeline to join users with their posts.
- **Responsive UI**: Mobile-first design using Tailwind CSS and Framer Motion for a modern experience.

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
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/note-taking
JWT_SECRET=your_secret_key_here
```

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

## 🛡 Security & RBAC
- **Admin Access**: Manually update the `role` field in your MongoDB `users` collection to `'Admin'` to access the Admin Command Center.
- **Role Restriction**: Navigation items for Admin/Aggregations are dynamically hidden for non-admin users.

## 🧪 Testing Guide
- **Login**: Use registered credentials.
- **Dashboard**: View personal note statistics.
- **Notes**: Create, Edit, and Delete notes using the rich-text-supported editor.
- **Admin**: Promote a user to Admin via DB and verify the "Admin" sidebar menu appears.
