Act as a Senior Backend Architect. Generate a Mongoose Schema for a "User" model in TypeScript for a project named "note-taking-application". 

### Requirements:
1. **Fields**: 
   - email (String, unique, required, lowercase)
   - password (String, required)
   - role (String, enum: ['User', 'Admin'], default: 'User')
   - interests (Array of Strings, e.g., ['chess', 'reading'])

2. **Explicit Indexing (CRITICAL)**: 
   - Use the `schema.index()` method instead of inline field indexes to support the following queries:
   - A unique index for the email field.
   - A multikey index for the 'interests' field to support the "Group by Interests" aggregation task.
   - Ensure the indexing strategy is efficient and avoids unnecessary overhead.

3. **Security**: 
   - Implement a Mongoose 'pre-save' middleware hook to hash the user's password using 'bcrypt' with a salt factor of 10.
   - Include a custom instance method named `comparePassword` to validate login attempts.
   - Ensure the password field is excluded from JSON transformations (toObject/toJSON) for security.

4. **Code Style**:
   - Use ES6 module syntax and TypeScript interfaces for the Document and Model.
   - Export the model as 'User'.

### Context:
This is for a technical interview task that evaluates efficiency and proper use of Mongoose schema methods. The visual style of the app is not a priority; functionality and optimized data retrieval are.