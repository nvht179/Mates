module.exports = {
  "get": {
    "tags": [
      "Events"
    ],
    "description": "View all events by userID",
    "summary": "View all events by userID",
    "parameters": [
      {
        "name": "userID",
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
        "description": "View all events by userID successfully",
      },
      "404": {
        "description": "Lectures not found"
      }
    }
  }
};
