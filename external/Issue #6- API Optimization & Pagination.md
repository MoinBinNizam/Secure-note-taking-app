⌨️ Gemini CLI Prompt for Issue #6
Plaintext

Act as a Senior Database Architect. Optimize the "note-taking-application" API for performance and scalability as per the interview requirements.

### Optimization Requirements:
1. **Pagination Utility**:
   - Create a reusable utility or middleware to handle pagination (page, limit, skip) for all list operations (Notes, Users, Aggregations)[cite: 20].
2. **Indexing Strategy (CRITICAL)**:
   - Audit the Note and User models to ensure all GET operations (fetching a specific profile or note) are supported by indexes[cite: 22].
   - Add a `schema.index()` to the Note model to support sorting by 'createdAt' during list views[cite: 21].
3. **Efficiency Audit**:
   - Ensure no "unnecessary indexes" are created[cite: 39]. 
   - Add comments in the code explaining why each index is strictly required to support the API queries[cite: 40].

### Technical Context:
- The task explicitly evaluates the "efficiency of your indexing strategy." Use only the indexes necessary for the queries described in the requirements.

Updated Project Timeline

Since today is May 9th and the deadline is May 10th, your workflow should now look like this:

    Complete #5 & #6 (Admin logic and Indexing).

    Verify #7 & #8 (Aggregations).

    Finalize #9 (Frontend Integration).

    Run #10 (Final Documentation/README).

Git Commit Reminders:

    git commit -m "feat: implement admin user management and global note visibility #5"

    git commit -m "perf: optimize list queries with pagination and schema.index #6"

With these two issues integrated, your backend will be fully compliant with the "Database Indexing & API Optimization" section of the task. Ready for the final documentation prompt?