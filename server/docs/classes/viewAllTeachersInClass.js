module.exports =
{
  "get": {
    "tags": [
      "Classes"
    ],
    "description": "View all teachers in a class by class ID",
    "summary": "View all teachers in class",
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
        "description": "View all teachers in class successfully"
      }
    }
  }
}