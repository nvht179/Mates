module.exports = {
  "put": {
    "tags": [
      "Notifications"
    ],
    "description": "Mark a specific notification as read by its ID",
    "summary": "Mark notification as read",
    "parameters": [
      {
        "name": "notificationId",
        "in": "path",
        "required": true,
        "description": "The ID of the notification to mark as read",
        "schema": {
          "type": "integer"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Notification marked as read successfully"
      },
      "404": {
        "description": "Notification not found"
      },
      "500": {
        "description": "Internal server error"
      }
    }
  }
};