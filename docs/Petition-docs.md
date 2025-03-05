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

---