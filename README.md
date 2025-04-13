## User Management Application
This is a React-based user management application that integrates with the Reqres API to provide basic user management functionalities. The project is divided into three levels of increasing complexity: Authentication, User List, and User Management (Edit/Delete).

## Live Demo
You can access the deployed application at the following link: https://user-management-rho-bay.vercel.app/login

## Features

### Level 1: Authentication
- Login screen using the Reqres API
- Authentication with email/password
- Token storage for authenticated sessions

### Level 2: User List
- Paginated display of users
- User cards with avatar, name, and email
- Pagination controls

### Level 3: User Management
- Edit user details (first name, last name, email)
- Delete users
- Search and filter users

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm 

### Installation

1. Clone the repository or download the source code
2. Install dependencies:
```
npm install
```

### Running the Application
```
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

### Login Credentials
- Email: eve.holt@reqres.in
- Password: cityslicka

## Tech Stack
- React
- JavaScript (converted from TypeScript)
- React Router for navigation
- Axios for API requests
- React Toastify for notifications

## API Reference
The application uses the [Reqres API](https://reqres.in/) for all operations:
- Login: POST /api/login
- Get Users: GET /api/users?page=1
- Update User: PUT /api/users/{id}
- Delete User: DELETE /api/users/{id}

