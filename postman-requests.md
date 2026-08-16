# Postman Quick Test

Base URL:

`http://localhost:5000`

## 1. Register Admin

POST `/api/auth/register`

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

## 2. Login Admin

POST `/api/auth/login`

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Copy `data.token`.

## 3. Create Product

POST `/api/products`

Header:

`Authorization: Bearer <ADMIN_TOKEN>`

Body:

```json
{
  "name": "Laptop",
  "price": 75000,
  "stock": 10
}
```

## 4. Register User

POST `/api/auth/register`

```json
{
  "name": "User",
  "email": "user@example.com",
  "password": "password123"
}
```

## 5. Login User

POST `/api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## 6. Get Products

GET `/api/products`

## 7. Add to Cart

POST `/api/cart/items`

Header:

`Authorization: Bearer <USER_TOKEN>`

Body:

```json
{
  "productId": 1,
  "quantity": 2
}
```

## 8. Get Cart

GET `/api/cart`

Header:

`Authorization: Bearer <USER_TOKEN>`

## 9. Test Role Protection

Try:

POST `/api/products`

with the normal user's token.

Expected:

`403 Forbidden`
