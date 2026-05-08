Since you have the User schema, the next logical step in your architecture is **Issue #3: Role-Based Access Control (RBAC) and JWT Authentication Middleware**.

This is a critical "gatekeeper" phase. You need to ensure that the backend can identify who is making a request and whether they have the permission (User vs. Admin) to perform that action.

### ⌨️ Gemini CLI Prompt for Issue #3

Copy and paste this into your **Gemini CLI** to generate the middleware logic:

```text
Act as a Senior Backend Developer. Create two TypeScript middleware functions for an Express.js application using JWT and Mongoose.

### Middleware 1: Authentication (auth.ts)
1. **Functionality**:
   - Extract the Bearer token from the 'Authorization' header.
   - Verify the token using 'jsonwebtoken' and a secret key from environment variables.
   - If valid, find the user in the MongoDB database (excluding the password) and attach the user object to the Request (req.user).
   - Handle errors for missing tokens, expired tokens, or invalid users.

### Middleware 2: Role-Based Authorization (roleCheck.ts)
1. **Functionality**:
   - Create a factory function that accepts an array of allowed roles (e.g., ['Admin']).
   - Compare the attached 'req.user.role' against the allowed roles.
   - If the user's role is not in the list, return a 403 Forbidden error.
   - Ensure it supports the requirement where 'Admin' inherits 'User' capabilities for general routes but is restricted for sensitive operations.

### Technical Requirements:
- Use TypeScript interfaces to extend the Express 'Request' object so 'req.user' is recognized by the compiler.
- Use standard HTTP status codes (401 for Unauthenticated, 403 for Unauthorized).
- Ensure the code is modular and follows clean code principles for a professional interview submission.

```

---

### 📂 Where to place this:

* Save the Auth logic in `backend/src/middleware/auth.ts`.
* Save the Role logic in `backend/src/middleware/roleCheck.ts`.

### 🚀 Why this is the next step:

Before you build the **Note CRUD** or the **Aggregation Scenarios**, you must have these "guards" ready. The task explicitly requires you to implement roles with specific access rights, such as Admins being able to manage users and view everyone's notes.

Once you've implemented this, your next commit would be:
`git commit -m "feat: implement JWT auth and role-based access control middleware #3"`

Would you like the prompt for **Issue #4 (Note Management)** once this is done?