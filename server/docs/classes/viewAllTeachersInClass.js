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
        "description": "The ID of the class to retrieve teachers from",
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