module.exports = {
  "get": {
    "tags": [
      "Grades"
    ],
    "description": "View details submission of that user in that class",
    "summary": "View details submission of that user in that class",
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
        "name": "assignmentID",
        "in": "path",
        "required": true,
        "description": "Assignment's ID",
        "schema": {
          "type": "string"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "View details submission of that user in that class successfully",
      }
    }
  }
};
