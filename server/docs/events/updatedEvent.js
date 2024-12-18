module.exports = {
  "put": {
    "tags": [
      "Events"
    ],
    "summary": "Update Event",
    "description": "Endpoint to Update Event",
    "parameters": [
      {
        "name": "class",
        "in": "body",
        "description": "Add students to class",
        "schema": {
          "$ref": "#/components/schemas/updatedEvent"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Update Event successfully"
      },
      "403": {
        "description": "Error creating the event"
      }
    }
  }
};
