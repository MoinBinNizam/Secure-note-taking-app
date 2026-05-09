### GitHub Issues: `note-taking-application`
#1 these are github issues.
1. #### **#1: Project Initialization & Environment Setup**

* Set up Monorepo structure with `backend/` and `frontend/` folders.
* Configure TypeScript, Express, and Mongoose base.
* Setup `.env` for `MONGO_URI` and `JWT_SECRET`.

2. #### **#2: Secure Authentication & Password Hashing**

* Implement `User` schema with `email`, `password`, `role`, and `interests`.


* Integrate `bcrypt` for secure password hashing.


* Develop Login/Register endpoints returning JWT.



3. #### **#3: Role-Based Access Control (RBAC) Middleware**

* Create middleware to verify JWT tokens.


* Implement role verification for `User` and `Admin` permissions.


* Ensure Admin inherits all User capabilities.



4. #### **#5: Note Management CRUD (User Logic)**

* Implement endpoints for Users to create, update, delete, and view their own notes.


* Ensure users cannot access or modify notes belonging to others.

5. #### **#6: Admin Management & Global Visibility**

* Build Admin endpoints to list and manage all users.


* Enable Admin capability to view all notes in the system.



6. #### **#7: API Optimization & Pagination**

* Implement pagination for all list operations (Notes and Users).


* Apply `schema.index()` in Mongoose to support efficient list views and GET operations.


* 
**Critical:** Verify no unnecessary indexes are created.



7. #### **#8: Aggregation Scenario 1: Group by Interests**

* Develop a specific view/endpoint to see users grouped by their `interests` array.


* 
**Constraint:** Use exactly one `collection.aggregate()` call.


* Ensure the query is supported by an appropriate index.



8. #### **#9: Aggregation Scenario 2: User Posts ($lookup)**

* Create a `Posts` collection and link to Users.


* Implement an aggregation pipeline using `$lookup` to retrieve all posts for a specific user.


* Ensure the pipeline is optimized with indexes.



9. #### **#10: Frontend Implementation (Functional & Integrated)**

* Build a Vite/React frontend with Tailwind CSS.
* Implement Auth forms (Login/Signup) and Protected Routes.
* Develop Note Dashboard (User) and Management Panel (Admin).
* Create views for the two Aggregation scenarios.

10. #### **#11: Final Audit & Production Readiness**

* Perform a final audit on indexing efficiency.


* Write a README documenting the indexing strategy and aggregation logic.
* Ensure the project is ready for the May 10th deadline.

---
