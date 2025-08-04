# 🐾 Petstore API

The **Petstore API** is a robust backend system built with **Node.js**, **TypeScript**, and **Express**, designed to manage pets, users, and roles with fine-grained access control. The project supports JWT-based authentication, Redis-powered caching, centralized role/permission management, and Swagger-based API documentation.

---

## ✅ Features

- 🔐 **JWT Authentication** with RBAC (SuperAdmin, Admin, User)
- 👤 **User Management** — SuperAdmin can create Admins and Users
- 🐕 **Pet Management** — Admins can create, update, and delete pets
- 📷 **Image Upload Support** for pet photos (via `multer`)
- 🧠 **Request Validation** using `class-validator` and DTO patterns
- 🧾 **Centralized Permission Check** based on permissions per feature
- ⚡ **Redis Caching** for GET endpoints (via `ioredis`)
- 📈 Rate Limiting using express-rate-limit to protect against abuse
- 📄 **Swagger UI** for interactive API documentation
- 🧪 **Jest + Supertest** for endpoint testing
- 🗂️ **Prisma ORM** for PostgreSQL database access
- ✨ **Clean Architecture** – DTOs, Models, Controllers, Routes
- 🔄 **Pagination, Filtering, Search** support in `/pets`

---

## 🧰 Tech Stack

| Layer         | Tools & Libraries                                      |
|---------------|--------------------------------------------------------|
| Language      | TypeScript                                             |
| Runtime       | Node.js                                                |
| Web Framework | Express.js                                             |
| Database      | PostgreSQL (via Prisma ORM)                            |
| Auth          | JWT (`jsonwebtoken`), `bcrypt`                         |
| Validation    | `class-validator`, `class-transformer`                |
| Uploads       | `multer`                                               |
| Caching       | `ioredis` (Redis client)                               |
| Docs          | `swagger-jsdoc`, `swagger-ui-express`                 |
| Testing       | `jest`, `supertest`                                    |

---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Node.js 18+
- PostgreSQL (local or remote)
- Redis (optional but recommended for caching)

---

### 📦 Install Dependencies

```bash
npm install
```

---

### 🔐 Environment Configuration

Create a `.env` file at the root and add:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/petstore
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

### 🔧 Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

### 🧪 Run Tests

```bash
npm run test
```

Includes tests for **auth** and **pet** modules using **mock authentication**.

---

## 📚 API Overview

| Module     | Endpoint      | Description                          |
|------------|---------------|--------------------------------------|
| Auth       | `/auth/login` | Login & receive JWT token            |
| Users      | `/users`      | SuperAdmin creates & lists users     |
| Pets       | `/pets`       | Manage pets (CRUD, filters, cache)   |

Permissions are enforced using middleware & centralized permission files.

---

## 🔐 Roles & Permissions

| Role        | Permissions                             |
|-------------|------------------------------------------|
| SuperAdmin  | Create users, view all users             |
| Admin       | Add/update/delete pets                   |
| User        | View pets only                           |

---

## 📁 Folder Structure

```bash
src/
├── controllers/
├── dtos/
├── middleware/
├── models/
├── routes/
├── scripts/              
├── services/
├── utils/
├── config/
├── docs/                
├── app.ts
└── server.ts
```

---

## 📘 API Documentation

Available at:

| Tool        | URL                                |
|-------------|-------------------------------------|
| Swagger UI  | http://localhost:3000/api-docs      |

> Swagger schemas are defined in `src/docs/swagger.ts` and scanned from `routes/*.ts`.

---

## ⚡ Redis Caching

GET endpoints like `/pets` are cached using Redis.

- Implemented via `cacheMiddleware.ts`
- Default cache duration: **60 seconds**
- Skip cache on mutations

---

## 🧑‍💻 Development Scripts

```bash
# Start the server in dev mode
npm run dev

# Start using nodemon
npm start

# Create SuperAdmin (initial CLI user)
npm run create:superadmin
```

---

## 🧪 Postman Collection

Test the API using the Postman files in the `/postman` directory:

- `Petstore_Collection.json`
- `Petstore_Environment.json`

---

## 👨‍💻 Author

**Shubham Patil**

---