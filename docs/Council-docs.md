## Council Routes

### `GET /api/council/petitions`
**Description:** Get all petitions (Council only).  
**Response:**
```json
{ "success": true, "data": allPetitions }
```

### `POST /api/council/merge`
**Description:** Create a merged petition (Council only).  
**Request Body:**
```json
{ "petitions": "array", "createdBy": "string" }
```
**Response:**
```json
{ "success": true, "data": mergedPetition.data }
```

### `PUT /api/council`
**Description:** Update a petition (Council only).  
**Request Body:**
```json
{ "petitions": "array", "status": "string" }
```
**Response:**
```json
{ "success": true, "data": updatedPetition.data }
```