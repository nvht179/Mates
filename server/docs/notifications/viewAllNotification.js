module.exports = {
  "get": {
    "tags": [
      "Notifications"
    ],
    "description": "Retrieve all notifications for a specific user",
    "summary": "View all notifications by user ID",
    "parameters": [
      {
        "name": "userId",
        "in": "path",
        "required": true,
        "description": "The ID of the user to retrieve notifications for",
        "schema": {
          "type": "integer"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "List of notifications retrieved successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "integer",
                    "description": "Notification ID"
                  },
                  "title": {
                    "type": "string",
                    "description": "Title of the notification"
                  },
                  "content": {
                    "type": "string",
                    "description": "Content of the notification"
                  },
                  "type": {
                    "type": "string",
                    "description": "Notification type (e.g., post, comment)"
                  },
                  "statusRead": {
                    "type": "boolean",
                    "description": "Read status of the notification"
                  },
                  "createdAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Date and time the notification was created"
                  }
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "No notifications found for the given user ID"
      },
      "500": {
        "description": "Internal server error"
      }
    }
  }
};