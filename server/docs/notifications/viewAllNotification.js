module.exports = {
  "get": {
    "tags": [
      "Notifications"
    ],
    "description": "View all notifications for a specific user",
    "summary": "Retrieve all notifications for a given user",
    "parameters": [
      {
        "name": "userId", // Đảm bảo tên tham số là userId
        "in": "path", // Đảm bảo tham số nằm trong phần đường dẫn (path)
        "required": true,
        "description": "User's ID to get notifications",
        "schema": {
          "type": "integer"  // Đảm bảo kiểu dữ liệu là integer
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Notifications retrieved successfully",
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
                    "description": "Type of notification (post, comment, etc.)"
                  },
                  "targetId": {
                    "type": "integer",
                    "description": "The ID of the user who is the recipient"
                  },
                  "statusRead": {
                    "type": "boolean",
                    "description": "Status of the notification (true if read, false if unread)"
                  },
                  "createdAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Date and time when the notification was created"
                  }
                }
              }
            }
          }
        }
      },
      "404": {
        "description": "User's notifications not found"
      },
      "500": {
        "description": "Internal server error"
      }
    }
  }
};