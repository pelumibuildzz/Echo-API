## Notification Routes

### `POST /api/notifications/`
**Description:** Create a notification (Council only).  
**Request Body:**
```json
{ "user": "string", "petition": "string", "message": "string" }
```
**Response:**
```json
{ "success": true, "data": notification.data }
```

### `GET /api/notifications/`
**Description:** Get notifications for the user.  
**Response:**
```json
{ "success": true, "data": notifications.data }
```

### `PUT /api/notifications/:id`
**Description:** Update a notification (Council only).  
**Request Body:**
```json
{ "read": "boolean" }
```
**Response:**
```json
{ "success": true, "data": notification.data }
```

### `DELETE /api/notifications/:id`
**Description:** Delete a notification (Council only).  
**Response:**
```json
{ "success": true, "data": notification.data }
```