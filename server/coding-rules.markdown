## Backend Coding Rules
### 1. **Naming Conventions**
- **CamelCase for variables and function name**: `getAllStudents`.
- **Use lower case with hyphens**: File names should be written in all lowercase letters with hyphens separating words (e.g., `student.controller.js`, `user.model.js`).
- **Singular for model names**: Use singular form for models (e.g., `User`, not `Users`).
### 2. **Error Handling**
- **Use `try-catch` for asynchronous code**: When working with async functions or promises, wrap them in a `try-catch` block for error handling. Always handle errors gracefully and provide meaningful error messages.
## 3. **Coding Format**
- **Always use semicolons at the end of statements**
- **Tabs or spaces**: Use 2 spaces for indentation (avoid mixing tabs and spaces).
- **Use async/await**: Prefer `async/await` over callbacks or `.then()/.catch()` for better readability and error handling.
- **Comment**: https://viblo.asia/p/jsdoc-quy-chuan-viet-document-comment-trong-du-an-javascript-PwlVm0A0L5Z
## 4. **Environment Variables**
- **Use `.env` files for configuration**: Store environment-specific variables in `.env` files (e.g., database URLs, API keys).
## 5. **API Documentation**
- **Use Swagger**: Write the API Routes in `sever/swagger.json` and it will shows in the path `http://localhost:8080/api-docs/`