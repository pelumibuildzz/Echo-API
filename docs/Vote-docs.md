## Vote Routes

### `POST /api/votes/:petitionId`
**Description:** Create a vote.  
**Request Body:**
```json
{ "userid": "string" }
```
**Response:**
```json
{ "success": true, "data": create.data }
```

### `DELETE /api/votes/:petitionId`
**Description:** Delete a vote.  
**Request Body:**
```json
{ "userid": "string" }
```
**Response:**
```json
{ "success": true, "data": deleteVote.data }
```