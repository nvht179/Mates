module.exports = {
  "delete": {
    "tags": [
      "Grades"
    ],
    "description": "Delete submission",
    "summary": "Delete submission",
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
        "description": "Delete submission successfully",
      }
    }
  }
};
