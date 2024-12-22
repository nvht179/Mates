module.exports = {
  "delete": {
    "tags": [
      "Notifications"
    ],
    "description": "Remove a specific notification by its ID",
    "summary": "Delete a notification",
    "parameters": [
      {
        "name": "notificationId",
        "in": "path",
        "required": true,
        "description": "The ID of the notification to remove",
        "schema": {
          "type": "integer"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Notification deleted successfully"
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