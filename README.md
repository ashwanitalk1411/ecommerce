# Role-Based E-Commerce Cart API

A machine-test-ready REST API built with Node.js, Express, Sequelize, MySQL, JWT and Joi.

## Features

- User registration/login
- JWT authentication
- User/Admin role-based authorization
- Product CRUD
- Cart and cart-item management
- Joi request validation
- Global error handling
- Sequelize models and relationships
- Consistent JSON responses

## Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize
- JWT
- bcryptjs
- Joi

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create MySQL database

```sql
CREATE DATABASE machine_test;
```

### 3. Configure environment

Copy `.env.example` to `.env` and update the database credentials.

### 4. Start

```bash
npm run dev
```

The API runs at:

`http://localhost:5000`

## Important Note About Admin

For a machine test, registration accepts `role: "admin"` so the evaluator can quickly test admin routes.

In a real production application, public registration must NOT allow users to choose the admin role. Admin creation should be restricted to a secure admin/provisioning flow.

## API Endpoints

### Auth

`POST /api/auth/register`

```json
{
  "name": "Ashwani",
  "email": "ashwani@example.com",
  "password": "password123",
  "role": "admin"
}
```

`POST /api/auth/login`

```json
{
  "email": "ashwani@example.com",
  "password": "password123"
}
```

### Products

Public:

- `GET /api/products`
- `GET /api/products/:id`

Admin:

- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

Header:

`Authorization: Bearer <JWT>`

### Cart

Authenticated user:

- `GET /api/cart`
- `POST /api/cart/items`
- `PUT /api/cart/items/:id`
- `DELETE /api/cart/items/:id`

Add item:

```json
{
  "productId": 1,
  "quantity": 2
}
```

## Test Flow

1. Register an admin.
2. Login and copy JWT.
3. Create a product using the admin JWT.
4. Register a normal user.
5. Login as the user.
6. Get products.
7. Add a product to the cart.
8. Update/remove cart item.
9. Try creating a product with a user token and verify `403 Forbidden`.

## Project Structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
└── validations/
```

This intentionally keeps the architecture simple enough for a 1.5–2 hour machine test while separating business logic from controllers.


## Centralized Status Codes & Errors

All HTTP status codes are centralized in:

`src/utils/appStatusCode.js`

Common codes include:

- `OK` → 200
- `CREATED` → 201
- `ACCEPTED` → 202
- `NO_CONTENT` → 204
- `BAD_REQUEST` → 400
- `UNAUTHORIZED` → 401
- `FORBIDDEN` → 403
- `NOT_FOUND` → 404
- `METHOD_NOT_ALLOWED` → 405
- `CONFLICT` → 409
- `UNPROCESSABLE_ENTITY` → 422
- `TOO_MANY_REQUESTS` → 429
- `INTERNAL_SERVER_ERROR` → 500
- `NOT_IMPLEMENTED` → 501
- `BAD_GATEWAY` → 502
- `SERVICE_UNAVAILABLE` → 503
- `GATEWAY_TIMEOUT` → 504

Custom application errors are handled through `src/utils/appError.js`.

Example:

```js
const STATUS = require("../utils/appStatusCode");
const AppError = require("../utils/appError");

throw new AppError("Product not found", STATUS.NOT_FOUND);

// Or use the helper:
throw AppError.notFound("Product not found");
```

Response helpers are available in `src/utils/response.js`:

```js
const { successResponse, errorResponse } = require("../utils/response");
```
