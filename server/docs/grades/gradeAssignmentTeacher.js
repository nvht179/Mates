module.exports = {
  "put": {
    "tags": [
      "Grades"
    ],
    "summary": "Teacher grades submission",
    "description": "Teacher grades submission",
    "parameters": [
      {
        "name": "class",
        "in": "body",
        "description": "Teacher grades submission",
        "schema": {
          "$ref": "#/components/schemas/gradeSubmission"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Teacher grades submission successfully"
      }
    }
  }
};
