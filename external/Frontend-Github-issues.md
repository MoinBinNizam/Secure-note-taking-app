To ensure your frontend development is as disciplined as your backend, here is the structured list of GitHub issues specifically for the **Frontend** part of the `note-taking-application`.

You can use these IDs in your commit messages (e.g., `feat: implement responsive auth cards #F1`) to demonstrate a professional workflow to the **Care Guide** team.

### **Frontend Development Issues**

#### **#F12: The Login & Sign-up "Auth Card" (Mobile-First)**

* **Goal:** Build the entry point for users with a focus on modern UI.
* **Tasks:**
* Implement `Login.tsx` and `Signup.tsx` using a centered card layout.
* Apply `rounded-2xl` or `rounded-3xl` for the "Soft UI" aesthetic.
* Create a dynamic tag-input for "Interests" in the Signup form to support the aggregation requirement.


* Ensure full mobile responsiveness (full-width on mobile, constrained on desktop).



#### **#F13: API Service & JWT Interceptor Setup**

* **Goal:** Establish a secure communication bridge with the Node.js backend.
* **Tasks:**
* Configure Axios in `services/api.ts`.
* Implement a request interceptor to attach the Bearer Token to the `Authorization` header.
* Handle `401 Unauthorized` responses to clear local storage and redirect to Login.



#### **#F14: Authentication Hook & Protected Routing**

* **Goal:** Manage session state and restrict access to private pages.
* **Tasks:**
* Develop `useAuth.ts` hook to manage user state and token persistence.
* Create the `ProtectedRoute.tsx` component to wrap private views.
* Implement Role-Based logic to separate "User" and "Admin" navigation.



#### **#F15: User Dashboard & Paginated Note List**

* **Goal:** The primary interface for users to manage their data.
* **Tasks:**
* Design `Dashboard.tsx` and `UserNotes.tsx` with a mobile-first grid of note cards.
* Implement "Create/Edit Note" modals or forms with rounded UI elements.
* Add pagination controls (Next/Prev) to consume the backend's paginated REST API.





#### **#F16: Admin Management Panel**

* **Goal:** Functional interface for the Admin role's elevated permissions.
* **Tasks:**
* Build `AdminDashboard.tsx` to list and manage all users.
* Implement a toggle or view to see "Everyone's Notes" as per the role requirements.


* Ensure the design remains consistent with the mobile-first, rounded aesthetic.



#### **#F17: Aggregation Data Visualization**

* **Goal:** Display complex data from MongoDB aggregation pipelines.
* **Tasks:**
* Implement `AggregationView.tsx` to visualize "Users Grouped by Interests".
* Use card-based layouts to show each Interest category and its associated users.
* Ensure the view effectively handles the single-call `collection.aggregate()` response.





#### **#F18: Final Responsive Polish & Layout Wrapper**

* **Goal:** Ensure a cohesive user experience across all devices.
* **Tasks:**
* Create a global `Layout` component with a responsive navigation bar.
* Audit all pages for consistent typography (Standard Sans-serif) and color usage.
* Finalize transitions and hover states for all rounded buttons and inputs.
---