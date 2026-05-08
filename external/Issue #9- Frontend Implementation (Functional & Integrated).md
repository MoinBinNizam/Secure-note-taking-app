Since you have built the secure foundation and the complex database logic, you now need to bridge the gap between your backend and the user. The next step is **Issue #9: Frontend Implementation (Functional & Integrated)**.

Per the task requirements, the visual style is not the priority; the focus must be on **functionality and integration**. Since you are already using **React and Tailwind CSS**, this prompt will help you build a clean, sharp-cornered UI that follows your preferred "flat design" aesthetic.

### ⌨️ Gemini CLI Prompt for Issue #9

Copy and paste this into your **Gemini CLI** (target your `frontend/` directory) to generate the core integration:

```text
Act as a Senior Frontend Engineer. Build the core React application for the "note-taking-application" using TypeScript and Tailwind CSS.

### Requirements:
1. **Design System**: 
   - Apply "Flat Design" principles: strictly no rounded corners (use 'rounded-none'), high contrast, and a professional, minimal aesthetic.
   - Use Tailwind CSS for all styling.

2. **Authentication Flow**:
   - Create a 'useAuth' hook to manage JWT storage in localStorage/cookies.
   - Implement Login and Signup pages.
   - Build a 'ProtectedRoute' component to redirect unauthenticated users.

3. **Dashboard Views**:
   - **User View**: A list of personal notes with pagination controls. Include a form to create/edit notes.
   - **Admin View**: A specialized dashboard to "Manage Users" (list/remove) and "View All Notes" across the system.
   - **Aggregation View**: A page that displays the "Users Grouped by Interests" result from the backend's aggregation pipeline.

4. **API Integration**:
   - Create an Axios instance with an interceptor to automatically attach the Bearer token to the 'Authorization' header for every request.
   - Implement error handling for 401 (Unauthorized) and 403 (Forbidden) responses.

### Technical Constraints:
- Use functional components and React Hooks (useEffect, useState).
- Focus on logical flow: ensure the UI updates immediately after a note is added or a user is managed.
- Keep the code modular by separating services, components, and pages.

```

---

### 📂 Folder Management:

* **Services**: Save to `frontend/src/services/api.ts`.
* **Hooks**: Save to `frontend/src/hooks/useAuth.ts`.
* **Components**: Save to `frontend/src/components/`.

### 🚀 Why this is the next step:

The job post emphasizes the ability to **"Collaborate with developers... to implement backend-driven solutions"**. By finishing the frontend now, you prove that your backend is fully functional and ready for real-world use.

This also allows you to verify that your **Pagination** and **Aggregation**  results are rendering correctly before your final submission.

Once completed, your commit will be:
`git commit -m "feat: implement flat-design frontend with RBAC and API integration #9"`

**What’s after this?** Once the UI is connected, the final move is **Issue #10: Final Audit & Documentation**, where you verify your **indexing efficiency** —the most critical part of the evaluation. Ready for that prompt?