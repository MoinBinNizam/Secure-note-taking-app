It is great to see you moving forward with **Care Guide**. Given the tight deadline (May 10th) and the specific technical constraints, your strategy must prioritize **database efficiency** and **clean integration** over visual flair.

Since you are already using **React** and **Tailwind CSS**, you have the frontend covered. For the backend, we will stick strictly to the **Node.js, TypeScript, and MongoDB** stack requested.

Here is your step-by-step guideline to completing the task.

---

## Phase 1: Project Architecture & Setup
Before coding, structure your project to handle both roles (User/Admin) and the specific MongoDB requirements.

1.  **Initialize Project:** Use `npm init` and set up TypeScript with `tsconfig.json`.
2.  **Folder Structure:** * `src/models`: Mongoose schemas (User, Note, Post).
    * `src/controllers`: Logic for Auth, Notes, and Aggregations.
    * `src/middleware`: JWT verification and Role-based checks.
    * `src/routes`: API endpoints.

---

## Phase 2: Secure Authentication
[cite_start]The requirements emphasize secure password hashing and JWT[cite: 15, 16].

* [cite_start]**User Schema:** Include `email`, `password` (hashed), `role` (enum: 'User', 'Admin'), and `interests` (array of strings)[cite: 8, 28].
* **Hashing:** Use `bcrypt` to hash passwords before saving.
* **JWT Middleware:** Create a function to verify tokens and attach the user object to the request.
* [cite_start]**Role Check:** Build a second middleware to restrict Admin routes (e.g., `checkRole(['Admin'])`)[cite: 12].

---

## Phase 3: Note Management & Optimization
This is the core of the app. [cite_start]You must implement CRUD with specific visibility rules[cite: 11, 12].

* [cite_start]**The Schema:** Use `schema.index()` as requested[cite: 18].
    * [cite_start]**Index 1:** `{ ownerId: 1, createdAt: -1 }` for paginated note lists[cite: 21, 22].
* **Permissions:**
    * **Users:** Query by `{ ownerId: req.user.id }`.
    * [cite_start]**Admins:** Query `{}` to see all notes[cite: 12].
* [cite_start]**Pagination:** Use `.skip((page - 1) * limit).limit(limit)` for all list routes[cite: 20].

---

## Phase 4: Solving the Aggregation Scenarios
These are the "make or break" parts of your technical evaluation.

### Scenario 1: Group by Interests
* [cite_start]**Task:** View users grouped by their interest array[cite: 30].
* **Pipeline:** 1.  `$unwind`: Deconstruct the `interests` array.
    2.  `$group`: Group by the interest string and `$push` user names/IDs into an array.
* [cite_start]**Index:** Ensure `{ interests: 1 }` is indexed[cite: 24].

### Scenario 2: User Posts ($lookup)
* [cite_start]**Task:** Get all posts for a specific user using a separate collection[cite: 36, 37].
* **Pipeline:**
    1.  `$match`: Filter the user by ID.
    2.  `$lookup`: Join with the `Posts` collection where `localField: "_id"` and `foreignField: "authorId"`.
* [cite_start]**Index:** Ensure `authorId` in the **Posts** collection is indexed[cite: 24].

---

## Phase 5: The "Efficiency" Review
[cite_start]The document warns against "unnecessary indexes"[cite: 38, 39]. Before submitting:

1.  [cite_start]**Audit Indexes:** Only keep indexes that directly support your `$match`, `$sort`, or `$lookup` stages[cite: 40].
2.  [cite_start]**Frontend Integration:** Build your React/Tailwind UI to display the notes and the Admin dashboard (User management)[cite: 4].
3.  **Documentation:** Briefly explain in your README why you chose each index to show you understood the efficiency requirement.

---

### Critical Reminders for the Care Guide Interview:
* **Night Shift Readiness:** Since the role is 6 PM – 3 AM, ensure your communication during the task reflects your ability to work these hours.
* **TypeScript:** Ensure all interfaces (especially for Express Request objects) are properly typed to show "expertise".

Do you want to start with the Mongoose schema definitions for the Note and User models?