module.exports = {
  "get": {
    "tags": [
      "Grades"
    ],
    "description": "View all submission of that user in that class",
    "summary": "View all submission of that user in that class",
    "parameters": [
      {
        "name": "personID",
        "in": "path",
        "required": true,
        "description": "Person's ID",
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "classID",
        "in": "path",
        "required": true,
        "description": "Class's ID",
        "schema": {
          "type": "string"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "View all submission of that user in that class successfully",
      }
    }
  }
};
