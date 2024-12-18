module.exports = {
  "delete": {
    "tags": [
      "Events"
    ],
    "description": "Delete with eventID",
    "summary": "Delete with eventID",
    "parameters": [
      {
        "name": "eventID",
        "in": "path",
        "required": true,
        "description": "Event's ID",
        "schema": {
          "type": "string"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Delete with eventID successfully",
      },
      "404": {
        "description": "Lectures not found"
      }
    }
  }
};
