Now that your "Security Gate" is built, you need to implement the core feature of the platform: **Issue #4: Note Management CRUD**.

This step is where you demonstrate the **"User" role capabilities** and the **pagination logic** required by the task. It is also your first chance to use `schema.index` to optimize list views.

### ⌨️ Gemini CLI Prompt for Issue #4

Copy and paste this into your **Gemini CLI** to generate the Note model and the CRUD controllers:

```text
Act as a Senior Backend Engineer. Implement the Note management system for the "note-taking-application" using Mongoose and Express.

### Task 1: Mongoose Note Schema (Note.ts)
1. **Fields**:
   - title (String, required)
   - content (String, required)
   - ownerId (ObjectId, ref: 'User', required)
   - createdAt/updatedAt (Timestamps)
2. **Explicit Indexing (CRITICAL)**:
   - Use `schema.index()` to create a compound index on { ownerId: 1, createdAt: -1 }. 
   - Explain in a code comment why this index supports efficient "list my notes" operations for a specific user.

### Task 2: Note Controller (noteController.ts)
1. **Create Note**: Assign the 'ownerId' from the authenticated 'req.user.id'.
2. **Read Notes (Paginated)**: 
   - Implement a GET route that fetches notes.
   - Use 'page' and 'limit' query parameters.
   - Ensure Users only see their own notes.
   - Ensure Admins can see ALL notes (implementing the inheritance rule).
3. **Update/Delete**: 
   - Ensure a User can only update or delete a note if they are the owner.
   - Ensure an Admin can delete any note.

### Technical Requirements:
- Use TypeScript for all interfaces.
- Implement the pagination using `.skip()` and `.limit()` in Mongoose.
- Return a standardized JSON response including 'data', 'currentPage', and 'totalPages'.

```

---

### 📂 File Management:

* **Model**: Save to `backend/src/models/Note.ts`.
* **Controller**: Save to `backend/src/controllers/noteController.ts`.

### 🚀 Why this is the next step:

The task requires a "simple REST API accompanied by a functional frontend". By finishing the Note CRUD now, you complete the **primary functionality** of the app. This provides the data you will need later to test the **Aggregation Scenarios**.

Once saved, your commit will be:
`git commit -m "feat: implement paginated Note CRUD with explicit owner indexing #4"`

Ready for the **Aggregation Scenarios (Issues #7 & #8)** next, or do you want to handle the **Admin Management** first?