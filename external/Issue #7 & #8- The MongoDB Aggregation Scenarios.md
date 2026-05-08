Since you have implemented the core CRUD logic, you now move to the most technically challenging part of the interview: **Issue #7 & #8: The MongoDB Aggregation Scenarios**.

These tasks specifically evaluate your ability to use complex pipelines and joins (`$lookup`) while maintaining efficiency. You must follow the **Critical Constraint** of using exactly one `.aggregate()` call for the first scenario.

### ⌨️ Gemini CLI Prompt for Issues #7 & #8

Copy and paste this into your **Gemini CLI** to generate the specialized aggregation controllers:

```text
Act as a Senior Database Engineer. Implement two specific MongoDB Aggregation Scenarios for the "note-taking-application" using Mongoose and TypeScript.

### Scenario 1: Group by Interests (aggregateController.ts)
1. [cite_start]**Context**: Users have an 'interests' array (e.g., ['chess', 'reading'])[cite: 28].
2. [cite_start]**Task**: Create a controller to group users by each interest[cite: 30].
3. [cite_start]**Constraint (STRICT)**: You must use exactly one `collection.aggregate()` call[cite: 31]. 
4. **Pipeline Steps**: 
   - Use '$unwind' on the 'interests' array.
   - Use '$group' to group by the interest string and '$push' relevant user details (e.g., email) into a list.
   - Use '$project' to clean up the output.

### Scenario 2: User Posts with $lookup (aggregateController.ts)
1. [cite_start]**Context**: Users can write posts stored in a separate 'Posts' collection[cite: 33].
2. [cite_start]**Task**: Retrieve all posts belonging to a particular user[cite: 36].
3. [cite_start]**Constraint (STRICT)**: Use a single aggregation pipeline with a '$lookup' stage[cite: 37].
4. **Pipeline Steps**:
   - Use '$match' to filter for the specific user ID.
   - Use '$lookup' to join the 'Posts' collection (localField: '_id', foreignField: 'authorId').
   - Use '$addFields' or '$project' to format the output.

### Technical Requirements:
- [cite_start]Use TypeScript and ensure the pipeline is optimized to use the indexes previously defined[cite: 24].
- Implement standardized error handling.
- Return the results in a clean JSON format for frontend consumption.

```

---

### 📂 File Management:

* **Controller**: Save to `backend/src/controllers/aggregateController.ts`.
* **Routes**: Create new endpoints in `backend/src/routes/aggregateRoutes.ts` (e.g., `/api/aggregations/interests` and `/api/aggregations/user-posts/:id`).

### 🚀 Why this is the next step:

The **Care Guide** task explicitly highlights these aggregation pipelines as "Critical Scenarios". Successfully implementing these demonstrates that you can handle complex data relationships beyond basic CRUD operations—a key expectation for a **Senior Backend Developer**.

Once implemented and tested, your commit will be:
`git commit -m "feat: implement high-efficiency aggregation pipelines for interests and user posts #7 #8"`

**Pro Tip:** After generating the code, check that you have the `schema.index({ interests: 1 })` in your User model to support Scenario 1, as the task requires all pipelines to be supported by appropriate indexes.

Next, should we move to the **Frontend Integration (Issue #9)** or finalize the **Admin Management (Issue #5)**?