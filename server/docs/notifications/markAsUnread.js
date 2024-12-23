module.exports = {
    "put": {
      "tags": [
        "Notifications"
      ],
      "description": "Mark a specific notification as Unread by its ID",
      "summary": "Mark notification as Unread",
      "parameters": [
        {
          "name": "notificationId",
          "in": "path",
          "required": true,
          "description": "The ID of the notification to mark as Unread",
          "schema": {
            "type": "integer"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Notification marked as Unread successfully"
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