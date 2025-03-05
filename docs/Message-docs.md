## Message Routes

### `POST /api/messages/`
**Description:** Create a message.  
**Request Body:**
```json
{ "content": "string", "receiver": "string" }
```
**Response:**
```json
{ "success": true, "data": message.data }
```

### `GET /api/messages/`
**Description:** Get messages for the user.  
**Response:**
```json
{ "success": true, "data": messages.data }
```

### `PUT /api/messages/:id`
**Description:** Update a message (Mark as read).  
**Response:**
```json
{ "success": true, "data": message.data }
```

### `DELETE /api/messages/:id`
**Description:** Delete a message.  
**Response:**
```json
{ "success": true, "data": message.data }
```