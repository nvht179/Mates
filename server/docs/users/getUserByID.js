module.exports = {
  "get": {
    "tags": [
      "Users"
    ],
    "description": "Get user info by user's ID",
    "summary": "Retrieve user information by ID",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "User's ID",
        "schema": {
          "type": "string"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "User info retrieved successfully",
      },
      "404": {
        "description": "User not found"
      }
    }
  }
};
