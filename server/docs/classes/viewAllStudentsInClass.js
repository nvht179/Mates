module.exports =
{
  "get": {
    "tags": [
      "Classes"
    ],
    "description": "View all students in class",
    "summary": "View all students in class",
    "parameters": [
      {
        "name": "classID",
        "in": "path",
        "description": "The id of class",
        "required": true,
        "schema": {
          "type": "string",
          "example": "1"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "View all students in class successfully"
      }
    }
  }
}