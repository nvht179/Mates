module.exports =
{
  "post": {
    "tags": [
      "Classes"
    ],
    "description": "Add students to class",
    "summary": "Add students to class",
    "parameters": [
      {
        "name": "class",
        "in": "body",
        "description": "Add students to class",
        "schema": {
          "$ref": "#/components/schemas/addStudentToClass"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Add students to class successfully"
      }
    }
  }
}