## Solution Routes

### `POST /api/solutions/:petitionId`
**Description:** Create a solution.  
**Request Body:**
```json
{ "title": "string", "description": "string" }
```
**Response:**
```json
{ "success": true, "data": newSolution.data }
```

### `GET /api/solutions/:petitionId`
**Description:** Get solutions for a petition.  
**Response:**
```json
{ "success": true, "data": solutions.data }
```

### `PUT /api/solutions/:id`
**Description:** Update a solution.  
**Request Body:**
```json
{ "title": "string", "description": "string" }
```
**Response:**
```json
{ "success": true, "data": updatedSolution.data }
```

### `DELETE /api/solutions/:id`
**Description:** Delete a solution.  
**Response:**
```json
{ "success": true, "data": solution.data }
