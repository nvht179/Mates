module.exports =
{
  "get": {
    "tags": [
      "Classes"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "User's id",
        "schema": {
          "type": "string"
        }
      }
    ],
    "description": "View all classes for that user",
    "summary": "View all classes for that user",
    "responses": {
      "200": {
        "description": "View all classes successfully"
      }
    }
  }
}