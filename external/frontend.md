Project Name: Secure Note-Taking App (Fluid Responsive Web Application)
### 1. PROJECT VISION & DESIGN DNA (#F7)
- **Aesthetic**: Modern "Soft SaaS" / Professional Productivity Tool.
- **Visual Goal**: High-end, cohesive user experience across all device breakpoints.
- **Design Rules**: 
    - **Typography**: Primary Sans-serif (Inter or Poppins). Headers: Semi-bold (#1E293B). Body: Regular (#475569).
    - **Corners**: Consistent "Modern Soft" feel. Use 24px (rounded-3xl) for Auth cards, 20px (rounded-2xl) for Dashboard cards, and 12px (rounded-xl) for buttons/inputs.
    - **Palette**: Background: Slate-50 (#F8FAFC); Surface: Pure White (#FFFFFF); Primary: Indigo-600 (#4F46E5); Success: Emerald-500.
    - **Interactions**: Finalize smooth transitions (0.2s ease) and hover states for all buttons (slight darken) and inputs (Indigo-600 focus ring).

### 2. GLOBAL LAYOUT WRAPPER (#F7)
Create a responsive global wrapper that adapts as follows:
- **Desktop (>1024px)**: Permanent Left Sidebar (260px) with Nav Links (Dashboard, Admin, Aggregations), User Profile, and Logout.
- **Tablet (768px-1024px)**: Collapsed Sidebar (Icon rail) to maximize data view.
- **Mobile (<768px)**: Bottom Navigation Bar with 4 clear touch-targets. Top-bar showing Page Title and User Avatar.

### 3. AUTHENTICATION HUB (#F1)
- **Login Screen**: Centered Card UI (rounded-3xl) with soft shadows. Standard Email/Password fields.
- **Signup Screen**: Identical Card UI. 
- **Critical Feature**: A dynamic "Interests" input. Users type an interest and press enter to create a rounded Indigo pill/tag. The tags must accumulate in a visual "tag cloud" inside the input area.

### 4. USER DASHBOARD & NOTE MANAGEMENT (#F4)
- **Layout**: Adaptive grid system. Desktop: 3-column grid. Tablet: 2-column. Mobile: 1-column list.
- **Note Cards**: Show Title, Content snippet, and a 'CreatedAt' timestamp.
- **Actions**: Floating Action Button (FAB) on mobile for "New Note". Modals with rounded-2xl corners for "Create/Edit" forms.
- **Pagination**: Centered footer controls with Indigo "Previous" and "Next" buttons.

### 5. ADMIN COMMAND CENTER (#F5)
- **Layout**: High-density Management Dashboard.
- **User List**: A clean responsive table (Desktop) that collapses into "User Detail Cards" on mobile. Must show Role (User/Admin) and Interest counts.
- **Global Visibility**: A toggle view to "View All System Notes" where each note card features a distinct Author Badge.

### 6. DATA AGGREGATION VIEWS (#F6)
- **Scenario A (Interests)**: A grid of cards where each card represents an "Interest Group" (e.g., "Chess"). List the emails/avatars of users inside their respective interest cards.
- **Scenario B ($lookup Feed)**: A profile-focused feed. Large header with user details, followed by a vertical stream of that specific user's posts.

### 7. QUALITY AUDIT REQUIREMENTS (#F7)
- Ensure consistent padding and margin across all screens.
- Design "Empty States" for the Note List and Admin List using consistent iconography.
- Ensure all components look "market-standard" (clean, airy, and functional).