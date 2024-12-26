module.exports = {
  "get": {
    "tags": [
      "Grades"
    ],
    "description": "View all submission of all users in that class",
    "summary": "View all submission of all users in that class",
    "parameters": [
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
        "description": "View all submission of all users in that class successfully",
      }
    }
  }
};
