## Auth Routes

### `GET /api/auth/`
**Description:** Welcome message for the Auth System.  
**Response:**
```json
{ "msg": "Welcome To Echo API Auth System!" }
```

### `POST /api/auth/register`
**Description:** Register a new user.  
**Request Body:**
```json
{ "name": "string", "email": "string", "password": "string" }
```
**Response:**
```json
{ "success": true, "data": { "name": "string", "email": "string" } }
```

### `POST /api/auth/login`
**Description:** Login a user.  
**Request Body:**
```json
{ "email": "string", "password": "string" }
```
**Response:**
```json
{ "success": true, "data": "token" }
```
