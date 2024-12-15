module.exports =
{
  "post": {
    "tags": [
      "Classes"
    ],
    "description": "Add teachers to class",
    "summary": "Add teachers to class",
    "parameters": [
      {
        "name": "class",
        "in": "body",
        "description": "Add teachers to class",
        "schema": {
          "$ref": "#/components/schemas/addTeacherToClass"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Add teachers to class successfully"
      }
    }
  }
}