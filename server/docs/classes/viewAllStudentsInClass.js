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
        "name": "class",
        "in": "body",
        "description": "Add teachers to class",
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
        ]
      }
    ],
    "responses": {
      "200": {
        "description": "View all students in class successfully"
      }
    }
  }
}