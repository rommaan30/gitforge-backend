 GitForge Backend

GitForge is a GitHub-inspired backend server that replicates core GitHub features such as user authentication, repository management, commit handling, and issue tracking.

 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB (or PostgreSQL/MySQL)
- JWT for authentication
- RESTful API structure

 📂 Features

- 🔐 User Registration & Login
- 📁 Create, View, Delete Repositories
- 💬 Add Commits, Branches, and Issues
- 👥 Role-based Access Control
- 📦 REST API Design

 📄 API Documentation

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | /api/register      | Register a new user      |
| POST   | /api/login         | Login existing user      |
| POST   | /api/repos         | Create a new repository  |
| GET    | /api/repos/:id     | Get repository details   |
| POST   | /api/repos/:id/commits | Add a new commit     |
| POST   | /api/repos/:id/issues  | Create a new issue    |
