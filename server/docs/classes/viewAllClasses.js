module.exports =
{
  "get": {
    "tags": [
      "Classes"
    ],
    "parameters": [
      {
        "name": "email",
        "in": "path",
        "description": "The email of that user",
        "required": true,
        "schema": {
          "type": "string",
          "example": "lnkhoa22@apcs.fitus.edu.vn"
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