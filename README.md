# Taskify 📝

A Full-Stack Real-Time Task Management Application with Angular, Node.js, MongoDB, JWT Authentication, and Socket.IO.

---

## 🌟 Features

- 🔒 Secure user authentication (Signup/Login) using JWT
- ✅ Create, Read, Update, Delete (CRUD) tasks
- 📋 Filter tasks by Status (Pending, Completed) and Priority (Low, Medium, High)
- 🛡️ Protected routes (AuthGuard) and auto-attach JWT Token (Interceptor)
- 🛠️ API Documentation using Swagger
- 📦 Deployed on MongoDB Atlas (Cloud Database)

---

## 🖥️ Technologies Used

| Frontend | Backend | Database | Others |
|:---------|:--------|:---------|:-------|
| Angular 16 | Node.js | MongoDB Atlas |
| Angular Material | Express.js | Mongoose | Swagger UI |
| RxJS | JWT (jsonwebtoken) |  | Jasmine + Karma |
| Reactive Forms | bcryptjs |

---

## 📸 Project Structure

backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── server.js
  └── swagger.js
frontend/
  ├── src/app/
      ├── components/
      ├── services/
      ├── guards/
      ├── interceptors/
  ├── environments/
  └── angular.json

---

## 📸 Screenshots
Please refer the doc file available in the path taskify/test-evidence.docx

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskify.git
cd taskify
