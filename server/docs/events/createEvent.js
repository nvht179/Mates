module.exports = {
  "post": {
    "tags": [
      "Events"
    ],
    "summary": "Create an event",
    "description": "Endpoint to create a new event",
    "parameters": [
      {
        "name": "class",
        "in": "body",
        "description": "Add students to class",
        "schema": {
          "$ref": "#/components/schemas/createEvent"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Event created successfully"
      },
      "403": {
        "description": "Error creating the event"
      }
    }
  }
};
