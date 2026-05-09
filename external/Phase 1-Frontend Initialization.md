Since the visual style for this task focuses on functionality and integration, we will implement a clean, mobile-first responsive design with modern rounded corners for a professional feel.

Below are the detailed prompts for each file based on your directory structure.

### **UI Design System Overview**

* **Typography:** Professional Sans-serif (Inter or Poppins).
* **Corners:** Consistent `rounded-2xl` for main cards and `rounded-lg` for inputs/buttons.
* **Colors:** Deep Indigo primary (#4F46E5), soft Slate backgrounds, and clean White surfaces.
* **Responsiveness:** Single-column layout for mobile, shifting to multi-column grids for tablet/desktop.

---

### **Phase 1: Authentication Pages**

#### **Prompt for `Signup.tsx**`

> Generate a mobile-first Signup page using React, TypeScript, and Tailwind CSS.
> * **UI:** Use a centered card with `rounded-2xl` and `shadow-xl`.
> * **Fields:** Email, Password, and a dynamic "Interests" input where users can add tags (e.g., 'chess', 'reading').
> 
> 
> * **Style:** Mobile-responsive width (`w-full` on mobile, `max-w-md` on desktop). Use high-contrast indigo buttons with soft hover states.
> 
> 

#### **Prompt for `Login.tsx**`

> Create a mobile-first Login page.
> * **UI:** Minimalist card design with `rounded-2xl`.
> * **Functionality:** Integrate secure authentication using JWT. Include fields for Email and Password.
> 
> 
> * **State:** Link to the Signup page for users without accounts.
> 
> 

---

### **Phase 2: Core Components & Layout**

#### **Prompt for `ProtectedRoute.tsx**`

> Create a wrapper component for protected routes.
> 
> 
> * **Logic:** Check for a valid JWT via the `useAuth` hook.
> * **Redirection:** Redirect unauthenticated users to `/login`.
> 
> 

#### **Prompt for `api.ts` (Services)**

> Setup an Axios instance for the REST API.
> * **Interceptors:** Automatically attach the JWT token to the 'Authorization' header for all requests.
> 
> 
> * **Error Handling:** Handle 401/403 status codes by redirecting to login.
> 
> 

---

### **Phase 3: User & Admin Dashboards**

#### **Prompt for `Dashboard.tsx` (User View)**

> Create a mobile-first dashboard for Users.
> 
> 
> * **Features:** A floating action button (FAB) for mobile to "Add Note".
> * **Logic:** Allow users to create, update, and delete their own notes.
> * **Pagination:** Include a footer with "Previous/Next" pagination buttons for the list view.
> 
> 
> 
> 

#### **Prompt for `AdminDashboard.tsx**`

> Generate a comprehensive Admin management portal.
> * **User Management:** A responsive list of users with "Remove" or "Update" actions.
> * **Global Visibility:** A section to "View Everyone's Notes".
> 
> 
> * **Style:** Use a sidebar navigation for desktop and a bottom-tab bar for mobile.
> 
> 

---

### **Phase 4: Specialized Data Views**

#### **Prompt for `AggregationView.tsx**`

> Implement the UI for the "Group by Interests" aggregation scenario.
> 
> 
> * **UI:** Display "Interest Cards" (e.g., a card titled 'Chess').
> * **Content:** List all users who share that specific interest inside the card.
> * **Layout:** Use a responsive masonry or grid layout with soft `rounded-xl` borders.
> 
> 

#### **Prompt for `UserNotes.tsx` (Scenario 2)**

> Create a view to display all posts/notes for a specific user.
> * **Scenario 2 Integration:** This page should consume the `$lookup` aggregation result from the backend.
> 
> 
> * **UI:** A feed-style list of notes with a clear "Author" header.
> 
> 

### **Final Senior Tip**

While the visual style is now "rounded and responsive," remember the **Critical Constraint**: your backend must support these views with proper `schema.index` definitions for pagination and list operations. The frontend is the tool to prove your indexing strategy is efficient and functional.