## Petition Routes

### `GET /api/petitions/`
**Description:** Get all petitions.  
**Query Params:**
```json
{ "category": "string", "status": "string" }
```
**Response:**
```json
{ "success": true, "data": petitions }
```

### `GET /api/petitions/:id`
**Description:** Get a petition by ID.  
**Response:**
```json
{ "success": true, "data": petition }
```

### `PUT /api/petitions/:id`
**Description:** Update a petition (Council only).  
**Request Body:**
```json
{ "status": "string" }
```
**Response:**
```json
{ "success": true, "data": updatedPetition }
```

### `DELETE /api/petitions/:id`
**Description:** Delete a petition (Allowed users only).  
**Response:**
```json
{ "success": true, "message": "Petition deleted successfully" }
```

### `GET /api/petitions/user`
**Description:** Get petitions created by the authenticated user.  
**Response:**
```json
{ "success": true, "data": userPetitions }
```

### `POST /api/petitions`
**Description:** Create a new petition.  
**Request Body:**
```json
{ "title": "string", "category": "string", "description": "string" }
```
**Response:**
```json
{ "success": true, "data": newPetition }
```

---